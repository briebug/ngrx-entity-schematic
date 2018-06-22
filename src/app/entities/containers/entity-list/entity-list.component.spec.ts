import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Store, StoreModule, select } from '@ngrx/store';
import { withLatestFrom } from 'rxjs/operators';

import { BriebugListComponent } from './entity-list.component';
import { appReducer } from '@state/app.reducer';
import { AppState } from '@state/app.interfaces';
import { SearchAllBriebugEntities } from '@state/entity/entity.actions';

describe('BriebugListComponent', () => {
  let component: BriebugListComponent;
  let fixture: ComponentFixture<BriebugListComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriebugListComponent ],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(appReducer)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriebugListComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    fixture.detectChanges();

    spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should set all initial values', (done) => {
      component.briebugEntities$
        .pipe(
          withLatestFrom(component.isLoading$, component.errorMessage$)
        )
        .subscribe(([briebugEntities, isLoading, errorMessage]) => {
          expect(briebugEntities).toEqual([]);
          expect(isLoading).toEqual(true);
          expect(errorMessage).toEqual('');
          done();
        });

      expect(store.dispatch).toHaveBeenCalledWith(
        new SearchAllBriebugEntities()
      );
    });
  });
});
