import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool(
    {
        user:     process.env.DB_USER
       ,host:     process.env.DB_HOST 
       ,database: process.env.DB_NAME
       ,password: process.env.DB_PWD
       ,port:     parseInt(process.env.DB_PORT || '5432',10)
    }
);

// Forzar el esquema uesqtech
pool.on('connect',async(client:pg.PoolClient)=>{
    await client.query(`SET search_path TO ${process.env.DB_SCHEMA},public`);
});

export default pool;