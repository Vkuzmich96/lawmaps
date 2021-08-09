import ReactFlow from "react-flow-renderer";
function App() {
  const elements = [
    { id: "1", data: { label: "Node 1" }, position: { x: 250, y: 5 } },
    { id: "3", data: { label: "Node 3" }, position: { x: 250, y: 5 } },
    { id: "4", data: { label: "Node 4" }, position: { x: 250, y: 5 } },

    {
      id: "2",
      data: { label: <div>Node 2</div> },
      position: { x: 100, y: 100 },
    },
    { id: "e1-2", source: "1", target: "2", animated: true },
    { id: "e3-2", source: "3", target: "2", animated: false },
    { id: "e2-4", source: "4", target: "2", animated: false },
  ];
  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: "#ccc" }}>
      <ReactFlow elements={elements} />;
    </div>
  );
}

export default App;
