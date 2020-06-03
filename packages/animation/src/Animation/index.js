import React, {useEffect,useState} from 'react';
import Lottie from 'react-lottie';
import PropTypes from "prop-types";

export const Animation = ({ autoplay, loop, isStopped, isPaused, name, height, width }) => {
  const [animationData,setAnimationData] = useState('');

  useEffect(()=>{
    fetch(`/animations/${name}/data.json`)
    .then(res=>res.json())
      .then(res=>setAnimationData(res))
  },[])

  const defaultOptions = {
      loop: loop,
      autoplay: autoplay,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
  };

  return (
    <Lottie
      isStopped={isStopped}
      isPaused={isPaused}
      options={defaultOptions}
      height={height || 15}
      width={width || 20}
      isClickToPauseDisabled
    />
  );
}

Animation.propTypes = {
  autoplay:PropTypes.bool,
  loop:PropTypes.bool,
  isStopped:PropTypes.bool,
  isPaused:PropTypes.bool,
  name:PropTypes.string,
  height:PropTypes.number,
  width:PropTypes.number
};
