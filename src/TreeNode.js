import React from 'react';

class TreeRoot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id1: '',
      id2: '',
    };
  }

  swapNodes(onSwapClick) {
    onSwapClick(parseInt(this.state.id1, 10), parseInt(this.state.id2, 10));
  }

  render() {
    const { onSwapClick, ...nodeProps } = this.props;

    return (
      <div>
        <ul className="tree-container">
          <TreeNode {...nodeProps} />
        </ul>
        <input
          type="text"
          value={this.state.id1}
          onChange={e => this.setState({ id1: e.target.value })}
        />
        <input
          type="text"
          value={this.state.id2}
          onChange={e => this.setState({ id2: e.target.value })}
        />
        <button
          onClick={this.swapNodes.bind(this, onSwapClick)}
        >
          Swap Nodes
        </button>
      </div>
    );
  }
}

const TreeNode = ({ nodeChildren, nodeValue, nodeKey }) => {
  let childList = null;

  if (nodeChildren.length > 0) {
    childList = (
      <ul>
        {nodeChildren.map((nodeProps, idx) => (<TreeNode key={`treenode-${idx}`} {...nodeProps} />))}
      </ul>
    );
  }

  return (
    <li>
      <p>{nodeKey}: {nodeValue}</p>
      {childList}
    </li>
  );
};

export default TreeRoot;
