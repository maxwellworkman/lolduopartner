import React, { useState, useEffect } from 'react';
import fetchPlayerGames from './fetchPlayerGames';

//fires when firstPlayer and secondPlayer are changed. let's app know it's good to make games api call
const DuoFound = ({firstPlayer, secondPlayer, showStatsOn, showStatsOff, showSearchBarOff, showSearchBarOn}) => {

  useEffect(() => {
    if(firstPlayer.summonerName && secondPlayer.summonerName) {
        showStatsOn();
        showSearchBarOff();
        
    } else {
        showStatsOff();
        showSearchBarOn();
    }
  }, [firstPlayer, secondPlayer]); 
};

export default DuoFound;