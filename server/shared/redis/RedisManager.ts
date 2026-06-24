import { Redis } from "ioredis";

class RedisManager {
    public connection: Redis;

    constructor() {
        this.connection = new Redis(process.env.REDIS_URL!,
            {
                maxRetriesPerRequest: null,
            }
        );
    }
}

export const redismanager = new RedisManager();