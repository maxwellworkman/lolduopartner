import { useState } from "react";

function SearchList(props) {
    const pick = () => {
        if(Object.keys(props.firstPlayer).length ===0) {
            props.setFirstPlayer(props.player[0]);
            props.showSearchListOff();
        }
        if(Object.keys(props.firstPlayer).length !==0 && props.player[0].summonerName !== props.firstPlayer.summonerName) {
            props.setSecondPlayer(props.player[0]);
            props.showSearchListOff();
            props.showSearchBarOff();
        }
    }
    try {
        //console.log("it's not empty brother");
        return (
            <div className="summonerCardList">
                <div className='summonerCard' onClick={() => {pick()}}>
                    <img className="summonerIcon" src={"http://ddragon.leagueoflegends.com/cdn/13.12.1/img/profileicon/" + props.player[0].profileIconId + ".png"} alt="Profile Icon"></img>
                    <div className="cardContent">
                        <div className="cardName">{props.player[0].summonerName}</div>
                        <div className="cardRank">{props.player[0].tier} {props.player[0].rank}</div>
                    </div>
                </div>
            </div> 
        )
    } catch(error) {
        console.log("it's empty friend");
        return (
            <p>Can't find Summoner</p>
        )
    }
};



export default SearchList;