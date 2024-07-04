const { createClient } = require("redis");
const { redispassword, redishost, redisport } = process.env; 

const redisUrl = `redis://${redishost}:${redisport}` || 'redis://localhost:6379';
const usePassword = redispassword ? true : false;

const client = createClient({
    url: redisUrl,
    ...(usePassword && {password: redispassword})
})


module.exports = client;
