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
    this.check(router)
    
    this.roads = MockInterceptor.compare(this.router)
    this.base = (this.router.host || '') + (this.router.path || '')
  }
  
  check(router: MockRouter): void {
    if (typeof router === 'function') {
      this.router = new (<any>router)()
    } else if (typeof router === 'object') {
      this.router = <any>router
    } else {
      console.warn('Mock list must be a function or object.')
    }
    if (!this.router.host) {
      console.warn('you need set host url in mock list.')
    }
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

