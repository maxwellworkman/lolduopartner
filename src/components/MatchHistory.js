import React, { useState, useEffect} from 'react';
import ChampionPortrait from "./ChampionPortrait";
import Match from "./Match";
import axios from 'axios';

function MatchHistory({firstPlayer, secondPlayer, gameList, setGameList}) {
  // console.log(firstPlayer);
  // console.log(secondPlayer);
  // console.log(gameList);
    return (
        <>
        <div className="matchBox">
            {gameList.map((gameData) => (
                <>
                {(gameList.length > 0) && <Match firstPlayer={firstPlayer} secondPlayer={secondPlayer} gameData={gameData} key={gameData.info.gameId}/>}
                </>
            ))}
        </div>
        </>
    );
}



export default MatchHistory;