export interface <%= classify(name) %> {
  id: number;
  name: string;
  description: string;
}

// for testing

export const generate<%= classify(name) %> = (idOverride?: number): <%= classify(name) %> => ({
  id: idOverride || (Math.floor(Math.random() * 100) + 1),
  name: 'Test name',
  description: 'Test description'
});

export const generate<%= classify(name) %>Array = (count = 10): <%= classify(name) %>[] =>
  // Overwrite random id generation to prevent duplicate IDs:
  Array.apply(null, Array(count)).map((value, index) => generate<%= classify(name) %>(index + 1));

export const generate<%= classify(name) %>Map = (
  <%= name %>Array: Array<<%= classify(name) %>> = generate<%= classify(name) %>Array()
): { ids: Array<number>, entities: any } => ({
  entities: <%= name %>Array.reduce(
    (<%= name %>Map, <%= name %>) => ({ ...<%= name %>Map, [<%= name %>.id]: <%= name %> }),
    {}
  ),
  ids: <%= name %>Array.map(<%= name %> => <%= name %>.id)
});

