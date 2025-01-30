import { Notify } from '@/components/common/notification';
import { api } from '@/lib/api';

class Applicant {
  static async getAll({ onSuccess, onError, onFinally }) {
    try {
      const { data } = await api.get('/applicant_evaluations/by_applicant');
      onSuccess && onSuccess(data);
    } catch (error) {
      console.error(error);
      Notify.error('Erro ao buscar candidaturas por avalia o');
      onError && onError(error);
    } finally {
      onFinally && onFinally();
    }
  }
  static async getByEvaluationId({ evaluation_id, onSuccess, onError, onFinally }) {
    try {
      const { data } = await api.get(`/applicant_evaluations/by_evaluation_id/${evaluation_id}`);
      onSuccess && onSuccess(data);
    } catch (error) {
      console.error(error);
      Notify.error('Erro ao buscar candidaturas por avalia o');
      onError && onError(error);
    } finally {
      onFinally && onFinally();
    }
  }

  static async getById({ id, onSuccess, onError, onFinally }) {
    try {
      const { data } = await api.get(`/applicant_evaluations/by_id/${id}`);
      onSuccess && onSuccess(data);
    } catch (error) {
      console.error(error);
      Notify.error('Erro ao buscar candidatura por ID');
      onError && onError(error);
    } finally {
      onFinally && onFinally();
    }
  }

  static async getCompleted({ onSuccess, onError, onFinally }) {
    try {
      const { data } = await api.get('/applicant_evaluations/finished');
      onSuccess && onSuccess(data);
    } catch (error) {
      console.error(error);
      Notify.error('Erro ao buscar candidaturas finalizadas');
      onError && onError(error);
    } finally {
      onFinally && onFinally();
    }
  }

  static async start({ id, date, onSuccess, onError, onFinally }) {
    try {
      const { data } = await api.patch(`/applicant_evaluation/start/${id}`, { date });
      onSuccess && onSuccess(data);
    } catch (error) {
      console.error(error);
      Notify.error('Erro ao iniciar avalia o');
      onError && onError(error);
    } finally {
      onFinally && onFinally();
    }
  }

  static async finish({ id, date, onSuccess, onError, onFinally }) {
    try {
      const { data } = await api.patch(`/applicant_evaluation/finish/${id}`, { date });
      onSuccess && onSuccess(data);
    } catch (error) {
      console.error(error);
      Notify.error('Erro ao finalizar avalia o');
      onError && onError(error);
    } finally {
      onFinally && onFinally();
    }
  }

  static async updateAnswer({ id, answer, onSuccess, onError, onFinally }) {
    try {
      const { data } = await api.patch(`/applicant_evaluation/update/answer/${id}`, { answer });
      onSuccess && onSuccess(data);
    } catch (error) {
      console.error(error);
      Notify.error('Erro ao atualizar resposta');
      onError && onError(error);
    } finally {
      onFinally && onFinally();
    }
  }
}

export class EvaluationManager {
  static async getByJobId({ job_id, onSuccess, onError, onFinally }) {
    try {
      const { data } = await api.get(`/evaluations/by_job/${job_id}`);
      onSuccess && onSuccess(data);
    } catch (error) {
      console.error(error);
      Notify.error('Erro ao buscar avalia es por ID da vaga');
      onError && onError(error);
    } finally {
      onFinally && onFinally();
    }
  }

  static async getByStageId({ stage_id, onSuccess, onError, onFinally }) {
    try {
      const { data } = await api.get(`/evaluations/by_stage/${stage_id}`);
      onSuccess && onSuccess(data);
    } catch (error) {
      console.error(error);
      Notify.error('Erro ao buscar avalia es por ID da etapa');
      onError && onError(error);
    } finally {
      onFinally && onFinally();
    }
  }

  static async getById({ id, onSuccess, onError, onFinally }) {
    try {
      const { data } = await api.get(`/evaluations/by_id/${id}`);
      onSuccess && onSuccess(data);
    } catch (error) {
      console.error(error);
      Notify.error('Erro ao buscar avalia o por ID');
      onError && onError(error);
    } finally {
      onFinally && onFinally();
    }
  }

  static async getAll({ onSuccess, onError, onFinally }) {
    try {
      const { data } = await api.get('/evaluations/by_applicant');
      onSuccess && onSuccess(data);
    } catch (error) {
      console.error(error);
      Notify.error('Erro ao buscar avalia es');
      onError && onError(error);
    } finally {
      onFinally && onFinally();
    }
  }

  static applicant = Applicant;
}

export default EvaluationManager;
