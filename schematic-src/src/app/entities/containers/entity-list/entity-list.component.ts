import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import {
  getAllBriebugEntitiesAsArray,
  getLoading,
  getError
} from '@state/briebug';
import { BriebugState } from '@state/briebug/briebug.reducer';
import {
  SearchAllBriebugEntities,
  DeleteBriebugById
} from '@state/briebug/briebug.actions';
import { Briebug } from '@state/briebug/briebug.model';

@Component({
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BriebugListComponent implements OnInit {
  briebugEntities$ = this.store.pipe(select(getAllBriebugEntitiesAsArray));
  isLoading$ = this.store.pipe(select(getLoading));
  errorMessage$ = this.store.pipe(
    select(getError),
    // This allows us to use the async pipe twice without creating two subscriptions:
    shareReplay()
  );

  constructor(private store: Store<BriebugState>) {}

  ngOnInit() {
    this.store.dispatch(new SearchAllBriebugEntities());
  }

  deleteBriebug(id) {
    this.store.dispatch(new DeleteBriebugById({ id }));
  }
}
