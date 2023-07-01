import React from "react";


function SearchList(props) {
  const pick = () => {
    if (Object.keys(props.firstPlayer).length === 0) {
      props.setFirstPlayer(props.player);
      props.showSearchListOff();
    }
    if (
      Object.keys(props.firstPlayer).length !== 0 &&
      props.player.summonerName !== props.firstPlayer.summonerName
    ) {
      props.setSecondPlayer(props.player);
      props.showSearchListOff();
      props.showSearchBarOff();
    }
  };
  try {
    //console.log("it's not empty brother");
    return (
      <div className="summonerCardList">
        <div
          className="summonerCard"
          onClick={() => {
            pick();
          }}
        >
          <img
            className="summonerIcon"
            src={
              "http://ddragon.leagueoflegends.com/cdn/13.12.1/img/profileicon/" +
              props.player.profileIconId +
              ".png"
            }
            alt="Profile Icon"
          ></img>
          <div className="cardContent">
            <div className="cardName">{props.player.summonerName}</div>
            <div className="cardRank">
              {props.player.tier} {props.player.rank}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return <p>Cannot find Summoner</p>;
  }
}

export default SearchList;
