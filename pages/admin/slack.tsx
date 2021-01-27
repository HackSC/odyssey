import React, { useRef, useState, useMemo, useCallback } from "react";
import styled from "styled-components";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { useTable, useSortBy } from "react-table";
import useSWR from "swr";
import { Head } from "../../components";
import Modal from "../../components/Modal";
import Skeleton from "react-loading-skeleton";
// Layout
import Navbar from "../../components/hackerDashboard/layout/Navbar";
import Footer from "../../components/hackerDashboard/layout/Footer";
import Header from "../../components/hackerDashboard/layout/Header";
import WidgetFrame from "../../components/hackerDashboard/HackerWidgetFrame";

const booleanValue = (accessor) => {
  return (val) => (val[accessor] === true ? "✅" : "❌");
};

const adminSlack = () => {
  const fetcher = (input: RequestInfo, init?: RequestInit) =>
    fetch(input, init).then((res) => res.json());
  const { data: users } = useSWR("/api/slack/getUsers", fetcher, {
    refreshInterval: 60000,
  });
  const { data: convos } = useSWR("/api/slack/getConversations", fetcher, {
    refreshInterval: 60000,
  });

  const channelColumns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: (d) => (
          <span style={{ cursor: "pointer", textDecoration: "underline" }}>
            {d["id"]}
          </span>
        ),
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Public",
        accessor: booleanValue("is_channel"),
      },
      {
        Header: "Archived",
        accessor: booleanValue("is_archived"),
      },
      {
        Header: "Created",
        accessor: (val) => new Date(val["created"]).toLocaleDateString("en-US"),
      },
      {
        Header: "members",
        accessor: "num_members",
      },
    ],
    []
  );
  const tableColumns = useMemo(
    () =>
      !convos
        ? channelColumns.map((column) => ({
            ...column,
            Cell: <Skeleton style={{ minWidth: 80 }} />,
          }))
        : channelColumns,
    [convos, channelColumns]
  );
  const tableData = useMemo(
    () =>
      convos ? Object.keys(convos).map((i) => convos[i]) : Array(30).fill({}),
    [convos]
  );

  const tableInstance = useTable(
    { columns: tableColumns, data: tableData },
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <Container>
      <Head title="HackSC Odyssey - Slack Command Center" />
      <Header text={"Slack Command Center"} />
      <ChannelList>
        <Table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          " 🔽"
                        ) : (
                          " 🔼"
                        )
                      ) : (
                        <span style={{ opacity: ".5" }}> 🔽</span>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <TableCell {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </ChannelList>
      <Sidebar>
        <p>
          {users ? (
            `Total members: ${Object.values(users).length}`
          ) : (
            <>
              Total members: <Skeleton width={25} height={32} />
            </>
          )}
        </p>
        <UserList>
          {users
            ? Object.values(users).map((e: any) => {
                if (e.is_admin) {
                  return (
                    <LoadedUser key={e.id}>
                      <img
                        src={e.profile.image_32}
                        height={30}
                        width={30}
                        style={{ marginRight: 4 }}
                      />
                      <strong>
                        {e.name} - {e.real_name}
                      </strong>
                    </LoadedUser>
                  );
                }
                return (
                  <LoadedUser key={e.id}>
                    <img
                      src={e.profile.image_32}
                      height={30}
                      width={30}
                      style={{ marginRight: 4 }}
                    />
                    {e.name} - {e.real_name}
                  </LoadedUser>
                );
              })
            : [...Array(40)].map((e, i) => (
                <User key={i}>
                  <Skeleton width={32} height={32} style={{ marginRight: 4 }} />
                  <Skeleton height={32} width={"80%"} />
                </User>
              ))}
        </UserList>
      </Sidebar>
      <Footer />
    </Container>
  );
};

const Sidebar = styled.div`
  grid-area: Sidebar;
  width: 270px;
  background: #2d4158;
  color: #fff;
  display: flex;
  flex-direction: column;
  font-family: "Work Sans", sans-serif;
  margin: 16px;
  padding: 12px;
  border-radius: 15px;
  box-shadow: 8px 4px 4px rgba(0, 0, 0, 0.2);
  overflow-y: scroll;
  overflow-x: hidden;
`;

const ChannelList = styled.div`
  width: 80%;
  grid-area: ChannelList;
  background: #2d4158;
  color: #fff;
  display: flex;
  flex-direction: column;
  font-family: "Work Sans", sans-serif;
  margin: 16px;
  padding: 12px;
  border-radius: 15px;
  box-shadow: 8px 4px 4px rgba(0, 0, 0, 0.2);
  overflow-y: scroll;
`;

const UserList = styled.ul`
  list-style-type: none;
  padding: 0; /* Remove padding */
  margin: 0; /* Remove margins */
`;
const User = styled.li`
  margin-top: 3px;
  margin-bottom: 3px;
`;

const LoadedUser = styled.li`
  margin-top: 3px;
  margin-bottom: 3px;
  display: flex;
  align-items: center;
`;
const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 0.5fr 1.5fr 0.5fr;
  grid-template-rows: 0.2fr 0.2fr 1.6fr 0.6fr;
  gap: 0px;
  grid-template-areas:
    "Navbar Header Header Header"
    "Navbar ChannelList ChannelList Sidebar"
    "Navbar ChannelList ChannelList Sidebar"
    "Footer Footer Footer Footer";
  background-color: #1d2c3f;
  color: #fff;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-style: hidden;
`;

const TableCell = styled.td`
  margin: 0;
  padding: 0.5rem;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
`;

export default adminSlack;
