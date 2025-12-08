import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AutosizeDirective } from './autosize.directive';

@Component({
  standalone: true,
  imports: [AutosizeDirective],
  template: `<textarea autosize></textarea>`
})
class TestComponent {}

@Component({
  standalone: true,
  imports: [AutosizeDirective],
  template: `<textarea autosize [minHeight]="minHeight" [maxHeight]="maxHeight"></textarea>`
})
class TestComponentWithInputs {
  minHeight = '100';
  maxHeight = '300';
}

describe('AutosizeDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let textarea: DebugElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [TestComponent]
    }).createComponent(TestComponent);

    textarea = fixture.debugElement.query(By.css('textarea'));
    fixture.detectChanges();
  });

  it('should create the directive', () => {
    const directive = textarea.injector.get(AutosizeDirective);
    expect(directive).toBeTruthy();
  });

  it('should adjust height on initialization', () => {
    const element = textarea.nativeElement as HTMLTextAreaElement;
    fixture.detectChanges();

    expect(element.style.height).toBeTruthy();
  });

  it('should adjust height when input changes', () => {
    const element = textarea.nativeElement as HTMLTextAreaElement;
    const initialHeight = element.style.height;

    element.value = 'Line 1\nLine 2\nLine 3\nLine 4\nLine 5';
    element.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Height should have changed due to more content
    expect(element.style.height).not.toBe(initialHeight);
  });

  it('should set overflow to hidden', () => {
    const element = textarea.nativeElement as HTMLTextAreaElement;
    fixture.detectChanges();

    expect(element.style.overflow).toBe('hidden');
  });

  it('should handle window resize', () => {
    const element = textarea.nativeElement as HTMLTextAreaElement;
    const directive = textarea.injector.get(AutosizeDirective);
    spyOn(directive as any, 'adjust');

    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();

    // adjust should be called on resize
    expect((directive as any).adjust).toHaveBeenCalled();
  });

  it('should set resize style for textareas with both resize', () => {
    const element = textarea.nativeElement as HTMLTextAreaElement;
    element.style.resize = 'both';
    fixture.detectChanges();

    const directive = textarea.injector.get(AutosizeDirective);
    (directive as any).ngAfterViewInit();

    expect(element.style.resize).toBe('horizontal');
  });

  it('should set resize to none for textareas with vertical resize', () => {
    const element = textarea.nativeElement as HTMLTextAreaElement;
    element.style.resize = 'vertical';
    fixture.detectChanges();

    const directive = textarea.injector.get(AutosizeDirective);
    (directive as any).ngAfterViewInit();

    expect(element.style.resize).toBe('none');
  });

  describe('with minHeight and maxHeight inputs', () => {
    let fixtureWithInputs: ComponentFixture<TestComponentWithInputs>;
    let textareaWithInputs: DebugElement;

    beforeEach(() => {
      fixtureWithInputs = TestBed.configureTestingModule({
        imports: [TestComponentWithInputs]
      }).createComponent(TestComponentWithInputs);

      textareaWithInputs = fixtureWithInputs.debugElement.query(By.css('textarea'));
      fixtureWithInputs.detectChanges();
    });

    it('should set minHeight when provided', () => {
      const element = textareaWithInputs.nativeElement as HTMLTextAreaElement;

      expect(element.style.minHeight).toBe('100px');
    });

    it('should set maxHeight when provided', () => {
      const element = textareaWithInputs.nativeElement as HTMLTextAreaElement;

      expect(element.style.maxHeight).toBe('300px');
    });

    it('should update minHeight when input changes', () => {
      const element = textareaWithInputs.nativeElement as HTMLTextAreaElement;
      fixtureWithInputs.componentInstance.minHeight = '150';
      fixtureWithInputs.detectChanges();

      expect(element.style.minHeight).toBe('150px');
    });

    it('should update maxHeight when input changes', () => {
      const element = textareaWithInputs.nativeElement as HTMLTextAreaElement;
      fixtureWithInputs.componentInstance.maxHeight = '400';
      fixtureWithInputs.detectChanges();

      expect(element.style.maxHeight).toBe('400px');
    });
  });
});
