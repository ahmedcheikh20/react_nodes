import React, { useState } from "react";
import "./App.css";
import GraphDisplay from "./components/GraphDisplay.js";
import NodeControls from "./components/NodeControls.js";
import EdgeControls from "./components/EdgeControls.js";
import Modal from "./components/Modal";

function App() {
  const initialNodes = [
    {
      id: 1,
      label: "Node 1",
      shape: "image",
      image: "/icons/API-Gateway.svg",
      size: 50,
      title: "node 1 tootip text",
    },
    {
      id: 2,
      label: "Node 2",
      shape: "image",
      image: "/icons/API-Gateway.svg",
      size: 50,
      title: "node 2 tootip text",
    },
    {
      id: 3,
      label: "Node 3",
      shape: "image",
      image: "/icons/API-Gateway.svg",
      size: 50,
      title: "node 3 tootip text",
    },
    {
      id: 4,
      label: "Node 4",
      shape: "image",
      image: "/icons/API-Gateway.svg",
      size: 50,
      title: "node 4 tootip text",
    },
    {
      id: 5,
      label: "Node 5",
      shape: "image",
      image: "/icons/API-Gateway.svg",
      size: 50,
      title: "node 5 tootip text",
    },
  ];

  const nodeSchema = {
    properties: [
      {
        key: "1",
        label: "id",
        type: "text",
        shape: "image",
        image: "../icons/API-Gateway.svg",
        size: 50,
        required: true,
      },
      {
        key: "2",
        label: "name",
        type: "text",
        shape: "image",
        image: "../icons/API-Gateway.svg",
        size: 50,
        required: false,
      },
      {
        key: "3",
        label: "s3_key",
        type: "number",
        shape: "image",
        image: "../../icons/API-Gateway.svg",
        size: 50,
        required: false,
      },
      {
        key: "4",
        label: "s3_nucket",
        type: "text",
        shape: "image",
        image: "../icons/API-Gateway.svg",
        size: 50,
        required: true,
      },
      {
        key: "5",
        label: "Label",
        type: "number",
        shape: "image",
        image: "../icons/API-Gateway.svg",
        size: 50,
        required: true,
      },
    ],
  };

  const initialEdges = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
  ];

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [newLabel, setNewLabel] = useState("");
  const [newNodeLabel, setNewNodeLabel] = useState("");
  const [fromNode, setFromNode] = useState("");
  const [toNode, setToNode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddNodeClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (formData) => {
    // Use formData to add a new node
    const newNode = {
      id: Math.max(...nodes.map((n) => n.id)) + 1,
      ...formData,
    };
    setNodes([...nodes, newNode]);
    handleModalClose();
  };

  const graph = {
    nodes: nodes,
    edges: edges,
  };

  const addEdge = () => {
    const newEdge = {
      from: parseInt(fromNode),
      to: parseInt(toNode),
    };

    setEdges([...edges, newEdge]);
    setFromNode("");
    setToNode("");
  };

  const deleteEdge = () => {
    if (selectedEdge !== null) {
      const updatedEdges = edges.filter((edge) => edge.id !== selectedEdge);
      setEdges(updatedEdges);
      setSelectedEdge(null);
    }
  };

  // const options = {
  //   layout: {
  //     hierarchical: true,
  //   },
  //   edges: {
  //     color: "#000000",
  //   },
  //   height: "500px",
  // };
  const options = {
    layout: {
      hierarchical: false, // Disable hierarchical layout
    },
    edges: {
      color: "#000000",
    },
    height: "500px",
    physics: {
      stabilization: true,
      solver: "barnesHut",
      barnesHut: {
        gravitationalConstant: -8000,
        centralGravity: 0.3,
        springLength: 95,
      },
      adaptiveTimestep: true,
      enabled: true, // Enables physics initially
    },
  };

  const events = {
    select: function (event) {
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
    },
  };

  const updateNodeLabel = () => {
    if (selectedNode !== null) {
      const updatedNodes = nodes.map((node) => {
        if (node.id === selectedNode) {
          return { ...node, label: newLabel };
        }
        return node;
      });

      setNodes(updatedNodes);
      setNewLabel("");
    }
  };
  const addNode = () => {
    const newNode = {
      id: Math.max(...nodes.map((node) => node.id)) + 1, // Generate a new ID
      label: newNodeLabel,
      title: `node ${newNodeLabel} tooltip text`,
    };

    setNodes([...nodes, newNode]);
    setNewNodeLabel(""); // Reset the input field
  };

  return (
    <div>
      <button onClick={handleAddNodeClick}>Add Node</button>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        schema={nodeSchema}
        onSubmit={handleFormSubmit}
      />
      <GraphDisplay graph={graph} options={options} events={events} />
      <NodeControls
        newLabel={newLabel}
        setNewLabel={setNewLabel}
        updateNodeLabel={updateNodeLabel}
        newNodeLabel={newNodeLabel}
        setNewNodeLabel={setNewNodeLabel}
        addNode={addNode}
      />
      <EdgeControls
        fromNode={fromNode}
        setFromNode={setFromNode}
        toNode={toNode}
        setToNode={setToNode}
        addEdge={addEdge}
        deleteEdge={deleteEdge}
      />
    </div>
  );
}

export default App;
