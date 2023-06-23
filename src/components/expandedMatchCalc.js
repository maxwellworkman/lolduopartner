
function expandedMatchCalc(matchData, participantBall, gameSummary) {
    //console.log(matchData);
    //console.log(gameSummary);
    const tl = matchData.info;
    const frames = tl.frames;
    const summary = gameSummary;
    const frameAt10Minutes = frames.find(frame => frame.timestamp >= 600000);
    const statBall = {
        goldAt10: {
            p1: 0,
            p2: 0,
            e1: 0,
            e2: 0
        },
        csAt10: {
            p1: 0,
            p2: 0,
            e1: 0,
            e2: 0
        },
        dmgAt10: {
            p1: 0,
            p2: 0,
            e1: 0,
            e2: 0
        },
        xpAt10: {
            p1: 0,
            p2: 0,
            e1: 0,
            e2: 0
        },
        dmg: {
            p1: 0,
            p2: 0,
            e1: 0,
            e2: 0
        },
        dmgPerMin: {
            p1: 0,
            p2: 0,
            e1: 0,
            e2: 0
        },
        dmgPerGold: {
            p1: 0,
            p2: 0,
            e1: 0,
            e2: 0
        },
        kda: {
            p1: 0,
            p2: 0,
            e1: 0,
            e2: 0
        },
        dmgToStruct: {
            p1: 0,
            p2: 0,
            e1: 0,
            e2: 0
        },
        visionScore: {
            p1: 0,
            p2: 0,
            e1: 0,
            e2: 0
        },
        epicMonsters: {
            p1: 0,
            p2: 0,
            e1: 0,
            e2: 0
        }
    };

    function getGoldAtFrame(frame, { p1, p2, e1, e2 }) {
        // Check if the frame exists and contains participant gold data
        if (frame && frame.participantFrames) {
          // Get the participant gold data from the frame
          const p1Gold = frame.participantFrames[p1].totalGold;
          const p2Gold = frame.participantFrames[p2].totalGold;
          const e1Gold = frame.participantFrames[e1].totalGold;
          const e2Gold = frame.participantFrames[e2].totalGold;
      
          return {
            p1: p1Gold,
            p2: p2Gold,
            e1: e1Gold,
            e2: e2Gold
          };
        }
        // Return null if the gold data is not available at 10 minutes
        return {
            p1: 0,
            p2: 0,
            e1: 0,
            e2: 0
          };
    }

    function getCsAtFrame(frame, { p1, p2, e1, e2 }) {
        if (frame && frame.participantFrames) {
            const p1Cs = frame.participantFrames[p1].minionsKilled + frame.participantFrames[p1].jungleMinionsKilled;
            const p2Cs = frame.participantFrames[p2].minionsKilled + frame.participantFrames[p2].jungleMinionsKilled;
            const e1Cs = frame.participantFrames[e1].minionsKilled + frame.participantFrames[e1].jungleMinionsKilled;
            const e2Cs = frame.participantFrames[e2].minionsKilled + frame.participantFrames[e2].jungleMinionsKilled;
            return {
              p1: p1Cs,
              p2: p2Cs,
              e1: e1Cs,
              e2: e2Cs
            };
          }
          return {
              p1: 0,
              p2: 0,
              e1: 0,
              e2: 0
          };
    }

    function getDmgAtFrame(frame, { p1, p2, e1, e2 }) {
        if (frame && frame.participantFrames) {
          const p1Dmg = frame.participantFrames[p1].damageStats.totalDamageDoneToChampions;
          const p2Dmg = frame.participantFrames[p2].damageStats.totalDamageDoneToChampions;
          const e1Dmg = frame.participantFrames[e1].damageStats.totalDamageDoneToChampions;
          const e2Dmg = frame.participantFrames[e2].damageStats.totalDamageDoneToChampions;

          return {
            p1: p1Dmg,
            p2: p2Dmg,
            e1: e1Dmg,
            e2: e2Dmg
          };
        }
        return {
            p1: 0,
            p2: 0,
            e1: 0,
            e2: 0
        };
    }

    function getXpAtFrame(frame, { p1, p2, e1, e2 }) {
        if (frame && frame.participantFrames) {
            const p1Xp = frame.participantFrames[p1].xp;
            const p2Xp = frame.participantFrames[p2].xp;
            const e1Xp = frame.participantFrames[e1].xp;
            const e2Xp = frame.participantFrames[e2].xp;
  
            return {
              p1: p1Xp,
              p2: p2Xp,
              e1: e1Xp,
              e2: e2Xp
            };
          }
          return {
              p1: 0,
              p2: 0,
              e1: 0,
              e2: 0
          };
    }


    statBall.goldAt10 = getGoldAtFrame(frameAt10Minutes, participantBall);
    statBall.csAt10 = getCsAtFrame(frameAt10Minutes, participantBall);
    statBall.dmgAt10 = getDmgAtFrame(frameAt10Minutes, participantBall);
    statBall.xpAt10 = getXpAtFrame(frameAt10Minutes, participantBall);

    


    return statBall;
}

export default expandedMatchCalc