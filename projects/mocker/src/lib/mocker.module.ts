import { ModuleWithProviders, NgModule } from '@angular/core'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { MockInterceptor, MockRouter } from './mocker.service'


@NgModule()
export class MockerModule {
  static forRoot(VirtualRouter: { new(): void } | object): ModuleWithProviders {
    return {
      ngModule: MockerModule,
      providers: [
        { provide: MockRouter, useValue: VirtualRouter },
        { provide: HTTP_INTERCEPTORS, useClass: MockInterceptor, multi: true },
      ],
    }
  }
}
