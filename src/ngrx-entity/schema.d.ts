export interface Schema {
  /**
   * The name of the Entity.
   */
  name: string;
  /**
   * The path to create the entity files.
   */
  path?: string;
  /**
   * Should setup NgRx.
   */
  init?: boolean;
}
