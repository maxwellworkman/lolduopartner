import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import SearchList from "./components/SearchList";
import SummonerCards from "./components/SummonerCards";
import MatchHistory from "./components/MatchHistory";
import WinRates from "./components/WinRates";
//import fetchPlayerGames from "./components/fetchPlayerGames";
import TextBox from "./components/TextBox";
import { PropTypes } from "prop-types";
import { useSearchParams } from "react-router-dom";
import fetchPlayer from "./components/fetchPlayer";




function App() {
  const [gameList, setGameList] = useState([]);
  const [playerData, setPlayerData] = useState({});
  const [firstPlayer, setFirstPlayer] = useState({});
  const [secondPlayer, setSecondPlayer] = useState({});
  const [showSearchList, setShowSearchList] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [searchParams] = useSearchParams({p1: "", p2: ""});
  // console.log(searchParams.get("p1"));
  // console.log(searchParams.get("p2"));

  // const showSearchListOn = () => {
  //   setShowSearchList(true);
  // };
  const showSearchListOff = () => {
    setShowSearchList(false);
  };
  const showSearchBarOn = () => {
    setShowSearchBar(true);
  };
  const showSearchBarOff = () => {
    setShowSearchBar(false);
  };
  const showStatsOn = () => {
    setShowStats(true);
  };
  const showStatsOff = () => {
    setShowStats(false);
  };

  const duoList = [firstPlayer, secondPlayer, setFirstPlayer, setSecondPlayer];

  const serverURL = "https://lolduopartnerserver.onrender.com";
  var start = 0;
  var count = 100;

  const prevFirstPlayer = useRef(null);
  const prevSecondPlayer = useRef(null);

  async function fetchPlayerGames() {
    try {
      const firstPlayerName = firstPlayer.summonerName;
      const secondPlayerName = secondPlayer.summonerName;
      const response = await axios.get(serverURL + "/past5Games", {
        params: { firstPlayerName, secondPlayerName, start, count },
      });
      setGameList(response.data);
      //console.log(gameList);
    } catch (error) {
      console.log(error);
    }
  }

  //Hook that fires whenever the chosen players gets updated
  useEffect(() => {
    if (firstPlayer.summonerName && secondPlayer.summonerName) {
      showSearchBarOff();
      if (
        prevFirstPlayer.current !== firstPlayer ||
        prevSecondPlayer.current !== secondPlayer
      ) {
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

  useEffect(() => {
    if(Object.keys(playerData).length > 0) {
      setShowSearchList(true);
    }
  }, [playerData]);

  useEffect(() => {
    const fetchData = async () => {
      // console.log("uh oh");
      if (searchParams.get("p1") !== "" && searchParams.get("p2") !== "") {
        try {
          let p1 = await fetchPlayer(searchParams.get("p1"));
          let p2 = await fetchPlayer(searchParams.get("p2"));
  
          if (p1 !== undefined) {
            setFirstPlayer(p1[0]);
          }
  
          if (p1 !== undefined && p2 !== undefined) {
            setSecondPlayer(p2[0]);
          } else if (p1 === undefined && p2 !== undefined) {
            setFirstPlayer(p2[0]);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
  
    fetchData();
  }, [searchParams]);



  
  

  return (
    <div className="App">
      <div className="container">
        <h5>League Duo Partner</h5>
        <div className="playerBox">
          <SummonerCards players={duoList} />
        </div>
        {showSearchBar && <TextBox setPlayerData={setPlayerData}/>}

        {showSearchList ? (
          <SearchList
            player={playerData}
            firstPlayer={firstPlayer}
            setFirstPlayer={setFirstPlayer}
            secondPlayer={secondPlayer}
            setSecondPlayer={setSecondPlayer}
            showSearchListOff={showSearchListOff}
            showSearchBarOff={showSearchBarOff}
          />
        ) : null}
        <div className="statsBox">
          {showStats && <WinRates gameList={gameList} />}
          {showStats && (
            <MatchHistory
              firstPlayer={firstPlayer}
              secondPlayer={secondPlayer}
              gameList={gameList}
            />
          )}
        </div>
      </div>
    </div>
  );
}

App.propTypes = {
  players: PropTypes.object,
  showSearchBar: PropTypes.func
}

export default App;
