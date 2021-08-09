import ReactFlow, {Background} from "react-flow-renderer";
function App() {
  const elements = [
    { id: "1",
      type: "input",
      data: { label: "Node 1" },
      position: { x: 250, y: 200 },
      sourcePosition: 'right',
    },

    {
      id: "2",
      type: "output",
      data: { label: <div>Node 2</div> },
      position: { x: 550, y: 200 },
      targetPosition: 'left',
    },
    { id: "e1-2", source: "1", target: "2", animated: true, label: "label", labelShowBg: false },
  ];
  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: "#ccc" }}>
      <ReactFlow elements={elements}>
        <Background
            variant="dots"
            gap={20}
            size={1}
        />
      </ReactFlow>
    </div>
  );
}

export default App;
