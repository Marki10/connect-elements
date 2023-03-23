import { createRef, useRef } from "react";
import "./App.css";
import ElementConnector, { ConnectorOrientatin } from "./ElementConnector";

function App() {
  const elements = [
    { top: 20, left: 0, class: "box1" },
    { top: 160, left: 20, class: "box2" },
    { top: 280, left: 0, class: "box3" },
    { top: 380, left: 30, class: "box4" },
    { top: 85, left: 160, class: "box5" },
    { top: 350, left: 160, class: "box6" },
    { top: 160, left: 360, class: "box7" },
    { top: 120, left: 560, class: "box8" },
  ];
  const itemEls = elements.map(() => createRef(null));
  return (
    <div className="App" id="App">
      <>
        {elements.map((el, index) => {
          return (
            <div
              ref={(element) => (itemEls.current[index] = element)}
              className={`box ${el.class}`}
              style={{ top: el.top, left: el.left }}
            ></div>
          );
        })}
        {console.log("refs", itemEls)}
        <ElementConnector
          elementsToConnect={[
            {
              from: itemEls[0],
              to: itemEls[4],
              orientation: ConnectorOrientatin.up,
              color: "green",
            },
            {
              from: ".box2",
              to: ".box5",
              orientation: ConnectorOrientatin.down,
              color: "grey",
            },
            {
              from: ".box3",
              to: ".box6",
              orientation: ConnectorOrientatin.up,
              color: "grey",
            },
            {
              from: ".box4",
              to: ".box6",
              orientation: ConnectorOrientatin.down,
              color: "grey",
            },
            {
              from: ".box5",
              to: ".box7",
              orientation: ConnectorOrientatin.up,
              color: "grey",
            },
            {
              from: ".box6",
              to: ".box7",
              orientation: ConnectorOrientatin.down,
              color: "grey",
            },
            {
              from: ".box7",
              to: ".box8",
              orientation: ConnectorOrientatin.straight,
              color: "grey",
            },
          ]}
        />
      </>
    </div>
  );
}

export default App;
