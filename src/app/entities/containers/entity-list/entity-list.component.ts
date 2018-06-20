import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getAllEntity, getLoading } from '@state/entity';
import { State } from '@state/entity/entity.reducer';
import { EntitySearch } from '@state/entity/entity.actions';
import { Entity } from '@state/entity/entity.model';

import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityListComponent implements OnInit {
  entities: Observable<Entity[]>;
  isLoading: Observable<Boolean>;

  constructor(private store: Store<State>, private httpClient: HttpClient) {}

  ngOnInit() {
    this.store.dispatch(new EntitySearch());
    this.entities = this.store.pipe(select(getAllEntity));
    this.isLoading = this.store.pipe(select(getLoading));
  }
}
