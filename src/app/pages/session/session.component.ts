import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  standalone: true,
  selector: 'app-session',
  imports: [CommonModule, RouterModule],
  animations: [
    trigger('fadeText', [
      transition('visible => hidden', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ]),
      transition('hidden => visible', [
        style({ opacity: 0 }),
        animate('600ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ],
  template: `
    <div
      class="flex flex-col items-center justify-center min-h-screen p-6 bg-cover bg-center text-center space-y-8 transition-all duration-700"
      [ngStyle]="{ 'background-image': 'url(' + currentBg + ')' }"
    >

      <!-- Breathing -->
      <ng-container *ngIf="type === 'breathing'">
        <div class="relative w-64 h-64">
          <div class="absolute inset-0 rounded-full bg-blue-300 animate-breathe"></div>
        </div>
        <p class="text-2xl font-semibold pixel-font">Breathe...</p>
      </ng-container>

      <!-- Affirmation / Gratitude -->
      <ng-container *ngIf="type !== 'breathing' && currentText">
        <div [@fadeText]="fadeState" (@fadeText.done)="onFadeDone()">
          <p class="text-2xl font-medium pixel-font">{{ currentText.text }}</p>
          <p class="text-gray-700 mt-2 text-base pixel-font text-shadow">{{ currentText.subtext }}</p>
        </div>
      </ng-container>

      <p class="text-gray-600 text-sm font-mono">Time left: {{ timeLeft }}s</p>

      <button
        (click)="endSessionEarly()"
        class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Skip Session
      </button>
    </div>
  `,
  styles: [`
    .pixel-font {
      font-family: 'Press Start 2P', monospace;
    }
    .text-shadow {
      text-shadow: 1px 1px #ffffff80;
    }
  `]
})
export class SessionComponent implements OnInit, OnDestroy {
  type: 'breathing' | 'affirmation' | 'gratitude' = 'breathing';
  timeLeft = 60;
  intervalId: any;
  rotateId: any;

  currentText: { text: string; subtext: string } | null = null;
  nextText: { text: string; subtext: string } | null = null;
  fadeState: 'visible' | 'hidden' = 'hidden';

  backgrounds = [
    'assets/backgrounds/camp.jpg',
    'assets/backgrounds/mountain.jpg',
    'assets/backgrounds/mystical.jpg',
    'assets/backgrounds/ocean.jpg',
    'assets/backgrounds/park.jpg',
  ];
  currentBg = this.backgrounds[0];

  contentList: Record<string, { text: string; subtext: string }[]> = {
    affirmation: [
      { text: 'You are enough.', subtext: 'Just as you are, in this moment, you are complete.' },
      { text: 'You are doing great.', subtext: 'Progress matters more than perfection.' },
      { text: 'You are calm and in control.', subtext: 'Your breath is your anchor. You’ve got this.' },
      { text: 'You are worthy of kindness.', subtext: 'Let your self-talk reflect the compassion you deserve.' },
      { text: 'You grow stronger every day.', subtext: 'Challenges build resilience — and you’re rising.' }
    ],
    gratitude: [
      { text: 'Be grateful for your breath.', subtext: 'It’s always with you, grounding and steady.' },
      { text: 'Be grateful for your body.', subtext: 'It carries you through every experience, big and small.' },
      { text: 'Be grateful for the moment.', subtext: 'This now is full of quiet possibility.' },
      { text: 'Be grateful for your growth.', subtext: 'Each step, even backward, teaches something valuable.' },
      { text: 'Be grateful for kindness.', subtext: 'Given or received, it creates ripples of peace.' }
    ]
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type') as any ?? 'breathing';

    if (this.type === 'affirmation' || this.type === 'gratitude') {
      const items = this.contentList[this.type];
      let i = Math.floor(Math.random() * items.length);
      this.currentText = items[i];
      this.currentBg = this.backgrounds[i % this.backgrounds.length];

      setTimeout(() => {
        this.fadeState = 'visible';
      });

      this.rotateId = setInterval(() => {
        i = (i + 1) % items.length;
        this.setText(items[i], i);
      }, 20000);
    }

    this.intervalId = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.endSessionEarly();
      }
    }, 1000);
  }

  setText(item: { text: string; subtext: string }, index: number) {
    this.nextText = item;
    this.currentBg = this.backgrounds[index % this.backgrounds.length];
    this.fadeState = 'hidden';
  }

  onFadeDone() {
    if (this.fadeState === 'hidden' && this.nextText) {
      this.currentText = this.nextText;
      this.fadeState = 'visible';
    }
  }

  endSessionEarly() {
    clearInterval(this.intervalId);
    clearInterval(this.rotateId);
    this.router.navigate(['/result']);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    clearInterval(this.rotateId);
  }
}
