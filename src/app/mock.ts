
// export class Mock {
//   host: string = 'http://mock.com'
//
//   '/test'(req: Request): any {
//     return { m: 'ok' }
//   }
//
// }

export const Mock = {
  host: 'http://mock.com',
  
  '/test': () => {
    return { m: 'ok' }
  }
}
