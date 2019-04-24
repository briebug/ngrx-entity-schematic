import {
  <%= classify(name) %>,
  generate<%= classify(name) %>,
  generate<%= classify(name) %>Map,
  generate<%= classify(name) %>Array
} from './<%= dasherize(name) %>.model';
import * as actions from './<%= dasherize(name) %>.actions';
import {
  <%= name %>Reducer,
  initialState,
  getSelectedId,
  getLoading,
  getError,
  getQuery
} from './<%= dasherize(name) %>.reducer';
import { Update } from '@ngrx/entity';

const INITIAL_STATE_WITH_ERROR = {
  ...initialState,
  error: 'some error'
};
const BLANK_ERROR_MESSAGE = '';

describe('<%= name %>Reducer', () => {
  describe('upon an undefined action', () => {
    it('should return the default state upon an undefined action', () => {
      const action = { type: 'NOT DEFINED' } as any;

      expect(<%= name %>Reducer(initialState, action)).toEqual(initialState);
    });
  });

  describe('upon Create<%= classify(name) %>', () => {
    it('should set loading to true and clear any error', () => {
      const action = new actions.Create<%= classify(name) %>({ <%= name %>: generate<%= classify(name) %>() });

      expect(<%= name %>Reducer(INITIAL_STATE_WITH_ERROR, action)).toEqual({
        ...initialState,
        loading: true,
        error: BLANK_ERROR_MESSAGE
      });
    });
  });

  describe('upon Create<%= classify(name) %>Success', () => {
    it('should add the given <%= classify(name) %>, set loading to false, and clear any error', () => {
      const result = generate<%= classify(name) %>();
      const action = new actions.Create<%= classify(name) %>Success({ result });

      expect(<%= name %>Reducer(INITIAL_STATE_WITH_ERROR, action)).toEqual({
        ...initialState,
        ...generate<%= classify(name) %>Map([result]),
        loading: false,
        error: BLANK_ERROR_MESSAGE
      });
    });
  });

  describe('upon Create<%= classify(name) %>Fail', () => {
    it('should set loading to true and echo the error', () => {
      const error = 'test insert error';
      const action = new actions.Create<%= classify(name) %>Fail({ error });

      expect(<%= name %>Reducer(initialState, action)).toEqual({
        ...initialState,
        loading: false,
        error: `<%= classify(name) %> insert failed: ${error}`
      });
    });
  });

  describe('upon SearchAll<%= classify(name) %>Entities', () => {
    it('should remove <%= classify(name) %> entities, set loading to true, and clear any error', () => {
      const initialStateWith<%= classify(name) %>Entities = {
        ...INITIAL_STATE_WITH_ERROR,
        ...generate<%= classify(name) %>Map()
      };
      const action = new actions.SearchAll<%= classify(name) %>Entities();

      expect(<%= name %>Reducer(initialStateWith<%= classify(name) %>Entities, action)).toEqual({
        ...initialState,
        loading: true,
        error: BLANK_ERROR_MESSAGE
      });
    });
  });

  describe('upon SearchAll<%= classify(name) %>EntitiesSuccess', () => {
    it('should add <%= classify(name) %> entities, set loading to false, and clear any error', () => {
      const result = generate<%= classify(name) %>Array();
      const action = new actions.SearchAll<%= classify(name) %>EntitiesSuccess({ result });

      expect(<%= name %>Reducer(INITIAL_STATE_WITH_ERROR, action)).toEqual({
        ...initialState,
        ...generate<%= classify(name) %>Map(result),
        loading: false,
        error: BLANK_ERROR_MESSAGE
      });
    });
  });

  describe('upon SearchAll<%= classify(name) %>EntitiesFail', () => {
    it('should set loading to false and echo the error', () => {
      const error = 'test search error';
      const action = new actions.SearchAll<%= classify(name) %>EntitiesFail({ error });

      expect(<%= name %>Reducer(initialState, action)).toEqual({
        ...initialState,
        loading: false,
        error: `<%= classify(name) %> search failed: ${error}`
      });
    });
  });

  describe('upon Load<%= classify(name) %>ById', () => {
    it('should remove <%= name %> entities, set selected id, and clear any error', () => {
      const id = 8675309;
      const initialStateWith<%= classify(name) %>Entities = {
        ...INITIAL_STATE_WITH_ERROR,
        ...generate<%= classify(name) %>Map()
      };
      const action = new actions.Load<%= classify(name) %>ById({ id });

      expect(<%= name %>Reducer(initialStateWith<%= classify(name) %>Entities, action)).toEqual({
        ...initialState,
        selectedId: id,
        loading: true,
        error: BLANK_ERROR_MESSAGE
      });
    });
  });

  describe('upon Load<%= classify(name) %>ByIdSuccess', () => {
    it('should add the given <%= classify(name) %>, set loading to false, and clear any error', () => {
      const result = generate<%= classify(name) %>();
      const action = new actions.Load<%= classify(name) %>ByIdSuccess({ result });

      expect(<%= name %>Reducer(INITIAL_STATE_WITH_ERROR, action)).toEqual({
        ...initialState,
        ...generate<%= classify(name) %>Map([result]),
        loading: false,
        error: BLANK_ERROR_MESSAGE
      });
    });
  });

  describe('upon Load<%= classify(name) %>ByIdFail', () => {
    it('should set loading to false and echo the error', () => {
      const error = 'test load by id error';
      const action = new actions.Load<%= classify(name) %>ByIdFail({ error });

      expect(<%= name %>Reducer(initialState, action)).toEqual({
        ...initialState,
        loading: false,
        error: `<%= classify(name) %> load failed: ${error}`
      });
    });
  });

  describe('upon Update<%= classify(name) %>', () => {
    it('should set loading to true and clear any errior', () => {
      const <%= name %> = generate<%= classify(name) %>();
      const action = new actions.Update<%= classify(name) %>({ <%= name %> });

      expect(<%= name %>Reducer(INITIAL_STATE_WITH_ERROR, action)).toEqual({
        ...initialState,
        loading: true,
        error: BLANK_ERROR_MESSAGE
      });
    });
  });

  describe('upon Update<%= classify(name) %>Success', () => {
    it('should add the given <%= classify(name) %>, set loading to false, and clear any error', () => {
      const <%= name %> = generate<%= classify(name) %>();
      const initialStateWith<%= classify(name) %> = {
        ...INITIAL_STATE_WITH_ERROR,
        ...generate<%= classify(name) %>Map([<%= name %>])
      };
      const updated<%= classify(name) %> = {
        ...<%= name %>,
        name: <%= name %>.name + ' EDITED',
        description: <%= name %>.description + ' EDITED'
      };
      const update = {
        id: updated<%= classify(name) %>.id,
        changes: updated<%= classify(name) %>
      } as Update<<%= classify(name) %>>;
      const action = new actions.Update<%= classify(name) %>Success({ update });

      expect(<%= name %>Reducer(initialStateWith<%= classify(name) %>, action)).toEqual({
        ...initialStateWith<%= classify(name) %>,
        ...generate<%= classify(name) %>Map([updated<%= classify(name) %>]),
        loading: false,
        error: BLANK_ERROR_MESSAGE
      });
    });
  });

  describe('upon Update<%= classify(name) %>Fail', () => {
    it('should set loading to false and echo the error', () => {
      const error = 'test update error';
      const action = new actions.Update<%= classify(name) %>Fail({ error });

      expect(<%= name %>Reducer(initialState, action)).toEqual({
        ...initialState,
        loading: false,
        error: `<%= classify(name) %> update failed: ${error}`
      });
    });
  });

  describe('upon Delete<%= classify(name) %>ById', () => {
    it('should set the id, set loading to true, and clear any error', () => {
      const id = 4815162342;
      const action = new actions.Delete<%= classify(name) %>ById({ id });

      expect(<%= name %>Reducer(INITIAL_STATE_WITH_ERROR, action)).toEqual({
        ...initialState,
        selectedId: id,
        loading: true,
        error: BLANK_ERROR_MESSAGE
      });
    });
  });

  describe('upon Delete<%= classify(name) %>ByIdSuccess', () => {
    it('should remove the id-given <%= name %>, set loading to false, and clear any error', () => {
      const id = 18009453669;
      const <%= name %>ToBeRemoved = generate<%= classify(name) %>(id);
      const expected<%= classify(name) %>Entities = generate<%= classify(name) %>Array();
      const <%= name %>EntitiesWith<%= classify(name) %>ToBeRemoved = [
        ...expected<%= classify(name) %>Entities,
        <%= name %>ToBeRemoved
      ];
      const initialStateWithAll<%= classify(name) %>Entities = {
        ...INITIAL_STATE_WITH_ERROR,
        ...generate<%= classify(name) %>Map(<%= name %>EntitiesWith<%= classify(name) %>ToBeRemoved)
      };
      const action = new actions.Delete<%= classify(name) %>ByIdSuccess({ id });

      expect(
        <%= name %>Reducer(initialStateWithAll<%= classify(name) %>Entities, action)
      ).toEqual({
        ...initialStateWithAll<%= classify(name) %>Entities,
        ...generate<%= classify(name) %>Map(expected<%= classify(name) %>Entities),
        loading: false,
        error: BLANK_ERROR_MESSAGE
      });
    });
  });

  describe('upon Delete<%= classify(name) %>ByIdFail', () => {
    it('should set loading to false and echo the error', () => {
      const error = 'test delete error';
      const action = new actions.Delete<%= classify(name) %>ByIdFail({ error });

      expect(<%= name %>Reducer(initialState, action)).toEqual({
        ...initialState,
        loading: false,
        error: `<%= classify(name) %> delete failed: ${error}`
      });
    });
  });

  describe('upon SetSearchQuery', () => {
    it('should set the query', () => {
      const query = {
        filter: 'someFilter',
        sorting: 'someSort',
        limit: 1000000000000,
        page: 888888
      };
      const action = new actions.SetSearchQuery(query);

      expect(<%= name %>Reducer(initialState, action)).toEqual({
        ...initialState,
        query
      });
    });
  });

  describe('upon Select<%= classify(name) %>ById', () => {
    it('should set the id and clear any error', () => {
      const id = 73;
      const action = new actions.Select<%= classify(name) %>ById({ id });

      expect(<%= name %>Reducer(INITIAL_STATE_WITH_ERROR, action)).toEqual({
        ...initialState,
        selectedId: id,
        error: BLANK_ERROR_MESSAGE
      });
    });
  });
});

describe('getters', () => {
  describe('getSelectedId', () => {
    it('should return the selected id', () => {
      expect(getSelectedId(initialState)).toEqual(initialState.selectedId);
    });
  });
  describe('getLoading', () => {
    it('should return the selected id', () => {
      expect(getLoading(initialState)).toEqual(initialState.loading);
    });
  });
  describe('getError', () => {
    it('should return the selected id', () => {
      expect(getError(INITIAL_STATE_WITH_ERROR))
        .toEqual(INITIAL_STATE_WITH_ERROR.error);
    });
  });
  describe('getQuery', () => {
    it('should return the selected id', () => {
      expect(getQuery(initialState))
        .toEqual(initialState.query);
    });
  });
});
