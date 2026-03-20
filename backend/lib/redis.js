import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

export const redis = new Redis(process.env.REDIS_URL,{
    tls:{
        rejectUnauthorized:false
    }
});

// export const redis = new Redis(process.env.REDIS_URL,{
//     maxRetriesPerRequest :null,
//     retryStrategy :(times)=>Math.min(times *50 ,2000)

// });
// console.log(redis, "redis")
// await redis.set('muthu', 'mp');
