import { useState } from "react";

function DuoList(props) {
    console.log(props);
    const pick = () => {

    }
    return (
        <div className="summonerCardList">
            <div className='summonerCard' onClick={pick}>
                <img width="100" height="100" src={"http://ddragon.leagueoflegends.com/cdn/11.21.1/img/profileicon/" + props.player[0].profileIconId + ".png"} alt="Profile Icon"></img>
                <div>{props.player[0].summonerName}</div>
            </div>
        </div> 
    )
};



export default DuoList;