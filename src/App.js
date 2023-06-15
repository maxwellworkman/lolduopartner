import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';
import SearchList from './components/SearchList';
import PlayerList from './components/PlayerList';
import SummonerCard from './components/SummonerCard';
import DuoFound from './components/DuoFound';
import MatchHistory from './components/MatchHistory';
import ChampionPortrait from './components/ChampionPortrait';
import WinRates from './components/WinRates';

function App() {
  
  const [ gameList, setGameList ] = useState([]);
  const [ playerList, setPlayerList ] = useState([]);

  const [ playerData, setPlayerData ] = useState("");
  const [ firstPlayer, setFirstPlayer ] = useState({});
  const [ secondPlayer, setSecondPlayer ] = useState({});
  const [ showSearchList, setShowSearchList ] = useState(false);
  const [ showPlayerList, setShowPlayerList ] = useState(false);
  const [ showSearchBar, setShowSearchBar ] = useState(true);
  const [ showStats, setShowStats ] = useState(false);

  
  const showSearchListOn = () => {setShowSearchList(true)};
  const showSearchListOff = () => {setShowSearchList(false)};
  const showSearchBarOn = () => {setShowSearchBar(true)};
  const showSearchBarOff = () => {setShowSearchBar(false)};
  const showStatsOn = () => {setShowStats(true)};
  const showStatsOff = () => {setShowStats(false)};

  const duoList = [firstPlayer, secondPlayer];
 
  const serverURL = "http://localhost:4000";
  var start = 0;
  var count = 100;
  const prevFirstPlayer = useRef(null);
  const prevSecondPlayer = useRef(null);


  async function fetchPlayerGames() {
    try {
      const firstPlayerName = firstPlayer.summonerName;
      const secondPlayerName = secondPlayer.summonerName;
      const response = await axios.get(serverURL + '/past5Games', {
        params: { firstPlayerName, secondPlayerName, start, count },
      });
      setGameList(response.data);
      console.log(gameList);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (firstPlayer.summonerName && secondPlayer.summonerName) {
      showSearchBarOff();
      if(prevFirstPlayer.current !== firstPlayer || prevSecondPlayer.current !== secondPlayer) {
        fetchPlayerGames();
      }
      showStatsOn();
    } else {
      showStatsOff();
      showSearchBarOn();
    }
    prevFirstPlayer.current = firstPlayer;
    prevSecondPlayer.current = secondPlayer;
  }, [firstPlayer, secondPlayer]); 

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
      <>
        {props.players.map((player, index) => (
          <SummonerCard player={player} key={index}/>
        ))}
      </>
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
  //SummonerCards renders the cards of the duo partners
  //Textbox fires a search function
  //SearchList renders search results
  //PlayerList doesn't do anything
  //DuoFound is an event hook for when 2 players are picked
  //Match History grabs player games and renders them
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
      {/* <DuoFound firstPlayer={firstPlayer} secondPlayer={secondPlayer} showStatsOff={showStatsOff} showStatsOn={showStatsOn} showSearchBarOff={showSearchBarOff} showSearchBarOn={showSearchBarOn}/> */}
      <div className="statsBox">
      {showStats && <WinRates gameList={gameList}/>}
      {showStats && <MatchHistory firstPlayer={firstPlayer} secondPlayer={secondPlayer} gameList={gameList} setGameList={setGameList}/>}
      </div>
    </div>
  </div>
  );
}

export default App;
