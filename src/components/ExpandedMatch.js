import "./Match.css";
import fetchMatchTimeline from "./fetchMatchTimeline";
import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import expandedMatchCalc from "./expandedMatchCalc";
import { useSpring, animated } from 'react-spring';

function ExpandedMatch(props) {
    const [matchData, setMatchData] = useState(null);
    const [statBall, setStatBall] = useState({});
    const [calcDone, setCalcDone] = useState(false);
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
        }
    }, [matchData]);


    if (calcDone) {
        try {
            return (
                <div className="expandedMatchBox">
                    <div className="expColumn">
                        <div className="columnTitle">10 mins</div>
                        <div className="graphLabel">cs</div>
                        <div className="graphBar">
                            <div className="duoHalf">
                                <div className="duoMax"><animated.div/><animated.div/></div>
                            </div>
                            <div className="enemyHalf">
                                <div className="duoMax"><animated.div/><animated.div/></div>
                            </div>

                        </div>
                    </div>
                    <div className="expColumn">
                        <div className="columnTitle">Combat</div>
                        <div className="graphLabel">Damage</div>
                        <div className="graphBar">

                        </div>
                    </div>
                    <div className="expColumn">
                        <div className="columnTitle">Objectives</div>
                        <div className="graphLabel">Structure Damage</div>
                        <div className="graphBar">

                        </div>
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