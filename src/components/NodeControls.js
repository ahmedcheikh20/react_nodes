import React from "react";

const NodeControls = ({
  newLabel,
  setNewLabel,
  updateNodeLabel,
  newNodeLabel,
  setNewNodeLabel,
  addNode,
}) => {
  return (
    <div className="control-panel">
      <input
        type="text"
        value={newLabel}
        onChange={(e) => setNewLabel(e.target.value)}
        placeholder="New label"
      />
      <button onClick={updateNodeLabel}>Update Node Label</button>
      <input
        type="text"
        value={newNodeLabel}
        onChange={(e) => setNewNodeLabel(e.target.value)}
        placeholder="New node label"
      />
      <button onClick={addNode}>Add Node</button>
    </div>
  );
};

export default NodeControls;
