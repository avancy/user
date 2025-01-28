import { Menu, Popover, Transition } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/20/solid';
import MavieloLogo from '@/images/logos/mavielo.svg';
import { NAVIGATION } from './constrants';
import { useRouter } from 'next/router';
import { classNames } from '@/util/css';
import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Bars3Icon,
  ChatBubbleOvalLeftEllipsisIcon,
  BellIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export function CandidateHeader({ user, signOut, openProfessionalProfile }) {
  const router = useRouter();

  const isRouteActive = (href, currentPath) => {
    return href === currentPath;
  };

  //Mock do redirecionamento, ajustar conforme as regras de negócio:
  const redirectTo = 'https://mavielorh.com.br';

  return (
    <>
      <header className="border-b-2 border-gray-100 xl:mx-32">
        <div className="max-w-full sm:px-4 lg:px-8">
          <Popover className="flex justify-between h-16">
            <div className="flex px-2 lg:px-0">
              <div className="flex items-center flex-shrink-0">
                <Link href={redirectTo} target="_blank" rel="noopener noreferrer">
                  <Image priority src={MavieloLogo} alt="Logo MavieloRH" />
                </Link>
              </div>
              <nav
                aria-label="Global"
                className="hidden lg:ml-16 lg:flex lg:items-center lg:space-x-20"
              >
                {NAVIGATION.HOME.map((item, index) => (
                  <div key={index} className="relative">
                    <Link
                      href={item.href}
                      className={classNames(
                        'px-3 py-2 text-sm font-medium text-gray-900 rounded-md relative z-10',
                        isRouteActive(item.href, router.pathname)
                          ? 'text-gray-900'
                          : 'text-gray-500',
                      )}
                    >
                      {item.name}
                    </Link>
                    {isRouteActive(item.href, router.pathname) && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-primary-100 to-brand-secondary-500 rounded-md" />
                    )}
                  </div>
                ))}
              </nav>
            </div>
            {/* <div className="flex items-center justify-center flex-1 px-2 lg:ml-6 lg:justify-end">
              <div className="max-w-lg lg:max-w-xs">
                <BtnBase
                  type="button"
                  variant="solid"
                  color="primary"
                  className="w-full shadow-sm shadow-gray-600"
                  onClick={() => openProfessionalProfile(true)}
                >
                  <span className="text-xs md:text-sm">Ver Currículo</span>
                </BtnBase>
              </div>
            </div> */}
            <div className="flex items-center lg:hidden">
              {/* Mobile menu button */}
              <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Transition.Root as={Fragment}>
              <div className="lg:hidden">
                <Transition.Child
                  as={Fragment}
                  enter="duration-150 ease-out"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="duration-150 ease-in"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Popover.Overlay
                    className="fixed inset-0 z-20 bg-black bg-opacity-25"
                    aria-hidden="true"
                  />
                </Transition.Child>

                <Transition.Child
                  as={Fragment}
                  enter="duration-150 ease-out"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="duration-150 ease-in"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Popover.Panel
                    focus
                    className="absolute top-0 right-0 z-30 w-full p-2 transition origin-top transform max-w-none"
                  >
                    <div className="bg-white divide-y divide-gray-200 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="pt-3 pb-2">
                        <div className="flex items-center justify-between px-4">
                          <div>
                            <Link href={redirectTo}>
                              <Image priority src={MavieloLogo} alt="Logo MavieloRH" />
                            </Link>
                          </div>
                          <div className="-mr-2">
                            <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                              <span className="sr-only">Close menu</span>
                              <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                            </Popover.Button>
                          </div>
                        </div>
                        <div className="px-2 mt-3 space-y-1">
                          {NAVIGATION.HOME.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="block px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-100 hover:text-gray-800"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div className="pt-4 pb-2">
                        <div className="flex items-center px-5">
                          <div className="flex-shrink-0">
                            {user?.f_photo?.url ? (
                              <img
                                src={user?.f_photo?.url}
                                alt="Avatar"
                                className="w-10 h-10 text-sm text-gray-500 rounded-full"
                              />
                            ) : (
                              <UserCircleIcon className="w-10 h-10 text-sm text-gray-500 " />
                            )}
                          </div>
                          <div className="ml-3">
                            <div className="text-base font-medium text-gray-800">{user?.name}</div>
                            <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                          </div>
                        </div>
                        <div className="px-2 mt-3 space-y-1">
                          <div>
                            <button
                              type="button"
                              className={
                                'block text-left px-3 w-full py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-100 hover:text-gray-800'
                              }
                            >
                              <span className="sr-only">View notifications</span>
                              Mensagens
                            </button>
                            <button
                              type="button"
                              className="block w-full px-3 py-2 text-base font-medium text-left text-gray-900 rounded-md hover:bg-gray-100 hover:text-gray-800"
                            >
                              <span className="sr-only">View notifications</span>
                              Notificações
                            </button>
                          </div>
                          {NAVIGATION.USER.map((item) =>
                            item.type === 'popup' ? (
                              <button
                                key={item.name}
                                onClick={() => openProfessionalProfile(true)}
                                className="block px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-100 hover:text-gray-800"
                              >
                                {item.name}
                              </button>
                            ) : (
                              <a
                                key={item.name}
                                href={item.href}
                                className="block px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-100 hover:text-gray-800"
                              >
                                {item.name}
                              </a>
                            ),
                          )}
                          <button
                            className="block w-full px-3 py-2 text-base font-medium text-left text-gray-900 rounded-md hover:bg-gray-100 hover:text-gray-800"
                            onClick={() => {
                              typeof signOut === 'function' && signOut();
                            }}
                          >
                            Sair
                          </button>
                        </div>
                        <div>
                          <a target="_blank" href="https://mavielorh.com.br/termos-de-uso/">
                            <p className="px-4 mt-2 mb-2 text-xs hover:underline text-primary">
                              Termos e Condições de uso da Avancy
                            </p>
                          </a>

                          <a target="_blank" href="https://mavielorh.com.br/politica-privacidade/">
                            <p className="px-4 mb-2 text-xs hover:underline text-primary">
                              Política de privacidade da Avancy
                            </p>
                          </a>
                        </div>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition.Child>
              </div>
            </Transition.Root>
            <div className="hidden gap-20 lg:ml-4 lg:flex lg:items-center">
              <button
                type="button"
                className="flex-shrink-0 p-1 text-gray-400 transition-all duration-300 bg-white rounded-full hover:scale-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span className="sr-only">View notifications</span>
                <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6" aria-hidden="true" />
              </button>

              <button
                type="button"
                className="flex-shrink-0 p-1 text-gray-400 transition-all duration-300 bg-white rounded-full hover:scale-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="w-6 h-6" aria-hidden="true" />
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="relative z-50 flex-shrink-0 ml-4 font-helvetica">
                <div>
                  <Menu.Button className="flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <span className="sr-only">Open user menu</span>
                    {user?.f_photo?.url ? (
                      <img
                        src={user?.f_photo?.url}
                        alt="Avatar"
                        className="w-10 h-10 text-sm text-gray-500 rounded-full "
                      />
                    ) : (
                      <UserCircleIcon className="w-10 h-10 text-sm text-gray-500 " />
                    )}
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg w-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {NAVIGATION.USER.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) =>
                          item.type === 'popup' ? (
                            <button
                              key={item.name}
                              onClick={() => openProfessionalProfile(true)}
                              className={classNames(
                                isRouteActive(item.href, router.pathname) ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700 w-full text-left',
                              )}
                            >
                              {item.name}
                            </button>
                          ) : (
                            <a
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                isRouteActive(item.href, router.pathname) ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700',
                              )}
                            >
                              {item.name}
                            </a>
                          )
                        }
                      </Menu.Item>
                    ))}
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => signOut()}
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700 w-full text-left',
                          )}
                        >
                          Sair
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      <a target="_blank" href="https://mavielorh.com.br/termos-de-uso/">
                        <p className="px-4 mt-2 mb-2 text-xs hover:underline text-[#195579]">
                          Termos e Condições de uso da Mavielo RH
                        </p>
                      </a>
                    </Menu.Item>

                    <Menu.Item>
                      <a target="_blank" href="https://mavielorh.com.br/politica-privacidade/">
                        <p className="px-4 mb-2 text-xs hover:underline text-[#195579]">
                          Termos e Condições de uso da Mavielo RH
                        </p>
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </Popover>
        </div>
      </header>
    </>
  );
}
