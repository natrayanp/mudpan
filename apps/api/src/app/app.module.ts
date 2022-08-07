import { Module } from '@nestjs/common';
import {HttpModule} from '@nestjs/axios';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { httpService } from './services/http.service';
import { dbService } from './services/db.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, httpService, dbService],
})
export class AppModule {}
