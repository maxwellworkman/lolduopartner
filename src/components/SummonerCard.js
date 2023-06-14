import React, { useState } from 'react';
import jhinGuy from '../images/jhinGuy.jpg';

function SummonerCard(props) {
const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

    try {
      return (
        <>
          {props.player.summonerName ? (
            <div className='duoCard' onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                {(props.player.summonerName ==="Hyzare") ? 
                    <img className="duoIcon" src={jhinGuy} alt="Profile Icon"></img>
                : 
                <img className="duoIcon" src={"http://ddragon.leagueoflegends.com/cdn/13.12.1/img/profileicon/" + props.player.profileIconId + ".png"} alt="Profile Icon"></img>
                }
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