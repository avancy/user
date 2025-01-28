import EvaluationDetails from './components/evaluations/details';
import EvaluationForms from './components/evaluations/forms';
import EvaluationFinished from './components/evaluations/finished';
import DiscDetails from './components/disc/details';
import DiscForms from './components/disc/forms';
import DiscFinished from './components/disc/finished';
import Details from './view/details';
import Forms from './view/forms';
import Finished from './view/finished';

export const INTERNSHIPS_TYPES = {
  DETAILS: 'details',
  FORMS: 'forms',
  FINISHED: 'finished',
};

export const EVALUATIONS_TYPES = {
  DISC: 'disc',
  JOB: 'test',
};

export const INTERNSHIPS_TYPES_LIST = [INTERNSHIPS_TYPES.DETAILS, INTERNSHIPS_TYPES.FORMS, INTERNSHIPS_TYPES.FINISHED];

export const INTERNSHIPS = {
  [INTERNSHIPS_TYPES.DETAILS]: Details,
  [INTERNSHIPS_TYPES.FORMS]: Forms,
  [INTERNSHIPS_TYPES.FINISHED]: Finished,
};

export const TESTS = {
  [EVALUATIONS_TYPES.DISC]: {
    [INTERNSHIPS_TYPES.DETAILS]: DiscDetails,
    [INTERNSHIPS_TYPES.FORMS]: DiscForms,
    [INTERNSHIPS_TYPES.FINISHED]: DiscFinished,
  },
  [EVALUATIONS_TYPES.JOB]: {
    [INTERNSHIPS_TYPES.DETAILS]: EvaluationDetails,
    [INTERNSHIPS_TYPES.FORMS]: EvaluationForms,
    [INTERNSHIPS_TYPES.FINISHED]: EvaluationFinished,
  },
};

// DISC
export const DISC_MIN_WORDS = 20;
export const DISC_MAX_WORDS = 39;
export const DISC_FORMS_FILTERS = [
  (words) => words?.slice(0, 20),
  (words) => words?.slice(20, 40),
  (words) => words?.slice(40, 60),
];

