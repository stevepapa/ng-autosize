import { Input, AfterViewInit, ElementRef, HostListener, Directive, Inject, Renderer2, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: 'textarea[autosize]'
})

export class Autosize implements AfterViewInit {

  private el: HTMLElement;
  private _minHeight: string;
  private _maxHeight: string;
  private _lastHeight: number;
  private _clientWidth: number;

  @Input('minHeight')
  get minHeight(): string {
    return this._minHeight;
  }
  set minHeight(val: string) {
    this._minHeight = val;
    this.updateMinHeight();
  }

  @Input('maxHeight')
  get maxHeight(): string {
    return this._maxHeight;
  }
  set maxHeight(val: string) {
    this._maxHeight = val;
    this.updateMaxHeight();
  }

  @HostListener('window:resize', ['$event.target'])
    onResize(textArea: HTMLTextAreaElement): void {
      // Only apply adjustment if element width had changed.
      if (this.el.clientWidth === this._clientWidth) {
        return;
      }
      this._clientWidth = this.element.nativeElement.clientWidth;
      this.adjust();
    }

  @HostListener('input', ['$event.target'])
    onInput(textArea: HTMLTextAreaElement): void {
      this.adjust();
    }

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private renderer: Renderer2, public element: ElementRef){
    this.el = element.nativeElement;
    this._clientWidth = this.el.clientWidth;
  }

  ngAfterViewInit(): void {
    // set element resize allowed manually by user
    if (isPlatformBrowser(this.platformId)) {
      const style = window.getComputedStyle(this.el, null);
      if (style.resize === 'both') {
        this.renderer.setStyle(this.el, 'resize' ,'horizontal');
      }
      else if (style.resize === 'vertical') {
        this.renderer.setStyle(this.el, 'resize' ,'none');
      }
      // run first adjust
      this.adjust();
    }
  }

  adjust(): void {
    // perform height adjustments after input changes, if height is different
    if (this.el.style.height == this.element.nativeElement.scrollHeight + "px") {
      return;
    }
    this.renderer.setStyle(this.el, 'overflow', 'hidden');
    this.renderer.setStyle(this.el, 'height', this.el.scrollHeight + 'px');
  }

  updateMinHeight(): void {
    // Set textarea min height if input defined
    this.renderer.setStyle(this.el, 'minHeight', this._minHeight + 'px');
  }

  updateMaxHeight(): void {
    // Set textarea max height if input defined
    this.renderer.setStyle(this.el, 'maxHeight', this._maxHeight + 'px');
  }

}
