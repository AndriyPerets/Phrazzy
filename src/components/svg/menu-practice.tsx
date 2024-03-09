import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {WHITE} from '../../colors';

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const PracticeIcon: React.FC<Props> = ({
  width = 24,
  height = 24,
  color = WHITE,
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <G clip-path="url(#clip0_69_1247)">
        <Path
          d="M6.08573 0.857147H1.80001C1.32663 0.857147 0.942871 1.2409 0.942871 1.71429V22.2857C0.942871 22.7591 1.32663 23.1429 1.80001 23.1429H6.08573C6.55912 23.1429 6.94287 22.7591 6.94287 22.2857V1.71429C6.94287 1.2409 6.55912 0.857147 6.08573 0.857147Z"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M12.0857 4.28571H7.80001C7.32663 4.28571 6.94287 4.66946 6.94287 5.14285V22.2857C6.94287 22.7591 7.32663 23.1428 7.80001 23.1428H12.0857C12.5591 23.1428 12.9429 22.7591 12.9429 22.2857V5.14285C12.9429 4.66946 12.5591 4.28571 12.0857 4.28571Z"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M17.8228 3.81641L14.4968 4.64875C14.0376 4.76368 13.7584 5.22912 13.8734 5.68834L18.0351 22.3184C18.15 22.7776 18.6155 23.0567 19.0747 22.9418L22.4007 22.1094C22.8599 21.9945 23.139 21.5291 23.0241 21.0698L18.8624 4.43982C18.7475 3.98059 18.282 3.70148 17.8228 3.81641Z"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M0.942871 17.1429H6.94287"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M6.94287 15.4286H12.9429"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M17.2285 18.8571L22.1657 17.6229"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_69_1247">
          <Rect width="24" height="24" fill={color} />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default PracticeIcon;
