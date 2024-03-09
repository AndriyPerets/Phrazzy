import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
import {BRIGHTBLUE} from '../../colors';

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const GoIcon: React.FC<Props> = ({
  width = 393,
  height = 488,
  color = BRIGHTBLUE,
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 393 488" fill="none">
      <Circle cx="197" cy="272" r="272" fill={color} />
      <Path
        d="M143 320C143 329.114 141.355 336.94 137.782 342.399C134.336 347.662 128.929 351 120.5 351C112.062 351 106.515 347.652 102.945 342.363C99.2583 336.901 97.5 329.079 97.5 320C97.5 310.921 99.2583 303.099 102.945 297.637C106.515 292.348 112.062 289 120.5 289C128.929 289 134.336 292.338 137.782 297.601C141.355 303.06 143 310.886 143 320Z"
        stroke="black"
        stroke-width="6"
      />
      <Path
        d="M208 244.8C208 253.813 206.013 240.5 197 240.5C187.987 240.5 187.5 253.813 187.5 244.8C187.5 235.787 187.987 228.48 197 228.48C206.013 228.48 208 235.787 208 244.8Z"
        fill="black"
      />
      <Path
        d="M71.5 244.82C71.5 253.833 69.5133 241 60.5 241C51.4867 241 51 253.833 51 244.82C51 235.807 51.4867 228.5 60.5 228.5C69.5133 228.5 71.5 235.807 71.5 244.82Z"
        fill="black"
      />
    </Svg>
  );
};

export default GoIcon;
