const logger = require('../config/logger')

class SuperDao {
    constructor(model) {
        this.Model = model;
    }

    async findAll(query) {
        return this.Model.findAll(query)
            .then((result) => {
                return result;
            })
            .catch((e) => {
                logger.error(e);
            });
    }

    async create(data) {
        try {
            const newData = new this.Model(data);
            return newData
                .save()
                .then((result) => {
                    return result;
                })
                .catch((e) => {
                    logger.error(e);
                    return false;
                });
        } catch (e) {
            logger.error(e);
            return false;
        }
    }

   
    async bulkCreate(data) {
        return this.Model.bulkCreate(data)
            .then((result) => {
                return result;
            })
            .catch((e) => {
                logger.error(e);
            });
    }

}
module.exports = SuperDao;
