import mariadb from 'mariadb';

const pool = mariadb.createPool(
    {
        host: process.env['DB_HOST'],
        user: process.env['DB_USER'],
        password: process.env['DB_PASS'],
        database: 'testing_community'
    });

export async function query(query: string) {
    let conn: mariadb.PoolConnection;
    let rows: any;
    try {
        conn = await pool.getConnection();
        rows = await conn.query(query);
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release(); //release to pool
    }
    return rows;
}

export async function queryWithValues(query: string, values: any[]) {
    let conn: mariadb.PoolConnection;
    let resp: any;
    try {
        conn = await pool.getConnection();
        resp = await conn.query(query, values);
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release(); //release to pool
    }
    return resp;
}
