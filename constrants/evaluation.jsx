export const EVALUATION_STAGE_IMAGES = {
  1: '/images/evaluations/1.webp',
  2: '/images/evaluations/2.webp',
};

export const EVALUATION_MOCKS = {
  disc: {
    title: 'Teste Disc',
    description: 'Avaliação que revela seu perfil comportamental para um melhor autoconhecimento.',
    status: 'pending',
  },
  math: {
    title: 'EM BREVE',
    description: 'Novos testes de capacidade e comportamentos serão disponiveis em breve',
    status: 'in_production',
  },
};

// Mapeamento de status
export const EVALUATION_STATUS = {
  pending: 'Pendente',
  in_progress: 'Em Progresso',
  completed: 'Concluído',
  canceled: 'Cancelado',
  failed: 'Falhou',
  blocked: 'Bloqueado',
};

// Cores para os status
export const EVALUATION_STATUS_COLORS = {
  pending: 'bg-yellow-500',
  in_progress: 'bg-blue-700',
  completed: 'bg-green-500',
  canceled: 'bg-gray-500',
  failed: 'bg-red-500',
  blocked: 'bg-orange-500',
  in_production: 'bg-blue-700',
};
