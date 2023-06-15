import React, { useEffect, useState } from 'react';
import jhinGuy from '../images/jhinGuy.jpg';

const ChampionPortrait = ({ championName }) => {
  const [championData, setChampionData] = useState(null);
  const [version, setVersion] = useState('');

  useEffect(() => {
    const fetchChampionData = async () => {
      try {
        const versionsResponse = await fetch(
          'https://ddragon.leagueoflegends.com/api/versions.json'
        );
        const [latestVersion] = await versionsResponse.json();
        setVersion(latestVersion);

        const championDataResponse = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`
        );
        const championData = await championDataResponse.json();
        setChampionData(championData);
      } catch (error) {
        console.error('Error fetching champion data:', error);
      }
    };

    fetchChampionData();
  }, []);

  if (!championData) {
    return <div></div>;
  }
  
  
  const champion = Object.values(championData.data).find((champ) => {
    const championNameNormalized = championName.replace(/[\s']/g, '').toLowerCase();
    const champNameNormalized = champ.name ? champ.name.replace(/[\s']/g, '').toLowerCase() : null;
    const champIdNormalized = champ.id ? champ.id.replace(/[\s']/g, '').toLowerCase() : null;
  
    return champNameNormalized === championNameNormalized || champIdNormalized === championNameNormalized;
  });

  if (!champion) {
    return <>
    <img
      src={jhinGuy}
      alt="Champion Not Found"
    />
  </>;
  }

  return (
    <>
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`}
        alt={champion.name}
      />
    </>
  );
};

export default ChampionPortrait;