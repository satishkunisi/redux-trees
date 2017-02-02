/* globals it, expect, document */

import reducers from './reducers';
import initialState from './initialState';

it('swap nodes that have different parents', () => {
  const expectedState = {
    0: { children: [1, 2], value: 'Root node' },
    1: { children: [3, 6], value: 'Layer 1 node 1' },
    2: { children: [5, 4], value: 'Layer 1 node 2' },
    3: { children: [], value: 'Layer 2 node 1' },
    4: { children: [], value: 'Layer 2 node 2' },
    5: { children: [], value: 'Layer 2 node 3' },
    6: { children: [], value: 'Layer 2 node 4' },
    parentFor: {
      1: 0,
      2: 0,
      3: 1,
      4: 2,
      5: 2,
      6: 1,
    },
  };

  const newState = reducers(initialState, {
    type: 'SWAP_NODES',
    payload: { nodeKeys: [4, 6] },
  });

  expect(newState).toEqual(expectedState);
});

it('swap nodes that have the same parent', () => {
  const expectedState = {
    0: { children: [2, 1], value: 'Root node' },
    1: { children: [3, 4], value: 'Layer 1 node 1' },
    2: { children: [5, 6], value: 'Layer 1 node 2' },
    3: { children: [], value: 'Layer 2 node 1' },
    4: { children: [], value: 'Layer 2 node 2' },
    5: { children: [], value: 'Layer 2 node 3' },
    6: { children: [], value: 'Layer 2 node 4' },
    parentFor: {
      1: 0,
      2: 0,
      3: 1,
      4: 1,
      5: 2,
      6: 2,
    },
  };

  const newState = reducers(initialState, {
    type: 'SWAP_NODES',
    payload: { nodeKeys: [1, 2] },
  });

  expect(newState).toEqual(expectedState);
});

it('add child to parent', () => {
  const expectedState = {
    0: { children: [1, 2], value: 'Root node' },
    1: { children: [3, 4], value: 'Layer 1 node 1' },
    2: { children: [5, 6, 7], value: 'Layer 1 node 2' },
    3: { children: [], value: 'Layer 2 node 1' },
    4: { children: [], value: 'Layer 2 node 2' },
    5: { children: [], value: 'Layer 2 node 3' },
    6: { children: [], value: 'Layer 2 node 4' },
    7: { children: [], value: 'Layer 2 node 5' },
    parentFor: {
      1: 0,
      2: 0,
      3: 1,
      4: 1,
      5: 2,
      6: 2,
      7: 2,
    },
  };

  const action = {
    type: 'ADD_NODE',
    payload: { value: 'Layer 2 node 5', parentKey: 2 },
  };

  const newState = reducers(initialState, action);

  expect(newState).toEqual(expectedState);
});
