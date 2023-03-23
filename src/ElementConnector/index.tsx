import React, {
  ReactComponentElement,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { generateSVG, getBoxWidthHeightPosition } from "./utils";

export enum ConnectorOrientatin {
  up = "up",
  down = "down",
  straight = "straight",
}

interface IElementsToConnect {
  from: string;
  to: string;
  orientation: ConnectorOrientatin;
  color: string;
}

interface IElementConnector {
  elementsToConnect: IElementsToConnect[];
}

const ElementConnector = ({ elementsToConnect }: IElementConnector) => {
  const [newElements, setNewElements] = useState<ReactElement[]>([]);

  useEffect(() => {
    const newItems: ReactComponentElement<any, any>[] = [];

    elementsToConnect.map((element: IElementsToConnect) => {
      console.log("element.from,element.from", element.from);
      const fromElement = document.querySelector(element.from);
      const toElement = document.querySelector(element.to);

      const boxProps = getBoxWidthHeightPosition(
        fromElement,
        toElement,
        element.orientation,
        element.color
      );

      newItems.push(
        React.createElement(
          "div",
          { style: boxProps.style, class: "connector" },
          generateSVG(
            boxProps.boxWidth,
            boxProps.boxHeight,
            element.color,
            element.orientation
          )
        )
      );
    });

    setNewElements(newItems);
  }, []);

  return (
    <>
      {newElements.map((el: ReactElement) => (
        <>{el}</>
      ))}
    </>
  );
};

export default ElementConnector;
