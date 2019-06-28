import React from "react";
import styled from "styled-components";

const Row = styled.li`
  width: 90%;
  list-style: none;
  border-bottom: 1px solid #ccc;
  padding: 0.5rem;
  color: #ccc;
`;

const row = props => {
  return <Row className="Data-row">{props.children}</Row>;
};

export default row;
