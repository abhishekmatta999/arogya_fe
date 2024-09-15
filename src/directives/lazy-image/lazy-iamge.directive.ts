import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[imgLazyLoad]'
})
export class LazyIamgeDirective {

  @Input('imgLazyLoad') imageUrl!: string;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    this.renderer.setStyle(this.imageElement, 'opacity', '0');
    this.checkImageIntersection();
  }

  @HostListener('load') onImageLoad() {
    this.renderer.setStyle(this.imageElement, 'opacity', '1');
  }

  private checkImageIntersection() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.renderer.setProperty(this.imageElement, 'src', this.imageUrl);
          observer.unobserve(this.imageElement);
        }
      });
    });

    imageObserver.observe(this.imageElement);
  }

  private get imageElement() {
    return this.elementRef.nativeElement as HTMLImageElement;
  }

}
