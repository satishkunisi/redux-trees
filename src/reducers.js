import initialState from './initialState';

function swapNodes(nodeKeys, state) {
  const [key1, key2] = nodeKeys;

  const p1idx = state.parentFor[key1];
  const p2idx = state.parentFor[key2];

  const haveSameParent = p1idx === p2idx;

  let newState = {};

  if (haveSameParent) {
    const nodeParent = state[p1idx];

    const swappedChildren = nodeParent.children.map((idx) => {
      if (idx === key1) return key2;
      if (idx === key2) return key1;
      return idx;
    });

    const newParent = { ...nodeParent, children: swappedChildren };

    newState = {
      [p1idx]: newParent,
      parentFor: {
        ...state.parentFor,
        [key1]: p1idx,
        [key2]: p1idx,
      },
    };
  } else {
    const parent1 = state[p1idx];
    const p1children = parent1.children.map(idx => ((idx === key1) ? key2 : idx));
    const newP1 = { ...parent1, children: p1children };

    const parent2 = state[p2idx];
    const p2children = parent2.children.map(idx => ((idx === key2) ? key1 : idx));
    const newP2 = { ...parent2, children: p2children };

    newState = {
      [p1idx]: newP1,
      [p2idx]: newP2,
      parentFor: {
        ...state.parentFor,
        [key1]: p2idx,
        [key2]: p1idx,
      },
    };
  }

  return { ...state, ...newState };
}

function getHighestKey(obj) {
  const keysAsInts = Object.keys(obj).map(k => parseInt(k, 10));
  return Math.max(...keysAsInts);
}

function getNewKey(state) {
  return getHighestKey(state.parentFor) + 1;
}

function addNode(parentKey, value, state) {
  const pNode = state[parentKey];
  const newNodeKey = getNewKey(state);
  const newChildren = [...pNode.children, newNodeKey];
  const newParent = { ...pNode, children: newChildren };

  return {
    ...state,
    [parentKey]: newParent,
    [newNodeKey]: { value, children: [] },
    parentFor: {
      ...state.parentFor,
      [newNodeKey]: parentKey,
    },
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'ADD_NODE':
      const { parentKey, value } = action.payload;
      return addNode(parentKey, value, state);
    case 'SWAP_NODES':
      return swapNodes(action.payload.nodeKeys, state);
    default:
      return state;
  }
}
