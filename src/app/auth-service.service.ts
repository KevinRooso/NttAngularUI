import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  //http://192.168.1.155:8080/
 //private url = "http://192.168.1.155:8080/";
 private url = "https://ntt-backend-app.herokuapp.com/";
 public headers = new HttpHeaders({
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
    return this.http.get<any>(this.url+'api/public/categories/generalType', {headers:this.headers})
  }
  getAllPolicyFaq():Observable<any>{
    return this.http.get<any>(this.url+'api/public/policy/faq', {headers:this.headers})
  }
  getAllPolicyTnC():Observable<any>{
    return this.http.get<any>(this.url+'api/public/policy/tnc', {headers:this.headers})
  }
  getAllSpeakers():Observable<any>{
    return this.http.get<any>(this.url+'api/public/speakers', {headers:this.headers})
  }
  //File Controller APis
  uploadFile(obj):Observable<any>{
    return this.http.post<any>(this.url+'api/admin/uploadFile', obj, {headers:this.headers});
  }
  getAllParticipants():Observable<any>{
    return this.http.get<any>(this.url+'api/public/participants', {headers:this.headers})
  }

  getParticipantById(id):Observable<any>{
    return this.http.get<any>(this.url+'api/admin/participant/'+id, {headers:this.headers})
  }

  //Speaker Apis
  getAllSpeakersList():Observable<any>{
    return this.http.get<any>(this.url+'api/public/speakers', {headers:this.headers});
  }
  getSpeakerDetail(id):Observable<any>{
    return this.http.get<any>(this.url+'api/public/person/'+id, {headers:this.headers});
  }
  updateParticipantStatus(id):Observable<any>{
    return this.http.post<any>(this.url+'api/admin/participants/approve/'+id,null,{headers:this.headers});
  }
  saveSpeaker(obj):Observable<any>{
    return this.http.post<any>(this.url+'api/public/person', obj, {headers:this.headers});
  }

  //Articles Apis
  getAllArticle():Observable<any>{
    return this.http.get<any>(this.url+'api/public/resources/articles', {headers:this.headers})
  }
  getResourceById(id):Observable<any>{
    return this.http.get<any>(this.url+'api/public/resource/'+id, {headers:this.headers});
  }
  saveResource(obj):Observable<any>{
    return this.http.post<any>(this.url+'api/admin/resource', obj, {headers:this.headers});
  }


  //Participants Apis
  saveParticipent(id,obj):Observable<any>{
    return this.http.post<any>(this.url+'api/public/self/participant/event/'+id, obj, {headers:this.headers});
  }
  saveParticipentnonEvent(id,obj):Observable<any>{
    return this.http.post<any>(this.url+'api/public/addOn/participant/list/event/'+id, obj, {headers:this.headers});
  }

  //Whitepapers Apis
  getAllWhitepaper():Observable<any>{
    return this.http.get<any>(this.url+'api/public/resources/whitepapers', {headers:this.headers})
  }
  getAllBlogs(){
    return this.http.get<any>(this.url+'api/public/resources/blogs', {headers:this.headers});
  }
  getBlogById(id){
    return this.http.get<any>(this.url+'api/public/resources/blogs', {headers:this.headers});
  }

  getPersons(){
    return this.http.get<any>(this.url+'api/public/authors', {headers:this.headers});
  }
}
