import { Directive, Input, ElementRef, Renderer2, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appSkeleton]'
})
export class SkeletonDirective {
  @Input() showLoader:any = '';
  @Input() skeletonClass: string = 'skeleton-loader';
  @Input() skeletonWidth: string = '100%';
  @Input() skeletonHeight: string = '20px';
  @Input() skeletonColor: string = '#e0e0e0';
  @Input() skeletonAnimation: string = 'pulse';
  @Input() skeletonBorderRadius: string = '4px';
  @Input() skeletonMargin: string = '0';
  @Input() skeletonPadding: string = '0';
  @Input() skeletonBoxShadow: string = 'none';
  @Input() skeletonBackgroundImage: string = 'none';
  @Input() skeletonBackgroundSize: string = 'auto';
  @Input() skeletonBackgroundPosition: string = 'center';
  @Input() skeletonBackgroundRepeat: string = 'no-repeat';
  @Input() skeletonMinHeight: string = 'auto';
  @Input() skeletonMaxHeight: string = 'none';
  @Input() skeletonMinWidth: string = 'auto';
  @Input() skeletonMaxWidth: string = 'none';
  @Input() skeletonDisplay: string = 'block';

  private skeletonElement: HTMLElement | null = null;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.showLoader) {
      this.renderSkeletonLoader();
    } else {
      this.removeSkeletonLoader();
    }
  }

  private renderSkeletonLoader() {
    this.skeletonElement = this.renderer.createElement('div');
    this.renderer.addClass(this.skeletonElement, this.skeletonClass);
    this.applySkeletonStyles();

    this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'none');
    this.renderer.insertBefore(this.renderer.parentNode(this.elementRef.nativeElement), this.skeletonElement, this.elementRef.nativeElement);
  }

  private removeSkeletonLoader() {
    if (this.skeletonElement) {
      const parent = this.renderer.parentNode(this.skeletonElement);
      this.renderer.insertBefore(parent, this.elementRef.nativeElement, this.skeletonElement);
      this.renderer.removeChild(parent, this.skeletonElement);
      this.skeletonElement = null;
    }
    this.renderer.setStyle(this.elementRef.nativeElement, 'display', '');
  }

  private applySkeletonStyles() {
    if (this.skeletonElement) {
      this.renderer.setStyle(this.skeletonElement, 'width', this.skeletonWidth);
      this.renderer.setStyle(this.skeletonElement, 'height', this.skeletonHeight);
      this.renderer.setStyle(this.skeletonElement, 'background-color', this.skeletonColor);
      this.renderer.setStyle(this.skeletonElement, 'animation', this.getSkeletonAnimation());
      this.renderer.setStyle(this.skeletonElement, 'border-radius', this.skeletonBorderRadius);
      this.renderer.setStyle(this.skeletonElement, 'margin', this.skeletonMargin);
      this.renderer.setStyle(this.skeletonElement, 'padding', this.skeletonPadding);
      this.renderer.setStyle(this.skeletonElement, 'box-shadow', this.skeletonBoxShadow);
      this.renderer.setStyle(this.skeletonElement, 'background-image', this.skeletonBackgroundImage);
      this.renderer.setStyle(this.skeletonElement, 'background-size', this.skeletonBackgroundSize);
      this.renderer.setStyle(this.skeletonElement, 'background-position', this.skeletonBackgroundPosition);
      this.renderer.setStyle(this.skeletonElement, 'background-repeat', this.skeletonBackgroundRepeat);
      this.renderer.setStyle(this.skeletonElement, 'min-height', this.skeletonMinHeight);
      this.renderer.setStyle(this.skeletonElement, 'max-height', this.skeletonMaxHeight);
      this.renderer.setStyle(this.skeletonElement, 'min-width', this.skeletonMinWidth);
      this.renderer.setStyle(this.skeletonElement, 'max-width', this.skeletonMaxWidth);
      this.renderer.setStyle(this.skeletonElement, 'display', this.skeletonDisplay);
    }
  }

  private getSkeletonAnimation() {
    if (this.skeletonAnimation === 'pulse') {
      return 'skeleton-pulse 1.5s infinite';
    } else if (this.skeletonAnimation === 'wave') {
      return 'skeleton-wave 1.5s infinite';
    } else {
      return 'none';
    }
  }
}