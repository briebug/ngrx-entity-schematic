import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { getAllEntityEntities, getLoading, getError } from '@state/entity';
import { State } from '@state/entity/entity.reducer';
import { SearchAllEntityEntities } from '@state/entity/entity.actions';
import { Entity } from '@state/entity/entity.model';

@Component({
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityListComponent implements OnInit {
  entities$: Observable<Entity[]>;
  isLoading$: Observable<Boolean>;
  errorMessage$: Observable<String>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch(new SearchAllEntityEntities());
    this.entities$ = this.store.pipe(select(getAllEntityEntities));
    this.isLoading$ = this.store.pipe(select(getLoading));
    this.errorMessage$ = this.store.pipe(
      select(getError),
      // This allows us to use the async pipe twice without creating two subscriptions:
      shareReplay()
    );
  }
}
