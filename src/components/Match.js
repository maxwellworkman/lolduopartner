import React, { useState } from "react";
import ChampionPortrait from "./ChampionPortrait";
import "./Match.css";
import ExpandedMatch from "./ExpandedMatch";
import { useSpring, animated } from 'react-spring';
import { PropTypes } from "prop-types";

function Match(props) {
  const [expand, setExpand] = useState(false);

  

  //returns true if won, false if lost
  function didTeamWin(matchData, participantId) {
    if (matchData.info.participants && matchData.info.participants.length > 0) {
      if (participantId) {
        const win = matchData.info.participants[participantId - 1].win;
        return win;
      } else {
        matchData.didTeamWin = false;
        return false; // Summoner not found or team not found
      }
    }
  }

  //grabs participant number based on summoner name
  function getParticipantNumber(matchData, summonerName) {
    if (matchData.info.participants && matchData.info.participants.length > 0) {
      const participant = matchData.info.participants.find(
        (p) => p.summonerName.toLowerCase() === summonerName.toLowerCase()
      );

      if (participant) {
        return participant.participantId;
      }

      return null; // Summoner not found in the match
    }
  }

  //Uses Individual Position on the other team
  function findEnemy(matchData, participantId) {
    if (matchData.info.participants && matchData.info.participants.length > 0) {
      if (participantId) {
        const participant = matchData.info.participants[participantId - 1];
        const individualPosition = participant.individualPosition;

        // Check for participant with the same individual position
        let otherParticipant = matchData.info.participants.find(
          (p) =>
            p.participantId !== participantId &&
            p.individualPosition === individualPosition
        );

        // Check for participant with the same role
        if (!otherParticipant) {
          otherParticipant = matchData.info.participants.find(
            (p) =>
              p.participantId !== participantId && p.role === participant.role
          );
        }

        // Check for participant with the same team position
        if (!otherParticipant) {
          otherParticipant = matchData.info.participants.find(
            (p) =>
              p.participantId !== participantId &&
              p.teamPosition === participant.teamPosition
          );
        }

        // Check for participant with the same lane
        if (!otherParticipant) {
          otherParticipant = matchData.info.participants.find(
            (p) =>
              p.participantId !== participantId && p.lane === participant.lane
          );
        }

        if (otherParticipant) {
          return otherParticipant.participantId;
        }
      }

      return null; // Participant not found with the specified conditions
    }
  }
  //returns the champion name used by riot
  function getChampionName(matchData, participantNumber) {
    if (matchData.info.participants && matchData.info.participants.length > 0) {
      try {
        return matchData.info.participants[participantNumber - 1].championName;
      } catch {
        // console.log(matchData);
        // console.log(participantNumber);
        // console.log(matchData.info.participants[participantNumber-1]);
        return null;
      }
    }
    return null; // Participant not found or champion name not available
  }

  function buildStatString(matchData, participantId) {
    if (matchData.info.participants && matchData.info.participants.length > 0) {
      return (
        matchData.info.participants[participantId - 1].kills +
        "/" +
        matchData.info.participants[participantId - 1].deaths +
        "/" +
        matchData.info.participants[participantId - 1].assists
      );
    }
    return null; // Participant not found or champion name not available
  }

  const handleClick = () => {
    setExpand(!expand);
  }

  const slideOpen = useSpring({
    height: expand ? '400px' : '0px',
  });

  const participant1 = getParticipantNumber(
    props.gameData,
    props.firstPlayer.summonerName
  );
  const participant2 = getParticipantNumber(
    props.gameData,
    props.secondPlayer.summonerName
  );
  const enemy1 = findEnemy(props.gameData, participant1);
  const enemy2 = findEnemy(props.gameData, participant2);
  const outcome = didTeamWin(props.gameData, participant1);
  const getResult = (isVictory) => (isVictory ? "Victory" : "Defeat");
  const p1Champ = getChampionName(props.gameData, participant1);
  const p2Champ = getChampionName(props.gameData, participant2);
  const e1Champ = getChampionName(props.gameData, enemy1);
  const e2Champ = getChampionName(props.gameData, enemy2);
  props.gameData.p1Champ = p1Champ;
  props.gameData.p2Champ = p2Champ;
  props.gameData.outcome = outcome;
  const participantBall = {p1: participant1, p2: participant2, e1: enemy1, e2: enemy2};

  return (
    <div 
      className={"matchCard " + getResult(outcome)} 
      key={props.gameData.info.gameID} 
      onClick={handleClick}
      >
      <div className="cardExpandContainer">
        <div className="summaryContainer">
          <div className="leftPlayerBox">
            <div className="leftPortraitContainer">
              <ChampionPortrait championName={p1Champ} />
            </div>
            <div className="leftData">
              <div className="leftPlayerName">{props.firstPlayer.summonerName}</div>
              <div className="leftPlayerStats">
                {buildStatString(props.gameData, participant1)}
              </div>
            </div>
          </div>
          <div className="centerMatchBox">
            <div className="outcome">{getResult(outcome)}</div>
            <div className="vsBox">
              <div className="leftEnemyContainer">
                <ChampionPortrait championName={e1Champ} />
              </div>
              <div className="vs">Vs</div>
              <div className="rightEnemyContainer">
                <ChampionPortrait championName={e2Champ} />
              </div>
            </div>
          </div>
          <div className="rightPlayerBox">
            <div className="rightData">
              <div className="rightPlayerName">
                {props.secondPlayer.summonerName}
              </div>
              <div className="rightPlayerStats">
                {buildStatString(props.gameData, participant2)}
              </div>
            </div>
            <div className="rightPortraitContainer">
              <ChampionPortrait championName={p2Champ} />
            </div>
          </div>
        </div>
        <animated.div className="expandBox" style={slideOpen}>
          {expand && <ExpandedMatch gameId={props.gameData.info.gameId} participants={participantBall}/>}
        </animated.div>
      </div>
    </div>
  );
}

Match.propTypes = {
  gameData: PropTypes.object,
  firstPlayer: PropTypes.object,
  secondPlayer: PropTypes.object,
}
export default Match;
