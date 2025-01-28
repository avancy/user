import { EventEmitter } from 'events';

export default class FileUploadStatus {
  event = new EventEmitter();

  onProgressChange(cb) {
    this.event.on('on-progress-change', (percentage) => cb(percentage));
    return this;
  }

  onError(cb) {
    this.event.on('on-error', (error) => cb(error));
    return this;
  }

  onComplete(cb) {
    this.event.on('on-complete', (data) => cb(data));
    return this;
  }

  onCancel(cb) {
    this.event.on('on-cancel', cb);
    return this;
  }
}
