import { Injectable } from '@nestjs/common';

import { Pool, Client } from pg;



@Injectable()
export class dbService {
    pool = null;
    constructor(){
        const pool = new Pool({
            user: 'dbuser',
            host: 'database.server.com',
            database: 'mydb',
            password: 'secretpassword',
            port: 3211,
          });

    }

    async getDbdata(qry:string,vals:any[]){
        const client = await this.pool.connect();
        try {
                client.query(qry, vals, (err, res) => {
                    if (err) {
                        console.error('Error committing transaction', err.stack)
                    } else {
                        console.log(res.rows[0]);
                    }
                });
        } finally {
                // Make sure to release the client before any error handling,
                // just in case the error handling itself throws an error.
                client.release()
        }
    }

}