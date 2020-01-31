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
  .toDate();
const defaultTimeEnd = moment()
  .startOf("day")
  .add(12, "hour")
  .toDate();

const staticGroup = [
  {
    id: "1",
    title: "HackSC-2020",
    rightTitle: "HackSC-2020",
    bgColor: "#000000"
  }
];

const staticItems = [
  {
    id: "1",
    group: "HackSC-2020",
    title: "Event Title",
    start: defaultTimeStart,
    end: defaultTimeEnd,
    canMove: false,
    canResize: false,
    className: "hacksc",
    bgColor: "#000000",
    selectedBgColor: "#FF8379",
    color: "#1C1C1C",
    itemProps: {
      "data-tip": "this is a description"
    }
  }
];

const itemRenderer: React.FunctionComponent<ItemProps> = props => {
  const { item, itemContext, getItemProps, getResizeProps } = props;
  const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
  const backgroundColor = itemContext.selected
    ? itemContext.dragging
      ? "red"
      : item.selectedBgColor
    : item.bgColor;
  //const borderColor = itemContext.resizing ? "red" : item.color;

  return (
    <div
      {...getItemProps({
        style: {
          backgroundColor,
          color: item.color,
          borderColor: "#FF8379",
          borderStyle: "solid",
          borderWidth: 1,
          borderRadius: 4,
          borderLeftWidth: itemContext.selected ? 3 : 1,
          borderRightWidth: itemContext.selected ? 3 : 1
        },
        onMouseDown: () => {
          console.log("on item click", item);
        }
      })}
    >
      {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null}

      <div
        style={{
          height: itemContext.dimensions.height,
          overflow: "hidden",
          paddingLeft: 3,
          textOverflow: "ellipsis",
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
  const keys = {
    groupIdKey: "id",
    groupTitleKey: "title",
    groupRightTitleKey: "rightTitle",
    itemIdKey: "id",
    itemTitleKey: "title",
    itemDivTitleKey: "title",
    itemGroupKey: "group",
    itemTimeStartKey: "start",
    itemTimeEndKey: "end",
    groupLabelKey: "title"
  };

  const obj = useEventsList({ defaultOnError: console.log });

  if (obj?.allEvents) {
    console.log(obj.allEvents);
  }
  console.log(obj.allEvents);

  return (
    <Timeline
      groups={staticGroup}
      items={staticItems}
      keys={keys}
      sidebarWidth={0}
      itemTouchSendsClick={false}
      stackItems
      itemHeightRatio={0.75}
      showCursorLine
      canMove={false}
      canResize={false}
      defaultTimeStart={defaultTimeStart}
      defaultTimeEnd={defaultTimeEnd}
      lineHeight={300}
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
        <SidebarHeader style={{ display: "none" }} />
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
