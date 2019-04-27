import {
  current<%= classify(name) %>Id,
  current<%= classify(name) %>,
  <%= name %>Loading,
  <%= name %>Error,
  <%= name %>Query
} from './index';
import { <%= classify(name) %> } from './<%= name %>.model';

const create<%= classify(name) %> = ({ id = 0, name = '', description = '' } = {}): <%= classify(name) %> => ({
  id: id,
  name: name || 'name',
  description: description || `description`
});

// State Factory
const create<%= classify(name) %>sState = ({
  entities = {
    '1': create<%= classify(name) %>({ id: 1, name: 'Bob' }),
    '2': create<%= classify(name) %>({ id: 2, name: 'Sue' }),
    '3': create<%= classify(name) %>({ id: 3, name: 'Mary' })
  },
  ids = ['1', '2', '3'],
  selectedId = 1,
  loading = false,
  error = '',
  query = null
} = {}) => ({
  <%= name %>: {
    ids,
    entities,
    selectedId,
    loading,
    error,
    query
  }
});

let state;

describe('<%= name %>Selectors', () => {
  beforeEach(() => {
    state = create<%= classify(name) %>sState();
  });

  it('current<%= classify(name) %>Id', () => {
    expect(current<%= classify(name) %>Id(state)).toEqual(1);
  });

  it('current<%= classify(name) %>', () => {
    expect(current<%= classify(name) %>(state)).toEqual(state.<%= name %>.entities[1]);
  });

  it('<%= name %>Loading', () => {
    state.<%= name %>.loading = true;
    expect(<%= name %>Loading(state)).toEqual(state.<%= name %>.loading);
  });

  it('<%= name %>Error', () => {
    state.<%= name %>.error = 'error loading <%= name %>s';
    expect(<%= name %>Error(state)).toEqual(state.<%= name %>.error);
  });

  it('<%= name %>Query', () => {
    state.<%= name %>.query = 'page=2';
    expect(<%= name %>Query(state)).toEqual(state.<%= name %>.query);
  });
});
