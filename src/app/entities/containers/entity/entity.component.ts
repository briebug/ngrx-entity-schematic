import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import {
  tap,
  filter,
  map,
  switchMap,
  shareReplay
} from 'rxjs/operators';

import { getLoading, getSelectedBriebug, getError } from '@state/entity';
import { Briebug } from '@state/entity/entity.model';
import {
  LoadBriebugById,
  InsertBriebug,
  UpdateBriebug,
  SelectBriebugById
} from '@state/entity/entity.actions';
import { BriebugState } from '@state/entity/entity.reducer';

@Component({
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BriebugComponent implements OnInit {
  briebug$: Observable<Briebug>;
  briebugEdits: Briebug;
  errorMessage$: Observable<string>;
  isLoading$: Observable<boolean>;
  showFormErrors: boolean;
  valid: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<BriebugState>
  ) {}

  ngOnInit() {
    this.briebug$ = this.activatedRoute.paramMap.pipe(
      filter((params) =>
        params.has('id') || this.activatedRoute.routeConfig.path === 'add'
      ),
      map((params) => params.get('id')),
      tap((id) => {
        const BriebugAction = id ? LoadBriebugById : SelectBriebugById;
        this.store.dispatch(new BriebugAction({ id: +id || null }));
      }),
      switchMap(() => this.store.pipe(select(getSelectedBriebug))),
      map((briebug) => {
        return { ...briebug };
      })
    );

    // The following shareReplay calls allow us to use the async pipe multiple
    // times without creating multiple subscriptions:

    this.isLoading$ = this.store.pipe(
      select(getLoading),
      shareReplay()
    );

    this.errorMessage$ = this.store.pipe(
      select(getError),
      shareReplay()
    );

    this.showFormErrors = false;
  }

  onBriebugChanged({ briebug, valid }: { briebug: Briebug; valid: boolean }) {
    this.briebugEdits = briebug;
    this.valid = valid;
  }

  onSubmit() {
    this.showFormErrors = true;

    if (!this.valid) {
      return;
    }

    const BriebugAction = this.briebugEdits.id ? UpdateBriebug : InsertBriebug;
    this.store.dispatch(new BriebugAction({ briebug: this.briebugEdits }));
  }
}
