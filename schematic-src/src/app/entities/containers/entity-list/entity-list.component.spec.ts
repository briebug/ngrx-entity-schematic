import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Store, StoreModule } from '@ngrx/store';

import { BriebugListComponent } from './entity-list.component';
import { appReducer } from '../../../state/app.reducer';
import { AppState } from '../../../state/app.interfaces';
import {
  SearchAllBriebugEntities,
  SearchAllBriebugEntitiesSuccess,
  SearchAllBriebugEntitiesFail
} from '../../../state/briebug/briebug.actions';
import { generateBriebugArray } from '../../../state/briebug/briebug.model';

describe('BriebugListComponent', () => {
  let component: BriebugListComponent;
  let fixture: ComponentFixture<BriebugListComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BriebugListComponent],
      imports: [RouterTestingModule, StoreModule.forRoot(appReducer)]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriebugListComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    fixture.detectChanges();

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get briebug entities when available', (done) => {
    const entities = generateBriebugArray();

    store.dispatch(new SearchAllBriebugEntitiesSuccess({ result: entities }));

    component.briebugEntities$.subscribe((result) => {
      expect(result).toEqual(entities);
      done();
    });
  });

  it('should get the loading status when available', (done) => {
    // Used to set loading to true:
    store.dispatch(new SearchAllBriebugEntities());

    component.isLoading$.subscribe((isLoading) => {
      expect(isLoading).toBe(true);
      done();
    });
  });

  it('should get the error message when available', (done) => {
    const testError = 'Some Error Message';
    store.dispatch(new SearchAllBriebugEntitiesFail({ error: testError }));

    component.errorMessage$.subscribe((errorResult) => {
      if (errorResult) { // Needed because the first errorResult is blank
        expect(errorResult).toContain(testError);
        // This done() ensures that this test isn't skipped as a result of the
        // if block - tests fail if done is never called.
        done();
      }
    });
  });

  describe('ngOnInit', () => {
    it('should request all Briebug entities', () => {
      component.ngOnInit();

      expect(store.dispatch).toHaveBeenCalledWith(
        new SearchAllBriebugEntities()
      );
    });
  });
});
