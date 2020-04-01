import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventPreviewComponent } from './events/event-preview/event-preview.component';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventEditComponent } from './events/event-edit/event-edit.component';
import { ArticlesComponent } from './articles/articles.component';
import { BlogsComponent } from './blogs/blogs.component';
import { CaseStudiesComponent } from './case-studies/case-studies.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { WhitepapersComponent } from './whitepapers/whitepapers.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SpeakersPreviewComponent } from './speakers/speakers-preview/speakers-preview.component';
import { ParticipantPreviewComponent } from './participants/participant-preview/participant-preview.component';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { SpeakerCreateComponent } from './speakers/speaker-create/speaker-create.component';
import { SpeakerEditComponent } from './speakers/speaker-edit/speaker-edit.component';
import { SpeakerDetailsComponent } from './speakers/speaker-details/speaker-details.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DataTablesModule } from 'angular-datatables';

import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';



import { ViewParticipantsComponent } from './participants/view-participants/view-participants.component';
import { CreateParticipantsComponent } from './participants/create-participants/create-participants.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { ArticlesDetailComponent } from './articles/articles-detail/articles-detail.component';
import { ArticleEditComponent } from './articles/article-edit/article-edit.component';
import { ArticleCreateComponent } from './articles/article-create/article-create.component';
import { WhitepaperDetailComponent } from './whitepapers/whitepaper-detail/whitepaper-detail.component';
import { WhitepaperCreateComponent } from './whitepapers/whitepaper-create/whitepaper-create.component';
import { WhitepaperEditComponent } from './whitepapers/whitepaper-edit/whitepaper-edit.component';

import {MatDividerModule} from '@angular/material/divider';
import { BlogDetailComponent } from './blogs/blog-detail/blog-detail.component';
import { CreateBlogComponent } from './blogs/create-blog/create-blog.component';
import { VideosPreviewComponent } from './videos/videos-preview/videos-preview.component';
import { VideosCreateComponent } from './videos/videos-create/videos-create.component';
import { VideosUpdateComponent } from './videos/videos-update/videos-update.component';
import { VideosDetailsComponent } from './videos/videos-details/videos-details.component';
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
import { ConfigurationComponent } from './home-Configuration/configuration/configuration.component';
import { TruncatePipe } from './truncate.pipe';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    EventPreviewComponent,
    CreateEventComponent,
    HeaderComponent,
    SidebarComponent,
    EventDetailsComponent,
    EventEditComponent,
    ArticlesComponent,
    BlogsComponent,
    CaseStudiesComponent,
    TestimonialsComponent,
    WhitepapersComponent,
    SpeakersPreviewComponent,
    ParticipantPreviewComponent,
    SpeakerCreateComponent,
    SpeakerEditComponent,
    SpeakerDetailsComponent,
    ViewParticipantsComponent,
    CreateParticipantsComponent,
    ArticlesDetailComponent,
    ArticleEditComponent,
    ArticleCreateComponent,
    WhitepaperDetailComponent,
    WhitepaperCreateComponent,
    WhitepaperEditComponent,
    BlogDetailComponent,
    CreateBlogComponent,
    VideosPreviewComponent,
    VideosCreateComponent,
    VideosUpdateComponent,
    VideosDetailsComponent,
    EditBlogComponent,
    ViewCasesComponent,
    CasesCreateComponent,
    CasesEditComponent,
    NewsComponent,
    CreateNewsComponent,
    NewsViewComponent,
    NewsEditComponent,
    ViewTestimonialsComponent,
    CreateTestimonialsComponent,
    EditTestimonialsComponent,
    ConfigurationComponent,
    TruncatePipe,
    LandingPageComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    BrowserAnimationsModule,
    NgbModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CKEditorModule,

    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    DataTablesModule,
    MatDividerModule,
    MatDialogModule

  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
