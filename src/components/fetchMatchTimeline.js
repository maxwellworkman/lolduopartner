import axios from "axios";

async function fetchMatchTimeline(props) {
  const serverURL = "http://localhost:4000";
  const gameId = props;
  try {
    const response = await axios.get(serverURL + "/expand", {
      params: { gameId },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default fetchMatchTimeline;

