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



const routes: Routes = [
  { path : '', component : LoginComponent},
  { path: 'login', component: LoginComponent },
  { path: 'events', component: EventPreviewComponent },
  { path: 'details', component: EventDetailsComponent },
  { path: 'create', component: CreateEventComponent },
  { path: 'edit', component: EventEditComponent},
  { path: 'articles', component: ArticlesComponent},
  { path: 'blogs', component: BlogsComponent},
  { path: 'cases', component: CaseStudiesComponent},
  { path: 'testimonials', component: TestimonialsComponent},
  { path: 'whitepapers', component: WhitepapersComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
