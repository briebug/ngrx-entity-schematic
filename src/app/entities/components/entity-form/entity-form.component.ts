import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Entity } from '@state/entity/entity.model';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css']
})
export class EntityFormComponent implements OnInit {
  @Input() entity: Entity;
  @Output() submit = new EventEmitter<Entity>();

  constructor() {}

  ngOnInit() {}
}
