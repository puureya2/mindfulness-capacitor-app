import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <div class="pixel-card">
        <div class="stars">
          <div class="star" *ngFor="let star of stars" [style.left.px]="star.x" [style.top.px]="star.y"></div>
        </div>
        
        <h1 class="title">Mindful Minutes</h1>
        <p class="subtitle">Choose your 60-second journey</p>
        
        <div class="session-buttons">
          <button class="pixel-button breathing" (click)="startSession('breathing')">
            <div class="button-icon">🫁</div>
            <span>Breathe</span>
          </button>
          
          <button class="pixel-button affirmation" (click)="startSession('affirmation')">
            <div class="button-icon">✨</div>
            <span>Affirm</span>
          </button>
          
          <button class="pixel-button gratitude" (click)="startSession('gratitude')">
            <div class="button-icon">🙏</div>
            <span>Gratitude</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
    }

    .pixel-card {
      background: #2a2a2a;
      border: 4px solid #fff;
      border-radius: 0;
      padding: 40px;
      text-align: center;
      position: relative;
      overflow: hidden;
      max-width: 400px;
      width: 100%;
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
    }

    .stars {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .star {
      position: absolute;
      width: 2px;
      height: 2px;
      background: #fff;
      animation: twinkle 2s infinite;
    }

    @keyframes twinkle {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 1; }
    }

    .title {
      font-family: 'Press Start 2P', monospace;
      color: #fff;
      font-size: 20px;
      margin-bottom: 10px;
      text-shadow: 2px 2px 0px #000;
    }

    .subtitle {
      color: #ccc;
      font-size: 12px;
      margin-bottom: 30px;
      font-family: 'Press Start 2P', monospace;
    }

    .session-buttons {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .pixel-button {
      background: #4a4a4a;
      border: 2px solid #fff;
      color: #fff;
      padding: 15px 20px;
      font-family: 'Press Start 2P', monospace;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      gap: 15px;
      position: relative;
      overflow: hidden;
    }

    .pixel-button:hover {
      background: #5a5a5a;
      transform: translateY(-2px);
    }

    .pixel-button:active {
      transform: translateY(0);
    }

    .button-icon {
      font-size: 16px;
      filter: grayscale(1);
    }

    .pixel-button.breathing:hover {
      background: #4a90e2;
      box-shadow: 0 0 15px rgba(74, 144, 226, 0.5);
    }

    .pixel-button.affirmation:hover {
      background: #e2a04a;
      box-shadow: 0 0 15px rgba(226, 160, 74, 0.5);
    }

    .pixel-button.gratitude:hover {
      background: #4ae24a;
      box-shadow: 0 0 15px rgba(74, 226, 74, 0.5);
    }

    .pixel-button:hover .button-icon {
      filter: grayscale(0);
    }
  `]
})
export class HomeComponent {
  stars: {x: number, y: number}[] = [];

  constructor(private router: Router) {
    this.generateStars();
  }

  generateStars() {
    for (let i = 0; i < 20; i++) {
      this.stars.push({
        x: Math.random() * 360,
        y: Math.random() * 400
      });
    }
  }

  startSession(type: string) {
    this.router.navigate(['/session', type]);
  }
}
