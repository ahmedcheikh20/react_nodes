import React from "react";
import Graph from "react-graph-vis";

const GraphDisplay = ({ graph, options, events }) => {
  return (
    <Graph
      key={Date.now()}
      graph={graph}
      options={options}
      events={events}
      id="mynetwork"
    />
  );
};

export default GraphDisplay;
