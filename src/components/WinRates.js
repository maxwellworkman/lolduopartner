import React, { useState, useEffect} from 'react';
import ChampionPortrait from "./ChampionPortrait";
import { useSpring, animated } from 'react-spring';
import './WinRates.css'

function WinRates(props) {
    const championPairs = {};
    const { gameList} = props;
    const [sortedWinRates, setSortedWinRates] = useState({});
    const [dataReady, setDataReady] = useState(false);
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
            setDataReady(true);
            //console.log(dataReady);
        }
    }, [gameList]); 



      const animatedStyles = useSpring({
        width: dataReady ? '100%': '0%',
        from: { width: '0%' },
        config: { tension: 300, friction: 50, delay: 1200 },
      });

      const fadeInAnimation = useSpring({
        opacity: dataReady ? 1 : 0,
        from: { opacity: 0 },
        config: { duration: 300, delay: 100 },
      });
    
     // console.log(animatedStyles);
    //{(winRate*100).toFixed(2)}
    
    return (
        <animated.div className="leftStats" style={fadeInAnimation}>
          {Object.keys(sortedWinRates).length > 0 ? (
            <div className="win-rates-container">
              {Object.entries(sortedWinRates).map(([pair, { champion1, champion2, winRate }]) => (
                <div className="pairRow" key={pair}>
                  <div className="portraitBox">
                    <div className="wrPortraitContainer"><ChampionPortrait championName={champion1}/></div>
                    <div className="wrPortraitContainer"><ChampionPortrait championName={champion2}/></div>
                  </div>
                  <div className="percentageBox">
                    <div className="percentageBar" style={{ width: `${(winRate * 100).toFixed(2)}%` }}>
                        <animated.div className="percentageBarAnimated" style={animatedStyles}>
                            <div className="percentageText">{`${(winRate * 100).toFixed(0)}%`}</div>
                        </animated.div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </animated.div>
      );

}

export default WinRates;