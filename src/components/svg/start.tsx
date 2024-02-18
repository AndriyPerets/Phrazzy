import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
import {WHITE} from '../../colors';

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const StartIcon: React.FC<Props> = ({
  width = 393,
  height = 488,
  color = '#CEE9FA',
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 393 488" fill="none">
      <Circle cx="197" cy="272" r="272" fill={color} />
      <Path
        d="M99 321L117.513 333.592C123.593 337.727 126.633 339.795 129.942 340.669C132.868 341.442 135.931 341.541 138.9 340.959C142.259 340.3 145.426 338.433 151.76 334.699L175 321"
        stroke="black"
        stroke-width="6"
        stroke-linecap="round"
      />
      <Path
        d="M208 244.8C208 253.813 206.013 261.12 197 261.12C187.987 261.12 187.5 253.813 187.5 244.8C187.5 235.787 187.987 228.48 197 228.48C206.013 228.48 208 235.787 208 244.8Z"
        fill="black"
      />
      <Path
        d="M71.5 244.82C71.5 253.833 69.5133 261.14 60.5 261.14C51.4867 261.14 51 253.833 51 244.82C51 235.807 51.4867 228.5 60.5 228.5C69.5133 228.5 71.5 235.807 71.5 244.82Z"
        fill="black"
      />
    </Svg>
  );
};

export default StartIcon;
