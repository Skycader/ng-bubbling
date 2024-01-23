import { Component } from '@angular/core';
import { delay, tap, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'bubbling';

  public alert(event: MouseEvent, debug: string) {
    console.log('event', event.currentTarget, 'debug', debug);
    // event.stopPropagation();

    const target = event.target as HTMLElement;
    /* used to be srcElement before */
    const currentTarget = event.currentTarget as HTMLElement;
    timer(0)
      .pipe(
        tap(() => {
          target.style.outline = '4px dotted orange';
          if (target !== currentTarget)
            currentTarget.style.outline = '4px solid red';
        }),
        delay(1000),
        tap(() => {
          target.style.outline = '';

          currentTarget.style.outline = '';
        })
      )
      .subscribe();
  }
}
