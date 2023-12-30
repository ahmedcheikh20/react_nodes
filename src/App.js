import React, { useState } from 'react';
import './App.css';
import Graph from "react-graph-vis";

function App() {
  const initialNodes = [
    { id: 1, label: "Node 1", title: "node 1 tootip text" },
    { id: 2, label: "Node 2", title: "node 2 tootip text" },
    { id: 3, label: "Node 3", title: "node 3 tootip text" },
    { id: 4, label: "Node 4", title: "node 4 tootip text" },
    { id: 5, label: "Node 5", title: "node 5 tootip text" }
  ];

  const initialEdges = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 2, to: 5 }
  ]

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [newLabel, setNewLabel] = useState('');
  const [newNodeLabel, setNewNodeLabel] = useState('');
  const [fromNode, setFromNode] = useState('');
  const [toNode, setToNode] = useState('');

  const graph = {
    nodes: nodes,
    edges: edges
  };

  const addEdge = () => {
    const newEdge = {
      from: parseInt(fromNode),
      to: parseInt(toNode)
    };

    setEdges([...edges, newEdge]);
    setFromNode('');
    setToNode('');
  };

  const deleteEdge = () => {
    if (selectedEdge !== null) {
      const updatedEdges = edges.filter(edge => edge.id !== selectedEdge);
      setEdges(updatedEdges);
      setSelectedEdge(null);
    }
  };

  const options = {
    layout: {
      hierarchical: true
    },
    edges: {
      color: "#000000"
    },
    height: "500px"
  };
  // const options = {
  //   layout: {
  //     hierarchical: false // Disable hierarchical layout
  //   },
  //   edges: {
  //     color: "#000000"
  //   },
  //   height: "500px",
  //   physics: {
  //     enabled: true // You can adjust physics as needed
  //   }
  // };

  const events = {
    select: function(event) {
      var { nodes: selectedNodes, edges: selectedEdges } = event;
      if (selectedNodes.length > 0) {
        setSelectedNode(selectedNodes[0]);
        setSelectedEdge(null);
      } else if (selectedEdges.length > 0) {
        setSelectedEdge(selectedEdges[0]);
        setSelectedNode(null);
      } else {
        setSelectedNode(null);
        setSelectedEdge(null);
      }
    }
  };

  const updateNodeLabel = () => {
    if (selectedNode !== null) {
  
      const updatedNodes = nodes.map(node => {
        if (node.id === selectedNode) {
          return { ...node, label: newLabel };
        }
        return node;
      });
  
      setNodes(updatedNodes);
      setNewLabel("")
    }
  };
  const addNode = () => {
    const newNode = {
      id: Math.max(...nodes.map(node => node.id)) + 1, // Generate a new ID
      label: newNodeLabel,
      title: `node ${newNodeLabel} tooltip text`
    };

    setNodes([...nodes, newNode]);
    setNewNodeLabel(''); // Reset the input field
  };

  return (
    <div>
      <Graph
        key={Date.now()}
        graph={graph}
        options={options}
        events={events}
      />
      <div>
        <input
          type="text"
          value={newLabel}
          onChange={e => setNewLabel(e.target.value)}
          placeholder="New label"
        />
        <button onClick={updateNodeLabel}>Update Node Label</button>
      </div>
      <div>
        <input
          type="text"
          value={newNodeLabel}
          onChange={e => setNewNodeLabel(e.target.value)}
          placeholder="New node label"
        />
        <button onClick={addNode}>Add Node</button>
      </div>
      <div>
        <input
          type="number"
          value={fromNode}
          onChange={e => setFromNode(e.target.value)}
          placeholder="From node ID"
        />
        <input
          type="number"
          value={toNode}
          onChange={e => setToNode(e.target.value)}
          placeholder="To node ID"
        />
        <button onClick={addEdge}>Add Edge</button>
      </div>
      <div>
        <button onClick={deleteEdge}>Delete Selected Edge</button>
      </div>
    </div>
  );
}

export default App;
