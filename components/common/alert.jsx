import React, { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

class AlertMux extends React.Component {
  constructor(props) {
    super(props);
    this.cancelButtonRef = React.createRef();

    this.state = {
      type: 'question',
      title: '',
      message: '',
      show: false,
      actionBtnText: '',
      cancelBtnText: '',
      action: () => {},
    };
  }

  show() {
    this.setState({ show: true });
  }

  hide() {
    this.setState({ show: false });
  }

  cancel() {
    this.hide();
  }

  accept() {
    this.hide();
    this.state.action();
  }

  showDangerQuestionDialog(config) {
    this.setState({ show: true, ...config });
  }

  render() {
    return (
      <>
        <DangerQuestionDialog
          type={this.state.type}
          title={this.state.title}
          message={this.state.message}
          onCancel={() => this.cancel()}
          onAccept={() => this.accept()}
          open={this.state.show}
          actionBtnText={this.state.actionBtnText}
          cancelBtnText={this.state.cancelBtnText}
        />
      </>
    );
  }
}

export class Alert extends React.Component {
  static ref;

  constructor(props) {
    super(props);
    Alert.ref = React.createRef();
    this.state = { visible: false };
  }

  static question(
    title = '',
    message = '',
    actionBtnText = '',
    cancelBtnText = '',
    callback = () => {},
  ) {
    Alert.ref.current.showDangerQuestionDialog({
      type: 'question',
      title,
      message,
      actionBtnText,
      cancelBtnText,
      action: callback,
    });
  }

  static choice(title = '', message = '', actionBtnText = '', cancelBtnText = '') {
    return new Promise((resolve) => {
      Alert.ref.current.showDangerQuestionDialog({
        type: 'choice',
        title,
        message,
        actionBtnText,
        cancelBtnText,
        action: () => resolve(true),
        onCancel: () => resolve(false),
      });
    });
  }

  static hide() {
    Alert.ref.current.hide();
  }

  render() {
    return <AlertMux ref={Alert.ref} />;
  }
}

function DangerQuestionDialog({
  type,
  title,
  message,
  onCancel,
  onAccept,
  open,
  actionBtnText,
  cancelBtnText,
}) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[1000]"
        initialFocus={cancelButtonRef}
        onClose={() => onCancel && typeof onCancel === 'function' && onCancel()}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
                <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                      {type === 'question' && (
                        <ExclamationTriangleIcon
                          className="w-6 h-6 text-red-600"
                          aria-hidden="true"
                        />
                      )}
                      {type === 'choice' && (
                        <ExclamationTriangleIcon
                          className="w-6 h-6 text-blue-600"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{message}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      onAccept && typeof onAccept === 'function' && onAccept();
                    }}
                  >
                    {actionBtnText || 'Continuar'}
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      onCancel && typeof onCancel === 'function' && onCancel();
                    }}
                    ref={cancelButtonRef}
                  >
                    {cancelBtnText || 'Cancelar'}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
