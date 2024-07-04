const client = require('../config/redisConfig');

class RedisService {
    constructor() {
       this.redisClient = client;
    }

    async setValue(key, value) {  
        await this.redisClient.set(key, value);
        await this.redisClient.expire(key, 120)  
    }

    async getValue(key) {
        return this.redisClient.get(key);
    }

    async checkValue(key) {
        return this.redisClient.exists(key)
    }

}


module.exports = new RedisService();