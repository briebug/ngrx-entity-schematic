import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { getAllBriebugEntitiesAsArray, getLoading, getError } from '@state/entity';
import { BriebugState } from '@state/entity/entity.reducer';
import { SearchAllBriebugEntities } from '@state/entity/entity.actions';
import { Briebug } from '@state/entity/entity.model';

@Component({
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BriebugListComponent implements OnInit {
  briebugEntities$: Observable<Array<Briebug>>;
  isLoading$: Observable<Boolean>;
  errorMessage$: Observable<String>;

  constructor(private store: Store<BriebugState>) {}

  ngOnInit() {
    this.store.dispatch(new SearchAllBriebugEntities());
    this.briebugEntities$ = this.store.pipe(select(getAllBriebugEntitiesAsArray));
    this.isLoading$ = this.store.pipe(select(getLoading));
    this.errorMessage$ = this.store.pipe(
      select(getError),
      // This allows us to use the async pipe twice without creating two subscriptions:
      shareReplay()
    );
  }
}
