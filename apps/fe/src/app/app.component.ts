import { Component } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Component({
  selector: 'mudpan-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'fe';
  onscreenload = true;
  opened = true;
  snsz = 250;

  navtoggle(){
    if(this.snsz === 250){            
      this.opened = false;
      this.snsz = 50;         
    } else if(this.snsz === 50){
      this.opened = true;
      this.snsz = 0;
    } else if(!this.opened){
      this.opened = false;
      this.snsz = 250;
    }
    setTimeout(() => this.opened = !this.opened, 1);  
  }

  goToUrl(): void {
//    appCheckInstance$.
  }

  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.onAuthStateChanged( () => {      
    
      this.afAuth.user.subscribe ( (s) => {
        
        if(!s) {
          (this.onscreenload)?
            console.log("first time log out don't do anything"):
                console.log("user logged out automatically");
          this.onscreenload = false;
        }
      
    })
      
    });

    this.firstimesignout();    
    console.log("called from outside onauthstatechanged");
   }

  firstimesignout(){
    this.afAuth.authState.subscribe(async (s) => {
       if (s) {
         console.log("have user so making sure we sign out");
         await this.afAuth.signOut();
       } else {
        console.log("no user so doing nothing");
       }
       
     }) ;    
   }



  printUser(event:any) {
    console.log(event);
}

  printError(event:any) {
      console.error(event);
  }

  
  

}
