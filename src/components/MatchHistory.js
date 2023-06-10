import React, { useState, useEffect} from 'react';
import ChampionPortrait from "./ChampionPortrait";
import Match from "./Match";
import axios from 'axios';

function MatchHistory({firstPlayer, secondPlayer, gameList, setGameList}) {
    const serverURL = "http://localhost:4000";
    var start = 0;
    var count = 100;
    useEffect(() => {
        // Define an async function to fetch the player games
        async function fetchPlayerGames() {
          try {
            const response = await axios.get(serverURL + '/past5Games', {
              params: { firstPlayer, secondPlayer, start, count },
            });
            setGameList(response.data);
          } catch (error) {
            console.log(error);
          }
        }
    
        // Call the async function when the component mounts
        fetchPlayerGames();
      }, []);

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