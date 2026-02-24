import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-success-modal',
  imports: [],
  styles: [
    `
    @keyframes progress-bar {
      0% { width: 0%; }
      100% { width: 100%; }
    }

    .animate-progress-bar {
      animation: progress-bar 4s linear forwards;
    }

    .animate-in {
      animation: fadeInZoom 0.6s ease-out forwards;
    }

    @keyframes fadeInZoom {
      from {
        opacity: 0;
        transform: scale(0.95) translateY(10px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }


    body.modal-open {
      overflow: hidden;
    }
    `
  ],
  templateUrl: './success-modal-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessModalOrderComponent {

  private router = inject(Router);

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/home/index']);
    }, 4000);
  }

}
