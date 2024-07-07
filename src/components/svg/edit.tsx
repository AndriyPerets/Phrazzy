import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const EditIcon: React.FC<Props> = ({width = 12, height = 20}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 15 14" fill="none">
      <G clip-path="url(#clip0_89_845)">
        <Path
          d="M5.52002 12.24L1.02002 13.5L2.28002 9.00002L10.52 0.800021C10.6132 0.704775 10.7244 0.629096 10.8472 0.577429C10.9699 0.525761 11.1018 0.499146 11.235 0.499146C11.3682 0.499146 11.5001 0.525761 11.6229 0.577429C11.7457 0.629096 11.8569 0.704775 11.95 0.800021L13.72 2.58002C13.8137 2.67298 13.8881 2.78359 13.9389 2.90544C13.9897 3.0273 14.0158 3.15801 14.0158 3.29002C14.0158 3.42203 13.9897 3.55274 13.9389 3.6746C13.8881 3.79646 13.8137 3.90706 13.72 4.00002L5.52002 12.24Z"
          stroke="#000001"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_89_845">
          <Rect
            width="14"
            height="14"
            fill="white"
            transform="translate(0.52002)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default EditIcon;
