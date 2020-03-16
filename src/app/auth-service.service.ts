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
  saveEventDetails(obj):Observable<any>{
    return this.http.post<any>(this.url+'api/admin/event', obj, {headers:this.headers});
  }
  updateEventDetails(id):Observable<any>{
    return this.http.put<any>(this.url+'api/admin/event/'+id, {headers:this.headers})
  }
  getTagsList():Observable<any>{
    return this.http.get<any>(this.url+'api/public/tags', {headers:this.headers})
  }
  getCategoryList():Observable<any>{
    return this.http.get<any>(this.url+'api/public/categories', {headers:this.headers})
  }
  getAllPolicy():Observable<any>{
    return this.http.get<any>(this.url+'api/public/policies', {headers:this.headers})
  }
  getAllSpeakers():Observable<any>{
    return this.http.get<any>(this.url+'api/public/speakers', {headers:this.headers})
  }
}
