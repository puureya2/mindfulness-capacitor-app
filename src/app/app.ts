import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SessionComponent } from './pages/session/session.component';
import { ResultComponent } from './pages/result/result.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    SessionComponent,
    ResultComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {}
