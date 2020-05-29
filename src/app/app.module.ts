import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpeakersPreviewComponent } from './speakers/speakers-preview/speakers-preview.component';
import { ParticipantPreviewComponent } from './participants/participant-preview/participant-preview.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpeakerCreateComponent } from './speakers/speaker-create/speaker-create.component';
import { SpeakerEditComponent } from './speakers/speaker-edit/speaker-edit.component';
import { SpeakerDetailsComponent } from './speakers/speaker-details/speaker-details.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DataTablesModule } from 'angular-datatables';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';

import { ViewParticipantsComponent } from './participants/view-participants/view-participants.component';
import { CreateParticipantsComponent } from './participants/create-participants/create-participants.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ArticlesDetailComponent } from './articles/articles-detail/articles-detail.component';
import { ArticleEditComponent } from './articles/article-edit/article-edit.component';
import { ArticleCreateComponent } from './articles/article-create/article-create.component';
import { WhitepaperDetailComponent } from './whitepapers/whitepaper-detail/whitepaper-detail.component';
import { WhitepaperCreateComponent } from './whitepapers/whitepaper-create/whitepaper-create.component';
import { WhitepaperEditComponent } from './whitepapers/whitepaper-edit/whitepaper-edit.component';

import { MatDividerModule } from '@angular/material/divider';
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
import { CopyEventComponent } from './events/copy-event/copy-event.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SortByPipe } from './sorting.pipe';
import { LoaderComponent } from './loader/loader.component';
import { MatTabsModule } from '@angular/material/tabs';
import { HomeUiComponent } from './home-Configuration/home-ui/home-ui.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { ListCloudServicesComponent } from './cloud-services/list-cloud-services/list-cloud-services.component';
import { CreateFormComponent } from './cloud-services/create-form/create-form.component';
import { HttpErrorInterceptor } from '../services/http-error.interceptor';
import { RollbarErrorHandlerService } from '../services/rollbar-error-handler.service';
import { RollbarService, RollbarFactory } from '../config/rollbar.config';
import { BannerUiComponent } from './home-Configuration/banner-ui/banner-ui.component';
import { JoineeDataComponent } from './lead-generation/joinee-data/joinee-data.component';
import { InviteesDataComponent } from './lead-generation/invitees-data/invitees-data.component';
import { EventDataComponent } from './lead-generation/event-data/event-data.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ResourceDataComponent } from './lead-generation/resource-data/resource-data.component';
import { UserDataComponent } from './lead-generation/user-data/user-data.component';
import { CreateAuthorComponent } from './authors/create-author/create-author.component';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorDetailComponent } from './authors/author-detail/author-detail.component';
import { PublicEventComponent } from './public/public-event/public-event.component';
import { CreateCategoryComponent } from './category/create-category/create-category.component';
import { CreateCategoryGroupComponent } from './category/create-category-group/create-category-group.component';
import { CategoryComponent } from './category/category.component';
import { CategoryGroupComponent } from './category/category-group/category-group.component';
import { CacheMapService } from 'src/cache/cache-map.service';
import { Cache } from 'src/cache/cache';
import { PublicResourceComponent } from './public/public-resource/public-resource.component';
import { UsersComponent } from './user-management/users/users.component';
import { RolesComponent } from './user-management/roles/roles.component';
import { CreateUserComponent } from './user-management/create-user/create-user.component';
import { UserDetailComponent } from './user-management/user-detail/user-detail.component';
import { CreateRoleComponent } from './user-management/create-role/create-role.component';
import { RemovehyphensPipe } from './removehyphens.pipe';
import { RemoveunderscorePipe } from './removeunderscore.pipe';

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
    CopyEventComponent,
    LandingPageComponent,
    SortByPipe,
    LoaderComponent,
    HomeUiComponent,
    ListCloudServicesComponent,
    CreateFormComponent,
    BannerUiComponent,
    JoineeDataComponent,
    InviteesDataComponent,
    EventDataComponent,
    ResourceDataComponent,
    UserDataComponent,
    CreateAuthorComponent,
    AuthorsComponent,
    AuthorDetailComponent,
    PublicEventComponent,
    CreateCategoryComponent,
    CreateCategoryGroupComponent,
    CategoryComponent,
    CategoryGroupComponent,
    PublicResourceComponent,
    UsersComponent,
    RolesComponent,
    CreateUserComponent,
    UserDetailComponent,
    CreateRoleComponent,
    RemovehyphensPipe,
    RemoveunderscorePipe,
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
    MatMenuModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatSliderModule,
    MatRadioModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatBadgeModule,
    CKEditorModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
  ],
  providers: [
    HttpClientModule,
    {
      provide: RollbarService,
      useFactory: RollbarFactory,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: RollbarErrorHandlerService,
    },
    CacheMapService,
    {
      provide: Cache,
      useClass: CacheMapService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
