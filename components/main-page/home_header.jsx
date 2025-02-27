import { Bars3Icon, ChevronDownIcon, UserCircleIcon } from '@heroicons/react/20/solid';
import { BellAlertIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Fragment, useEffect, useState } from 'react';
import { AuthNavigation } from '../auth/navigation';
import { CompanyLogo } from '../companyLogo';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import Link from 'next/link';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function HomeHeader({ company_id, photoPath, website, style, type, company_page_url }) {
  const { signOut } = useAuthenticator((context) => [context.user]);
  const [user, setUser] = useState(null);
  const { route } = useAuthenticator((context) => [context.route]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const [openAuthNavigation, setOpenAuthNavigation] = useState(false);

  const navigateTo = type === 'partner' ? '/' : `${company_page_url}/`;

  const navigation = [
    { name: 'Nossa Empresa', href: website ? website : 'https://www.agrovagas.com/', blank: true },
    { name: 'Vagas', href: type === 'partner' ? '/#jobs' : `${company_page_url}/#jobs` },
  ];

  const handleButtonClick = () => {
    setOpenAuthNavigation(true);
  };

  const handleAuthNavigationClose = () => {
    setOpenAuthNavigation(false);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleLinkClick = (href, blank) => {
    if (blank) {
      router.push(href, undefined, { target: '_blank' });
    } else {
      router.push(href);
    }
    closeMobileMenu();
  };

  const handleSignOut = () => {
    sessionStorage.clear();
    signOut();
  };

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(async (user) => {
        if (user && user?.challengeName === undefined) {
          const userInfo = await Auth.currentUserInfo();
          setUser(userInfo);
          return;
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <header className="bg-white">
      <nav
        className="flex items-center justify-between w-full p-6 mx-auto lg:px-8"
        aria-label="Global"
      >
        <div className="flex flex-1">
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex items-center ">
          <Link href={navigateTo} className="flex items-center" aria-label="Home">
            <CompanyLogo className="w-10 h-10" />
          </Link>
        </div>

        {route != 'authenticated' && (
          <>
            <div className="flex justify-end flex-1">
              <button
                type="button"
                onClick={handleButtonClick}
                className="rounded-full bg-primary px-3 py-1 md:px-[3.25rem] md:py-[0.875rem] text-sm font-medium text-white focus:outline-none active:scale-95 hover:scale-105 hover:bg-secundary transition-all duration-300"
              >
                Entrar
              </button>
            </div>
            {openAuthNavigation && (
              <AuthNavigation
                type={type}
                style={style}
                company_id={company_id}
                company_page_url={company_page_url}
                onClose={handleAuthNavigationClose}
              />
            )}
          </>
        )}
        {route === 'authenticated' && (
          <>
            <div className="flex items-center justify-end flex-1 ml-4 md:ml-6">
              <button
                type="button"
                className="p-1 text-gray-400 transition-all duration-300 bg-white rounded-full hover:scale-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
              >
                <span className="sr-only">View notifications</span>
                <BellAlertIcon className="w-6 h-6" aria-hidden="true" />
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="relative z-50 ml-3">
                <div>
                  <Menu.Button className="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                    {/* <img
              className="w-8 h-8 rounded-full"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />  */}
                    {photoPath ? (
                      <img
                        src={photoPath}
                        alt="Avatar"
                        className="w-8 h-8 text-sm text-gray-500 rounded-full"
                      />
                    ) : (
                      <UserCircleIcon className="w-8 h-8 text-gray-400" />
                    )}
                    <span className="hidden ml-3 text-sm font-medium text-black lg:block">
                      <span className="sr-only">Open user menu for </span>
                      {user?.attributes['custom:first_name']} {user?.attributes['custom:last_name']}
                    </span>
                    <ChevronDownIcon
                      className="flex-shrink-0 hidden w-5 h-5 ml-1 text-gray-400 lg:block"
                      aria-hidden="true"
                    />
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
                  <Menu.Items className="absolute right-0 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg w-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/"
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-black',
                          )}
                        >
                          Área do candidato
                        </Link>
                      )}
                    </Menu.Item>
                    {/* <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                >
                  Configurações
                </a>
              )}
            </Menu.Item>  */}

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => handleSignOut()}
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-black w-full text-left',
                          )}
                        >
                          Sair
                        </button>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      <a target="_blank" href="https://mavielorh.com.br/politica-privacidade/">
                        <p className="px-4 mt-2 mb-2 text-xs hover:underline text-primary">
                          Política de privacidade da Mavielo RH
                        </p>
                      </a>
                    </Menu.Item>

                    <Menu.Item>
                      <a target="_blank" href="https://mavielorh.com.br/termos-de-uso/">
                        <p className="px-4 mb-2 text-xs hover:underline text-primary">
                          Termos e Condições de uso da Mavielo RH
                        </p>
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </>
        )}
      </nav>

      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={closeMobileMenu}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 left-0 z-30 w-full px-6 py-6 overflow-y-auto bg-white">
          <div className="flex items-center justify-between">
            <div className="flex flex-1">
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
            <div className="flex items-center ">
              <Link href={navigateTo} className="flex items-center" aria-label="Home">
                <CompanyLogo className="w-auto h-10" />
              </Link>
            </div>

            {route != 'authenticated' && (
              <>
                <div className="flex justify-end flex-1">
                  {openAuthNavigation && (
                    <AuthNavigation
                      company_id={company_id}
                      type={type}
                      company_page_url={company_page_url}
                      onClose={handleAuthNavigationClose}
                    />
                  )}
                </div>

                {/* <div className="block -mr-1 md:hidden lg:hidden">
      <MobileNavigation />
</div> */}
              </>
            )}
            {route === 'authenticated' && (
              <>
                <div className="flex items-center justify-end flex-1 ml-4 md:ml-6">
                  <button
                    type="button"
                    className="p-1 text-gray-400 transition-all duration-300 bg-white rounded-full hover:scale-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellAlertIcon className="w-6 h-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                        <UserCircleIcon className="w-8 h-8 text-gray-400" />
                        <span className="hidden ml-3 text-sm font-medium text-gray-700 lg:block">
                          <span className="sr-only">Open user menu for </span>
                          {user?.attributes['custom:first_name']}{' '}
                          {user?.attributes['custom:last_name']}
                        </span>
                        <ChevronDownIcon
                          className="flex-shrink-0 hidden w-5 h-5 ml-1 text-gray-400 lg:block"
                          aria-hidden="true"
                        />
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
                      <Menu.Items className="absolute right-0 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg w-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700',
                              )}
                            >
                              Área do candidato
                            </Link>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => handleSignOut()}
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
                          <a target="_blank" href="https://mavielorh.com.br/politica-privacidade/">
                            <p className="px-4 mt-2 mb-2 text-xs hover:underline text-primary">
                              Política de privacidade da Mavielo RH
                            </p>
                          </a>
                        </Menu.Item>

                        <Menu.Item>
                          <a target="_blank" href="https://mavielorh.com.br/termos-de-uso/">
                            <p className="px-4 mb-2 text-xs hover:underline text-primary">
                              Termos e Condições de uso da Mavielo RH
                            </p>
                          </a>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </>
            )}
          </div>
          <div className="mt-6 space-y-2">
            {navigation.map(({ name, href, blank }) => (
              <a
                key={name}
                onClick={() => handleLinkClick(href, blank)}
                className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-black rounded-lg hover:bg-gray-50"
              >
                {name}
              </a>
            ))}
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
