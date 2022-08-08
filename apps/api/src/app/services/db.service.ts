import { Injectable } from '@nestjs/common';

import { Pool } from 'pg';



@Injectable()
export class dbService {
    pool = null;
    client = null;
    constructor(){ 
        const constr = process.env.DATABASE_URL;     
        console.log(constr)  ;
        this.pool = new Pool({connectionString:constr,ssl:{rejectUnauthorized: false}});             
    }

    async qryExecute(qry:string,vals:any[]|null){
        console.log(this.pool);
        const client = await this.pool.connect();
        console.log(client);
        try {
                if(vals === null || vals.length < 1)  {
                    client.query(qry, (err, res) => {
                        if (err) {
                            console.error('Error committing transaction', err.stack)
                        } else {
                            console.log(res);
                        }
                    });
                }else {
                    client.query(qry, vals, (err, res) => {
                        if (err) {
                            console.error('Error committing transaction', err.stack)
                        } else {
                            console.log(res);
                        }
                    });
                }

        } finally {
                // Make sure to release the client before any error handling,
                // just in case the error handling itself throws an error.
                client.release()
        }
    }

}