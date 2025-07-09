import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="result-container">
      <div class="result-card">
        <div class="celebration-particles">
          <div class="particle" *ngFor="let particle of particles" 
               [style.left.px]="particle.x" 
               [style.top.px]="particle.y"
               [style.animation-delay]="particle.delay + 's'"></div>
        </div>
        
        <div class="result-content">
          <div class="completion-badge">
            <div class="badge-icon">{{ getSessionIcon() }}</div>
            <div class="badge-text">Complete!</div>
          </div>
          
          <h2 class="result-title">{{ getResultTitle() }}</h2>
          <p class="result-message">{{ getResultMessage() }}</p>
          
          <div class="session-stats">
            <div class="stat">
              <div class="stat-value">{{ duration }}s</div>
              <div class="stat-label">Duration</div>
            </div>
            <div class="stat">
              <div class="stat-value">{{ getSessionCount() }}</div>
              <div class="stat-label">{{ sessionType === 'breathing' ? 'Breaths' : 'Messages' }}</div>
            </div>
          </div>
          
          <div class="result-actions">
            <button class="pixel-button primary" (click)="goHome()">
              Back to Home
            </button>
            <button class="pixel-button secondary" (click)="restartSession()">
              {{ sessionType === 'breathing' ? 'Breathe Again' : 'Continue ' + (sessionType === 'affirmation' ? 'Affirming' : 'Gratitude') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .result-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .result-card {
      background: #2a2a2a;
      border: 4px solid #fff;
      padding: 40px;
      text-align: center;
      position: relative;
      overflow: hidden;
      max-width: 500px;
      width: 100%;
      box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
    }

    .celebration-particles {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .particle {
      position: absolute;
      width: 6px;
      height: 6px;
      background: #ffd700;
      border-radius: 50%;
      animation: celebrate 3s infinite ease-in-out;
    }

    @keyframes celebrate {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; }
      100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
    }

    .result-content {
      position: relative;
      z-index: 10;
    }

    .completion-badge {
      margin-bottom: 30px;
      animation: bounceIn 0.8s ease-out;
    }

    @keyframes bounceIn {
      0% { transform: scale(0); opacity: 0; }
      50% { transform: scale(1.2); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }

    .badge-icon {
      font-size: 40px;
      margin-bottom: 10px;
      filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
    }

    .badge-text {
      font-family: 'Press Start 2P', monospace;
      font-size: 16px;
      color: #4ae24a;
      text-shadow: 2px 2px 0px #000;
    }

    .result-title {
      font-family: 'Press Start 2P', monospace;
      color: #fff;
      font-size: 18px;
      margin-bottom: 15px;
      text-shadow: 2px 2px 0px #000;
    }

    .result-message {
      color: #ccc;
      font-size: 12px;
      margin-bottom: 30px;
      line-height: 1.6;
      max-width: 350px;
      margin-left: auto;
      margin-right: auto;
    }

    .session-stats {
      display: flex;
      justify-content: center;
      gap: 40px;
      margin-bottom: 40px;
    }

    .stat {
      text-align: center;
    }

    .stat-value {
      font-family: 'Press Start 2P', monospace;
      font-size: 24px;
      color: #4ae24a;
      margin-bottom: 5px;
      text-shadow: 2px 2px 0px #000;
    }

    .stat-label {
      font-family: 'Press Start 2P', monospace;
      font-size: 8px;
      color: #ccc;
      text-transform: uppercase;
    }

    .result-actions {
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
      font-size: 10px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .pixel-button:hover {
      transform: translateY(-2px);
    }

    .pixel-button.primary {
      background: #4ae24a;
      color: #000;
    }

    .pixel-button.primary:hover {
      background: #5af25a;
      box-shadow: 0 0 15px rgba(74, 226, 74, 0.5);
    }

    .pixel-button.secondary:hover {
      background: #5a5a5a;
    }
  `]
})
export class ResultComponent implements OnInit {
  sessionType: string = '';
  duration: number = 0;
  particles: {x: number, y: number, delay: number}[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.sessionType = params['type'] || '';
      this.duration = params['duration'] || 0;
    });
    
    this.generateParticles();
  }

  generateParticles() {
    for (let i = 0; i < 12; i++) {
      this.particles.push({
        x: Math.random() * 460,
        y: Math.random() * 200 + 300,
        delay: Math.random() * 2
      });
    }
  }

  getSessionIcon(): string {
    switch(this.sessionType) {
      case 'breathing': return '🫁';
      case 'affirmation': return '✨';
      case 'gratitude': return '🙏';
      default: return '🎉';
    }
  }

  getResultTitle(): string {
    switch(this.sessionType) {
      case 'breathing': return 'Breathwork Complete';
      case 'affirmation': return 'Affirmations Complete';
      case 'gratitude': return 'Gratitude Practice Complete';
      default: return 'Session Complete';
    }
  }

  getResultMessage(): string {
    switch(this.sessionType) {
      case 'breathing': return 'You have taken time to center yourself through mindful breathing. Your mind and body are now more aligned and peaceful.';
      case 'affirmation': return 'You have filled your mind with positive affirmations. These powerful thoughts will continue to nurture your self-confidence and well-being.';
      case 'gratitude': return 'You have cultivated a grateful heart. This practice helps shift your perspective toward abundance and joy in your daily life.';
      default: return 'You have completed your mindfulness session.';
    }
  }

  getSessionCount(): number {
    switch(this.sessionType) {
      case 'breathing': return Math.floor(this.duration / 6); // Assuming 6 seconds per breath cycle
      case 'affirmation':
      case 'gratitude': return Math.floor(this.duration / 10); // Rough estimate of messages seen
      default: return 1;
    }
  }

  goHome() {
    this.router.navigate(['/']);
  }

  restartSession() {
    this.router.navigate(['/session', this.sessionType]);
  }
}
