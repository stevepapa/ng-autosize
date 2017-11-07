import { Input, AfterViewInit, ElementRef, HostListener, Directive } from '@angular/core';

@Directive({
  selector: 'textarea[autosize]'
})
export class ngAutosizeDirective implements AfterViewInit {
  private _el: HTMLElement;
  private _minHeight: string;
  private _maxHeight: string;
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
  onResize(): void {
    // Only apply adjustment if element width had changed.
    if (this._el.clientWidth === this._clientWidth) {
      return
    };
    this._clientWidth = this.element.nativeElement.clientWidth;
    this.adjust();
  }

  @HostListener('input', ['$event.target'])
  onInput(): void {
    this.adjust();
  }

  constructor(public element: ElementRef) {
    this._el = element.nativeElement;
    this._clientWidth = this._el.clientWidth;
  }

  ngAfterViewInit(): void {
    // set element resize allowed manually by user
    const style = window.getComputedStyle(this._el, undefined);
    if (style.resize === 'both') {
      this._el.style.resize = 'horizontal';
    } else if (style.resize === 'vertical') {
      this._el.style.resize = 'none';
    }
    // run first adjust
    this.adjust();
  }

  adjust(): void {
    // perform height adjustments after input changes, if height is different
    if (this._el.style.height == this.element.nativeElement.scrollHeight + 'px') {
      return;
    }
    this._el.style.overflow = 'hidden';
    this._el.style.height = 'auto';
    this._el.style.height = this._el.scrollHeight + 'px';
  }

  updateMinHeight(): void {
    // Set textarea min height if input defined
    this._el.style.minHeight = this._minHeight + 'px';
  }

  updateMaxHeight(): void {
    // Set textarea max height if input defined
    this._el.style.maxHeight = this._maxHeight + 'px';
  }
}
