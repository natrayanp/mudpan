import { Component } from '@angular/core';

@Component({
  selector: 'mudpan-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'fe';

  printUser(event:any) {
    console.log(event);
}

  printError(event:any) {
      console.error(event);
  }
  

}
