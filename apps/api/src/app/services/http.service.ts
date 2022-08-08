import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { createHmac } from 'crypto';


import { map } from 'rxjs/operators';


@Injectable()
export class httpService {
    constructor(private http: HttpService){
    }

    getUserDetails(sess:string){
        console.log(sess);
        const data = JSON.stringify({"SessionToken": sess,"AppKey": "16)3W5i10$108kn5W16153162~t339j0"});
        console.log(data);
        
        return this.http.get('https://api.icicidirect.com/breezeapi/api/v1/customerdetails',{data : data,headers:{'Content-Type': 'application/json'}})
            .pipe(
                map(response => response.data)
            );
    }

    
    getUserPortfolio(sesstkn:string){   
        
        const now = new Date().toISOString().slice(0, 19)+'.000Z';
        const data = JSON.stringify({
            "exchange_code": "NSE",
            "portfolio_type": "A"
        });

        const da1 = now+data+'_35993o671I841=378H5831560O67*77';

        const sh = createHmac('sha256',da1).digest('hex');
        console.log(now);
        console.log(sh);
        console.log(sesstkn);
        console.log("------");

        const config = {            
            headers: { 
                'Content-Type': 'application/json', 
                'X-Checksum': 'token '+sh, 
                'X-Timestamp': now, 
                'X-AppKey': '16)3W5i10$108kn5W16153162~t339j0', 
                'X-SessionToken': 'CPAKFa5H:'+sesstkn
            },
            data: data         
        };     
      
        return 'su';
  
        /* 
        return this.http.get('https://api.icicidirect.com/breezeapi/api/v1/portfolioholdings',config)
            .pipe(
                map(response => response.data)
            );
             */

    }

}