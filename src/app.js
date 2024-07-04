const express = require('express')
const cluster = require('cluster');
const os = require('os')
const cors = require('cors');
const client = require('./config/redisConfig')
const logger = require('./config/logger');

const { sequelize } = require('./models')
const EmployeeRoute = require('./route/employeeRoute')

const noOfCpu = os.cpus().length;

if(cluster.isMaster) {
    for (let cpu=0; cpu < noOfCpu; cpu++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork()
    })
    
} else {
     main()
}


function main() {
    const app = express();
    app.use(cors())
    app.use("*", cors())
    app.use(express.json())

    //logger
    app.use((req, res, next) => {
        logger.info(`Worker ${process.pid} - ${req.method} ${req.url}`)
        return next()
    })

    sequelize
    .authenticate()
    .then(() => console.log("db connected."))
    .catch(err => logger.error('db connection error'))

    client.on('error', (err) => {
        console.error(err);
        client.quit();
    });

    client.connect().then(() => {
        console.log("Redis Connected")
    }).catch((error) => {
        console.error(error);
    });

    app.use("/api/v1", EmployeeRoute)

    app.get('/welcome', async (req, res) => {
        return res.json({
            message: "welcome to question pro."
        }) 
    })

    app.listen(5000, () => console.log("listening on port: ", 5000))

}