export const DISC_WORDS = [
  // Dominance

  { id: 1, name: 'Direto', description: 'Gosta de ir direto ao ponto.', behaviorType: 'D' },
  { id: 2, name: 'Decisivo', description: 'Toma decisões rapidamente.', behaviorType: 'D' },
  {
    id: 3,
    name: 'Assertivo',
    description: 'Expressa suas opiniões com confiança.',
    behaviorType: 'D',
  },
  { id: 4, name: 'Competitivo', description: 'Tem forte desejo de vencer.', behaviorType: 'D' },
  { id: 5, name: 'Determinado', description: 'Focado em alcançar objetivos.', behaviorType: 'D' },
  {
    id: 6,
    name: 'Autoconfiante',
    description: 'Confia em suas próprias habilidades.',
    behaviorType: 'D',
  },
  {
    id: 7,
    name: 'Proativo',
    description: 'Inicia ações sem esperar por outros.',
    behaviorType: 'D',
  },
  {
    id: 8,
    name: 'Independente',
    description: 'Prefere atuar de forma autônoma.',
    behaviorType: 'D',
  },
  { id: 9, name: 'Líder', description: 'Toma a frente naturalmente.', behaviorType: 'D' },
  { id: 10, name: 'Focado', description: 'Mantém a atenção nos objetivos.', behaviorType: 'D' },
  {
    id: 11,
    name: 'Orientado a resultados',
    description: 'Busca alcançar metas rapidamente.',
    behaviorType: 'D',
  },
  { id: 12, name: 'Corajoso', description: 'Disposto a enfrentar riscos.', behaviorType: 'D' },
  {
    id: 13,
    name: 'Energia',
    description: 'Alta intensidade para concluir tarefas.',
    behaviorType: 'D',
  },
  { id: 14, name: 'Controlador', description: 'Gosta de estar no comando.', behaviorType: 'D' },
  { id: 15, name: 'Iniciativa', description: 'Age antes de ser solicitado.', behaviorType: 'D' },
  { id: 16, name: 'Objetivo', description: 'Mantém clareza sobre suas metas.', behaviorType: 'D' },
  {
    id: 17,
    name: 'Determinação',
    description: 'Persistente para concluir o que começou.',
    behaviorType: 'D',
  },
  {
    id: 18,
    name: 'Resiliente',
    description: 'Supera desafios com determinação.',
    behaviorType: 'D',
  },
  { id: 19, name: 'Autoritário', description: 'Confortável em tomar decisões.', behaviorType: 'D' },
  {
    id: 20,
    name: 'Desafiador',
    description: 'Confronta normas e limites estabelecidos.',
    behaviorType: 'D',
  },

  // Influence

  {
    id: 21,
    name: 'Comunicativo',
    description: 'Gosta de conversar e expressar ideias.',
    behaviorType: 'I',
  },
  {
    id: 22,
    name: 'Entusiasta',
    description: 'Traz energia e animação ao ambiente.',
    behaviorType: 'I',
  },
  {
    id: 23,
    name: 'Persuasivo',
    description: 'Consegue influenciar as pessoas.',
    behaviorType: 'I',
  },
  {
    id: 24,
    name: 'Carismático',
    description: 'Atrai facilmente a atenção dos outros.',
    behaviorType: 'I',
  },
  { id: 25, name: 'Alegre', description: 'Mantém o ambiente leve e positivo.', behaviorType: 'I' },
  {
    id: 26,
    name: 'Extrovertido',
    description: 'Socializa bem e gosta de interagir.',
    behaviorType: 'I',
  },
  {
    id: 27,
    name: 'Amigável',
    description: 'Estabelece conexões com facilidade.',
    behaviorType: 'I',
  },
  {
    id: 28,
    name: 'Encantador',
    description: 'Usa charme para ganhar a confiança.',
    behaviorType: 'I',
  },
  { id: 29, name: 'Otimista', description: 'Vê o lado positivo das coisas.', behaviorType: 'I' },
  {
    id: 30,
    name: 'Espontâneo',
    description: 'Age de forma natural e sem roteiros.',
    behaviorType: 'I',
  },
  {
    id: 31,
    name: 'Motivador',
    description: 'Inspira e anima quem está à sua volta.',
    behaviorType: 'I',
  },
  {
    id: 32,
    name: 'Divertido',
    description: 'Gosta de trazer alegria ao ambiente.',
    behaviorType: 'I',
  },
  {
    id: 33,
    name: 'Vibrante',
    description: 'Tem uma presença forte e contagiante.',
    behaviorType: 'I',
  },
  {
    id: 34,
    name: 'Expressivo',
    description: 'Mostra sentimentos e emoções facilmente.',
    behaviorType: 'I',
  },
  {
    id: 35,
    name: 'Acessível',
    description: 'Gosta de ser abordado e estar disponível.',
    behaviorType: 'I',
  },
  {
    id: 36,
    name: 'Adaptável',
    description: 'Consegue se ajustar a diferentes situações.',
    behaviorType: 'I',
  },
  {
    id: 37,
    name: 'Apoia ideias',
    description: 'Estimula e apoia novas ideias.',
    behaviorType: 'I',
  },
  { id: 38, name: 'Confiante', description: 'Confiável e seguro de si mesmo.', behaviorType: 'I' },
  {
    id: 39,
    name: 'Popular',
    description: 'Facilmente conhecido e apreciado pelos outros.',
    behaviorType: 'I',
  },
  {
    id: 40,
    name: 'Espírito de equipe',
    description: 'Colabora bem e gosta de trabalhar em grupo.',
    behaviorType: 'I',
  },

  { id: 41, name: 'Calmo', description: 'Mantém a serenidade sob pressão.', behaviorType: 'S' },

  // Steadiness

  {
    id: 42,
    name: 'Paciente',
    description: 'Espera e entende os tempos dos outros.',
    behaviorType: 'S',
  },
  {
    id: 43,
    name: 'Confiável',
    description: 'Consistente e digno de confiança.',
    behaviorType: 'S',
  },
  { id: 44, name: 'Leal', description: 'Fiel a pessoas e compromissos.', behaviorType: 'S' },
  { id: 45, name: 'Cuidadoso', description: 'Evita riscos desnecessários.', behaviorType: 'S' },
  {
    id: 46,
    name: 'Compreensivo',
    description: 'Empático e solidário com os outros.',
    behaviorType: 'S',
  },
  { id: 47, name: 'Previsível', description: 'Mantém uma rotina estável.', behaviorType: 'S' },
  {
    id: 48,
    name: 'Solidário',
    description: 'Gosta de apoiar e ajudar os outros.',
    behaviorType: 'S',
  },
  { id: 49, name: 'Modesto', description: 'Discreto sobre suas conquistas.', behaviorType: 'S' },
  {
    id: 50,
    name: 'Dedicado',
    description: 'Comprometido com tarefas e pessoas.',
    behaviorType: 'S',
  },
  {
    id: 51,
    name: 'Atenção aos outros',
    description: 'Valoriza e se importa com as necessidades alheias.',
    behaviorType: 'S',
  },
  { id: 52, name: 'Estável', description: 'Mantém uma presença constante.', behaviorType: 'S' },
  {
    id: 53,
    name: 'Reservado',
    description: 'Prefere agir de forma tranquila e discreta.',
    behaviorType: 'S',
  },
  { id: 54, name: 'Disciplinado', description: 'Segue processos e rotinas.', behaviorType: 'S' },
  {
    id: 55,
    name: 'Metódico',
    description: 'Trabalha de forma organizada e sistemática.',
    behaviorType: 'S',
  },
  {
    id: 56,
    name: 'Conservador',
    description: 'Prefere evitar mudanças abruptas.',
    behaviorType: 'S',
  },
  { id: 57, name: 'Harmonioso', description: 'Valoriza um ambiente pacífico.', behaviorType: 'S' },
  {
    id: 58,
    name: 'Tolerante',
    description: 'Acolhe diferentes opiniões e pontos de vista.',
    behaviorType: 'S',
  },
  {
    id: 59,
    name: 'Prático',
    description: 'Focado em soluções simples e eficazes.',
    behaviorType: 'S',
  },

  // Compliance

  {
    id: 60,
    name: 'Analítico',
    description: 'Gosta de examinar detalhes e dados.',
    behaviorType: 'C',
  },
  { id: 61, name: 'Preciso', description: 'Focado em precisão e exatidão.', behaviorType: 'C' },
  { id: 62, name: 'Detalhista', description: 'Atenção minuciosa aos detalhes.', behaviorType: 'C' },
  { id: 63, name: 'Organizado', description: 'Mantém tudo em ordem.', behaviorType: 'C' },
  {
    id: 64,
    name: 'Cauteloso',
    description: 'Age com prudência e evita riscos.',
    behaviorType: 'C',
  },
  { id: 65, name: 'Lógico', description: 'Baseia decisões em lógica e fatos.', behaviorType: 'C' },
  { id: 66, name: 'Objetivo', description: 'Mantém a objetividade e clareza.', behaviorType: 'C' },
  { id: 67, name: 'Crítico', description: 'Avalia e questiona cuidadosamente.', behaviorType: 'C' },
  {
    id: 68,
    name: 'Estratégico',
    description: 'Pensa a longo prazo e planeja ações.',
    behaviorType: 'C',
  },
  {
    id: 69,
    name: 'Formal',
    description: 'Prefere manter-se dentro das regras.',
    behaviorType: 'C',
  },
  { id: 70, name: 'Reservado', description: 'Mantém discrição e privacidade.', behaviorType: 'C' },
  { id: 71, name: 'Perfeccionista', description: 'Busca sempre a excelência.', behaviorType: 'C' },
  {
    id: 72,
    name: 'Precavido',
    description: 'Gosta de estar preparado para todas as situações.',
    behaviorType: 'C',
  },
  {
    id: 73,
    name: 'Concentrado',
    description: 'Capacidade de manter o foco nos detalhes.',
    behaviorType: 'C',
  },
  { id: 74, name: 'Autocontrole', description: 'Mantém emoções sob controle.', behaviorType: 'C' },
  {
    id: 75,
    name: 'Meticuloso',
    description: 'Verifica e reavalia seu trabalho.',
    behaviorType: 'C',
  },
  {
    id: 76,
    name: 'Respeita regras',
    description: 'Segue normas e diretrizes à risca.',
    behaviorType: 'C',
  },
  {
    id: 77,
    name: 'Objetividade',
    description: 'Mantém um foco claro e imparcial.',
    behaviorType: 'C',
  },
  {
    id: 78,
    name: 'Previsão',
    description: 'Planeja para evitar problemas futuros.',
    behaviorType: 'C',
  },
  {
    id: 79,
    name: 'Consistente',
    description: 'Mantém a qualidade de trabalho sem oscilações.',
    behaviorType: 'C',
  },
];
