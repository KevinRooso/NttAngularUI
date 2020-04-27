import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {
  constructor() {}
  getDateTime(dateTime) {
    const date = new Date(dateTime);

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutess = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutess + ' ' + ampm;
    const sdate = date.toString().split(' ');

    return sdate[1] + ' ' + sdate[2] + ',' + sdate[3] + ' ' + strTime;
  }
}
