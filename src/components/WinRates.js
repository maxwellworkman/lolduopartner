import React, { useState, useEffect} from 'react';
import ChampionPortrait from "./ChampionPortrait";
import './WinRates.css'

function WinRates(props) {
    const championPairs = {};
    const { gameList} = props;
    const [sortedWinRates, setSortedWinRates] = useState({});
    const calculateWinRates = (gameList) => {
        for (const game of gameList) {
            const { p1Champ, p2Champ, outcome } = game;
        
            if (!(p1Champ in championPairs)) {
              championPairs[p1Champ] = {};
            }
        
            if (!(p2Champ in championPairs[p1Champ])) {
              championPairs[p1Champ][p2Champ] = { wins: 0, gamesPlayed: 0 };
            }
        
            if (outcome) {
              championPairs[p1Champ][p2Champ].wins++;
            }
            championPairs[p1Champ][p2Champ].gamesPlayed++;
          }
        
          // Calculate win rates for each champion pair
          const winRates = {};
          for (const champion1 in championPairs) {
            for (const champion2 in championPairs[champion1]) {
              const { wins, gamesPlayed } = championPairs[champion1][champion2];
              const winRate = wins / gamesPlayed;
              winRates[`${champion1}-${champion2}`] = { champion1, champion2, winRate, gamesPlayed };
            }
          }
    
          const sortedWinRates = Object.fromEntries(
            Object.entries(winRates).sort(([, infoA], [, infoB]) => {
              const weightA = infoA.winRate * (1 / Math.sqrt(infoA.gamesPlayed));
              const weightB = infoB.winRate * (1 / Math.sqrt(infoB.gamesPlayed));
              return weightB - weightA;
            })
          );
          return sortedWinRates;
    }
    
    useEffect(() => {
        if(gameList.length > 0) {
            const newSortedWinRates = calculateWinRates(gameList);
            //console.log(newSortedWinRates);
            setSortedWinRates(newSortedWinRates);
        }
    }, [gameList]); 
    
    
    return (
        <div className="win-rates-container">
            <h2>Win Rates:</h2>
            {Object.entries(sortedWinRates).map(([pair, { champion1, champion2, winRate }]) => (
                <div key={pair}>
                    <div className="wrPortraitContainer"><ChampionPortrait championName={champion1}/></div>
                    <div className="wrPortraitContainer"><ChampionPortrait championName={champion2}/></div>
                    {(winRate*100).toFixed(2)}
                </div>
            ))}
        </div>
    );

}

export default WinRates;