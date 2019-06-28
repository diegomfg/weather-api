import React from "react";
import styled from "styled-components";
import ModalInner from "./ModalInner";

const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 1rem;
`;

const ModalRender = props => {
  return (
    <Modal className="Modal">
      <ModalInner
        data={props.data}
        city={props.city}
        toggleModal={props.toggleModal}
      />
    </Modal>
  );
};

export default ModalRender;
