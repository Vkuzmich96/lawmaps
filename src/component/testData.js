import "./testdata.css";
export const elements = [
  {
    id: "1",
    type: "input",
    data: { label: "Node 1" },
    position: { x: 250, y: 200 },
    sourcePosition: "right",
  },

  {
    id: "2",
    type: "output",
    data: { label: <div>Node 2</div> },
    position: { x: 550, y: 200 },
    targetPosition: "left",
  },
  {
    id: "e1-2",
    source: "1",
    animated: true,
    target: "2",
    label: "label",
    labelStyle: { fontSize: "20px" },
  },
];
