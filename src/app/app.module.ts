import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http'
import { MockerModule } from '../../projects/mocker/src/lib/mocker.module'
import { Mock } from './mock'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MockerModule.forRoot(Mock),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
