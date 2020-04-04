import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor() { }
  getDateTime(dateTime){
    let date=new Date(dateTime);

    let hours = date.getHours();
      let minutes = date.getMinutes();
      let ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
     let  minutess = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutess + ' ' + ampm;
   let sdate=date.toString().split(' ')

      return sdate[1]+' '+sdate[2]+','+sdate[3]+' '+strTime;
}
}
