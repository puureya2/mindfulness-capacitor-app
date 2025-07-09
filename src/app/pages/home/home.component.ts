import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterModule],
  template: `
    <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-200 via-purple-100 to-indigo-200 p-6 text-center">
      <h1 class="text-4xl font-bold mb-6">Mindful Minute</h1>
      <p class="mb-8 text-lg">Take a deep breath. Choose your 1-minute mindfulness session:</p>

      <div class="space-y-4 w-full max-w-sm">
        <a routerLink="/session/breathing" class="block py-4 bg-teal-500 text-white rounded-xl shadow hover:bg-teal-600 transition">🫁 Breathing</a>
        <a routerLink="/session/affirmation" class="block py-4 bg-purple-500 text-white rounded-xl shadow hover:bg-purple-600 transition">💬 Affirmation</a>
        <a routerLink="/session/gratitude" class="block py-4 bg-yellow-500 text-white rounded-xl shadow hover:bg-yellow-600 transition">🙏 Gratitude</a>
      </div>
    </div>
  `
})
export class HomeComponent {}
