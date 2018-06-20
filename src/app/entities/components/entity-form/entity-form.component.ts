import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';

import { Entity } from '@state/entity/entity.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, skip, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css']
})
export class EntityFormComponent implements OnChanges, OnDestroy {
  formGroup: FormGroup;

  @Input() entity: Entity;
  @Input() disableFields: Boolean;
  @Input() showErrors: Boolean;
  @Output() submit = new EventEmitter<Entity>();
  @Output() entityChange = new EventEmitter<{ entity: Entity; valid: boolean }>();

  private destroyed$ = new Subject<void>();

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.entity && changes.entity.currentValue) {
      this.formGroup.patchValue(this.entity);
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private buildForm() {
    // FIXME: Fields are not disabling as expected.
    this.formGroup = this.formBuilder.group({
      id: null,
      name: [{ value: '', disabled: this.disableFields }, Validators.required],
      description: [{ value: '', disabled: this.disableFields }, Validators.required]
    });

    this.formGroup.valueChanges
      .pipe(
        takeUntil(this.destroyed$),
        skip(1),
        debounceTime(500)
      )
      .subscribe((value) => {
        this.entityChange.emit({
          entity: value,
          valid: this.formGroup.valid
        });
      });
  }
}
