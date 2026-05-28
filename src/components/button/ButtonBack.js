/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "antd";
import { useHistory } from "react-router-dom";

function ButtonBack() {
  const history = useHistory();

  const onClick = (e) => {
    history.goBack();
  };

  // return <Button onClick={onClick}>ย้อนกลับ</Button>;
  return (
    <div style={{ marginTop: -60, float: "right", paddingRight: 5 }}>
      <Button onClick={onClick}>ย้อนกลับ</Button>
    </div>
  );
}

export default ButtonBack;
