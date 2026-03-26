import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServerInfoBoxComponent } from './server-info-box.component';


@Component({
  selector: 'app-auth-layout.component',
  imports: [RouterOutlet, ServerInfoBoxComponent],
  templateUrl: './auth-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayoutComponent { }
