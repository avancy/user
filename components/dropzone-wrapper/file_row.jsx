import React from 'react';
import { BtnCancel } from '../common/buttons/cancel';
import { BtnDelete } from '../common/buttons/delete';
import { BtnUpload } from '../common/buttons/upload';
import { IconCheckMark } from '../common/icons/check_mark';
import { IconError } from '../common/icons/error';
import { IconFile } from '../common/icons/file';
import { UPLOAD_STATUS, FileUploadService } from './file_upload_service';
import { ProgressBar } from '../common/loadding/progress_bar';

export class FileRow extends React.Component {
  currentUploadService = null;

  constructor(props) {
    super(props);
    this.state = {
      uploadPercentage: 0,
      uploadStatus: UPLOAD_STATUS.NOT_STARTED,
    };
  }

  componentDidMount() {
    // Inicie o upload automaticamente quando o componente for montado
    this.upload();
  }

  delete() {
    if (this.props.onDelete && typeof this.props.onDelete === 'function') {
      this.props.onDelete();
    }
  }

  cancel() {
    if (this.currentUploadService != null) {
      this.currentUploadService.cancelUpload();
    }
    this.setState({
      uploadStatus: UPLOAD_STATUS.NOT_STARTED,
      uploadPercentage: 0,
    });
  }

  upload() {
    this.setState({ uploadStatus: UPLOAD_STATUS.IN_PROGRESS });
    this.currentUploadService = new FileUploadService(this.props.file, this.props.url, 'file');
    this.currentUploadService
      .upload()
      .onProgressChange((progress) => this.setState({ uploadPercentage: progress }))
      .onError(() => this.setState({ uploadStatus: UPLOAD_STATUS.ERROR }))
      .onComplete((data) => {
        this.setState({ uploadStatus: UPLOAD_STATUS.COMPLETE });
        this.currentUploadService = null;
        if (this.props.onComplete && typeof this.props.onComplete === 'function') {
          this.props.onComplete(data);
        }
      });
  }

  render() {
    return (
      <div className="grid flex-grow grid-cols-8 py-1">
        <div className="flex justify-end col-span-2">
          {this.state.uploadStatus === UPLOAD_STATUS.NOT_STARTED && (
            <BtnDelete onClick={() => this.delete()} />
          )}
          {this.state.uploadStatus === UPLOAD_STATUS.IN_PROGRESS && (
            <BtnCancel onClick={() => this.cancel()} />
          )}
          {this.state.uploadStatus === UPLOAD_STATUS.NOT_STARTED && (
            <BtnUpload onClick={() => this.upload()} />
          )}
          {this.state.uploadStatus === UPLOAD_STATUS.COMPLETE && <IconCheckMark />}
          {this.state.uploadStatus === UPLOAD_STATUS.ERROR && <IconError />}
        </div>

        <ProgressBar
          percentage={this.state.uploadPercentage}
          hasErrors={this.state.uploadStatus === UPLOAD_STATUS.ERROR}
          className="col-span-2"
        />

        <div className="flex items-center justify-start col-span-4">
          <IconFile className="flex-shrink-0 w-4 h-4" />
          <span className="text-xs text-gray-700 truncate">{this.props.file.name}</span>
        </div>
      </div>
    );
  }
}
