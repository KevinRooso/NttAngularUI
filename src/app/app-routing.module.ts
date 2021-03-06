import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { ConfigurationComponent } from './home-Configuration/configuration/configuration.component';
import { CopyEventComponent } from './events/copy-event/copy-event.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ListCloudServicesComponent } from './cloud-services/list-cloud-services/list-cloud-services.component';
import { CreateFormComponent } from './cloud-services/create-form/create-form.component';
import { EventDataComponent } from './lead-generation/event-data/event-data.component';
import { JoineeDataComponent } from './lead-generation/joinee-data/joinee-data.component';
import { InviteesDataComponent } from './lead-generation/invitees-data/invitees-data.component';
import { ResourceDataComponent } from './lead-generation/resource-data/resource-data.component';
import { UserDataComponent } from './lead-generation/user-data/user-data.component';
import { CreateAuthorComponent } from './authors/create-author/create-author.component';
import { AuthorDetailComponent } from './authors/author-detail/author-detail.component';
import { AuthorsComponent } from './authors/authors.component';
import { CreateTestimonialsComponent } from './testimonials/create-testimonials/create-testimonials.component';
import { PublicEventComponent } from './public/public-event/public-event.component';
import { CreateCategoryComponent } from './category/create-category/create-category.component';
import { CreateCategoryGroupComponent } from './category/create-category-group/create-category-group.component';
import { CategoryComponent } from './category/category.component';
import { CategoryGroupComponent } from './category/category-group/category-group.component';
import { PublicResourceComponent } from './public/public-resource/public-resource.component';
import { UsersComponent } from './user-management/users/users.component';
import { CreateUserComponent } from './user-management/create-user/create-user.component';
import { RolesComponent } from './user-management/roles/roles.component';
import { CreateRoleComponent } from './user-management/create-role/create-role.component';
import { UserDetailComponent } from './user-management/user-detail/user-detail.component';
import { RoleguardServiceService } from './roleguard-service.service';
import { NotificationsComponent } from './notifications/notifications.component';
import { CreateNotificationComponent } from './notifications/create-notification/create-notification.component';
import { EditNotificationComponent } from './notifications/edit-notification/edit-notification.component';
import { DetailNotificationComponent } from './notifications/detail-notification/detail-notification.component';
import { ParticipantsPreviewComponent } from './participants/participants-preview/participants-preview.component';
import { PrivacyPolicyComponent } from './public/privacy-policy/privacy-policy.component';
import { JobsComponent } from './jobs/jobs.component';
import { CampaignComponent } from './notifications/campaign/campaign.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  // {
  //   path: 'events',
  //   component: EventPreviewComponent,
  //   canActivate: [AuthguardServiceService],
  // },
  {
    path: 'public',
    children: [
      {
        path: 'event',
        component: PublicEventComponent,
        pathMatch: 'full',
      },
      {
        path: 'resource',
        component: PublicResourceComponent,
        pathMatch: 'full',
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'config-management',
    children: [
      {
        path: 'categories',
        children: [
          {
            path: '',
            component: CategoryComponent,
            canActivate: [AuthguardServiceService],
          },
          {
            path: 'create',
            component: CreateCategoryComponent,
            pathMatch: 'full',
            canActivate: [AuthguardServiceService],
          },
        ],
      },
      {
        path: 'categoryGroup',
        children: [
          {
            path: '',
            component: CategoryGroupComponent,
            canActivate: [AuthguardServiceService],
          },
          {
            path: 'create',
            component: CreateCategoryGroupComponent,
            pathMatch: 'full',
            canActivate: [AuthguardServiceService],
          },
        ],
      },
    ],
  },
  {
    path: 'events',
    children: [
      {
        path: '',
        component: EventPreviewComponent,
        canActivate: [AuthguardServiceService],
      },
      {
        path: 'create',
        component: CreateEventComponent,
        pathMatch: 'full',
        canActivate: [AuthguardServiceService],
      },
      {
        path: 'details/:page',
        component: EventDetailsComponent,
        pathMatch: 'full',
        canActivate: [AuthguardServiceService],
      },
      {
        path: 'edit/:page',
        component: EventEditComponent,
        pathMatch: 'full',
        canActivate: [AuthguardServiceService],
      },
      {
        path: 'copy-event/:page',
        component: CopyEventComponent,
        canActivate: [AuthguardServiceService],
      },
    ],
  },
  {
    path: 'resources',
    children: [
      {
        path: 'articles',
        children: [
          {
            path: '',
            component: ArticlesComponent,
            canActivate: [AuthguardServiceService],
          },
          {
            path: 'article-details/:page',
            component: ArticlesDetailComponent,
            pathMatch: 'full',
            canActivate: [AuthguardServiceService],
          },
          {
            path: 'article-edit/:page',
            component: ArticleEditComponent,
            pathMatch: 'full',
            canActivate: [AuthguardServiceService],
          },
          {
            path: 'article-create',
            pathMatch: 'full',
            component: ArticleCreateComponent,
            canActivate: [AuthguardServiceService],
          },
        ],
      },
      {
        path: 'blogs',
        children: [
          {
            path: '',
            component: BlogsComponent,
            canActivate: [AuthguardServiceService],
          },
          {
            path: 'blog-detail/:page',
            component: BlogDetailComponent,
            pathMatch: 'full',
            canActivate: [AuthguardServiceService],
          },
          {
            path: 'blog-edit/:page',
            component: EditBlogComponent,
            pathMatch: 'full',
            canActivate: [AuthguardServiceService],
          },
          {
            path: 'blog-create',
            component: CreateBlogComponent,
            pathMatch: 'full',
            canActivate: [AuthguardServiceService],
          },
          {
            path: 'authors',
            component: AuthorsComponent,
            canActivate: [AuthguardServiceService],
          },
          {
            path: 'author-create/:page',
            component: CreateAuthorComponent,
            canActivate: [AuthguardServiceService],
          },
          {
            path: 'author-detail/:page',
            component: AuthorDetailComponent,
            canActivate: [AuthguardServiceService],
          },
        ],
      },
      {
        path: 'cases',
        children: [
          {
            path: '',
            component: CaseStudiesComponent,
            canActivate: [AuthguardServiceService],
          },
          {
            path: 'view-cases/:page',
            component: ViewCasesComponent,
            pathMatch: 'full',
            canActivate: [AuthguardServiceService],
          },
          {
            path: 'edit-cases/:page',
            component: CasesEditComponent,
            pathMatch: 'full',
            canActivate: [AuthguardServiceService],
          },
          {
            path: 'create-cases',
            component: CasesCreateComponent,
            pathMatch: 'full',
            canActivate: [AuthguardServiceService],
          },
        ],
      },
      {
        path: 'whitepapers',
        children: [
          {
            path: '',
            component: WhitepapersComponent,
            canActivate: [AuthguardServiceService],
          },
          {
            path: 'white-details/:page',
            component: WhitepaperDetailComponent,
            pathMatch: 'full',
            canActivate: [AuthguardServiceService],
          },
          {
            path: 'white-edit/:page',
            component: WhitepaperEditComponent,
            pathMatch: 'full',
            canActivate: [AuthguardServiceService],
          },
          {
            path: 'white-create',
            component: WhitepaperCreateComponent,
            pathMatch: 'full',
            canActivate: [AuthguardServiceService],
          },
        ],
      },
      {
        path: 'testimonials',
        children: [
          {
            path: '',
            component: TestimonialsComponent,
            canActivate: [AuthguardServiceService],
          },
          // {
          //   path: 'view-testimonials/:page',
          //   component: WhitepaperDetailComponent,
          //   pathMatch: 'full',
          //   canActivate: [AuthguardServiceService],
          // },
          // {
          //   path: 'white-edit/:page',
          //   component: WhitepaperEditComponent,
          //   pathMatch: 'full',
          //   canActivate: [AuthguardServiceService],
          // },
          {
            path: 'create-testimonials/:page',
            component: CreateTestimonialsComponent,
            pathMatch: 'full',
            canActivate: [AuthguardServiceService],
          },
        ],
      },
      {
        path: 'news',
        children: [
          {
            path: '',
            component: NewsComponent,
            canActivate: [AuthguardServiceService],
          },
          {
            path: 'view-news/:page',
            component: NewsViewComponent,
            pathMatch: 'full',
            canActivate: [AuthguardServiceService],
          },
          {
            path: 'edit-news/:page',
            component: NewsEditComponent,
            pathMatch: 'full',
            canActivate: [AuthguardServiceService],
          },
          {
            path: 'create-news',
            component: CreateNewsComponent,
            pathMatch: 'full',
            canActivate: [AuthguardServiceService],
          },
        ],
      },
      {
        path: 'videos',
        children: [
          {
            path: '',
            component: VideosPreviewComponent,
            canActivate: [AuthguardServiceService],
          },
          {
            path: 'videos-detail/:page',
            component: VideosDetailsComponent,
            pathMatch: 'full',
            canActivate: [AuthguardServiceService],
          },
          {
            path: 'videos-update/:page',
            component: VideosUpdateComponent,
            pathMatch: 'full',
            canActivate: [AuthguardServiceService],
          },
          {
            path: 'videos-create',
            component: VideosCreateComponent,
            pathMatch: 'full',
            canActivate: [AuthguardServiceService],
          },
        ],
      },
    ],
  },
  {
    path: 'jobs',
    children: [
      {
        path: '',
        component: JobsComponent,
        canActivate: [AuthguardServiceService],
      },
    ],
  },
  {
    path: 'user-management',
    children: [
      {
        path: 'user',
        children: [
          {
            path: '',
            component: UsersComponent,
            canActivate: [AuthguardServiceService, RoleguardServiceService],
          },
          {
            path: 'create',
            component: CreateUserComponent,
            pathMatch: 'full',
            canActivate: [AuthguardServiceService, RoleguardServiceService],
          },
          {
            path: 'details/:page',
            component: UserDetailComponent,
            pathMatch: 'full',
            canActivate: [AuthguardServiceService, RoleguardServiceService],
          },
        ],
      },
      {
        path: 'roles',
        children: [
          {
            path: '',
            component: RolesComponent,
            canActivate: [AuthguardServiceService, RoleguardServiceService],
          },
          {
            path: 'create',
            component: CreateRoleComponent,
            pathMatch: 'full',
            canActivate: [AuthguardServiceService, RoleguardServiceService],
          },
          {
            path: 'create/:page',
            component: CreateRoleComponent,
            canActivate: [AuthguardServiceService, RoleguardServiceService],
          },
        ],
      },
    ],
  },
  {
    path: 'notification-management',
    children: [
      {
        path: 'notification',
        children: [
          {
            path: '',
            component: NotificationsComponent,
            canActivate: [AuthguardServiceService],
          },
          {
            path: 'create-notification',
            pathMatch: 'full',
            component: CreateNotificationComponent,
            canActivate: [AuthguardServiceService],
          },
          {
            path: 'update-notification/:page',
            pathMatch: 'full',
            component: EditNotificationComponent,
            canActivate: [AuthguardServiceService],
          },
          {
            path: 'notification-details/:page',
            pathMatch: 'full',
            component: DetailNotificationComponent,
            canActivate: [AuthguardServiceService],
          },
        ],
      },
      {
        path: 'campaign',
        component: CampaignComponent,
        canActivate: [AuthguardServiceService],
      },
    ],
  },
  {
    path: 'participants',
    children: [
      {
        path: ':page/:name',
        pathMatch: 'full',
        component: ParticipantsPreviewComponent,
        canActivate: [AuthguardServiceService],
      },
      {
        path: '',
        component: ParticipantsPreviewComponent,
        canActivate: [AuthguardServiceService],
      },
      {
        path: 'participant-details/:page/:name',
        pathMatch: 'full',
        component: ViewParticipantsComponent,
        canActivate: [AuthguardServiceService],
      },
      {
        path: 'participant-add/:page/:name',
        pathMatch: 'full',
        component: CreateParticipantsComponent,
        canActivate: [AuthguardServiceService],
      },
    ],
  },
  {
    path: 'speakers',
    children: [
      {
        path: '',
        component: SpeakersPreviewComponent,
        canActivate: [AuthguardServiceService],
      },
      {
        path: 'create-speaker',
        pathMatch: 'full',
        component: SpeakerCreateComponent,
        canActivate: [AuthguardServiceService],
      },
      {
        path: 'speaker-update/:page',
        pathMatch: 'full',
        component: SpeakerEditComponent,
        canActivate: [AuthguardServiceService],
      },
      {
        path: 'speaker-details/:page',
        pathMatch: 'full',
        component: SpeakerDetailsComponent,
        canActivate: [AuthguardServiceService],
      },
    ],
  },
  {
    path: 'home-config',
    component: ConfigurationComponent,
    canActivate: [AuthguardServiceService],
  },
  {
    path: 'home',
    component: LandingPageComponent,
    canActivate: [AuthguardServiceService],
  },
  {
    path: 'cloud-service',
    component: ListCloudServicesComponent,
    canActivate: [AuthguardServiceService],
  },
  {
    path: 'cloud-service-form',
    component: CreateFormComponent,
    canActivate: [AuthguardServiceService],
  },
  {
    path: 'event-data',
    children: [
      {
        path: '',
        component: EventDataComponent,
        canActivate: [AuthguardServiceService],
      },
      {
        path: 'joinee-data',
        component: JoineeDataComponent,
        pathMatch: 'full',
        canActivate: [AuthguardServiceService],
      },
      { path: 'invitee-data', component: InviteesDataComponent, pathMatch: 'full', canActivate: [AuthguardServiceService] },
    ],
  },
  {
    path: 'resource-data',
    component: ResourceDataComponent,
    canActivate: [AuthguardServiceService],
  },
  {
    path: 'user-data',
    component: UserDataComponent,
    canActivate: [AuthguardServiceService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
