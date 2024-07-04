const EmployeeDao = require("../dao/EmployeeDao");
const logger = require("../config/logger")
const RedisService = require("../service/RedisService")
// const { trace } = require('../config/otelConfig')

class EmplyeeService {
    
    constructor() {
        this.empDao = new EmployeeDao();
        this.redis = RedisService;
    }

    createEmployee = async (req, res) => {
        const { emp } = req.body;
        try {
            const user = await this.empDao.create({...emp});
            return res.status(201).json({message: "success", data: user})
        } catch (error) {
            logger.error(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    fetchEmployees = async (req, res) => {
        // const span = trace.getTracer('question-pro-api').startSpan('fetchEmployees');
        const { id:positionId } = req.params;

        try {
            if(positionId) {
                const isCached = await this.redis.checkValue(`position-${positionId}`)

                if(isCached) {
                    const cacheEmps = await this.redis.getValue(`position-${positionId}`)

                    return res.status(200).json({message: "cache hit", hierarchy: JSON.parse(cacheEmps)})
                }
                const query = { 
                    where: {
                        positionId: parseInt(positionId) + 1
                    },
                    raw: true,
                    attributes: ["id", "name", "positionId", "positionName", "parentId"]
                }
                const employees = await this.empDao.findAll(query);  

                async function fetchChild(empDao, parentId) {
                    const childs = await empDao.findAll({
                        where: {
                           parentId: parentId
                        },
                        raw: true,
                        attributes: ["id", "name", "positionId", "positionName", "parentId"]
                    });

                    for (let child of childs) {
                        const grandChilds = await fetchChild(empDao, child.id);
                        child.child = grandChilds?.length ? grandChilds?.map(({parentId, ...rest}) => rest) : null;
                    }

                    return childs;
                }

                const hierarchy = [];
                for (let employee of employees) {
                    const childs = await fetchChild(this.empDao, employee.id);
                    employee.child = childs?.length ? childs?.map(({parentId, ...rest}) => rest) : null;
                    delete employee['parentId'];
                    hierarchy.push(employee);
                }

               await this.redis.setValue(`position-${positionId}`, JSON.stringify(hierarchy))
                // span.end()
                return res.status(200).json({message: "success", hierarchy})
            }
            return res.status(400).json({message: "please! Provide valid id."})
        } catch (error) {
            logger.error(error.message)
            return res.status(400).json({error: error.message})
        }
    }
}

const empService  = new EmplyeeService();
module.exports = empService;