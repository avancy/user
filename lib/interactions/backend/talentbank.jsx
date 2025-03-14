import { api } from '@/lib/api';
import Mocks from '@/lib/moks';

class TalentBank {
  static async getSubscribed({ onSuccess, onError, onFinally }) {
    try {
      const response = await api.get(`/talentbank/subscribed`);
      console.log(response.data);
      onSuccess && onSuccess(response.data);
    } catch (error) {
      onError && onError(error);
    } finally {
      onFinally && onFinally();
    }
  }
}

export default TalentBank;
