import * as React from "react";
import styled from "styled-components";
import QrCode from "react-qr-code";

type Props = {
  profile: Profile;
};

const QRCode: React.FunctionComponent<Props> = (props) => {
  const { profile } = props;

  return (
    <QRCodeWrapper>
      <QrCode value={profile.qrCodeId ? profile.qrCodeId : profile.userId} />

      {profile.qrCodeId && <Code>{profile.qrCodeId}</Code>}
    </QRCodeWrapper>
  );
};

const QRCodeWrapper = styled.div`
  width: 100%;
  max-width: 256px;
  margin: auto;
  border: 24px solid #ffffff;

  svg {
    display: block;
  }
`;

const Code = styled.div`
  padding: 12px;
  background: rgb(255, 131, 121);
  color: #ffffff;
  text-align: center;
  font-weight: 700;
`;

export default QRCode;
