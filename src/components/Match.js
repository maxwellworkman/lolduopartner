import ChampionPortrait from "./ChampionPortrait";
import './Match.css';

function Match(props) {

    //returns team "100" or "200" based on summoner name
    function findTeamByParticipant(matchData, participantId) {
        if (matchData.info.participants && matchData.info.participants.length > 0) {       
            if (participantId) {
                const team = matchData.info.participants[participantId-1].teamID;
                return team;
            } else {
                return null; // Summoner not found or team not found
            }
        }
    }

    //returns true if won, false if lost
    function didTeamWin(matchData, participantId) {
        if (matchData.info.participants && matchData.info.participants.length > 0) {
            if (participantId) {
                const win = matchData.info.participants[participantId-1].win;
                return win;
            } else {
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
            const individualPosition = matchData.info.participants[participantId-1].individualPosition;
        
            const otherParticipant = matchData.info.participants.find(
                (p) =>
                p.participantId !== participantId &&
                p.individualPosition === individualPosition
            );
        
            if (otherParticipant) {
                return otherParticipant.participantId;
            }
            }
        
            return null; // Participant on the other team with the same position not found
        }
    }
    //returns the champion name used by riot
    function getChampionName(matchData, participantNumber) {
        if (matchData.info.participants && matchData.info.participants.length > 0) {
                return matchData.info.participants[participantNumber-1].championName
            }
            return null; // Participant not found or champion name not available
    }

    function buildStatString(matchData, participantId) {
        if (matchData.info.participants && matchData.info.participants.length > 0) {
            return matchData.info.participants[participantId-1].kills + "/" + matchData.info.participants[participantId-1].deaths + "/" + matchData.info.participants[participantId-1].assists
        }
        return null; // Participant not found or champion name not available
    }

    const participant1 = getParticipantNumber(props.gameData, props.firstPlayer.summonerName);
    const participant2 = getParticipantNumber(props.gameData, props.secondPlayer.summonerName);
    const enemy1 = findEnemy(props.gameData, participant1);
    const enemy2 = findEnemy(props.gameData, participant2);
    const teamID = findTeamByParticipant(props.gameData, participant1);
    const outcome = didTeamWin(props.gameData, participant1);
    const getResult = (isVictory) => isVictory ? 'Victory' : 'Defeat';

    return (
        <div className={"matchCard " + getResult(outcome)}>
            <div className="leftPlayerBox">
                <div className="leftPortraitContainer"><ChampionPortrait championName={getChampionName(props.gameData, participant1)}/></div>
                <div className="leftData">
                <div className="leftPlayerName">{props.firstPlayer.summonerName}</div>
                <div className="leftPlayerStats">{buildStatString(props.gameData, participant1)}</div>
                </div>
            </div>
            <div className="centerMatchBox">
                <div className="outcome">{getResult(outcome)}</div>
                <div className="vsBox">
                <div className="leftEnemyContainer"><ChampionPortrait championName={getChampionName(props.gameData, enemy1)}/></div>
                    <div className="vs">Vs</div>
                <div className="rightEnemyContainer"><ChampionPortrait championName={getChampionName(props.gameData, enemy2)}/></div>
                </div>
            </div>
            <div className="rightPlayerBox">
                <div className="rightData">
                <div className="rightPlayerName">{props.secondPlayer.summonerName}</div>
                <div className="rightPlayerStats">{buildStatString(props.gameData, participant2)}</div>
                </div>
            <div className="rightPortraitContainer"><ChampionPortrait championName={getChampionName(props.gameData, participant2)}/></div>
            </div>
        </div>
    )
}

export default Match;