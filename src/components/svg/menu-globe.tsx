import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {WHITE} from '../../colors';

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const GlobeIcon: React.FC<Props> = ({
  width = 24,
  height = 24,
  color = WHITE,
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <G clip-path="url(#clip0_69_1123)">
        <Path
          d="M12 23.1429C18.1541 23.1429 23.1429 18.154 23.1429 12C23.1429 5.84597 18.1541 0.857147 12 0.857147C5.846 0.857147 0.857178 5.84597 0.857178 12C0.857178 18.154 5.846 23.1429 12 23.1429Z"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M0.857178 12H23.1429"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M16.2858 12C16.0753 16.0748 14.5744 19.9772 12.0001 23.1429C9.42576 19.9772 7.92487 16.0748 7.71436 12C7.92487 7.92516 9.42576 4.02284 12.0001 0.857147C14.5744 4.02284 16.0753 7.92516 16.2858 12V12Z"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_69_1123">
          <Rect width="24" height="24" fill={color} />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default GlobeIcon;
