import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-server-info-box',
  standalone: true,
  template: `
    <div class="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 backdrop-blur-xl shadow-xl">
      <div class="flex items-start gap-2">
        <svg class="w-4 h-4 text-zinc-400 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-zinc-400 text-xs leading-relaxed">
          En caso de que el servidor no se encuentre disponible, puedes ver una preview en el repositorio dando
          <a href="https://github.com/osenpb/f_osenshop" target="_blank" class="text-zinc-200 hover:underline underline-offset-2">click aquí</a>
        </p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerInfoBoxComponent {}
