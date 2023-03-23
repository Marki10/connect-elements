import { ConnectorOrientatin } from ".";

export const generateSVG = (
  boxWidth: number,
  boxheight: number,
  color: string,
  orientation: ConnectorOrientatin
) => {
  return (
    <svg width={boxWidth} height={boxheight} xmlns="http://www.w3.org/2000/svg">
      <path
        d={getSVGPathByOrientation(boxWidth, boxheight, orientation)}
        stroke={color}
        strokeWidth="2"
        fill="transparent"
      />
    </svg>
  );
};

export const getSVGPathByOrientation = (
  boxWidth: number,
  boxheight: number,
  orientation: ConnectorOrientatin
) => {
  switch (orientation) {
    case ConnectorOrientatin.up:
      return `
  M 0 1
  L ${boxWidth * 0.3} 1
  C ${boxWidth * 0.3} 1,${boxWidth * 0.5} 0, ${boxWidth * 0.5} ${boxWidth * 0.3}
  L ${boxWidth * 0.5} ${boxheight - 1}
  L ${boxWidth} ${boxheight - 1}
  `;

    case ConnectorOrientatin.down:
      return `
  M 0 ${boxheight - 1}
  L ${boxWidth * 0.3} ${boxheight - 1}
  C ${boxWidth * 0.5} ${boxheight - 1}, ${boxWidth * 0.5} ${boxheight}, ${
        boxWidth * 0.5
      } ${boxheight * 0.5}
  L ${boxWidth * 0.5} 1
  L ${boxWidth} 1
  `;

    default:
      return "";
  }
};

export const getBoxWidthHeightPosition = (
  fromElement: any,
  toElement: any,
  orientation: ConnectorOrientatin,
  color: string
) => {
  const boxProps = {
    boxWidth: 0,
    boxHeight: 0,
    style: {
      left: "0",
      top: "0",
      width: "0",
      height: "0",
      zIndex: 0,
      backgroundColor: "",
    },
  };

  if (fromElement && toElement) {
    const fromElementDimensions = fromElement.getBoundingClientRect();
    const toElementDimensions = toElement.getBoundingClientRect();

    switch (orientation) {
      case ConnectorOrientatin.up:
        boxProps.boxWidth =
          toElementDimensions.left -
          fromElementDimensions.left -
          toElementDimensions.width;
        boxProps.boxHeight =
          toElementDimensions.top - fromElementDimensions.top;
        boxProps.style = {
          left: fromElementDimensions.x + fromElementDimensions.width + "px",
          top:
            fromElementDimensions.y + fromElementDimensions.height / 2 + "px",

          width: boxProps.boxWidth + "px",
          height: boxProps.boxHeight + "px",
          zIndex: 1,
          backgroundColor: "",
        };
        break;
      case ConnectorOrientatin.down:
        boxProps.boxWidth =
          toElementDimensions.left -
          fromElementDimensions.left -
          toElementDimensions.width;
        boxProps.boxHeight =
          fromElementDimensions.top - toElementDimensions.top + 3;

        boxProps.style = {
          left: fromElementDimensions.x + fromElementDimensions.width + "px",
          top:
            toElementDimensions.top -
            2 +
            fromElementDimensions.height / 2 +
            "px",

          width: boxProps.boxWidth + "px",
          height: boxProps.boxHeight + "px",
          zIndex: 0,
          backgroundColor: "",
        };
        break;
      case ConnectorOrientatin.straight:
        boxProps.boxWidth =
          toElementDimensions.left -
          fromElementDimensions.left -
          toElementDimensions.width;

        boxProps.style = {
          left: fromElementDimensions.x + fromElementDimensions.width + "px",
          top:
            toElementDimensions.top + fromElementDimensions.height / 2 + "px",

          width: boxProps.boxWidth + "px",
          height: "2px",
          backgroundColor: color,
          zIndex: 0,
        };
        break;
    }
  }

  return boxProps;
};
