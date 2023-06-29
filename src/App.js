import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import SearchList from "./components/SearchList";
import SummonerCard from "./components/SummonerCard";
import MatchHistory from "./components/MatchHistory";
import WinRates from "./components/WinRates";
import { PropTypes } from "prop-types";



function App() {
  const [gameList, setGameList] = useState([]);
  const [playerData, setPlayerData] = useState("");
  const [firstPlayer, setFirstPlayer] = useState({});
  const [secondPlayer, setSecondPlayer] = useState({});
  const [showSearchList, setShowSearchList] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [showStats, setShowStats] = useState(false);

  const showSearchListOn = () => {
    setShowSearchList(true);
  };
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

  //const serverURL = "http://localhost:4000";
  const serverURL = "https://lolduopartnerserver2.onrender.com";
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

  //riot api call to find summoner info
  function getPlayer(event) {
    axios
      .get(serverURL + "/player", { params: { username: event } })
      .then(function (response) {
        setPlayerData(response.data);
        showSearchListOn();
      })
      .catch(function (error) {
        console.log(error);
        showSearchListOff();
      });
  }

  //returns multiple summoner cards when passed an array of players info
  function SummonerCards(props) {
    return (
      <>
        {props.players.map((player, index) => (
          <SummonerCard player={player} key={index} duoList={props.players} />
        ))}
      </>
    );
  }

  //Debounced api call when text box is modified
  function TextBox(props) {
    const [value, setValue] = useState("");

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
    if (props.showSearchBar) {
      return (
        <div className="form__group field">
          <input
            type="text"
            className="form__field"
            value={value}
            onChange={handleChange}
            placeholder="Summoner Name"
            name="name"
            id="name"
            required
          />
          <label htmlFor="name" className="form__label">
            Summoner Name
          </label>
        </div>
      );
    }
  }
  return (
    <div className="App">
      <div className="container">
        <h5>League Duo Partner</h5>
        <div className="playerBox">
          <SummonerCards players={duoList} />
        </div>
        {TextBox({ showSearchBar })}

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
