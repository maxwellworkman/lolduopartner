
function expandCalc(timelineData, participantBall, gameSummary) {
    console.log(timelineData);
    console.log(gameSummary);
    const tl = timelineData.info;
    const frames = tl.frames;
    const gameData = gameSummary.info;
    const frameAt10Minutes = frames.find(frame => frame.timestamp >= 600000);
    const lastFrame = frames[frames.length-1];
    //console.log(lastFrame);
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

    function getDmgPerMin(frame, { p1, p2, e1, e2 }) {
        if (frame && frame.participantFrames) {
            const minutes = (frame.timestamp/60000);
            const dmgAtFrame = getDmgAtFrame(frame, {p1, p2, e1, e2});
            
            const p1DmgPerMin = parseFloat(((dmgAtFrame.p1)/minutes).toFixed(2));
            const p2DmgPerMin = parseFloat(((dmgAtFrame.p2)/minutes).toFixed(2));
            const e1DmgPerMin = parseFloat(((dmgAtFrame.e1)/minutes).toFixed(2));
            const e2DmgPerMin = parseFloat(((dmgAtFrame.e2)/minutes).toFixed(2));
            return {
                p1: p1DmgPerMin,
                p2: p2DmgPerMin,
                e1: e1DmgPerMin,
                e2: e2DmgPerMin
            }
        }
        console.log("we're getting here")
        return {
            p1: 0,
            p2: 0,
            e1: 0,
            e2: 0
        };
    }

    function getDmgPerGold(frame, { p1, p2, e1, e2 }) {
        if (frame && frame.participantFrames) {
            const goldAtFrame = getGoldAtFrame(frame, {p1, p2, e1, e2})
            const dmgAtFrame = getDmgAtFrame(frame, {p1, p2, e1, e2});
            const p1DmgPerGold = parseFloat((dmgAtFrame.p1/(goldAtFrame.p1)).toFixed(2));
            const p2DmgPerGold = parseFloat((dmgAtFrame.p2/(goldAtFrame.p2)).toFixed(2));
            const e1DmgPerGold = parseFloat((dmgAtFrame.e1/(goldAtFrame.e1)).toFixed(2));
            const e2DmgPerGold = parseFloat((dmgAtFrame.e2/(goldAtFrame.e2)).toFixed(2));
            return {
                p1: p1DmgPerGold,
                p2: p2DmgPerGold,
                e1: e1DmgPerGold,
                e2: e2DmgPerGold
            }
        }
        return {
            p1: 0,
            p2: 0,
            e1: 0,
            e2: 0
        };
    }

    function getKDA(gameData, { p1, p2, e1, e2 }) {
        const p1Deaths = gameData.participants[p1-1].deaths !==0 ? gameData.participants[p1-1].deaths : 1;
        const p2Deaths = gameData.participants[p2-1].deaths !==0 ? gameData.participants[p2-1].deaths : 1;
        const e1Deaths = gameData.participants[e1-1].deaths !==0 ? gameData.participants[e1-1].deaths : 1;
        const e2Deaths = gameData.participants[e2-1].deaths !==0 ? gameData.participants[e2-1].deaths : 1;
        if(gameData) {
            const p1KDA = (gameData.participants[p1-1].kills+gameData.participants[p1-1].assists)/p1Deaths;
            const p2KDA = (gameData.participants[p2-1].kills+gameData.participants[p2-1].assists)/p2Deaths;
            const e1KDA = (gameData.participants[e1-1].kills+gameData.participants[e1-1].assists)/e1Deaths;
            const e2KDA = (gameData.participants[e2-1].kills+gameData.participants[e2-1].assists)/e2Deaths;
            return {
                p1: p1KDA,
                p2: p2KDA,
                e1: e1KDA,
                e2: e2KDA
            }

        }
        return {
            p1: 0,
            p2: 0,
            e1: 0,
            e2: 0
        };
    }

    function getDmgToStruct(gameData, { p1, p2, e1, e2 }) {
        console.log(gameData);
        if(gameData) {
            const p = gameData.participants;
            const p1StructDmg = p[p1-1].damageDealtToBuildings;
            const p2StructDmg = p[p2-1].damageDealtToBuildings;
            const e1StructDmg = p[e1-1].damageDealtToBuildings;
            const e2StructDmg = p[e2-1].damageDealtToBuildings;
            return {
                p1: p1StructDmg,
                p2: p2StructDmg,
                e1: e1StructDmg,
                e2: e2StructDmg
            };
        } else {
            return {
                p1: 0,
                p2: 0,
                e1: 0,
                e2: 0
            }
        }
    }

    function getVisionScore(gameData, { p1, p2, e1, e2 }) {
        if(gameData) {
            const p = gameData.participants;
            const p1VisionScore = p[p1-1].visionScore;
            const p2VisionScore = p[p2-1].visionScore;
            const e1VisionScore = p[e1-1].visionScore;
            const e2VisionScore = p[e2-1].visionScore;
            return {
                p1: p1VisionScore,
                p2: p2VisionScore,
                e1: e1VisionScore,
                e2: e2VisionScore
            };
        } else {
            return {
                p1: 0,
                p2: 0,
                e1: 0,
                e2: 0
            }
        }
    }

    statBall.goldAt10 = getGoldAtFrame(frameAt10Minutes, participantBall);
    statBall.csAt10 = getCsAtFrame(frameAt10Minutes, participantBall);
    statBall.dmgAt10 = getDmgAtFrame(frameAt10Minutes, participantBall);
    statBall.xpAt10 = getXpAtFrame(frameAt10Minutes, participantBall);
    statBall.dmg = getDmgAtFrame(lastFrame, participantBall);
    statBall.dmgPerMin = getDmgPerMin(lastFrame, participantBall);
    statBall.dmgPerGold = getDmgPerGold(lastFrame, participantBall);
    statBall.kda = getKDA(gameData, participantBall);
    statBall.dmgToStruct = getDmgToStruct(gameData, participantBall);
    statBall.visionScore = getVisionScore(gameData, participantBall);


    return statBall;
}

export default expandCalc