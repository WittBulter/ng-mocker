## ng-mocker
10 seconds to build virtual interfaces in angular.


### Enjoy

My sister was still in primary school, but it took her only 1 minutes to learn how to use it. It's too simple.

1. import:

  install: `npm i --save ng-mocker`
  ```ts
  // in app.module.ts
  import { MockerModule } from 'ng-mocker'

  // ...
  imports: [
    HttpClientModule,
    MockerModule.forRoot(Mocks),
  ],
  ```

2. create your api:

```ts
export class Mocks {

  host: string = 'http://github.com'

  '/users/options'(req): any {
    return { message: 'ok!' }
  }
}

```

> when you request `/users/options` with angular, `{ message: 'ok!' }` will be returned.


### LICENSE

[**MIT**](LICENSE)



