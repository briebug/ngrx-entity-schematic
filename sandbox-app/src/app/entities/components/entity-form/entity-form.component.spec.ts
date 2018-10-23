import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BriebugFormComponent } from './entity-form.component';
import { generateBriebug } from '@state/briebug/briebug.model';
import { fromEvent } from 'rxjs';

describe('BreibugFormComponent', () => {
  let component: BriebugFormComponent;
  let fixture: ComponentFixture<BriebugFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [BriebugFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriebugFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should patch changes into the entity', () => {
      component.briebug = generateBriebug();

      component.ngOnChanges({
        briebug: new SimpleChange(null, component.briebug, true)
      });

      expect(component.formGroup.value).toEqual({ ...component.briebug });
    });
  });

  describe('constructor', () => {
    it('should emit briebugChanged when the form changes', (done) => {
      const briebug = generateBriebug();

      component.briebugChanged.subscribe((value) => {
        expect(value).toEqual({
          briebug,
          valid: component.formGroup.valid
        });
        done();
      });

      // Called twice because the first value is skipped:
      component.formGroup.patchValue(briebug);
      component.formGroup.patchValue(briebug);
    });
  });
});
