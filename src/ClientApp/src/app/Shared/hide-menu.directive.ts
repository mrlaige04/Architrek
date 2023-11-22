import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Directive({
  selector: '[hideMenu]'
})
export class HideMenuDirective implements OnInit {
  @Input() appHideOnRoute: string[] = [];
  constructor(private elementRef: ElementRef, private renderer: Renderer2, private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url;

        if (this.appHideOnRoute.includes(currentRoute) || this.appHideOnRoute.find(route => new RegExp(route).test(currentRoute))) {
          this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'none');
        } else {
          this.renderer.removeStyle(this.elementRef.nativeElement, 'display');
        }
      }
    });
  }
}
