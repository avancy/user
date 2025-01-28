const TYPE = {
  PAGE: 'page',
  POPUP: 'popup',
};

export const NAVIGATION = {
  HOME: [
    { name: 'Home', href: '/', type: TYPE.PAGE },
    { name: 'Avaliações', href: '/evaluations', type: TYPE.PAGE },
  ],
  USER: [
    { name: 'Currículo', type: TYPE.POPUP },
    { name: 'Meus dados', href: '/meus-dados', type: TYPE.PAGE },
  ],
  TYPE,
};
