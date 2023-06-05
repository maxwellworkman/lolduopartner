import React, { useState } from 'react';

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
        <div>
          {props.player.summonerName ? (
            <div className='summonerCard' onMouseEnter={handleHover} onMouseLeave={handleLeave}>
              <img className="summonerIcon" src={"http://ddragon.leagueoflegends.com/cdn/11.21.1/img/profileicon/" + props.player.profileIconId + ".png"} alt="Profile Icon"></img>
                <div className="cardContent">
                  <div className="cardName">{props.player.summonerName}</div>
                  {isHovered && <div className="removeCard">X</div>}
                </div>
            </div>
          ) : null}
        </div>
      );
    } catch (error) {
      console.log(error);
    }
  }
  export default SummonerCard;