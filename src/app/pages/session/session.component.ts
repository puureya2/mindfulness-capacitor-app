import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface SessionData {
  type: string;
  messages?: {text: string, subtext: string, background: string}[];
}


@Component({
  selector: 'app-session',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="session-container" [ngClass]="sessionType" (click)="onSessionClick()">
      <div class="pixel-background" [style.background-image]="'url(' + currentBackground + ')'" style="background-size: cover; background-position: center;"></div>

      <div class="particles" *ngIf="sessionType !== 'breathing'">
        <div class="particle" *ngFor="let particle of particles" 
             [style.left.px]="particle.x" 
             [style.top.px]="particle.y"
             [style.animation-delay]="particle.delay + 's'"></div>
      </div>

      <div class="session-content">
        <div class="timer-display">
          <div class="timer-circle" style="transform: scale(2);">
            <svg width="60" height="60">
              <circle cx="30" cy="30" r="25" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="4"/>
              <circle cx="30" cy="30" r="25" fill="none" stroke="#fff" stroke-width="4" 
                      stroke-linecap="round" stroke-dasharray="157" 
                      [style.stroke-dashoffset]="157 - (timerProgress * 157 / 283)"
                      style="transform: rotate(-90deg); transform-origin: center;"/>
            </svg>
            <div class="timer-text" style="font-size: 18px;">{{ timeLeft }}s</div>
          </div>
        </div>

        <div class="session-main" *ngIf="sessionType === 'breathing'">
          <div class="breathing-circle animate-grow-shrink" style="margin-left: 30px;"></div>
          <div class="breathing-text animate-grow-shrink">breathe...</div>
        </div>

        <div class="session-main" *ngIf="sessionType !== 'breathing'">
          <div class="message-text fade-in-text" style="font-size: 30px; text-align: center;">{{ currentMessage.text }}</div>
          <div class="message-subtext fade-in-text" style="font-size: 15px; text-align: center;">{{ currentMessage.subtext }}</div>
          <div class="click-indicator" *ngIf="!isAutoAdvancing" style="font-size: 12px; bottom: 130px;">Click anywhere to continue</div>
        </div>

        <button class="end-session-btn" (click)="endSession($event)" style="bottom: 60px;">End Session</button>
      </div>
    </div>
  `,
  styles: [`
    @keyframes grow-shrink {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(0.5); }
    }

    @keyframes fadeInOnly {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .fade-in-text {
      animation: fadeInOnly 1.0s ease-in;
    }

    .animate-grow-shrink {
      animation: grow-shrink 6s infinite ease-in-out;
    }

    .session-container {
      position: relative;
      width: 100vw;
      height: 90vh;
      overflow: hidden;
      cursor: pointer;
    }

    .pixel-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-size: cover;
      background-position: center;
      filter: brightness(0.45);
    }

    .particles {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .particle {
      position: absolute;
      width: 4px;
      height: 4px;
      background: rgba(255, 255, 255, 0.8);
      animation: float 4s infinite ease-in-out;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0; }
      50% { transform: translateY(-50px) rotate(180deg); opacity: 1; }
    }

    .session-content {
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 90vh;
      padding: 20px;
      text-align: center;
    }

    .timer-display {
      position: absolute;
      top: 40px;
      right: 50px;
    }

    .timer-circle {
      position: relative;
      width: 60px;
      height: 60px;
    }

    .timer-circle svg {
      position: absolute;
      top: 0;
      left: 0;
    }

    .timer-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-family: 'Press Start 2P', monospace;
      text-shadow: 1px 1px 0px #000;
    }

    .breathing-circle {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      margin-bottom: 60px;
    }

    .breathing-text {
      font-family: 'Press Start 2P', monospace;
      font-size: 22px;
      color: #fff;
      text-shadow: 2px 2px 0px #000;
    }

    .message-text {
      font-family: 'Press Start 2P', monospace;
      color: #fff;
      text-shadow: 2px 2px 0px #000;
      margin-bottom: 20px;
      max-width: 90vw;
      line-height: 1.5;
    }

    .message-subtext {
      font-family: 'Press Start 2P', monospace;
      color: #ccc;
      text-shadow: 1px 1px 0px #000;
      margin-bottom: 30px;
      max-width: 80vw;
      line-height: 1.4;
    }

    .click-indicator {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      color: rgba(255, 255, 255, 0.7);
      font-family: 'Press Start 2P', monospace;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }

    .end-session-btn {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.7);
      border: 2px solid #fff;
      color: #fff;
      padding: 10px 20px;
      font-family: 'Press Start 2P', monospace;
      font-size: 10px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .end-session-btn:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  `]
})

export class SessionComponent implements OnInit, OnDestroy {
  sessionType: string = '';
  timeLeft: number = 60;
  timerProgress: number = 0;
  currentMessageIndex: number = 0;
  currentMessage: any = {};
  currentBackground: string = '';
  fadeIn: boolean = false;
  isAutoAdvancing: boolean = false;
  particles: {x: number, y: number, delay: number}[] = [];
  
  // Breathing session
  isInhaling: boolean = true;
  breathingText: string = 'Breathe in...';
  
  private timer: any;
  private breathingTimer: any;
  private messageTimer: any;

  affirmations = [
    { text: 'You are enough.', subtext: '- just as you are, you are perfect -', background: '/assets/backgrounds/mountain.jpg' },
    { text: 'You are worthy of love.', subtext: '- embrace your beautiful soul -', background: '/assets/backgrounds/mystical.jpg' },
    { text: 'You are strong.', subtext: '- you have overcome before -', background: '/assets/backgrounds/park.jpg' },
    { text: 'You are growing.', subtext: '- every day brings new wisdom -', background: '/assets/backgrounds/camp.jpg' },
    { text: 'You are peaceful.', subtext: '- find calm in this moment -', background: '/assets/backgrounds/ocean.jpg' }
  ];

  gratitudes = [
    { text: 'I am grateful for this breath.', subtext: '- life flows through me -', background: '/assets/backgrounds/mountain.jpg' },
    { text: 'I am grateful for this moment.', subtext: '- right here, right now -', background: '/assets/backgrounds/mystical.jpg' },
    { text: 'I am grateful for my journey.', subtext: '- every step has led me here -', background: '/assets/backgrounds/camp.jpg' },
    { text: 'I am grateful for love.', subtext: '- it surrounds and fills me -', background: '/assets/backgrounds/park.jpg' },
    { text: 'I am grateful for growth.', subtext: '- I am becoming who I am meant to be -', background: '/assets/backgrounds/ocean.jpg' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.sessionType = params['type'];
      this.initializeSession();
    });
  }

  ngOnDestroy() {
    this.clearTimers();
  }

  initializeSession() {
    this.generateParticles();
    this.startTimer();
    
    if (this.sessionType === 'breathing') {
      this.currentBackground = '/assets/backgrounds/park.jpg';
      this.startBreathingCycle();
    } else {
      this.initializeMessageSession();
    }
  }

  generateParticles() {
    this.particles = [];
    for (let i = 0; i < 15; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        delay: Math.random() * 4
      });
    }
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.timeLeft--;
      this.timerProgress = ((60 - this.timeLeft) / 60) * 283;
      
      if (this.timeLeft <= 0) {
        this.endSession();
      }
    }, 1000);
  }

  startBreathingCycle() {
    this.breathingTimer = setInterval(() => {
      this.isInhaling = !this.isInhaling;
      this.breathingText = this.isInhaling ? 'Breathe in...' : 'Breathe out...';
    }, 3000);
  }

  initializeMessageSession() {
    const messages = this.sessionType === 'affirmation' ? this.affirmations : this.gratitudes;
    
    // Start from a random message
    this.currentMessageIndex = Math.floor(Math.random() * messages.length);
    this.currentMessage = messages[this.currentMessageIndex];
    this.currentBackground = this.currentMessage.background;
    this.fadeIn = true;
    
    // Auto-advance after 60 seconds if user doesn't click
    this.messageTimer = setTimeout(() => {
      this.nextMessage();
    }, 60000);
  }

  nextMessage() {
    if (this.sessionType === 'breathing') return;
    
    const messages = this.sessionType === 'affirmation' ? this.affirmations : this.gratitudes;
    this.currentMessageIndex = (this.currentMessageIndex + 1) % messages.length;
    this.currentMessage = messages[this.currentMessageIndex];
    this.currentBackground = this.currentMessage.background;
    this.fadeIn = false;
    
    setTimeout(() => {
      this.fadeIn = true;
    }, 100);
    
    // Clear existing timer and set new one
    if (this.messageTimer) {
      clearTimeout(this.messageTimer);
    }
    this.messageTimer = setTimeout(() => {
      this.nextMessage();
    }, 60000);
  }

  onSessionClick() {
    if (this.sessionType !== 'breathing') {
      this.nextMessage();
    }
  }

  endSession(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.clearTimers();
    this.router.navigate(['/result'], { 
      queryParams: { 
        type: this.sessionType,
        duration: 60 - this.timeLeft
      }
    });
  }

  clearTimers() {
    if (this.timer) clearInterval(this.timer);
    if (this.breathingTimer) clearInterval(this.breathingTimer);
    if (this.messageTimer) clearTimeout(this.messageTimer);
  }
}