import React from "react";
import SummonerCard from "./SummonerCard";
import { PropTypes } from "prop-types";

function SummonerCards(props) {
    return (
      <>
        {props.players.map((player, index) => (
          <SummonerCard player={player} key={index} duoList={props.players} />
        ))}
      </>
    );
  }

  SummonerCards.propTypes = {
    players: PropTypes.array
  }

export default SummonerCards