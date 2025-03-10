import { faker } from '@faker-js/faker';

/**
 * Classe que centraliza todos os mocks disponíveis.
 */
class Class {
  /**
   * Gera um array de TalentDatabaseRelationship mockado.
   * @param {number} quantity Quantidade de itens a serem gerados.
   * @returns {Array<Object>} Array de objetos mockados.
   */
  static generateTalentDatabaseRelationshipArray(quantity = 1) {
    return Array.from({ length: quantity }, () => ({
      id: faker.string.uuid(),
      company_id: faker.string.uuid(),
      company: {
        id: faker.string.uuid(),
        name: faker.company.name(),
        company_customization: {
          id: faker.string.uuid(),
          talent_bank_status: faker.datatype.boolean(),
        },
      },
      departaments: [
        { id: faker.string.uuid(), Name: faker.commerce.department() },
        { id: faker.string.uuid(), Name: faker.commerce.department() },
      ],
      job_applications: [{ id: faker.string.uuid() }, { id: faker.string.uuid() }],
    }));
  }
}

const mockProxy = (target) => {
  if (process.env.NODE_ENV !== 'development') {
    return new Proxy(target, {
      get() {
        throw new Error('Mocks só podem ser usados em desenvolvimento!');
      },
    });
  }
  return target;
};

const Mocks = mockProxy(Class);

export default Mocks;
