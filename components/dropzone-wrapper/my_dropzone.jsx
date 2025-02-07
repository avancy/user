import React from 'react';
import Dropzone from 'react-dropzone';
import { IconDropzone } from '../common/icons/dropzone';
import { FileRow } from './file_row';

export class MyDropzone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
    this.dropzoneRef = React.createRef();
  }

  openDialog() {
    if (this.dropzoneRef && this.dropzoneRef.current) {
      this.dropzoneRef.current.open();
    }
  }

  onDrop(files) {
    this.setState((state) => {
      let filenames = state.files.map((file) => file.path);
      let newFiles = files.filter((file) => !filenames.includes(file.path));
      let allFiles = state.files.concat(newFiles);
      if (this.props?.maxFiles && this.props.maxFiles > 0) {
        if (allFiles.length > this.props.maxFiles) {
          let index = allFiles.length - this.props.maxFiles;
          allFiles = allFiles.slice(index);
        }
      }
      return { files: allFiles };
    });
  }

  onDelete(index) {
    this.setState((state) => ({
      files: state.files.filter((_, i) => i !== index),
    }));
  }

  classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  onComplete(data) {
    if (this.props.onComplete && typeof this.props.onComplete === 'function')
      this.props.onComplete(data);
  }

  render() {
    return (
      <>
        <Dropzone
          onDrop={(acceptedFiles) => this.onDrop(acceptedFiles)}
          accept={this.props.accept}
          noClick={true}
          maxFiles={this.props.maxFiles}
          ref={this.dropzoneRef}
        >
          {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => {
            return (
              <div
                {...getRootProps()}
                className={this.classNames(
                  'mt-1 border-2 border-dashed rounded-md px-6 pt-5 pb-6  border-gray-300',
                  isDragAccept && isDragActive && 'border-green-600 bg-green-100',
                  isDragActive && isDragReject && 'border-red-400 bg-red-100',
                  this.state.files.length > 0 ? 'grid grid-cols-5' : 'flex justify-center',
                )}
              >
                <div
                  className={this.classNames(
                    'space-y-1 text-center flex  flex-wrap content-center justify-center',
                    this.state.files.length > 0 && 'col-span-2',
                  )}
                >
                  <div className="flex flex-col">
                    <IconDropzone onClick={() => this.openDialog()} />
                    <div className="flex text-sm text-gray-600">
                      <input {...getInputProps()} />
                    </div>
                    <p
                      className={`${this.props.labelStyle ? this.props.labelStyle : 'pl-1'}`}
                      onClick={() => this.openDialog()}
                    >
                      {this.props.label1}
                    </p>
                    <p className="text-xs text-gray-500"> {this.props.label2} </p>
                  </div>
                </div>

                {this.state.files.length > 0 && (
                  <div className="w-full col-span-3">
                    {this.state.files.map((file, index) => (
                      <FileRow
                        file={file}
                        key={file.path}
                        onSave={() => {}}
                        onDelete={() => this.onDelete(index)}
                        url={this.props.url}
                        onComplete={(response) => this.onComplete(response)}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          }}
        </Dropzone>
      </>
    );
  }
}
