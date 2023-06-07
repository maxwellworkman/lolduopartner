function MatchHistory(props) {
    var start = 0;
    var count = 100;
    if(props.gameList.length === 0) {
        try {
            props.getPlayerGames(props.firstPlayer.summonerName, props.secondPlayer.summonerName, start, count);
            
        } catch (error) {
            console.log(error);
        }
    }
    function calculateStats(props) {

    }
    
    return (
        <div>
            {props.gameList.map((gameData, index) => (
                <>
                <div key={index}>Game {index+1}</div>
                    {gameData.info.participants.map((data, participantIndex) => {
                        if(data.summonerName === props.firstPlayer.summonerName) {
                            return (
                                <div key={participantIndex}>{data.summonerName} {data.kills} / {data.deaths} / {data.assists}</div>
                            )
                        }
                        if(data.summonerName === props.secondPlayer.summonerName) {
                            return (
                                <div key={participantIndex}>{data.summonerName} {data.kills} / {data.deaths} / {data.assists}</div>
                            )
                        }}
                    )}
                </>
            ))}
        </div>
    );
}



export default MatchHistory;