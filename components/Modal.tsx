import * as React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  visible: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  style?: any;
};

const Modal: React.FunctionComponent<Props> = (props) => {
  const { children, visible = false, footer, header, style } = props;

  if (!visible) {
    return null;
  }

  return (
    <ModalWrapper style={style ? style : {}}>
      {header && (
        <div>
          {header}
          <hr />
        </div>
      )}
      {children}
      {footer && (
        <div>
          <hr />
          {footer}
        </div>
      )}
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  min-width: 400px;
  min-height: 400px;
  max-height: 70vh;
  max-width: 70vw;
  background: ${({ theme }) => theme.colors.gray25};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 24px;
  border-radius: 8px;
  color: white;
  overflow-y: scroll;
`;

export default Modal;
