import { useState } from "react";
import moment from "moment";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  TimelineMarkers,
  TodayMarker
} from "react-calendar-timeline";
import { useEventsList } from "../lib/api-sdk/eventHooks";
import "react-calendar-timeline/lib/Timeline.css";

type Props = {};

type ItemProps = {
  item: any;
  timelineContext: any;
  itemContext: any;
  getItemProps: any;
  getResizeProps: any;
};

let defaultTimeStart = moment()
  .startOf("day")
  .add(moment().hour(), "hour");
//.valueOf();

let defaultTimeEnd = moment()
  .startOf("day")
  .add(moment().hour(), "hour")
  .add(2, "hour");
//.valueOf();

const Calendar: React.FunctionComponent<Props> = props => {
  const { allEvents } = useEventsList({ defaultOnError: console.log });
  const [eventVisibility, setEventVisibility] = useState({
    visible: false,
    e: {},
    title: "Event"
  });

  const itemRenderer: React.FunctionComponent<ItemProps> = props => {
    const {
      item,
      itemContext,
      getItemProps,
      timelineContext,
      getResizeProps
    } = props;
    const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();

    return (
      <div
        {...getItemProps({
          style: {
            backgroundColor: itemContext.selected ? "#f6f6f6" : "white",
            color: item.color,
            borderColor: "#FF8379",
            borderStyle: "solid",
            borderWidth: 3,
            borderRadius: 4,
            borderLeftWidth: 3,
            borderRightWidth: 3
          },
          onMouseDown: e => {
            setEventVisibility({
              visible: true,
              e: eventVisibility?.e,
              title: item.title
            });
          },
          onTouchStart: () => {
            console.log("hovering");
          }
        })}
      >
        {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null}

        <div
          style={{
            paddingLeft: 3,
            overflow: "scroll",
            textOverflow: "ellipses",
            whiteSpace: "nowrap"
          }}
        >
          {itemContext.title}
        </div>

        {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : null}
      </div>
    );
  };

  const items = allEvents
    ? allEvents.map((e: any) => {
        let startTime = moment(e.startsAt)
          .add(8, "hour")
          .valueOf();
        let endTime = moment(e.endsAt)
          .add(8, "hour")
          .valueOf();
        return {
          id: e.id + "" ?? "",
          key: e.id + "" ?? "",
          group: 1,
          desc: e.description ?? "",
          title: e.name + " - " + e.description ?? "Event",
          start_time: startTime ?? "",
          end_time: endTime ?? "",
          canMove: false,
          canResize: false,
          className: "rct-item",
          bgColor: "#FFFFFF",
          selectedBgColor: "#FFFFFF",
          color: "#1C1C1C",
          itemProps: {
            createdAt: e.createdAt ?? "",
            updatedAt: e.updatedAt ?? ""
          }
        };
      })
    : [];

  return (
    <Timeline
      groups={[
        {
          id: 1,
          title: "HackSC-2020",
          rightTitle: "HackSC-2020",
          bgColor: "#000000",
          height: 400
        }
      ]}
      items={items}
      sidebarWidth={0}
      itemTouchSendsClick={false}
      stackItems={true}
      itemHeightRatio={0.8}
      showCursorLine
      canMove={false}
      canResize={false}
      defaultTimeStart={defaultTimeStart}
      lineHeight={60}
      defaultTimeEnd={defaultTimeEnd}
      itemRenderer={itemRenderer}
      onTimeChange={(vstart, vend, updateScroll) => {
        updateScroll(vstart, vend);
        defaultTimeStart = vstart;
        defaultTimeEnd = vend;
      }}
      style={{ width: "-webkit-fill-available", border: "hidden" }}
    >
      <TimelineHeaders
        style={{
          border: "hidden",
          background: "none",
          overflow: "hidden",
          borderRadius: "6px",
          borderWidth: "4px"
        }}
      >
        <SidebarHeader />
        <DateHeader
          unit="day"
          labelFormat="dddd, LL"
          style={{
            height: 50,
            backgroundColor: "white",
            border: "none",
            textAlign: "center",
            paddingTop: "10px"
          }}
          intervalRenderer={({ getIntervalProps, intervalContext }) => {
            return (
              <div {...getIntervalProps()}>{intervalContext.intervalText}</div>
            );
          }}
        />
        <DateHeader
          unit="hour"
          labelFormat="HH:00"
          style={{
            height: 50,
            backgroundColor: "white",
            border: "none",
            textAlign: "center",
            paddingTop: "5px"
          }}
          intervalRenderer={({ getIntervalProps, intervalContext }) => {
            return (
              <div {...getIntervalProps()}>{intervalContext.intervalText}</div>
            );
          }}
        />
      </TimelineHeaders>
      <TimelineMarkers>
        <Popup display={eventVisibility}>
          <MdClose
            style={{ position: "absolute", top: "5px", right: "5px" }}
            onClick={e =>
              setEventVisibility({
                visible: false,
                e: eventVisibility?.e,
                title: eventVisibility?.title
              })
            }
          />
          <h3>{eventVisibility.title}</h3>
        </Popup>
        <TodayMarker />
      </TimelineMarkers>
    </Timeline>
  );
};

const Popup = styled.div<{ display?: any }>`
  ${({ display = { visible: false, e: {}, title: "Event" } }) =>
    `display: ${display?.visible ? "unset" : "none"};`}
  width: 90%;
  text-align: center;
  margin-right: 5%;
  padding: 10px;
  margin-top: 10px;
  border-width: 4px;
  border: solid;
  border-color: #ff8379;
  border-radius: 7px;
  height: 100px;
  position: absolute;
  top: 0px;
  right: -100%;
  z-index: 9999;
  background-color: white;
`;

export default Calendar;
