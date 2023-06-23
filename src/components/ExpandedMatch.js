import "./Match.css";
import fetchMatchTimeline from "./fetchMatchTimeline";
import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import expandedMatchCalc from "./expandedMatchCalc.js"
import { useSpring, animated } from 'react-spring';

function ExpandedMatch(props) {
    const [matchData, setMatchData] = useState(null);
    const [statBall, setStatBall] = useState({});
    const [calcDone, setCalcDone] = useState(false);
    const [ratios, setRatios] = useState({});
    const participantBall = props.participants;
    const gameId = props.gameSummary.info.gameId;
    const gameSummary = props.gameSummary;
    //console.log(props);

    useEffect(() => {
        if (gameId) {
            fetchMatchData();
        }
    }, [gameId]);

    useEffect(() => {
        if (statBall.goldAt10) {
            setCalcDone(true);
        }
    }, [statBall]);

    const fetchMatchData = async () => {
        try {
            const data = await fetchMatchTimeline(gameId);
            setMatchData(data);
        } catch (error) {
            console.error('Error fetching match data:', error);
        }
    };

    useEffect(() => {
        if (matchData) {
            setStatBall(expandedMatchCalc(matchData, participantBall, gameSummary));
            setRatios(calculatePercentages(statBall));
        }
    }, [matchData]);

    function calculatePercentages(statBall) {
        const keys = Object.keys(statBall);
        const updatedStatBall = {};
      
        keys.forEach(key => {
          const pTotal = statBall[key].p1 + statBall[key].p2;
          const eTotal = statBall[key].e1 + statBall[key].e2;
          const maxTotal = Math.max(pTotal, eTotal);
      
          if (maxTotal !== 0) {
            updatedStatBall[key] = {
              p1: Math.round((statBall[key].p1 / maxTotal) * 100),
              p2: Math.round((statBall[key].p2 / maxTotal) * 100),
              e1: Math.round((statBall[key].e1 / maxTotal) * 100),
              e2: Math.round((statBall[key].e2 / maxTotal) * 100)
            };
          } else {
            updatedStatBall[key] = { ...statBall[key] }; // Copy original values if maxTotal is 0
          }
        });
      
        return updatedStatBall;
    }

    

    const animatedStyles = useSpring({
        width: calcDone ? "100%" : "0%",
        from: { width: "0%" },
        config: { tension: 80, friction: 30, delay: 10000},
      });


    if (calcDone) {
        try {
            return (
                <div className="expandedMatchBox">
                    <div className="expColumn">
                        <div className="columnTitle">10 mins</div>

                        {Object.keys(ratios).slice(0, 4).map(key => (
                            <div className="statRow" key={key}>
                                <div className={`graphLabel ${key}`}>{key}</div>
                                <div className="graphBar">
                                    <div className="duoHalf">
                                        <div className={`p1 p1Bar-${key}`} style={{ width: `${ratios[key].p1}%` }}>
                                            <animated.div className={`p1Bar p1Bar-${key}`} style={animatedStyles} />
                                            <animated.div />
                                        </div>
                                        <div className={`p2 p2Bar-${key}`} style={{ width: `${ratios[key].p2}%` }}>
                                            <animated.div className={`p2Bar p2Bar-${key}`} style={animatedStyles} />
                                            <animated.div />
                                        </div>
                                    </div>
                                    <div className="enemyHalf">
                                        <div className={`e1 e1Bar-${key}`} style={{ width: `${ratios[key].e1}%` }}>
                                            <animated.div className={`e1Bar e1Bar-${key}`} style={animatedStyles} />
                                            <animated.div />
                                        </div>
                                        <div className={`e2 e2Bar-${key}`} style={{ width: `${ratios[key].e2}%` }}>
                                            <animated.div className={`e2Bar e2Bar-${key}`} style={animatedStyles} />
                                            <animated.div />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                    <div className="combatColumn">
                        <div className="columnTitle">Combat</div>
                        {Object.keys(ratios).slice(0, 4).map(key => (
                            <div className="statRow" key={key}>
                                <div className={`graphLabel ${key}`}>{key}</div>
                                <div className="graphBar">
                                    <div className="duoHalf">
                                        <div className={`p1 p1Bar-${key}`} style={{ width: `${ratios[key].p1}%` }}>
                                            <animated.div className={`p1Bar p1Bar-${key}`} style={animatedStyles} />
                                            <animated.div />
                                        </div>
                                        <div className={`p2 p2Bar-${key}`} style={{ width: `${ratios[key].p2}%` }}>
                                            <animated.div className={`p2Bar p2Bar-${key}`} style={animatedStyles} />
                                            <animated.div />
                                        </div>
                                    </div>
                                    <div className="enemyHalf">
                                        <div className={`e1 e1Bar-${key}`} style={{ width: `${ratios[key].e1}%` }}>
                                            <animated.div className={`e1Bar e1Bar-${key}`} style={animatedStyles} />
                                            <animated.div />
                                        </div>
                                        <div className={`e2 e2Bar-${key}`} style={{ width: `${ratios[key].e2}%` }}>
                                            <animated.div className={`e2Bar e2Bar-${key}`} style={animatedStyles} />
                                            <animated.div />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="objColumn">
                        <div className="columnTitle">Objectives</div>
                        {Object.keys(ratios).slice(0, 4).map(key => (
                            <div className="statRow" key={key}>
                                <div className={`graphLabel ${key}`}>{key}</div>
                                <div className="graphBar">
                                    <div className="duoHalf">
                                        <div className={`p1 p1Bar-${key}`} style={{ width: `${ratios[key].p1}%` }}>
                                            <animated.div className={`p1Bar p1Bar-${key}`} style={animatedStyles} />
                                            <animated.div />
                                        </div>
                                        <div className={`p2 p2Bar-${key}`} style={{ width: `${ratios[key].p2}%` }}>
                                            <animated.div className={`p2Bar p2Bar-${key}`} style={animatedStyles} />
                                            <animated.div />
                                        </div>
                                    </div>
                                    <div className="enemyHalf">
                                        <div className={`e1 e1Bar-${key}`} style={{ width: `${ratios[key].e1}%` }}>
                                            <animated.div className={`e1Bar e1Bar-${key}`} style={animatedStyles} />
                                            <animated.div />
                                        </div>
                                        <div className={`e2 e2Bar-${key}`} style={{ width: `${ratios[key].e2}%` }}>
                                            <animated.div className={`e2Bar e2Bar-${key}`} style={animatedStyles} />
                                            <animated.div />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            )

        } catch {
            return (
                <div className="expandedMatchBox">No Game</div>
            )
        }

    } else {
        return (
            <div className="expandedMatchBox">No Game</div>
        );
    }
}

ExpandedMatch.propTypes = {
    participants: PropTypes.object,
    gameSummary: PropTypes.object
}

export default ExpandedMatch