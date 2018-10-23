import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import {
  tap,
  filter,
  map,
  switchMap,
  shareReplay,
  combineLatest
} from 'rxjs/operators';

import { getLoading, getSelectedBriebug, getError } from '@state/briebug';
import { Briebug } from '@state/briebug/briebug.model';
import {
  LoadBriebugById,
  InsertBriebug,
  UpdateBriebug,
  SelectBriebugById
} from '@state/briebug/briebug.actions';
import { BriebugState } from '@state/briebug/briebug.reducer';

@Component({
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BriebugComponent implements OnInit {
  briebug$ = this.activatedRoute.paramMap.pipe(
    combineLatest(this.activatedRoute.url),
    filter(([params, url]) =>
      params.has('id') || url[0].path === 'add'
    ),
    map(([params]) => params.get('id')),
    tap((id) => {
      // If no ID is present, then the user is here to add a new entity.
      const BriebugAction = id ? LoadBriebugById : SelectBriebugById;
      this.store.dispatch(new BriebugAction({ id: +id || null }));
    }),
    switchMap(() => this.store.pipe(select(getSelectedBriebug))),
    map((briebug) => ({ ...briebug }))
  );
  // The following shareReplay calls allow us to use the async pipe multiple
  // times without creating multiple subscriptions:
  errorMessage$ = this.store.pipe(
    select(getError),
    shareReplay()
  );
  isLoading$ = this.store.pipe(
    select(getLoading),
    shareReplay()
  );

  briebugEdits: Briebug;
  showFormErrors: boolean;
  valid: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<BriebugState>
  ) {}

  ngOnInit() {
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
