import { useState } from "react";

function DuoList(props) {
    console.log(props);
    const pick = () => {
        if(props.firstPlayer !== "") {

        }
    }
    //&& typeof props.player
    try {
        //console.log("it's not empty brother");
        return (
            <div className="summonerCardList">
                <div className='summonerCard' onClick={pick}>
                    <img className="summonerIcon" src={"http://ddragon.leagueoflegends.com/cdn/11.21.1/img/profileicon/" + props.player[0].profileIconId + ".png"} alt="Profile Icon"></img>
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
            <div>Can't find Summoner</div>
        )
    }
};



export default DuoList;