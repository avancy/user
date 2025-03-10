import Mocks from '@/lib/moks';

class TalentBank {
  static async getAll({ applicant_id, onSuccess, onError, onFinally }) {
    console.log('TalentBank.getAll');
    onSuccess && onSuccess(Mocks.generateTalentDatabaseRelationshipArray(5));
  }
}

export default TalentBank;
