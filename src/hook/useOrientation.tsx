import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

const useOrientation = () => {
  const getIsLandscape = () => {
    const dim = Dimensions.get('screen');
    return dim.width >= dim.height;
  };

  const [isLandscape, setIsLandscape] = useState(getIsLandscape());

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({screen}) => {
      setIsLandscape(screen.width >= screen.height);
    });

    return () => subscription.remove();
  }, []);

  return isLandscape;
};

export default useOrientation;
