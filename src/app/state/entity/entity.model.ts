export interface Briebug {
  id: number;
  name: string;
  description: string;
}

// for testing

export const generateEntity = (): Briebug => {
  return {
    id: Math.floor(Math.random() * 100) + 1,
    name: 'Test name',
    description: 'Test description'
  };
};
export const generateEntityArray = (count = 10): Briebug[] => {
  return Array.apply(null, Array(count)).map(() => generateEntity());
};
