import { Injectable } from '@nestjs/common';

import {BreezeConnect} from 'breezeconnect';

@Injectable()
export class AppService {

  appKey = null;
  appSecret = null;
  breeze = null;

  constructor() {     
    this.appKey = process.env.APPKEY;    
    this.appSecret = process.env.APPSECRET;
    console.log("reading from env");
    console.log(process.env.APPKEY);
    this.breeze = new BreezeConnect({"appKey":this.appKey});    
    /*this.breeze.generate_session(this.appSecret,"your_api_session").then(function(resp){
            console.log("session generated");
        }).catch(function(err){
            console.log(err)
        });
      */
  }


  getData(): { message: string } {
    this.breeze.get_funds().then(function(resp){
      console.log("Final Response");
      console.log(resp);
  });
    return { message: 'Welcome to api!' };
  }

  
}
