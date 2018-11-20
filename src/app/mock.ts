
export class Mock {
  host: string = 'http://mock.com'
  
  '/test'(req: Request): any {
    return { m: 'ok' }
  }
  
}
