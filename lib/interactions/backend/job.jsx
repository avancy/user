import { Notify } from '@/components/common/notification';
import { api } from '@/lib/api';

class Application {
  /**
   * @function get
   * @description Busca todas as candidaturas
   * @param {Object} options
   * @param {Function} [options.onSucess] Fun o chamada quando a requisi o  bem sucedida
   * @param {Function} [options.onError] Fun o chamada quando a requisi o  mal sucedida
   * @param {Function} [options.onFinally] Fun o chamada quando a requisi o  finalizada
   */
  static async get({ onSucess, onError, onFinally }) {
    try {
      const { data } = await api.get(`/jobs/applications`);
      onSucess && onSucess(data);
    } catch (error) {
      console.error(error);
      Notify.error('Erro ao buscar candidaturas');
      onError && onError(error);
    } finally {
      onFinally && onFinally();
    }
  }
}

class Invite {
  /**
   * @function getStatus
   * @description Busca o status de um convite espec fico
   * @param {Object} options
   * @param {number} options.job_id - O ID do convite
   * @param {Function} [options.onSucess] Fun o chamada quando a requisi o  bem sucedida
   * @param {Function} [options.onError] Fun o chamada quando a requisi o  mal sucedida
   * @param {Function} [options.onFinally] Fun o chamada quando a requisi o  finalizada
   */
  static async getStatus({ job_id, onSucess, onError, onFinally }) {
    try {
      const {
        data: { status },
      } = api.get(`/jobs/invites/status/${job_id}`);
      onSucess && onSucess(status);
    } catch (error) {
      console.error(error);
      Notify.error('Erro ao verificar o status do convite.');
      onError && onError(error);
    } finally {
      onFinally && onFinally();
    }
  }

  /**
   * @function apply
   * @description Aplica-se a uma vaga
   * @param {Object} options
   * @param {number} options.job_id - O ID do convite
   * @param {Function} [options.onSucess] Fun o chamada quando a requisi o  bem sucedida
   * @param {Function} [options.onError] Fun o chamada quando a requisi o  mal sucedida
   * @param {Function} [options.onFinally] Fun o chamada quando a requisi o  finalizada
   */
  static async apply({ job_id, onSucess, onError, onFinally }) {
    try {
      api.post(`/jobs/invites/${job_id}/applied`);
      onSucess && onSucess();
    } catch (error) {
      console.error(error);
      Notify.error('Erro ao aplicar-se à vaga');
      onError && onError(error);
    } finally {
      onFinally && onFinally();
    }
  }

  /**
   * @function dany
   * @description Recusa um convite
   * @param {Object} options
   * @param {number} options.job_id - O ID do convite
   * @param {Function} [options.onSucess] Fun o chamada quando a requisi o  bem sucedida
   * @param {Function} [options.onError] Fun o chamada quando a requisi o  mal sucedida
   * @param {Function} [options.onFinally] Fun o chamada quando a requisi o  finalizada
   */
  static async deny({ job_id, onSucess, onError, onFinally }) {
    try {
      api.put(`/jobs/invites/${job_id}/denied`);
      onSucess && onSucess();
    } catch (error) {
      console.error(error);
      Notify.error('Erro ao recusar convite');
      onError && onError(error);
    } finally {
      onFinally && onFinally();
    }
  }
}

class Stage {
  static async getAll({ job_id, onSuccess, onError, onFinally }) {}
  static async get({ id, onSuccess, onError, onFinally }) {}
}

export class JobManager {
  /**
   * @function get
   * @description Busca as informa es de uma vaga espec fica
   * @param {Object} options
   * @param {string} options.job_slug - O slug da vaga
   * @param {Function} [options.onSucess] Fun o chamada quando a requisi o  bem sucedida
   * @param {Function} [options.onError] Fun o chamada quando a requisi o  mal sucedida
   * @param {Function} [options.onFinally] Fun o chamada quando a requisi o  finalizada
   */
  static async get({ id, job_slug, onSucess, onError, onFinally }) {
    try {
      const endpoint = id ? `/jobs/by_id/${id}` : `/jobs/${job_slug}`;
      const { data } = await api.get(endpoint);
      onSucess && onSucess(data);
    } catch (error) {
      console.error(error);
      Notify.error('Erro ao buscar informações da vaga');
      onError && onError(error);
    } finally {
      onFinally && onFinally();
    }
  }

  /**
   * @function apply
   * @description Aplica-se a uma vaga específica
   * @param {Object} options
   * @param {number} options.job_id - O ID da vaga
   * @param {Function} [options.onSucess] Função chamada quando a requisição é bem-sucedida
   * @param {Function} [options.onError] Função chamada quando a requisição é mal-sucedida
   * @param {Function} [options.onFinally] Função chamada quando a requisição é finalizada
   */
  static async apply({ job_id, onSucess, onError, onFinally }) {
    try {
      await api.post(`/jobs/apply/${job_id}`);
      onSucess && onSucess();
    } catch (error) {
      console.error(error);
      Notify.error('Erro ao aplicar-se à vaga');
      onError && onError(error);
    } finally {
      onFinally && onFinally();
    }
  }

  /**
   * @function danyInvite
   * @description Recusa um convite para uma vaga específica
   * @param {Object} options
   * @param {number} options.job_id - O ID do convite a ser recusado
   * @param {Function} [options.onSucess] Função chamada quando a requisição é bem-sucedida
   * @param {Function} [options.onError] Função chamada quando a requisição é mal-sucedida
   * @param {Function} [options.onFinally] Função chamada quando a requisição é finalizada
   */
  static async danyInvite({ job_id, onSucess, onError, onFinally }) {
    try {
      await api.put(`/jobs/invites/${job_id}/denied`);
      onSucess && onSucess();
    } catch (error) {
      console.error(error);
      Notify.error('Erro ao recusar convite');
      onError && onError(error);
    } finally {
      onFinally && onFinally();
    }
  }

  static application = Application;
  static invite = Invite;
  static stage = Stage;
}

export default JobManager;
