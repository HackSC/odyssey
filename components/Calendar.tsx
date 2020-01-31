import * as React from "react";
import moment from "moment";
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

const defaultTimeStart = moment()
  .startOf("day")
  .add(moment().hour() - 2, "hour")
  .valueOf();

const defaultTimeEnd = moment()
  .startOf("day")
  .add(moment().hour(), "hour")
  .add(10, "hour")
  .valueOf();

const itemRenderer: React.FunctionComponent<ItemProps> = props => {
  const { item, itemContext, getItemProps, getResizeProps } = props;
  const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();

  console.log(itemContext);
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
        onMouseDown: () => {
          console.log("on item click", item);
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

const Calendar: React.FunctionComponent<Props> = props => {
  const { allEvents } = useEventsList({ defaultOnError: console.log });

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
        <TodayMarker />
      </TimelineMarkers>
    </Timeline>
  );
};

export default Calendar;
