import React from "react";
import RowData from "./RowData";
const ModalInner = props => {
  const title = props.city.charAt(0).toUpperCase() + props.city.slice(1);
  const dateNow = new Date(Date.now());

  return (
    <article className="Modal-center">
      <h1>
        {title} - {props.data.summary}
      </h1>
      <div className="Data-wrapper">
        <RowData>Time: {dateNow.toDateString()}</RowData>
        <RowData>Current Temperature: {props.data.temperature}</RowData>
        <RowData>Humidity: {props.data.humidity}</RowData>
        <RowData>
          Apparent Temperature: {props.data.apparentTemperature}
        </RowData>
        <RowData>
          Precipitation Probability: {props.data.precipProbability}%
        </RowData>
      </div>
      <img
        src="https://image.flaticon.com/icons/svg/61/61155.svg"
        alt="close icon"
        className="svg-icon-close"
        onClick={props.toggleModal}
      />
    </article>
  );
};

export default ModalInner;
