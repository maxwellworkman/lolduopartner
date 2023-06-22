import "./Match.css";
import fetchMatchTimeline from "./fetchMatchTimeline";
import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";

function ExpandedMatch(props) {
    const [matchData, setMatchData] = useState(null);
    //console.log(props.gameId);

    useEffect(() => {
        if (props.gameId) {
          fetchMatchData();
        }
      }, [props.gameId]);
    
      const fetchMatchData = async () => {
        try {
          const data = await fetchMatchTimeline(props.gameId);
          setMatchData(data);
        } catch (error) {
          console.error('Error fetching match data:', error);
        }
      };

    //   const {p1, p2, e1, e2} = props.participantBall;

    //   function getGoldAt10Minutes(timeline, participantId1, participantId2) {
    //     // Find the frames array in the timeline object
    //     const frames = timeline.frames;
      
    //     // Find the frame at 10 minutes (assuming 1 second = 1 game minute)
    //     const frameAt10Minutes = frames.find(frame => frame.timestamp >= 600000);
      
    //     // Check if the frame exists and contains participant gold data
    //     if (frameAt10Minutes && frameAt10Minutes.participantFrames) {
    //       // Get the participant gold data from the frame
    //       const participantGold1 = frameAt10Minutes.participantFrames[participantId1].totalGold;
    //       const participantGold2 = frameAt10Minutes.participantFrames[participantId2].totalGold;
      
    //       return {
    //         participantId1: participantGold1,
    //         participantId2: participantGold2
    //       };
    //     }
      
    //     // Return null if the gold data is not available at 10 minutes
    //     return null;
    //   }


    if(props.gameId) {
        if(matchData) {
            console.log(matchData);
            return (
                <div className="expandedMatchBox">Game</div>
            );
        } else {
            return (
                <div className="expandedMatchBox">No Game</div>
            );
        }
        
    } else {
        return (
            <div className="expandedMatchBox">No Game</div>
        );
    }
}

ExpandedMatch.propTypes = {
    gameId: PropTypes.number,
    participantBall: PropTypes.object
  }

export default ExpandedMatch