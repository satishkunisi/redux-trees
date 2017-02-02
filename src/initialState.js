export default {
  0: { children: [1, 2], value: 'Root node' },
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
