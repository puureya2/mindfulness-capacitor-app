import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SessionComponent } from './pages/session/session.component';
import { ResultComponent } from './pages/result/result.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'session/:type', component: SessionComponent },
  { path: 'result', component: ResultComponent }
];
