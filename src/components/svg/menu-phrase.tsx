import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {WHITE} from '../../colors';

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const PhraseIcon: React.FC<Props> = ({
  width = 24,
  height = 24,
  color = WHITE,
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M1.71432 5.14284C2.18771 5.14284 2.57146 4.75909 2.57146 4.2857C2.57146 3.81231 2.18771 3.42856 1.71432 3.42856C1.24093 3.42856 0.857178 3.81231 0.857178 4.2857C0.857178 4.75909 1.24093 5.14284 1.71432 5.14284Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M7.71436 4.28571H23.1429"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M1.71432 12.8571C2.18771 12.8571 2.57146 12.4734 2.57146 12C2.57146 11.5266 2.18771 11.1429 1.71432 11.1429C1.24093 11.1429 0.857178 11.5266 0.857178 12C0.857178 12.4734 1.24093 12.8571 1.71432 12.8571Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M7.71436 12H23.1429"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M1.71432 20.5714C2.18771 20.5714 2.57146 20.1876 2.57146 19.7143C2.57146 19.2409 2.18771 18.8571 1.71432 18.8571C1.24093 18.8571 0.857178 19.2409 0.857178 19.7143C0.857178 20.1876 1.24093 20.5714 1.71432 20.5714Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M7.71436 19.7143H23.1429"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default PhraseIcon;
