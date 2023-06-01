import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import DuoList from './components/DuoList';

function App() {
  
  const [ gameList, setGameList ] = useState([]);
  const [ playerList, setPlayerList ] = useState([]);
  const serverURL = "http://localhost:4000";
  const [ playerData, setPlayerData ] = useState("");
  const [ firstPlayer, setFirstPlayer ] = useState("");
  const [ showList, setShowList ] = useState(false);

  const toggleShowListOn = () => {
    console.log("showlist on");
    setShowList(true);
  };
  const toggleShowListOff = () => {
    console.log("showlist off");
    setShowList(false);
  };
 



  function getPlayerGames(event) { 
    axios.get( serverURL + "/past5Games", { params: {username: event}})
      .then(function (response) {
        setGameList(response.data);
      }).catch(function (error) {
        console.log(error);
      })
  }

  function getPlayer(event) { 
    axios.get( serverURL + "/player", { params: {username: event}})
      .then(function (response) {
        setPlayerData(response.data);
        toggleShowListOn();
        console.log(response);
        console.log("we aren't catching an error");
      }).catch(function (error) {
        toggleShowListOff();
       console.log("we're catching the error here");
      })
  }

  function TextBox() {
    const [value, setValue] = useState('');
  
    useEffect(() => {
      let timerId = null;
      toggleShowListOff();
  
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
      {TextBox()}
      {showList ? <DuoList player={playerData} playerList={playerList} firstPlayer={firstPlayer} setFirstPlayer={setFirstPlayer}/> : <p>Pick a Summoner</p>}
    </div>
  </div>
  );
}

export default App;
