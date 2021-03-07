import React, { useState } from "react";
import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export function Spinner(props) {
  let [color, setColor] = useState(`black`);
  const { loading } = props;

  return (
    <CircleLoader color={color} loading={loading} css={override} size={150} />
  );
}
