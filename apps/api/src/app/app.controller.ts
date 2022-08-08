import { Body, Controller, Get, Post, Res } from '@nestjs/common';

import { AppService } from './app.service';
import { httpService } from './services/http.service';
import { dbService } from './services/db.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly httpsr: httpService, private readonly db: dbService,) {}

  @Post()
  create(@Res() res,@Body() body) {    
    //return 'This action adds a new cat';
      console.log("here in post");
      console.log(body);
      //let sestkn = '';

      const qry = 'INSERT INTO mp.session VALUES ($1,CURRENT_DATE)';      
      this.db.qryExecute(qry,[body.API_Session]);

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
      return res.redirect('https://api.icicidirect.com/apiuser/login?api_key=16)3W5i10$108kn5W16153162~t339j0');
    }
  //}
}
