import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriebugFormComponent } from './entity-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('BreibugFormComponent', () => {
  let component: BriebugFormComponent;
  let fixture: ComponentFixture<BriebugFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ BriebugFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriebugFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
