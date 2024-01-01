// EdgeControls.js
import React from "react";

const EdgeControls = ({
  fromNode,
  setFromNode,
  toNode,
  setToNode,
  addEdge,
  deleteEdge,
}) => {
  return (
    <div className="control-panel">
      <input
        type="number"
        value={fromNode}
        onChange={(e) => setFromNode(e.target.value)}
        placeholder="From node ID"
      />
      <input
        type="number"
        value={toNode}
        onChange={(e) => setToNode(e.target.value)}
        placeholder="To node ID"
      />
      <button onClick={addEdge}>Add Edge</button>
      <button onClick={deleteEdge}>Delete Selected Edge</button>
    </div>
  );
};

export default EdgeControls;
