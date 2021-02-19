import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { liveLookupFetch } from "../../../../lib/api-sdk/liveHooks";
import Button from "../../../Button";

const Stats = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    let [firstName, lastName, email] = ["", "", ""];
    liveLookupFetch({ firstName, lastName, email }).then((res) => {
      setProfiles(res.success);
    });
  }, []);

  if (!profiles || profiles.length === 0) {
    return <p>Fetching stats...</p>;
  }

  type Stat = {
    title: string;
    reducer: (
      previousValue: any,
      currentValue: Profile,
      currentIndex?: number,
      array?: any[]
    ) => number;
  };

  const stats: Stat[] = [
    {
      title: "Total hackers",
      reducer: (a, b) => a + (b.role == "hacker" ? 1 : 0),
    },
    {
      title: "Submit apps",
      reducer: (a, b) =>
        a + (b.status != "verified" && b.status != "unverified" ? 1 : 0),
    },
    {
      title: "Unsubmit apps",
      reducer: (a, b) =>
        a + (b.status == "verified" || b.status == "unverified" ? 1 : 0),
    },
  ];

  return (
    <>
      <h3>Hacker Stats</h3>
      <Table>
        {stats.map(({ title, reducer }) => (
          <TableRow>
            <td>{title}</td>
            <td>{profiles.reduce(reducer, 0)}</td>
          </TableRow>
        ))}
      </Table>
      <Link href="/admin/admin-stats">
        <Button style={{ cursor: "pointer" }}>View more stats &raquo;</Button>
      </Link>
    </>
  );
};

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
`;

const TableRow = styled.tr``;

export default Stats;
