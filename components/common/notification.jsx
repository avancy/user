import React from 'react';
import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid';

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.timeoutID = 0;
    this.state = { show: false, type: 'success', message: '', secondaryMessage: '' };
  }

  show(config) {
    this.setState({ show: true, ...config });
    if (this.timeoutID !== 0) clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(() => {
      this.hide();
      this.timeoutID = 0;
    }, 5000);
  }

  hide() {
    this.setState({ show: false });
  }

  render() {
    return (
      <>
        {/* Global notification live region, render this permanently at the end of the document */}
        <div
          aria-live="assertive"
          className="fixed inset-0 z-[1000] flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
        >
          <div className="flex flex-col items-center w-full space-y-4 sm:items-end">
            {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
            <Transition
              show={this.state.show}
              as={Fragment}
              enter="transform ease-out duration-300 transition"
              enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
              enterTo="translate-y-0 opacity-100 sm:translate-x-0"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5">
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {this.state.type === 'success' && (
                        <CheckCircleIcon className="w-6 h-6 text-green-400" aria-hidden="true" />
                      )}
                      {this.state.type === 'warning' && (
                        <ExclamationCircleIcon
                          className="w-6 h-6 text-yellow-400"
                          aria-hidden="true"
                        />
                      )}
                      {this.state.type === 'error' && (
                        <XCircleIcon className="w-6 h-6 text-red-400" aria-hidden="true" />
                      )}
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                      <p className="text-sm font-medium text-left text-gray-900">
                        {this.state.message}
                      </p>
                      <p className="mt-1 text-sm text-left text-gray-500">
                        <span
                          dangerouslySetInnerHTML={{ __html: this.state.secondaryMessage }}
                        ></span>
                      </p>
                    </div>
                    <div className="flex flex-shrink-0 ml-4">
                      <button
                        className="inline-flex text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => {
                          this.hide();
                        }}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="w-5 h-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </>
    );
  }
}

export class Notify extends React.Component {
  static ref;

  constructor(props) {
    super(props);
    Notify.ref = React.createRef();
    this.state = { visible: false };
  }

  static warning(message = '', secondaryMessage = '') {
    if (this.ref?.current) {
      this.ref.current.show({ type: 'warning', message, secondaryMessage });
    }
  }

  static error(message = '', secondaryMessage = '') {
    if (this.ref?.current) {
      this.ref.current.show({ type: 'error', message, secondaryMessage });
    }
  }

  static success(message = '', secondaryMessage = '') {
    if (this.ref?.current) {
      this.ref.current.show({ type: 'success', message, secondaryMessage });
    }
  }

  static hide() {
    if (this.ref?.current) {
      this.ref.current.hide();
    }
  }

  render() {
    return <Notification ref={Notify.ref} />;
  }
}

export function notifyShow() {
  Notify.show();
}

export function notifyHide() {
  Notify.hide();
}
