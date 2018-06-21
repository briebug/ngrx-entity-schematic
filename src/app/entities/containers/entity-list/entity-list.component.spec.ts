import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriebugListComponent } from './entity-list.component';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from '@state/app.reducer';
import { RouterTestingModule } from '@angular/router/testing';

describe('BriebugListComponent', () => {
  let component: BriebugListComponent;
  let fixture: ComponentFixture<BriebugListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriebugListComponent ],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(fromRoot.appReducer)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriebugListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
