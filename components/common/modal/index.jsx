import React from 'react';
import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { Image, LoadSpinner, ProgressBar } from '@/components/common/modal/types';

const Types = {
  image: Image,
  progress: ProgressBar,
  load_spenner: LoadSpinner,
};

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false, contentType: '', config: null, noExit: true };
  }

  show({ contentType, config, noExit = false }) {
    this.setState({ show: true, contentType, config, noExit });
  }

  hide() {
    this.setState({ show: false });
  }

  renderContent() {
    if (this.state.config?.content) return this.state.config?.content;
    const Render = Types[this.state.contentType] || (() => <></>);
    return <Render {...this.state.config} />;
  }

  render() {
    return (
      <>
        <div
          className={`fixed inset-0 z-50 ${this.state.show ? 'block' : 'hidden'}`}
          aria-hidden="true"
        >
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
              this.state.show ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => !this.state.noExit && this.hide()}
          />
          <div className="flex items-center justify-center min-h-screen px-4 text-center">
            {!this.state.noExit && (
              <Transition
                show={this.state.show}
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div
                  className={`relative w-full p-4 bg-white ${this.state.config?.className ? this.state.config.className : 'rounded-lg'} shadow-xl max-w-min`}
                >
                  <div className="absolute top-0 right-0 pt-4 pr-4">
                    <button
                      className="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => this.hide()}
                    >
                      <XMarkIcon className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-2">{this.renderContent()}</div>
                </div>
              </Transition>
            )}
            {this.state.noExit && (
              <div className="relative w-full p-4 rounded-lg max-w-min">
                <div className="mt-2">{this.renderContent()}</div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default class Modal extends React.Component {
  static ref;

  constructor(props) {
    super(props);
    Modal.ref = React.createRef();
  }

  static showImage(src = '') {
    this.ref.current.show({ contentType: 'image', config: { src } });
  }

  static showProgressBar(total = 0, current = 0) {
    this.ref.current.show({ contentType: 'progress', config: { total, current }, noExit: true });
  }

  static showLoadSpinner() {
    this.ref.current.show({
      contentType: 'load_spenner',
      noExit: true,
    });
  }

  static show(content = null, className = '') {
    this.ref.current.show({ contentType: '', config: { content, className } });
  }

  static hide() {
    this.ref.current.hide();
  }

  render() {
    return <ModalComponent ref={Modal.ref} />;
  }
}
