import React, { useState } from "react";
import styled from "styled-components";

const ToggleSwitch = ({ Name, callback }: { Name: string; callback: any }) => {
  let [checked, setChecked] = useState(false);
  return (
    <Toggle className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch-checkbox"
        name={Name}
        checked={checked}
        id={Name}
        onChange={(e) => {
          setChecked(e.target.checked);
          callback(e.target.checked);
        }}
      />
      <label className="toggle-switch-label" htmlFor={Name}>
        <span className="toggle-switch-inner" />
        <span className="toggle-switch-switch" />
      </label>
    </Toggle>
  );
};

const Toggle = styled.div`
  .toggle-switch {
    position: relative;
    width: 75px;
    display: inline-block;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    text-align: left;
    &-checkbox {
      display: none;
    }
    &-label {
      display: block;
      overflow: hidden;
      cursor: pointer;
      border: 0 solid #bbb;
      border-radius: 20px;
      margin: 0;
    }
    &-inner {
      display: block;
      width: 200%;
      margin-left: -100%;
      transition: margin 0.3s ease-in 0s;
      &:before,
      &:after {
        display: block;
        float: left;
        width: 50%;
        height: 34px;
        padding: 0;
        line-height: 34px;
        font-size: 14px;
        color: white;
        font-weight: bold;
        box-sizing: border-box;
      }
      &:before {
        content: "Yes";
        text-transform: uppercase;
        padding-left: 10px;
        background-color: #f90;
        color: #fff;
      }
    }
    &-disabled {
      background-color: #ddd;
      cursor: not-allowed;
      &:before {
        background-color: #ddd;
        cursor: not-allowed;
      }
    }
    &-inner:after {
      content: "No";
      text-transform: uppercase;
      padding-right: 10px;
      background-color: #bbb;
      color: #fff;
      text-align: right;
    }
    &-switch {
      display: block;
      width: 24px;
      margin: 5px;
      background: #fff;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 40px;
      border: 0 solid #bbb;
      border-radius: 20px;
      transition: all 0.3s ease-in 0s;
    }
    &-checkbox:checked + &-label {
      .toggle-switch-inner {
        margin-left: 0;
      }
      .toggle-switch-switch {
        right: 0px;
      }
    }
  }
`;

export default ToggleSwitch;
