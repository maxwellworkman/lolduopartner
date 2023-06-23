import React from "react";
import Match from "./Match";
import { PropTypes } from "prop-types";

function MatchHistory({ firstPlayer, secondPlayer, gameList}) {
  // console.log(firstPlayer);
  // console.log(secondPlayer);
  // console.log(gameList);
  return (
    <>
      <div className="matchBox">
        {gameList.map((gameData) => (
          <>
            {gameList.length > 0 && (
              <Match
                firstPlayer={firstPlayer}
                secondPlayer={secondPlayer}
                gameData={gameData}
                key={gameData.info.gameId}
              />
            )}
          </>
        ))}
      </div>
    </>
  );
}

MatchHistory.propTypes = {
  firstPlayer: PropTypes.object,
  secondPlayer: PropTypes.object,
  gameList: PropTypes.array
}

export default MatchHistory;
