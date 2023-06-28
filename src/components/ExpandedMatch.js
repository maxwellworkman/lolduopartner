import "./Match.css";
import fetchMatchTimeline from "./fetchMatchTimeline";
import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import expandCalc from "./expandCalc.js";
import GraphBar from "./GraphBar";
import early from "../images/early.png";
import combat from "../images/combat.png";
import objectives from "../images/objectives.png";

function ExpandedMatch(props) {
    const [matchData, setMatchData] = useState(null);
    const [statBall, setStatBall] = useState({});
    const [calcDone, setCalcDone] = useState(false);
    const [ratios, setRatios] = useState({});
    const participantBall = props.participants;
    const gameId = props.gameSummary.info.gameId;
    const gameSummary = props.gameSummary;
    const graphTitles = {
        goldAt10: "Gold at 10 Minutes",
        csAt10: "CS at 10 Minutes",
        dmgAt10: "Damage at 10 Minutes",
        xpAt10: "XP at 10 Minutes",
        dmg: "Damage to Champions",
        dmgPerMin: "Damage per Minute",
        dmgPerGold: "Damage per Gold",
        kda: "K/D/A",
        dmgToStruct: "Damage to Structures",
        visionScore: "Vision Score",
        epicMonsters: "Epic Monster Kills"
    };

    useEffect(() => {
        if (gameId) {
            fetchMatchData();
        }
    }, [gameId]);

    useEffect(() => {
        if (ratios.visionScore) {
            setCalcDone(true);
        }
    }, [ratios]);

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
            setStatBall(expandCalc(matchData, participantBall, gameSummary));
        }
    }, [matchData]);

    useEffect(() => {
        if (statBall) {
            setRatios(calculatePercentages(statBall));
        }
    }, [statBall]);

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
              e2: Math.round((statBall[key].e2 / maxTotal) * 100),
              diffed: ""
            };
            if((pTotal/eTotal) > 1.1) {
                updatedStatBall[key].diffed = "greenDiff";
              };
            if((pTotal/eTotal) < 0.9) {
                updatedStatBall[key].diffed = "redDiff";
              };
            //console.log(updatedStatBall[key]);
          } else {
            updatedStatBall[key] = { ...statBall[key] }; // Copy original values if maxTotal is 0
          }
        });
      
        return updatedStatBall;
    }

    if (calcDone) {
            return (
                <div className="expandedMatchBox">
                    <div className="expColumn">
                        <img className="columnIcon" src={early} alt="10 Minutes Icon"></img>
                        {Object.keys(ratios).slice(0, 4).map(key => (
                            <div className="statRow" key={key}>
                                <div className={`graphLabel ${key} ${ratios[key].diffed}`}>{graphTitles[key]}</div>
                                <div className="graphBar">
                                    <div className="duoHalf">
                                        <GraphBar percent={ratios[key].p1} player={"p1"}/>
                                        <GraphBar percent={ratios[key].p2} player={"p2"}/>
                                    </div>
                                    <div className="enemyHalf">
                                        <GraphBar percent={ratios[key].e1} player={"e1"}/>
                                        <GraphBar percent={ratios[key].e2} player={"e2"}/>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                    <div className="combatColumn">
                        <img className="columnIcon" src={combat} alt="Combat Icon"></img>
                        {Object.keys(ratios).slice(4, 8).map(key => (
                            <div className="statRow" key={key}>
                                <div className={`graphLabel ${key} ${ratios[key].diffed}`}>{graphTitles[key]}</div>
                                <div className="graphBar">
                                <div className="duoHalf">
                                        <GraphBar percent={ratios[key].p1} player={"p1"}/>
                                        <GraphBar percent={ratios[key].p2} player={"p2"}/>
                                    </div>
                                    <div className="enemyHalf">
                                        <GraphBar percent={ratios[key].e1} player={"e1"}/>
                                        <GraphBar percent={ratios[key].e2} player={"e2"}/>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="objColumn">
                        <img className="columnIcon" src={objectives} alt="Objectives Icon"></img>
                        {Object.keys(ratios).slice(8, 10).map(key => (
                            <div className="statRow" key={key}>
                                <div className={`graphLabel ${key} ${ratios[key].diffed}`}>{graphTitles[key]}</div>
                                <div className="graphBar">
                                <div className="duoHalf">
                                        <GraphBar percent={ratios[key].p1} player={"p1"}/>
                                        <GraphBar percent={ratios[key].p2} player={"p2"}/>
                                    </div>
                                    <div className="enemyHalf">
                                        <GraphBar percent={ratios[key].e1} player={"e1"}/>
                                        <GraphBar percent={ratios[key].e2} player={"e2"}/>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            )
    } else {
        return (
            <div className="expandedMatchBox">Loading Game Data...</div>
        );
    }
}

ExpandedMatch.propTypes = {
    participants: PropTypes.object,
    gameSummary: PropTypes.object
}

export default ExpandedMatch