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
      await this.gs(sess);
      console.log("session generated out");

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
  
    async gs(sess){
      await this.appService.breeze.generate_session(this.appService.appSecret,sess).then(function(resp){
        console.log("session generated");        
    }).catch(function(err){
        console.log(err)
    });
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

  @Get('tradelist')
  get_trade(){
    this.appService.breeze.get_trade_list(
      {
          from_date:"2022-08-25T06:00:00.000Z",
          to_date:"2022-08-28T06:00:00.000Z",
          exchange_code:"NSE",
          product_type:"",
          action:"",
          stock_code:""
      }
  ).then(function(resp){console.log(resp)});

  }

  @Get('tradedetail')
  get_trade_detail(){
    this.appService.breeze.get_trade_detail(
      {
          exchange_code:"NSE",
          order_id:"20220826N400043393"
      }
  ).then(function(resp){console.log(resp)});

  }
  

  @Get('pfholdings')
  get_pf_holdings(){
    this.appService.breeze.get_portfolio_holdings(
      {
          exchange_code:"NSE"          
      }
  ).then(function(resp){console.log(resp)});

  }

  @Get('pfposition')
  get_pf_position(){
    this.appService.breeze.get_portfolio_positions().then(function(resp){console.log(resp)});

  }

}


