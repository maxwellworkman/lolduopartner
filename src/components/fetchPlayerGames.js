
import axios from "axios";

async function fetchPlayerGames(props) {
  //const serverURL = "https://localhost:4000";
  const serverURL = "https://lolduopartnerserver.onrender.com";
  const { firstPlayer, secondPlayer, start, count } = props;
  try {
    const response = await axios.get(serverURL + "/past5Games", {
      params: { firstPlayer, secondPlayer, start, count },
    });
    console.log("fetchPlayerGames");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default fetchPlayerGames;
