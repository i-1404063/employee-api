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


    async findById(id, attributes = null) {
        if (attributes === null) {
            return this.Model.findOne({ where: { id } })
                .then((result) => {
                    return result;
                })
                .catch((e) => {
                    logger.error(e);
                });
        }

        return this.Model.findOne({ where: { id }, attributes })
            .then((result) => {
                return result;
            })
            .catch((e) => {
                logger.error(e);
            });
    }

    async findOneByWhere(where, attributes = null, order = ["id", "desc"]) {
        if (attributes == null) {
            return this.Model.findOne({
                where,
                order: [order]
            })
                .then((result) => {
                    return result;
                })
                .catch((e) => {
                    logger.error(e);
                });
        }
        return this.Model.findOne({
            where,
            attributes,
            order: [order]
        })
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

    async findByWhere(
        where,
        attributes = undefined,
        order = ["id", "asc"],
        limit = null,
        offset = null
    ) {
        if (!attributes) {
            return this.Model.findAll({
                where,
                order: [order],
                limit,
                offset
            });
        }

        return this.Model.findAll({
            where,
            attributes,
            order: [order],
            limit,
            offset
        });
    }

    async deleteByWhere(where) {
        return this.Model.destroy({ where });
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

    async updateOrCreate(values, condition) {
        return this.Model.findOne({ where: condition }).then((obj) => {
            // update
            if (obj) {
                return obj.update(values);
            }
            // insert
            return this.Model.create(values);
        });
    }

    async getDataTableData(where, limit, offset, order = [["id", "DESC"]], attributes = undefined) {
        return this.Model.findAndCountAll({
            limit: parseInt(limit, 10),
            offset: parseInt(offset, 10),
            where,
            attributes,
            order
        })
            .then((result) => {
                return result;
            })
            .catch((e) => {
                logger.error(e);

                return [];
            });
    }
}
module.exports = SuperDao;
