import styled from "styled-components";

const WidgetFrame = ({
  widget,
  component,
}: {
  widget?: "one" | "two" | "three" | "team";
  component: React.ReactNode;
}) => {
  const getGridArea = () => {
    if (widget === "one") return "grid-area: WidgetArea1";
    else if (widget === "two") return "grid-area: WidgetArea2";
    else if (widget === "three") return "grid-area: BigWidget";
    else if (widget === "team") return "grid-area: Team";
    else return "";
  };

  const Container = styled.div`
    ${!!widget && "display: grid;"}
    ${getGridArea()};
    background: #2d4158;
    margin: 16px;
    padding: 12px;
    border-radius: 15px;
  `;

  return <Container>{component}</Container>;
};

export default WidgetFrame;
