const TYPE = {
  PAGE: 'page',
  POPUP: 'popup',
  EXTERNAL: 'external',
};

export const NAVIGATION = {
  HOME: [
    { name: 'Home', href: '/', type: TYPE.PAGE },
    { name: 'Avaliações', href: '/evaluations', type: TYPE.PAGE },
    { name: 'Meus dados', href: '/meus-dados', type: TYPE.PAGE },
  ],
  USER: [
    { name: 'Currículo', type: TYPE.POPUP },
    { name: 'Vagas', href: 'https://mavielorh.com.br/vagas', type: TYPE.EXTERNAL },
    {name: 'Bancos de Talentos', href: '/talentbanks', type: TYPE.PAGE},
  ],
  TYPE,
};
