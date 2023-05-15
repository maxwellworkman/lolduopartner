import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  
  const [ gameList, setGameList ] = useState([]);
  const [ playerList, setPlayerList ] = useState([]);
  const serverURL = "http://localhost:4000";
  const [ searchText, setSearchText ] = useState("");
  const [ duoPartner, setDuoPartner ] = useState("");
  const [ playerData, setPlayerData ] = useState("");
 



  function getPlayerGames(event) { 
    axios.get( serverURL + "/past5Games", { params: {username: event}})
      .then(function (response) {
        setGameList(response.data);
        console.log(gameList);
      }).catch(function (error) {
        console.log(error);
      })
  }

  function getPlayer(event) { 
    axios.get( serverURL + "/player", { params: {username: event}})
      .then(function (response) {
        setPlayerData(response.data);
        //console.log(playerData);
      }).catch(function (error) {
        console.log(error);
      })
  }

  function TextBox() {
    const [value, setValue] = useState('');
  
    useEffect(() => {
      let timerId = null;
  
      if (value.length > 3) {
        timerId = setTimeout(() => {
          getPlayer(value);
          //console.log(value);
        }, 500);
      }
  
      return () => {
        clearTimeout(timerId);
      };
    }, [value]);
  
    const handleChange = (event) => {
      setValue(event.target.value);
    };
  
    return (
      <div className="form__group field">
        <input type="text" className ="form__field" value={value} onChange={handleChange} placeholder="Summoner Name" name="name" id='name' required/>
        <label htmlFor="name" className="form__label">Summoner Name</label>


        </div>
    );
  }
  
  return (
    <div className="App">
    <div className="container">
      <h5>League Duo Partner</h5>
      {console.log(JSON.stringify(playerData))}
      {TextBox()}
      {JSON.stringify(playerData) !== '{}' && JSON.stringify(playerData) !== '""' ? 
        <>
        <p>We have data!</p>
        
        <p>{playerData[0].summonerName}</p>
        <p>{playerData[0].tier} {playerData[0].rank}</p>
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
