import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

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
}