import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const CloseIcon: React.FC<Props> = ({width = 8, height = 8}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 14 14" fill="none">
      <G clipPath="url(#clip0_89_3327)">
        <Path
          d="M13.5 0.5L0.5 13.5"
          stroke="#000001"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M0.5 0.5L13.5 13.5"
          stroke="#000001"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_89_3327">
          <Rect width="14" height="14" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default CloseIcon;
