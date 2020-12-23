import styled from "styled-components";

const WidgetFrame = ({
  widget,
  component,
}: {
  widget?: string;
  component: React.ReactNode;
}) => {
  const getGridArea = () => {
    if (widget === "one") return "WidgetArea1";
    else if (widget === "two") return "WidgetArea2";
    else if (widget === "three") return "BigWidget";
    else return "";
  };

  return (
    <Container
      style={{ display: widget ? "grid" : "initial", gridArea: getGridArea() }}
    >
      {component}
    </Container>
  );
};

export default WidgetFrame;

const Container = styled.div<{ widget?: boolean }>`
  background: #2d4158;
  margin: 16px;
  padding: 12px;
  border-radius: 15px;
  box-shadow: 8px 4px 4px rgba(0, 0, 0, 0.2);
`;
