import { Fragment } from 'react';
import Login from '@/components/views/auth/signin';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export function AuthNavigation({ open, onClose, company_id, style, company_page_url, type }) {
  return (
    <>
      <Transition appear show={true} as={Fragment}>
        <Dialog onClose={onClose} className="fixed inset-0 z-30 overflow-y-auto bg-black/40">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="flex items-center justify-center min-h-screen" style={style}>
              <div className="relative z-40 flex flex-col w-screen h-auto max-w-md p-4 my-auto text-lg tracking-tight bg-white shadow-xl rounded-2xl">
                <button
                  className="absolute text-gray-600 top-4 right-4 hover:text-gray-800 focus:outline-none"
                  onClick={onClose}
                >
                  <XMarkIcon className="w-6" />
                </button>
                <Login company_id={company_id} company_page_url={company_page_url} type={type} />
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
