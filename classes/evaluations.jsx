import { Notify } from '@/components/common/notification';
import { api } from '@/lib/api';

class Applicant {
  static async get({ evaluation_id, id, onSuccess, onError, onFinally }) {
    try {
      const endpoint = evaluation_id
        ? `/applicant_evaluations/by_evaluation_id/${evaluation_id}`
        : `/applicant_evaluations/by_id/${id}`;
      const { data } = await api.get(endpoint);
      onSuccess && onSuccess(data);
    } catch (error) {
      console.error(error);
      Notify.error('Erro ao buscar avaliação do candidato');
      onError && onError(error);
    } finally {
      onFinally && onFinally();
    }
  }

  static async getStartTime({ id, onSuccess, onError, onFinally }) {
    try {
      const { data } = await api.get(`/applicant_evaluations/start_at/${id}`);
      onSuccess && onSuccess(data);
    } catch (error) {
      console.error(error);
      Notify.error('Erro ao buscar horário de início');
      onError && onError(error);
    } finally {
      onFinally && onFinally();
    }
  }

  static async getCompletes({ onSuccess, onError, onFinally }) {
    try {
      const { data } = await api.get(`/applicant_evaluations/completes`);
      onSuccess && onSuccess(data);
    } catch (error) {
      console.error(error);
      Notify.error('Erro ao buscar avaliações completas');
      onError && onError(error);
    } finally {
      onFinally && onFinally();
    }
  }

  static async start({ id, date, onSuccess, onError, onFinally }) {
    try {
      await api.post(`/applicant_evaluation/start/${id}`, { date });
      onSuccess && onSuccess();
    } catch (error) {
      console.error(error);
      Notify.error('Erro ao iniciar avaliação');
      onError && onError(error);
    } finally {
      onFinally && onFinally();
    }
  }

  static async finish({ id, date, onSuccess, onError, onFinally }) {
    try {
      await api.post(`/applicant_evaluation/finish/${id}`, { date });
      onSuccess && onSuccess();
    } catch (error) {
      console.error(error);
      Notify.error('Erro ao finalizar avaliação');
      onError && onError(error);
    } finally {
      onFinally && onFinally();
    }
  }

  static async updateAnswer({ id, answer, onSuccess, onError, onFinally }) {
    try {
      await api.put(`/applicant_evaluation/update/answer/${id}`, { answer });
      onSuccess && onSuccess();
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
  static async getAll({ job_id, stage_id, onSuccess, onError, onFinally }) {
    try {
      const endpoint = stage_id
        ? `/evaluations/by_stage/${stage_id}`
        : `/evaluations/by_job/${job_id}`;
      const { data } = await api.get(endpoint);
      onSuccess && onSuccess(data);
    } catch (error) {
      console.error(error);
      Notify.error('Erro ao buscar avaliações');
      onError && onError(error);
    } finally {
      onFinally && onFinally();
    }
  }

  static async get({ id, onSuccess, onError, onFinally }) {
    try {
      const { data } = await api.get(`/evaluations/by_id/${id}`);
      onSuccess && onSuccess(data);
    } catch (error) {
      console.error(error);
      Notify.error('Erro ao buscar avaliação');
      onError && onError(error);
    } finally {
      onFinally && onFinally();
    }
  }

  static applicant = Applicant;
}

export default EvaluationManager;
