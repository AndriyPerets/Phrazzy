import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const SaveIcon: React.FC<Props> = ({width = 12, height = 20}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 12 20" fill="none">
      <G clip-path="url(#clip0_89_3460)">
        <Path
          d="M13.5 12.5C13.5 12.7652 13.3946 13.0196 13.2071 13.2071C13.0196 13.3946 12.7652 13.5 12.5 13.5H1.5C1.23478 13.5 0.98043 13.3946 0.792893 13.2071C0.605357 13.0196 0.5 12.7652 0.5 12.5V3.5L3.5 0.5H12.5C12.7652 0.5 13.0196 0.605357 13.2071 0.792893C13.3946 0.98043 13.5 1.23478 13.5 1.5V12.5Z"
          stroke="#000001"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M10.5 8.5H3.5V13.5H10.5V8.5Z"
          stroke="#000001"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M10.5 0.5H4.5V4.5H10.5V0.5Z"
          stroke="#000001"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_89_3460">
          <Rect width="14" height="14" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default SaveIcon;
