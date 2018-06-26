import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import * as fromRoot from '@state/app.reducer';
import { Store, StoreModule } from '@ngrx/store';
import { Subject } from 'rxjs';

import { BriebugComponent } from './entity.component';
import { BriebugFormComponent } from '../../components/entity-form/entity-form.component';
import { AppState } from '@state/app.interfaces';
import { generateBriebug } from '@state/briebug/briebug.model';
import {
  LoadBriebugById,
  LoadBriebugByIdSuccess,
  SelectBriebugById,
  LoadBriebugByIdFail,
  UpdateBriebug,
  InsertBriebug
} from '@state/briebug/briebug.actions';
import { skip } from 'rxjs/operators';

describe('BriebugComponent', () => {
  let component: BriebugComponent;
  let fixture: ComponentFixture<BriebugComponent>;
  let store: Store<AppState>;
  const paramMap = new Subject();
  const url = new Subject();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        StoreModule.forRoot(fromRoot.appReducer)
      ],
      declarations: [BriebugComponent, BriebugFormComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap,
            url
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriebugComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    fixture.detectChanges();

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the specified briebug entities if editing', (done) => {
    const entity = generateBriebug();

    component.briebug$.subscribe((result) => {
      if (result && result.id) {
        expect(result).toEqual(entity);
        // This done() ensures that this test isn't skipped as a result of the
        // if block - tests fail if done is never called.
        done();
      }
    });

    paramMap.next(convertToParamMap({ id: entity.id }));
    url.next([{ path: '1' }]);
    store.dispatch(new LoadBriebugByIdSuccess({ result: entity }));
  });

  it('should select a null ID if adding', (done) => {
    component.briebug$.subscribe((result) => {
      expect(Object.keys(result).length).toBe(0);
      expect(store.dispatch).toHaveBeenCalledWith(
        new SelectBriebugById({ id: null })
      );
      done();
    });

    paramMap.next(convertToParamMap({}));
    url.next([{ path: 'add' }]);
  });

  it('should get the error message when available', (done) => {
    const testError = 'Some Error Message';
    store.dispatch(new LoadBriebugByIdFail({ error: testError }));

    component.errorMessage$.pipe(skip(1)).subscribe((errorResult) => {
      expect(errorResult).toContain(testError);
      done();
    });
  });

  it('should get the loading status when available', (done) => {
    // Used to set loading to true:
    store.dispatch(new LoadBriebugById({ id: 1 }));

    component.isLoading$.subscribe((isLoading) => {
      if (isLoading) {
        // Protects against initial value of false
        expect(isLoading).toBe(true);
        // This done() ensures that this test isn't skipped as a result of the
        // if block - tests fail if done is never called.
        done();
      }
    });
  });

  describe('ngOnInit', () => {
    it('should not show the form errors', () => {
      component.ngOnInit();

      expect(component.showFormErrors).toBe(false);
    });
  });

  describe('onBriebugChanged', () => {
    it('should match the returned entity and valid values', () => {
      const briebug = generateBriebug();
      const valid = true;

      component.onBriebugChanged({ briebug, valid });

      expect(component.briebugEdits).toEqual(briebug);
      expect(component.valid).toBe(valid);
    });
  });

  describe('onSubmit', () => {
    it('should show the form errors', () => {
      component.showFormErrors = false;

      component.onSubmit();

      expect(component.showFormErrors).toBe(true);
    });

    it('should not dispatch anything if the form isn\'t valid', () => {
      component.valid = false;

      component.onSubmit();

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch UpdateBriebug if an ID is present', () => {
      component.valid = true;
      component.briebugEdits = generateBriebug();

      component.onSubmit();

      expect(store.dispatch).toHaveBeenCalledWith(
        new UpdateBriebug({ briebug: component.briebugEdits })
      );
    });

    it('should dispatch InsertBriebug if an ID is not present', () => {
      component.valid = true;
      component.briebugEdits = generateBriebug();
      delete component.briebugEdits.id;

      component.onSubmit();

      expect(store.dispatch).toHaveBeenCalledWith(
        new InsertBriebug({ briebug: component.briebugEdits })
      );
    });
  });
});
