import React, { useState } from "react";
import jhinGuy from "../images/jhinGuy.jpg";

function SummonerCard(props) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  //unreadable function, rewrite
  //logic for removing selected players on click
  const handleClick = () => {
    const [ p1, p2, setP1, setP2 ] = props.duoList;
    if(props.player.summonerName === p1.summonerName) {
      if(p2 !== {}) {
        setP1(p2);
        setP2({});
      } else {
        setP1({});
      }
    } else if(props.player.summonerName === props.duoList[1].summonerName) {
      setP2({});
    }
  }

  try {
    return (
      <>
        {props.player.summonerName ? (
          <div
            className="duoCard"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            onClick={handleClick}
          >
            {props.player.summonerName === "Hyzare" ? (
              <img className="duoIcon" src={jhinGuy} alt="Profile Icon"></img>
            ) : (
              <img
                className="duoIcon"
                src={
                  "http://ddragon.leagueoflegends.com/cdn/13.12.1/img/profileicon/" +
                  props.player.profileIconId +
                  ".png"
                }
                alt="Profile Icon"
              ></img>
            )}
            <div className="duoCardContent">
              <div className="duoCardName">{props.player.summonerName}</div>
              {isHovered && <div className="removeCard">X</div>}
            </div>
          </div>
        ) : null}
      </>
    );
  } catch (error) {
    console.log(error);
  }
}
export default SummonerCard;
