import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [ searchText, setSearchText ] = useState("");
  const [ gameList, setGameList ] = useState([]);

  function getPlayerGames(event) { 
    axios.get("http://localhost:4000/past5Games", { params: {username: searchText}})
      .then(function (response) {
        setGameList(response.data);
      }).catch(function (error) {
        console.log(error);
      })
  }
  console.log(gameList);
  
  return (
    <div className="App">
    <div className="container">
      <h5>League Duo Partner</h5>
      <input type="text" onChange={e=> setSearchText(e.target.value)}></input>
      <button onClick={getPlayerGames}> Search </button>
      {gameList.length !== 0 ? 
        <>
        <p>We have data!</p>
        {
          gameList.map((gameData, index) =>
          <>
          <h2>Game {index + 1}</h2>
          <div>{gameData.info.participants.map((data, participantIndex) => 
            <p>Player {participantIndex + 1}: {data.summonerName}, KDA: {data.kills} / {data.deaths} / {data.assists}</p>
          )
          }
          </div>
          </>
          )
        }
        </>
      :
      <>
        <p>We have no data!</p>
      </>
      }
    </div>
{/* 
    {JSON.stringify(playerData) != '{}' ? 
    <><><p>{playerData.name}</p>
    </><img width="100" height="100" src={"http://ddragon.leagueoflegends.com/cdn/11.21.1/img/profileicon/" + playerData.profileIconId + ".png" alt="Profile Icon"}></img>
    <p>Summoner level {playerData.summonerLevel}</p></>
    :
    <><p>No player Data</p></>
    }
     */}
  </div>
  );
}

export default App;
