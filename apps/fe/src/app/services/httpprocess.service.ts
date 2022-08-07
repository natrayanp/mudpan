import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }

  configUrl = 'http://localhost:3333/api';

   
    iciciDirectLogin() {
    return this.http.get(this.configUrl);
    }
}