import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const UkraineIcon: React.FC<Props> = ({
  width = 25,
  height = 24, // color = BRIGHTBLUE,
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 25 24" fill="none">
      <G clip-path="url(#clip0_10_502)">
        <Path
          d="M1.81739 0H23.1783C23.9044 0 24.4957 0.85 24.4957 1.89375V22.1C24.4957 23.1438 23.9 23.9937 23.1783 23.9937H1.81739C1.09565 24 0.5 23.15 0.5 22.1062V1.89375C0.5 0.85 1.09565 0 1.81739 0Z"
          fill="#005BBB"
        />
        <Path
          d="M0.5 12H24.5V22.1062C24.5 23.15 23.9043 24 23.1826 24H1.81739C1.09565 24 0.5 23.15 0.5 22.1062V12Z"
          fill="#FFD500"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_10_502">
          <Rect x="0.5" width="24" height="24" rx="12" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default UkraineIcon;
