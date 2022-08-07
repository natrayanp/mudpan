import { Body, Controller, Get, Post, Res } from '@nestjs/common';

import { AppService } from './app.service';
import { httpService } from './services/http.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly httpsr: httpService) {}

  @Post()
  create(@Res() res,@Body() body) {    
    //return 'This action adds a new cat';
      console.log("here in post");
      console.log(body);
      this.httpsr.getUserDetails(body.API_Session).subscribe(d => console.log(d));
      return res.redirect('http://localhost:4200/');
    }
  


  @Get()
  //getData() {
    //return this.appService.getData();
    redirect(@Res() res) {      
      return res.redirect('https://api.icicidirect.com/apiuser/login?api_key=16)3W5i10$108kn5W16153162~t339j0');
    }
  //}
}
