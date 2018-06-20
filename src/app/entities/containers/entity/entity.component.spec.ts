import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromRoot from '@state/app.reducer';
import { StoreModule } from '@ngrx/store';

import { EntityComponent } from './entity.component';
import { RouterTestingModule } from '@angular/router/testing';
import { EntityFormComponent } from '../../components/entity-form/entity-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('EntityComponent', () => {
  let component: EntityComponent;
  let fixture: ComponentFixture<EntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        StoreModule.forRoot(fromRoot.appReducer)
      ],
      declarations: [
        EntityComponent,
        EntityFormComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
