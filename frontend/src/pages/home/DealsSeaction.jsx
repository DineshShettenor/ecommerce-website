import React from "react";
import dealsImg from "../../assets/deals.png";

const DealsSeaction = () => {
  return (
    <section className="section__container deals__container">
      <div className="deals__image">
        <img src={dealsImg} alt="deals image" />
      </div>
      <div className="deals__content">
        <h5>Get Up To 20% Discount</h5>
        <h4>Deals Of This Month</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
          temporibus ex. Vitae nisi dolorem, assumenda tenetur alias atque hic?
          Asperiores ullam, iste sequi atque esse quo hic quisquam excepturi
          cupiditate?
        </p>
        <div className="deals__countdown flex-wrap">
            <div className="deals__countdown__card">
                <h4>2</h4>
                <p>Days</p>
            </div>
            <div className="deals__countdown__card">
                <h4>12</h4>
                <p>Hours</p>
            </div>
            <div className="deals__countdown__card">
                <h4>6</h4>
                <p>Mins</p>
            </div>
            <div className="deals__countdown__card">
                <h4>3</h4>
                <p>Secs</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default DealsSeaction;
