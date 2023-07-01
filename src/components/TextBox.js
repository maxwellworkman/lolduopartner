import React, { useState, useEffect} from "react";
import fetchPlayer from "./fetchPlayer";
import { PropTypes } from "prop-types";
import "../App.css";

function TextBox(props) {
    const [value, setValue] = useState("");

    useEffect( () => {
      let timerId = null;
      if (value.length > 3) {
        timerId = setTimeout(async () => {
          let playerData = await fetchPlayer(value);
          props.setPlayerData(playerData[0]);
          console.log(playerData);
        }, 500);
      }

      return () => {
        clearTimeout(timerId);
      };
    }, [value]);

    const handleChange = (event) => {
      setValue(event.target.value);
    };
      return (
        <div className="form__group field">
          <input
            type="text"
            className="form__field"
            value={value}
            onChange={handleChange}
            placeholder="Summoner Name"
            name="name"
            id="name"
            required
          />
          <label htmlFor="name" className="form__label">
            Summoner Name
          </label>
        </div>
      );
  }

  TextBox.propTypes = {
    setPlayerData: PropTypes.func
  }

  export default TextBox