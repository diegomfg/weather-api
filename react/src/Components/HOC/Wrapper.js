import React from "react";
import styled from "styled-components";
import Button from "../Button";
import Input from "../Input";
import Modal from "../Modal";
const Wrapper = styled.div`
  width: 100vw;
`;

const RenderWrapper = props => {

  let city = "Miami Florida";

  const fetchData = event => {
    event.preventDefault();
    props.fetchGeolocation();
  };

  const onCityChange = (e) => {
      props.setCity(e.target.value);
  }

  return (
    <Wrapper>
      <div className="Display-form">
        <div className="Card-text">
          <h1 className="Title">Weather API</h1>
          <small className="Author">Author: Diego Matheus</small>
        </div>
        <form onSubmit={event => fetchData(event)} className="Form">
          <Input placeholder={city} id="input" onChange={onCityChange} defaultvalue={city}/>
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
