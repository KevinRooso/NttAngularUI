import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
 // private url = "http://localhost:8080/";
 // private url = "https://ntt-backend-app.herokuapp.com/";
 private url = environment.API_ENDPOINT;
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

  getUserDetail():Observable<any>{
    return this.http.get<any>(this.url+'api/users/me', {headers:this.headers})
  }

  getEventDetail(id):Observable<any>{
    return this.http.get<any>(this.url+'api/public/event/'+id, {headers:this.headers})
  }

  getParticipant(id):Observable<any>{
    return this.http.get<any>(this.url+`api/public/participants/event/${id}`, {headers:this.headers})
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
  updateParticipantStatus(id,flag):Observable<any>{
    return this.http.post<any>(this.url+'api/admin/participants/approve/'+id+'/'+flag,null,{headers:this.headers});
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
  getBlogById(id):Observable<any>{
    return this.http.get<any>(this.url+'api/public/resource/'+id, {headers:this.headers});
  }

  getPersons(){
    return this.http.get<any>(this.url+'api/public/authors', {headers:this.headers});
  }

  //Videos Apis
  getAllVideosList()
  :Observable<any>{
    return this.http.get<any>(this.url+'api/public/resources/videos', {headers:this.headers})
  }
  getCasestudies(){
    return this.http.get<any>(this.url+'api/public/resources/case-studies', {headers:this.headers});
  }
  getAllNews():Observable<any>{
    return this.http.get<any>(this.url+'api/admin/news', {headers:this.headers})
  }
  saveNews(obj):Observable<any>{
    return this.http.post<any>(this.url+'api/admin/news', obj, {headers:this.headers});
  }
  getDates():Observable<any>{
    return this.http.get<any>(this.url+'api/public/news/years', {headers:this.headers})
  }
  getNewsById(id){
    return this.http.get<any>(this.url+'api/public/news/'+id, {headers:this.headers});
  }
  updateNews(obj):Observable<any>{
    return this.http.put<any>(this.url+'api/admin/news', obj, {headers:this.headers});
  }
  getAllTestimonials():Observable<any>{
    return this.http.get<any>(this.url+'api/public/resources/testimonials', {headers:this.headers})
  }
  getUserList():Observable<any>{
    return this.http.get<any>(this.url+'api/public/categories/userType', {headers:this.headers})
  }
  getLocation():Observable<any>{
    return this.http.get<any>("https://geocode.xyz/Hauptstr.,+57632+Berzhausen?json=1")
  }
  getBannerBlockDetail(obj):Observable<any>{
    return this.http.get<any>(this.url+obj, {headers:this.headers})
  }
  saveBanner(obj):Observable<any>{
    return this.http.post<any>(this.url+'api/public/homepage/banner', obj, {headers:this.headers});
  }
  saveEventBlock(id,obj):Observable<any>{
    return this.http.post<any>(this.url+'api/public/homePage/'+id, obj, {headers:this.headers});
  }
  saveRescourceBlock(id,obj):Observable<any>{
    return this.http.post<any>(this.url+'api/public/homePage/'+id, obj, {headers:this.headers});
  }

  getAllHomeData(user):Observable<any>{
    return this.http.get<any>(this.url+'api/public/homePage?userType='+user, {headers:this.headers})
  }

  savePublish(id,flag):Observable<any>{
    return this.http.put<any>(this.url+'api/admin/event/publish/'+id+'/'+flag,null, {headers:this.headers});
  }
  saveActive(id,flag):Observable<any>{
    return this.http.put<any>(this.url+'api/admin/event/active/'+id+'/'+flag,null, {headers:this.headers});
  }

  // getHomePageDetails(user):Observable<any>{
  //   return this.http.get<any>(this.url+'api/public/homePage?userType='+user, {headers:this.headers})
  // }
  //home-page-charts
  getChartUser():Observable<any>{
    return this.http.get<any>(this.url+'api/admin/userDevices', {headers:this.headers})
  }
}
