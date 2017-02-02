import { connect } from 'react-redux';
import TreeNode from './TreeNode';

const nestTree = (currNode, state) => {
  const { key, children, value } = currNode;

  if (children.length === 0) {
    return { nodeKey: key, nodeValue: value, nodeChildren: children };
  }

  const newChildren = children.map(
    childKey => nestTree({ ...state[childKey], key: childKey }, state)
  );

  return { nodeKey: key, nodeValue: value, nodeChildren: newChildren };
};

const mapStateToProps = state => nestTree({ ...state[0], nodeKey: 0 }, state);

const swapNodes = nodeKeys => ({
  type: 'SWAP_NODES',
  payload: { nodeKeys },
});

const mapDispatchToProps = dispatch => ({
  onSwapClick: (id1, id2) => dispatch(swapNodes([id1, id2])),
});

export default connect(mapStateToProps, mapDispatchToProps)(TreeNode);
