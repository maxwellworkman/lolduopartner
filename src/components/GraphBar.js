import React from "react";
import { useSpring, animated } from 'react-spring';
import { PropTypes } from "prop-types";
import "./Match.css";

function GraphBar(props) {
    const animatedStyles = useSpring({
        width: `${props.percent}%`,
        from: { width: "0%" },
        config: { tension: 80, friction: 30},
      });

    return (
            <>
            <animated.div className={`${props.player}Bar`} style={animatedStyles} />
            <animated.div />
            </>
    )
}
GraphBar.propTypes = {
    percent: PropTypes.number,
    key: PropTypes.object,
    player: PropTypes.string
}

export default GraphBar