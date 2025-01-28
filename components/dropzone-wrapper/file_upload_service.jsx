import axios from 'axios';
import FileUploadStatus from '../../classes/file_upload_status';

export class FileUploadService {
  status = new FileUploadStatus();
  sourceCancel = null;
  uploadPercentage = 0;

  constructor(file, url, fileFieldName = 'uploaded_file') {
    this.file = file;
    this.url = url;
    this.fileFieldName = fileFieldName;
  }

  upload() {
    let formData = new FormData();
    formData.append(this.fileFieldName, this.file);
    this.sourceCancel = axios.CancelToken.source();
    axios
      .post(this.url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        cancelToken: this.sourceCancel.token,
        onUploadProgress: (progressEvent) => {
          this.uploadPercentage = parseInt(
            Math.round((progressEvent.loaded / progressEvent.total) * 100),
          );
          this.status.event.emit('on-progress-change', this.uploadPercentage);
        },
      })
      .then((data) => {
        this.status.event.emit('on-complete', {
          file: this.file,
          data: data.data,
        });
      })
      .catch((thrown) => {
        if (axios.isCancel(thrown)) {
          this.status.event.emit('on-cancel', thrown.message);
        } else {
          this.status.event.emit('on-error', thrown);
        }
      });

    return this.status;
  }

  cancelUpload() {
    if (this.sourceCancel != null) this.sourceCancel.cancel('Upload canceled by the user.');
  }
}

export const UPLOAD_STATUS = {
  IN_PROGRESS: 1,
  ERROR: 2,
  COMPLETE: 3,
  NOT_STARTED: 4,
};
