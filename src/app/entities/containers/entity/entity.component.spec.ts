import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromRoot from '@state/app.reducer';
import { StoreModule } from '@ngrx/store';

import { BriebugComponent } from './entity.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BriebugFormComponent } from '../../components/entity-form/entity-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('BriebugComponent', () => {
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
