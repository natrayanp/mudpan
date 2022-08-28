import { Body, Controller, Get, Post, Res } from '@nestjs/common';

import { AppService } from './app.service';
import { httpService } from './services/http.service';
import { dbService } from './services/db.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly httpsr: httpService, private readonly db: dbService,) {}

  @Post()
  async create(@Res() res,@Body() body) {    
    //return 'This action adds a new cat';
      console.log("here in post");
      console.log(body);
      //let sestkn = '';
      const sess = body.API_Session;
      const qry = 'INSERT INTO mp.session VALUES ($1,CURRENT_DATE)';      
      this.db.qryExecute(qry,[body.API_Session]);
      console.log(sess);
      await this.appService.breeze.generate_session(this.appService.appSecret,sess).then(function(resp){
            console.log("session generated");
        }).catch(function(err){
            console.log(err)
        });
      

      return res.redirect('http://localhost:4200/');

      /*
      this.httpsr.getUserPortfolio(body.API_Session).subscribe(d => 
        {
          console.log(d);
          console.log(d.Success.session_token);
          console.log("------");
          sestkn = d.Success.session_token;
          console.log(sestkn);
          
          const dd = this.httpsr.getUserPortfolio(sestkn);
          console.log(dd);
          
  
           
          this.httpsr.getUserPortfolio(sestkn).subscribe(d => {
            console.log(d)
            return res.redirect('http://localhost:4200/');           
          });       */
   
    }
  

  @Get()
  //getData() {
    //return this.appService.getData();
    redirect(@Res() res) {      
      console.log(this.appService.appKey);
      return res.redirect('https://api.icicidirect.com/apiuser/login?api_key='+this.appService.appKey);
    }
  //}

  @Get('funds')
  get_funds() {    
    this.appService.breeze.get_funds().then(function(resp){
      console.log("Final Response");
      console.log(resp);
      return resp;
      });
  }
}


