import * as React from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import useBattlePass from "../lib/useBattlePass";

type Props = {
  profile: Profile;
};

const BattlePass: React.FunctionComponent<Props> = props => {
  const { profile } = props;
  const bp = useBattlePass(profile);

  const loading = (
    <Loader
      type="Triangle"
      color="#FF8379"
      height={100}
      width={100}
      timeout={3000}
    />
  );

  const bptable = (
    <table>
      <tr>
        {bp?.payload?.results?.map(item => {
          <TableTD>
            <h1>{item && item.prizeName ? item.prizeName : "Some Prize"}</h1>
          </TableTD>;
        })}
      </tr>
      <tr></tr>
    </table>
  );

  return (
    <Scrollable>
      {bp.status === "loading" ? loading : ""}
      {bp.status === "loaded" ? bptable : ""}
    </Scrollable>
  );
};

const Scrollable = styled.div`
  overflow-x: scroll;
`;

const TableTD = styled.td`
  height: 50px;
  width: 50px;
  border-width: 4px;
  border-color: #757575;
  border-radius: 6px;
`;

export default BattlePass;
