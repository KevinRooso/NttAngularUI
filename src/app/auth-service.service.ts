import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

 private url = "http://192.168.1.155:8080/";
 //private url = "https://ntt-backend-app.herokuapp.com/";
 private headers = new HttpHeaders({
  Authorization : 'Bearer ' + localStorage.getItem("token")
});


  constructor( private http: HttpClient) { }

  // connectToBackend():any
  // {
  //   return this.http.get<any>(this.url+'/payload/getMasterParameters',{headers:this.headers});
  // }

  getAuthourized(auth):any{
    return this.http.post<any>(this.url+'api/auth/signin', auth)
  }
  isUserLoggedIn(){
    let user = localStorage.getItem('token');
    return !(user==null);
  }
  getAllEventList():Observable<any>{
    return this.http.get<any>(this.url+'api/public/events', {headers:this.headers})
  }
  getEventDetail(id):Observable<any>{
    return this.http.get<any>(this.url+'api/public/event/'+id, {headers:this.headers})
  }

  getParticipant(id):Observable<any>{
    return this.http.get<any>(this.url+`api/public/events/${id}/participant`, {headers:this.headers})
  }
  // saveEventDetails(){
  //   return this.http.post(this.url+'')
  // }
}
