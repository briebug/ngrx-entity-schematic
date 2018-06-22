import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';

import { Briebug } from '@state/briebug/briebug.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, skip, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-briebug-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BriebugFormComponent implements OnChanges, OnDestroy {
  formGroup: FormGroup;

  @Input() briebug: Briebug;
  @Input() disableFields: boolean;
  @Input() showErrors: boolean;
  @Output() submit = new EventEmitter<Briebug>();
  @Output() briebugChanged = new EventEmitter<{ briebug: Briebug; valid: boolean }>();

  private destroyed$ = new Subject<void>();

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.briebug && changes.briebug.currentValue) {
      this.formGroup.patchValue(this.briebug);
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
        this.briebugChanged.emit({
          briebug: value,
          valid: this.formGroup.valid
        });
      });
  }
}
