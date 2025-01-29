const { logger } = require('../config');

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data, options = {}) {
    try {
      const response = await this.model.create(data, options);
      return response;
    } catch (error) {
      logger.error('❌ Error in CrudRepository: create', error);
      throw error;
    }
  }

  async destroy(query, options = {}) {
    try {
      const response = await this.model.destroy({ ...query, ...options });
      return response;
    } catch (error) {
      logger.error('❌ Error in CrudRepository: destroy', error);
      throw error;
    }
  }

  async get(query, options = {}) {
    try {
      const response = await this.model.findOne({ ...query, ...options });
      return response;
    } catch (error) {
      logger.error('❌ Error in CrudRepository: get', error);
      throw error;
    }
  }

  async getAll(query = {}, options = {}) {
    try {
      const response = await this.model.findAll({ ...query, ...options });
      return response;
    } catch (error) {
      logger.error('❌ Error in CrudRepository: getAll', error);
      throw error;
    }
  }

  async update(query, data, options = {}) {
    try {
      const response = await this.model.update(data, { ...query, ...options });
      return response;
    } catch (error) {
      logger.error('❌ Error in CrudRepository: update', error);
      throw error;
    }
  }
}

module.exports = CrudRepository;
