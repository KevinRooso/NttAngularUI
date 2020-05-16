import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  // private url = "http://localhost:8080/";
  // private url = "https://ntt-backend-app.herokuapp.com/";
  public url = environment.API_ENDPOINT;
  constructor(private http: HttpClient) {}

  // connectToBackend():any
  // {
  //   return this.http.get<any>(this.url+'/payload/getMasterParameters',{headers:this.headers});
  // }

  getAuthourized(auth): any {
    return this.http.post<any>(this.url + 'api/auth/signin', auth);
  }
  isUserLoggedIn() {
    const user = localStorage.getItem('token');
    return !(user == null);
  }
  getAllEventList(): Observable<any> {
    return this.http.get<any>(this.url + 'api/public/events');
  }

  getUserDetail(): Observable<any> {
    return this.http.get<any>(this.url + 'api/users/me');
  }

  getEventDetail(id): Observable<any> {
    return this.http.get<any>(this.url + 'api/public/event/' + id);
  }

  getPublicEventDetail(id, token): Observable<any> {
    const AuthHeader = new HttpHeaders({
      Authorization: token,
    });
    return this.http.get<any>(this.url + 'api/public/event/' + id, { headers: AuthHeader });
  }

  getParticipant(id): Observable<any> {
    return this.http.get<any>(this.url + `api/public/participants/event/${id}`);
  }
  saveEventDetails(obj): Observable<any> {
    return this.http.post<any>(this.url + 'api/admin/event', obj);
  }
  getTagsList(): Observable<any> {
    return this.http.get<any>(this.url + 'api/public/tags');
  }
  getCategoryList(): Observable<any> {
    return this.http.get<any>(this.url + 'api/public/categories/generalType');
  }
  getAllPolicyFaq(): Observable<any> {
    return this.http.get<any>(this.url + 'api/public/policy/faq');
  }
  getAllPolicyTnC(): Observable<any> {
    return this.http.get<any>(this.url + 'api/public/policy/tnc');
  }
  getAllSpeakers(): Observable<any> {
    return this.http.get<any>(this.url + 'api/public/speakers');
  }
  // File Controller APis
  uploadFile(obj): Observable<any> {
    return this.http.post<any>(this.url + 'api/admin/uploadFile', obj);
  }
  getAllParticipants(): Observable<any> {
    return this.http.get<any>(this.url + 'api/public/participants');
  }

  getParticipantById(id): Observable<any> {
    return this.http.get<any>(this.url + 'api/admin/participant/' + id);
  }

  // Speaker Apis
  getAllSpeakersList(): Observable<any> {
    return this.http.get<any>(this.url + 'api/public/speakers');
  }
  getSpeakerDetail(id): Observable<any> {
    return this.http.get<any>(this.url + 'api/public/person/' + id);
  }
  updateParticipantStatus(id, flag): Observable<any> {
    return this.http.post<any>(this.url + 'api/admin/participants/approve/' + id + '/' + flag, null);
  }
  saveSpeaker(obj): Observable<any> {
    return this.http.post<any>(this.url + 'api/public/person', obj);
  }

  // Articles Apis
  getAllArticle(): Observable<any> {
    return this.http.get<any>(this.url + 'api/public/resources/articles');
  }
  getResourceById(id): Observable<any> {
    return this.http.get<any>(this.url + 'api/public/resource/' + id);
  }
  saveResource(obj): Observable<any> {
    return this.http.post<any>(this.url + 'api/admin/resource', obj);
  }

  // Participants Apis
  saveParticipent(id, obj): Observable<any> {
    return this.http.post<any>(this.url + 'api/public/self/participant/event/' + id, obj);
  }
  saveParticipentnonEvent(id, obj): Observable<any> {
    return this.http.post<any>(this.url + 'api/admin/addOn/participant/list/event/' + id, obj);
  }

  // Whitepapers Apis
  getAllWhitepaper(): Observable<any> {
    return this.http.get<any>(this.url + 'api/public/resources/whitepapers');
  }
  getAllBlogs() {
    return this.http.get<any>(this.url + 'api/public/resources/blogs');
  }
  getBlogById(id): Observable<any> {
    return this.http.get<any>(this.url + 'api/public/resource/' + id);
  }

  getPersons() {
    return this.http.get<any>(this.url + 'api/public/authors');
  }

  // Videos Apis
  getAllVideosList(): Observable<any> {
    return this.http.get<any>(this.url + 'api/public/resources/videos');
  }
  getCasestudies() {
    return this.http.get<any>(this.url + 'api/public/resources/case-studies');
  }
  getAllNews(): Observable<any> {
    const obj = false;
    return this.http.get<any>(this.url + 'api/public/news?isPublish=' + obj);
  }
  saveNews(obj): Observable<any> {
    return this.http.post<any>(this.url + 'api/admin/news', obj);
  }
  getDates(): Observable<any> {
    return this.http.get<any>(this.url + 'api/public/news/years');
  }
  getNewsById(id) {
    return this.http.get<any>(this.url + 'api/public/news/' + id);
  }
  updateNews(obj): Observable<any> {
    return this.http.put<any>(this.url + 'api/admin/news', obj);
  }
  getAllTestimonials(): Observable<any> {
    return this.http.get<any>(this.url + 'api/public/resources/testimonials');
  }
  getUserList(): Observable<any> {
    return this.http.get<any>(this.url + 'api/public/categories/userType');
  }
  getLocation(): Observable<any> {
    return this.http.get<any>('https://geocode.xyz/Hauptstr.,+57632+Berzhausen?json=1');
  }
  getBannerBlockDetail(obj, isPublic, isCustomer): Observable<any> {
    return this.http.get<any>(this.url + obj + '?isPublish=true&isPublic=' + isPublic + '&isCustomer=' + isCustomer);
  }
  saveBanner(obj): Observable<any> {
    return this.http.post<any>(this.url + 'api/public/homepage/banner', obj);
  }
  saveEventBlock(id, obj): Observable<any> {
    return this.http.post<any>(this.url + 'api/public/homePage/' + id, obj);
  }
  saveRescourceBlock(id, obj): Observable<any> {
    return this.http.post<any>(this.url + 'api/public/homePage/' + id, obj);
  }

  getAllHomeData(user): Observable<any> {
    return this.http.get<any>(this.url + 'api/public/homePage?userType=' + user);
  }

  savePublish(id, flag): Observable<any> {
    return this.http.put<any>(this.url + 'api/admin/event/publish/' + id + '/' + flag, null);
  }
  // Dashboad-charts

  getUserDevices(duration: any): Observable<any> {
    if (duration === '') {
      return this.http.get<any>(this.url + 'api/admin/userDevices');
    } else {
      return this.http.get<any>(this.url + `api/admin/userDevices?duration=${duration}`);
    }
  }
  getresourceDownloadDetails(duration: any): Observable<any> {
    if (duration === '') {
      return this.http.get<any>(this.url + 'api/admin/resourceDownloadDetails');
    } else {
      return this.http.get<any>(this.url + `api/admin/resourceDownloadDetails?duration=${duration}`);
    }
  }
  geteventStatusDetails(duration: any): Observable<any> {
    if (duration === '') {
      return this.http.get<any>(this.url + 'api/admin/eventStatusDetails');
    } else {
      return this.http.get<any>(this.url + `api/admin/eventStatusDetails?duration=${duration}`);
    }
  }
  geteventTargetUserTypeDetails(duration: any): Observable<any> {
    if (duration === '') {
      return this.http.get<any>(this.url + 'api/admin/eventTargetUserTypeDetails');
    } else {
      return this.http.get<any>(this.url + `api/admin/eventTargetUserTypeDetails?duration=${duration}`);
    }
  }
  getUsers(duration: any): Observable<any> {
    if (duration === '') {
      return this.http.get<any>(this.url + 'api/admin/users');
    } else {
      return this.http.get<any>(this.url + `api/admin/users?duration=${duration}`);
    }
  }
  geteventCategoryTypeDetails(duration: any): Observable<any> {
    if (duration === '') {
      return this.http.get<any>(this.url + 'api/admin/eventCategoryTypeDetails');
    } else {
      return this.http.get<any>(this.url + `api/admin/eventCategoryTypeDetails?duration=${duration}`);
    }
  }

  removeEventSchedule(id): Observable<any> {
    return this.http.delete<any>(this.url + 'api/admin/event/schedule/' + id);
  }

  // Product&services api.......

  createProductAndService(obj): Observable<any> {
    return this.http.post<any>(this.url + 'api/admin/productAndServices', obj);
  }

  getProductAndService(id): Observable<any> {
    return this.http.get<any>(this.url + 'api/public/productAndServices?id=' + id);
  }

  deleteService(id): Observable<any> {
    return this.http.delete<any>(this.url + 'api/admin/productAndServices?id=' + id);
  }

  getInviteesData(): Observable<any> {
    return this.http.get<any>(this.url + 'api/admin/metric/event/inviteesList');
  }
  getJoineeData(): Observable<any> {
    return this.http.get<any>(this.url + 'api/admin/metric/event/joiningList');
  }
  getResourceData(): Observable<any> {
    return this.http.get<any>(this.url + 'api/admin/metric/resource/attachmentShareList');
  }
  getUserListData(): Observable<any> {
    return this.http.get<any>(this.url + 'api/admin/metric/user/userList');
  }
  getDeviceList(id): Observable<any> {
    return this.http.get<any>(this.url + 'api/admin/metric/device/deviceListByUser?userId=' + id);
  }
}
