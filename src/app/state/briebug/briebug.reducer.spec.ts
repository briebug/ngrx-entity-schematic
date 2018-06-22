import {
  Briebug,
  generateBriebug,
  generateBriebugMap,
  generateBriebugArray
} from './briebug.model';
import * as actions from './briebug.actions';
import {
  briebugReducer,
  initialState,
  getSelectedId,
  getLoading,
  getError,
  getQuery
} from './briebug.reducer';
import { Update } from '@ngrx/entity';

const INITIAL_STATE_WITH_ERROR = {
  ...initialState,
  error: 'some error'
};
const BLANK_ERROR_MESSAGE = '';

describe('briebugReducer', () => {
  describe('upon an undefined action', () => {
    it('should return the default state upon an undefined action', () => {
      const action = { type: 'NOT DEFINED' } as any;

      expect(briebugReducer(initialState, action)).toEqual(initialState);
    });
  });

  describe('upon InsertBriebug', () => {
    it('should set loading to true and clear any error', () => {
      const action = new actions.InsertBriebug({ briebug: generateBriebug() });

      expect(briebugReducer(INITIAL_STATE_WITH_ERROR, action)).toEqual({
        ...initialState,
        loading: true,
        error: BLANK_ERROR_MESSAGE
      });
    });
  });

  describe('upon InsertBriebugSuccess', () => {
    it('should add the given Briebug, set loading to false, and clear any error', () => {
      const result = generateBriebug();
      const action = new actions.InsertBriebugSuccess({ result });

      expect(briebugReducer(INITIAL_STATE_WITH_ERROR, action)).toEqual({
        ...initialState,
        ...generateBriebugMap([result]),
        loading: false,
        error: BLANK_ERROR_MESSAGE
      });
    });
  });

  describe('upon InsertBriebugFail', () => {
    it('should set loading to true and echo the error', () => {
      const error = 'test insert error';
      const action = new actions.InsertBriebugFail({ error });

      expect(briebugReducer(initialState, action)).toEqual({
        ...initialState,
        loading: false,
        error: `Briebug insert failed: ${error}`
      });
    });
  });

  describe('upon SearchAllBriebugEntities', () => {
    it('should remove Briebug entities, set loading to true, and clear any error', () => {
      const initialStateWithBriebugEntities = {
        ...INITIAL_STATE_WITH_ERROR,
        ...generateBriebugMap()
      };
      const action = new actions.SearchAllBriebugEntities();

      expect(briebugReducer(initialStateWithBriebugEntities, action)).toEqual({
        ...initialState,
        loading: true,
        error: BLANK_ERROR_MESSAGE
      });
    });
  });

  describe('upon SearchAllBriebugEntitiesSuccess', () => {
    it('should add Briebug entities, set loading to false, and clear any error', () => {
      const result = generateBriebugArray();
      const action = new actions.SearchAllBriebugEntitiesSuccess({ result });

      expect(briebugReducer(INITIAL_STATE_WITH_ERROR, action)).toEqual({
        ...initialState,
        ...generateBriebugMap(result),
        loading: false,
        error: BLANK_ERROR_MESSAGE
      });
    });
  });

  describe('upon SearchAllBriebugEntitiesFail', () => {
    it('should set loading to false and echo the error', () => {
      const error = 'test search error';
      const action = new actions.SearchAllBriebugEntitiesFail({ error });

      expect(briebugReducer(initialState, action)).toEqual({
        ...initialState,
        loading: false,
        error: `Briebug search failed: ${error}`
      });
    });
  });

  describe('upon LoadBriebugById', () => {
    it('should remove briebug entities, set selected id, and clear any error', () => {
      const id = 8675309;
      const initialStateWithBriebugEntities = {
        ...INITIAL_STATE_WITH_ERROR,
        ...generateBriebugMap()
      };
      const action = new actions.LoadBriebugById({ id });

      expect(briebugReducer(initialStateWithBriebugEntities, action)).toEqual({
        ...initialState,
        selectedId: id,
        loading: true,
        error: BLANK_ERROR_MESSAGE
      });
    });
  });

  describe('upon LoadBriebugByIdSuccess', () => {
    it('should add the given Briebug, set loading to false, and clear any error', () => {
      const result = generateBriebug();
      const action = new actions.LoadBriebugByIdSuccess({ result });

      expect(briebugReducer(INITIAL_STATE_WITH_ERROR, action)).toEqual({
        ...initialState,
        ...generateBriebugMap([result]),
        loading: false,
        error: BLANK_ERROR_MESSAGE
      });
    });
  });

  describe('upon LoadBriebugByIdFail', () => {
    it('should set loading to false and echo the error', () => {
      const error = 'test load by id error';
      const action = new actions.LoadBriebugByIdFail({ error });

      expect(briebugReducer(initialState, action)).toEqual({
        ...initialState,
        loading: false,
        error: `Briebug load failed: ${error}`
      });
    });
  });

  describe('upon UpdateBriebug', () => {
    it('should set loading to true and clear any errior', () => {
      const briebug = generateBriebug();
      const action = new actions.UpdateBriebug({ briebug });

      expect(briebugReducer(INITIAL_STATE_WITH_ERROR, action)).toEqual({
        ...initialState,
        loading: true,
        error: BLANK_ERROR_MESSAGE
      });
    });
  });

  describe('upon UpdateBriebugSuccess', () => {
    it('should add the given Briebug, set loading to false, and clear any error', () => {
      const briebug = generateBriebug();
      const initialStateWithBriebug = {
        ...INITIAL_STATE_WITH_ERROR,
        ...generateBriebugMap([briebug])
      };
      const updatedBriebug = {
        ...briebug,
        name: briebug.name + ' EDITED',
        description: briebug.description + ' EDITED'
      };
      const update = {
        id: updatedBriebug.id,
        changes: updatedBriebug
      } as Update<Briebug>;
      const action = new actions.UpdateBriebugSuccess({ update });

      expect(briebugReducer(initialStateWithBriebug, action)).toEqual({
        ...initialStateWithBriebug,
        ...generateBriebugMap([updatedBriebug]),
        loading: false,
        error: BLANK_ERROR_MESSAGE
      });
    });
  });

  describe('upon UpdateBriebugFail', () => {
    it('should set loading to false and echo the error', () => {
      const error = 'test update error';
      const action = new actions.UpdateBriebugFail({ error });

      expect(briebugReducer(initialState, action)).toEqual({
        ...initialState,
        loading: false,
        error: `Briebug update failed: ${error}`
      });
    });
  });

  describe('upon DeleteBriebugById', () => {
    it('should set the id, set loading to true, and clear any error', () => {
      const id = 4815162342;
      const action = new actions.DeleteBriebugById({ id });

      expect(briebugReducer(INITIAL_STATE_WITH_ERROR, action)).toEqual({
        ...initialState,
        selectedId: id,
        loading: true,
        error: BLANK_ERROR_MESSAGE
      });
    });
  });

  describe('upon DeleteBriebugByIdSuccess', () => {
    it('should remove the id-given briebug, set loading to false, and clear any error', () => {
      const id = 18009453669;
      const briebugToBeRemoved = generateBriebug(id);
      const expectedBriebugEntities = generateBriebugArray();
      const briebugEntitiesWithBriebugToBeRemoved = [
        ...expectedBriebugEntities,
        briebugToBeRemoved
      ];
      const initialStateWithAllBriebugEntities = {
        ...INITIAL_STATE_WITH_ERROR,
        ...generateBriebugMap(briebugEntitiesWithBriebugToBeRemoved)
      };
      const action = new actions.DeleteBriebugByIdSuccess({ id });

      expect(
        briebugReducer(initialStateWithAllBriebugEntities, action)
      ).toEqual({
        ...initialStateWithAllBriebugEntities,
        ...generateBriebugMap(expectedBriebugEntities),
        loading: false,
        error: BLANK_ERROR_MESSAGE
      });
    });
  });

  describe('upon DeleteBriebugByIdFail', () => {
    it('should set loading to false and echo the error', () => {
      const error = 'test delete error';
      const action = new actions.DeleteBriebugByIdFail({ error });

      expect(briebugReducer(initialState, action)).toEqual({
        ...initialState,
        loading: false,
        error: `Briebug delete failed: ${error}`
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

      expect(briebugReducer(initialState, action)).toEqual({
        ...initialState,
        query
      });
    });
  });

  describe('upon SelectBriebugById', () => {
    it('should set the id and clear any error', () => {
      const id = 73;
      const action = new actions.SelectBriebugById({ id });

      expect(briebugReducer(INITIAL_STATE_WITH_ERROR, action)).toEqual({
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
