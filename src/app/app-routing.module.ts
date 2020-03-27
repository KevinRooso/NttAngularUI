import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { EventEditComponent } from './events/event-edit/event-edit.component';
import { ArticlesComponent } from './articles/articles.component';
import { BlogsComponent } from './blogs/blogs.component';
import { CaseStudiesComponent } from './case-studies/case-studies.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { WhitepapersComponent } from './whitepapers/whitepapers.component';
import { EventPreviewComponent } from './events/event-preview/event-preview.component';
import { SpeakersPreviewComponent } from './speakers/speakers-preview/speakers-preview.component';
import { ParticipantPreviewComponent } from './participants/participant-preview/participant-preview.component';
import { SpeakerCreateComponent } from './speakers/speaker-create/speaker-create.component';
import { SpeakerEditComponent } from './speakers/speaker-edit/speaker-edit.component';
import { SpeakerDetailsComponent } from './speakers/speaker-details/speaker-details.component';
import { AuthguardServiceService } from './authguard-service.service';
import { ViewParticipantsComponent } from './participants/view-participants/view-participants.component';
import { CreateParticipantsComponent } from './participants/create-participants/create-participants.component';
import { ArticlesDetailComponent } from './articles/articles-detail/articles-detail.component';
import { ArticleEditComponent } from './articles/article-edit/article-edit.component';
import { ArticleCreateComponent } from './articles/article-create/article-create.component';
import { WhitepaperDetailComponent } from './whitepapers/whitepaper-detail/whitepaper-detail.component';
import { WhitepaperEditComponent } from './whitepapers/whitepaper-edit/whitepaper-edit.component';
import { WhitepaperCreateComponent } from './whitepapers/whitepaper-create/whitepaper-create.component';
import { BlogDetailComponent } from './blogs/blog-detail/blog-detail.component';
import { CreateBlogComponent } from './blogs/create-blog/create-blog.component';
import { VideosPreviewComponent } from './videos/videos-preview/videos-preview.component';
import { VideosDetailsComponent } from './videos/videos-details/videos-details.component';
import { VideosUpdateComponent } from './videos/videos-update/videos-update.component';
import { VideosCreateComponent } from './videos/videos-create/videos-create.component';
import { EditBlogComponent } from './blogs/edit-blog/edit-blog.component';
import { ViewCasesComponent } from './case-studies/view-cases/view-cases.component';
import { CasesCreateComponent } from './case-studies/cases-create/cases-create.component';
import { CasesEditComponent } from './case-studies/cases-edit/cases-edit.component';
import { NewsComponent } from './news/news.component';
import { CreateNewsComponent } from './news/create-news/create-news.component';
import { NewsViewComponent } from './news/news-view/news-view.component';
import { NewsEditComponent } from './news/news-edit/news-edit.component';
import { ViewTestimonialsComponent } from './testimonials/view-testimonials/view-testimonials.component';
import { CreateTestimonialsComponent } from './testimonials/create-testimonials/create-testimonials.component';
import { EditTestimonialsComponent } from './testimonials/edit-testimonials/edit-testimonials.component';




const routes: Routes = [
  { path : '', component : LoginComponent},
  { path: 'login', component: LoginComponent },
  { path: 'events', component: EventPreviewComponent, canActivate: [AuthguardServiceService]},
  { path: 'details', component: EventDetailsComponent, canActivate: [AuthguardServiceService] },
  { path: 'create', component: CreateEventComponent, canActivate: [AuthguardServiceService] },
  { path: 'edit', component: EventEditComponent, canActivate: [AuthguardServiceService]},
  { path: 'articles', component: ArticlesComponent, canActivate: [AuthguardServiceService]},
  { path: 'blogs', component: BlogsComponent, canActivate: [AuthguardServiceService]},
  { path: 'cases', component: CaseStudiesComponent, canActivate: [AuthguardServiceService]},
  { path: 'testimonials', component: TestimonialsComponent, canActivate: [AuthguardServiceService]},
  { path: 'whitepapers', component: WhitepapersComponent, canActivate: [AuthguardServiceService]},
  { path: 'speakers', component: SpeakersPreviewComponent, canActivate: [AuthguardServiceService]},
  { path: 'participants', component: ParticipantPreviewComponent, canActivate: [AuthguardServiceService]},
  { path: 'create-speaker', component: SpeakerCreateComponent, canActivate: [AuthguardServiceService]},
  { path: 'speaker-update', component: SpeakerEditComponent, canActivate: [AuthguardServiceService]},
  { path: 'speaker-details', component: SpeakerDetailsComponent, canActivate: [AuthguardServiceService]},
  { path: 'participant-details', component: ViewParticipantsComponent, canActivate: [AuthguardServiceService]},
  { path: 'participant-add', component: CreateParticipantsComponent, canActivate: [AuthguardServiceService]},
  { path: 'article-details', component: ArticlesDetailComponent, canActivate: [AuthguardServiceService]},
  { path: 'article-edit', component: ArticleEditComponent, canActivate: [AuthguardServiceService]},
  { path: 'article-create', component: ArticleCreateComponent, canActivate: [AuthguardServiceService]},
  { path: 'white-details', component: WhitepaperDetailComponent, canActivate: [AuthguardServiceService]},
  { path: 'white-edit', component: WhitepaperEditComponent, canActivate: [AuthguardServiceService]},
  { path: 'white-create', component: WhitepaperCreateComponent, canActivate: [AuthguardServiceService]},


  { path: 'article-create', component: ArticleCreateComponent, canActivate: [AuthguardServiceService]},
  { path: 'blog-detail', component: BlogDetailComponent, canActivate: [AuthguardServiceService]},
  { path: 'blog-create', component: CreateBlogComponent, canActivate: [AuthguardServiceService]},
  { path: 'videos', component: VideosPreviewComponent, canActivate: [AuthguardServiceService]},
  { path: 'videos-create', component: VideosCreateComponent, canActivate: [AuthguardServiceService]},
  { path: 'videos-update', component: VideosUpdateComponent, canActivate: [AuthguardServiceService]},
  { path: 'videos-detail', component: VideosDetailsComponent, canActivate: [AuthguardServiceService]},

  { path: 'blog-edit', component: EditBlogComponent, canActivate: [AuthguardServiceService]},
  { path: 'view-cases', component: ViewCasesComponent, canActivate: [AuthguardServiceService]},
  { path: 'create-cases', component: CasesCreateComponent, canActivate: [AuthguardServiceService]},
  { path: 'edit-cases', component: CasesEditComponent, canActivate: [AuthguardServiceService]},
  { path: 'news', component: NewsComponent, canActivate: [AuthguardServiceService]},
  { path: 'create-news', component: CreateNewsComponent, canActivate: [AuthguardServiceService]},
  { path: 'view-news', component: NewsViewComponent, canActivate: [AuthguardServiceService]},
  { path: 'edit-news', component: NewsEditComponent, canActivate: [AuthguardServiceService]},
  { path: 'view-testimonials', component: ViewTestimonialsComponent, canActivate: [AuthguardServiceService]},
  { path: 'create-testimonials', component: CreateTestimonialsComponent, canActivate: [AuthguardServiceService]},
  { path: 'edit-testimonials', component: EditTestimonialsComponent, canActivate: [AuthguardServiceService]}






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
