import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { Injectable } from '@angular/core'

export type RouterMethods = {
  host?: string,
  path?: string,
  [key: string]: any,
}

@Injectable()
export class MockRouter {
}

@Injectable()
export class MockInterceptor implements HttpInterceptor {
  
  private router: RouterMethods
  private roads: any[]
  private base: string = ''
  
  static compare(routers: any): any {
    const sources: any[] = []
    for (const k in routers) {
      sources.push({ name: k, bind: routers[k] })
    }
    return sources
      .sort((pre, next) => pre.name.length - next.name.length)
      .map(source => {
        const name: string = source.name.replace(/\:\S+\//g, '\\S+/')
          .replace(/\:\S+$/, '\\S+')
        return Object.assign({}, source, {
          name: new RegExp(name),
        })
      })
  }
  
  constructor(
    router: MockRouter,
  ) {
    this.router = new (<any>router)()
    this.roads = MockInterceptor.compare(this.router)
    this.base = (this.router.host || '') + (this.router.path || '')
  }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes(this.base)) return next.handle(req)
    
    const key: string = req.url.split(this.base)
      .reverse()[0]
    const router = this.roads.find(road => road.name.test(key))
    if (!router) return next.handle(req)
    
    const result: any = typeof router.bind === 'function'
      ? router.bind(req)
      : `Error: not found function in ${key}`
    return of(new HttpResponse({ body: result }))
  }
  
}

