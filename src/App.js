import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SearchList from './components/SearchList';
import PlayerList from './components/PlayerList';
import SummonerCard from './components/SummonerCard';

function App() {
  
  const [ gameList, setGameList ] = useState([]);
  const [ playerList, setPlayerList ] = useState([]);
  const serverURL = "http://localhost:4000";
  const [ playerData, setPlayerData ] = useState("");
  const [ firstPlayer, setFirstPlayer ] = useState({});
  const [ secondPlayer, setSecondPlayer ] = useState({});
  const [ showSearchList, setShowSearchList ] = useState(false);
  const [ showPlayerList, setShowPlayerList ] = useState(false);
  const [ showSearchBar, setShowSearchBar ] = useState(true);


  const showSearchListOn = () => {setShowSearchList(true)};
  const showSearchListOff = () => {setShowSearchList(false)};
  const showSearchBarOn = () => {setShowSearchBar(true)};
  const showSearchBarOff = () => {setShowSearchBar(false)};

  const duoList = [firstPlayer, secondPlayer];
 

  function getPlayerGames(event) { 
    axios.get( serverURL + "/past5Games", { params: {username: event}})
      .then(function (response) {
        setGameList(response.data);
      }).catch(function (error) {
        console.log(error);
      })
  }

  //riot api call to find summoner info
  function getPlayer(event) { 
    axios.get( serverURL + "/player", { params: {username: event}})
      .then(function (response) {
        setPlayerData(response.data);
        showSearchListOn();
      }).catch(function (error) {
        showSearchListOff();
      })
  }

  //returns multiple summoner cards when passed an array of players info
  function SummonerCards(props) {
    return (
      <div>
        {props.players.map((player, index) => (
          <SummonerCard player={player} key={index}/>
        ))}
      </div>
    )
  }

  //Debounced api call when text box is modified
  function TextBox(props) {
    const [value, setValue] = useState('');
  
    useEffect(() => {
      let timerId = null;
      showSearchListOff();
  
      if (value.length > 3) {
        timerId = setTimeout(() => {
          getPlayer(value);
        }, 500);
      }
  
      return () => {
        clearTimeout(timerId);
      };
    }, [value]);
  
    const handleChange = (event) => {
      setValue(event.target.value);
    };
    if(props.showSearchBar) {
      return (
        <div className="form__group field">
          <input type="text" className ="form__field" value={value} onChange={handleChange} placeholder="Summoner Name" name="name" id='name' required/>
          <label htmlFor="name" className="form__label">Summoner Name</label>
          </div>
      );
    }
  }
  
  //Here's the page and component calls
  return (
    <div className="App">
    <div className="container">
      <h5>League Duo Partner</h5>
      <div className="playerBox">
        <SummonerCards players={duoList}/>
      </div>
      {TextBox({showSearchBar})}

      {showSearchList ? <SearchList player={playerData} firstPlayer={firstPlayer} setFirstPlayer={setFirstPlayer} secondPlayer={secondPlayer} setSecondPlayer={setSecondPlayer} showSearchListOff={showSearchListOff} showSearchBarOff={showSearchBarOff}/> : null}
      {showPlayerList ? <PlayerList player={playerData} firstPlayer={firstPlayer}/> : <></>}
    </div>
  </div>
  );
}

export default App;
