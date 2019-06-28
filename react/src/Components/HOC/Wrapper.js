import React from "react";
import styled from "styled-components";
import Button from "../Button";
import Input from "../Input";
import Modal from "../Modal";
const Wrapper = styled.div`
  width: 100vw;
`;

const RenderWrapper = props => {
  const fetchData = event => {
    event.preventDefault();
    props.fetchGeolocation();
  };

  return (
    <Wrapper>
      <div className="Display-form">
        <div className="Card-text">
          <h1 className="Title">Weather API</h1>
          <small className="Author">Author: Diego Matheus</small>
        </div>
        <form onSubmit={event => fetchData(event)} className="Form">
          <Input placeholder="Miami Florida" id="input" />
          <Button>Fetch Data</Button>
        </form>
      </div>
      <div className="Modal-wrapper">
        {props.isModalOpen ? (
          <Modal
            toggleModal={props.toggleModal}
            data={props.data}
            city={props.city}
          />
        ) : null}
      </div>
    </Wrapper>
  );
};

export default RenderWrapper;
