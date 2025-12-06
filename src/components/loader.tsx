import LottieView from 'lottie-react-native';
import React from 'react';

export default function Loader() {
  return (
    <LottieView
      source={require('../../assets/loader.json')}
      autoPlay
      loop
      style={{ width: 100, height: 100 }}
      speed={1}
    />
  );
}
