import * as React from "react";
import styled from "styled-components";
import QrCode from "react-qr-code";

type Props = {
  profile: Profile;
};

const QRCode: React.FunctionComponent<Props> = props => {
  const { profile } = props;

  return (
    <QRCodeWrapper>
      <QrCode value={profile.userId} />
    </QRCodeWrapper>
  );
};

const QRCodeWrapper = styled.div`
  width: 256px;
  margin: auto;
`;

export default QRCode;
