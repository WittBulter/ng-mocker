import { Component, OnInit } from '@angular/core'
import { AppService } from './app.service'
import { tap } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [AppService],
})
export class AppComponent implements OnInit {
  
  constructor(
    private appService: AppService,
  ) {
  }
  
  ngOnInit(): void {
    this.appService.findComments()
      .pipe(tap(res => {
        console.log('response', res)
      }))
      .subscribe()
  }

}
