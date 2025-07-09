import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-result',
  imports: [RouterModule],
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen bg-green-100 p-6 text-center space-y-6">
      <h2 class="text-3xl font-bold text-green-800">🌟 Session Complete</h2>
      <p class="text-lg text-green-700">Well done for taking a mindful minute.</p>
      <a routerLink="/" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Back Home</a>
    </div>
  `
})
export class ResultComponent {}
