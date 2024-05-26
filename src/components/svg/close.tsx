import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {BLACK} from '../../colors';

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const CloseIcon: React.FC<Props> = ({
  width = 32,
  height = 32,
  color = BLACK,
  ...props
}: Props) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill={color}
      {...props}>
      <Path d="M10.05 23.95a1 1 0 0 0 1.414 0L17 18.414l5.536 5.536a1 1 0 0 0 1.414-1.414L18.414 17l5.536-5.536a1 1 0 0 0-1.414-1.414L17 15.586l-5.536-5.536a1 1 0 0 0-1.414 1.414L15.586 17l-5.536 5.536a1 1 0 0 0 0 1.414z" />
    </Svg>
  );
};

export default CloseIcon;
