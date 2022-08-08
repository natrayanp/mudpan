import { Injectable } from '@nestjs/common';

import { Pool } from 'pg';



@Injectable()
export class dbService {
    pool = null;
    constructor(){ 
        const constr = process.env.DATABASE_URL;       
        this.pool = new Pool({constr,});
    }

    async qryExecute(qry:string,vals:any[]|null){
        const client = await this.pool.connect();
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