import * as React from "react";
import TextCard from "../TextCard";

const CardWheel: React.FunctionComponent = () => {
  return (
    <>
      <TextCard
        propHeader="TEAM FORMING WORKSHOP!"
        propText='Team Matching Workshop begins now in the Fun Workshop Area!\"'
        propTime="Fri 6:00 PM"
      />
      <TextCard
        propHeader="HackSC is today!"
        propText="Today is the day! We can't wait to see what creativity you unleash this weekend"
        propTime="Fri 12:00 AM"
      />
    </>
  );
};

export default CardWheel;
