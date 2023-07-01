import axios from "axios";

async function fetchPlayer(event) {
  const serverURL = "https://lolduopartnerserver.onrender.com";
  
  try {
    const response = await axios.get(serverURL + "/player", { params: { username: event } });
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error; // or return a default/error value
  }
}

export default fetchPlayer;