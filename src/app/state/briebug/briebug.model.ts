export interface Briebug {
  id: number;
  name: string;
  description: string;
}

// for testing

export const generateBriebug = (idOverride?: number): Briebug => ({
  id: idOverride || (Math.floor(Math.random() * 100) + 1),
  name: 'Test name',
  description: 'Test description'
});

export const generateBriebugArray = (count = 10): Briebug[] =>
  // Overwrite random id generation to prevent duplicate IDs:
  Array.apply(null, Array(count)).map((value, index) => generateBriebug(index + 1));

export const generateBriebugMap = (
  briebugArray: Array<Briebug> = generateBriebugArray()
): { ids: Array<number>, entities: any } => ({
  entities: briebugArray.reduce(
    (briebugMap, briebug) => ({ ...briebugMap, [briebug.id]: briebug }),
    {}
  ),
  ids: briebugArray.map(briebug => briebug.id)
});

