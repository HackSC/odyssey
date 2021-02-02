import * as React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  visible: boolean;
  conversationId: string;
  header?: React.ReactNode;
  style?: any;
};

const SlackModal: React.FunctionComponent<Props> = (props) => {
  const { children, conversationId, visible = false, style } = props;
  const [users, setUsers] = React.useState([]);

  console.log("modal");
  console.log(conversationId);

  React.useEffect(() => {
    const channelUsers = fetch("/api/slack/getUsersByConversation", {
      method: "POST",
      body: JSON.stringify({ conversationId: conversationId }),
    })
      .then((response) => response.json())
      .then((response) => {})
      // .then((res) => {
      //     const users = res.json().users;
      //     setUsers(users);
      // })
      .catch((err) => {});
  }, []);

  if (!visible || !conversationId) {
    return null;
  }

  return <ModalWrapper style={style ? style : {}}>{children}</ModalWrapper>;
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

export default SlackModal;
