import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const GermanyIcon: React.FC<Props> = ({width = 25, height = 24}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 25 24" fill="none">
      <G clip-path="url(#clip0_11_1194)">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1.77725 0H22.4873C23.1912 0 23.7645 0.85 23.7645 1.89375V22.1C23.7645 23.1375 23.1912 23.9875 22.4915 23.9937H1.77303C1.07329 24 0.5 23.1437 0.5 22.1062V1.89375C0.5 0.85 1.07329 0 1.77725 0Z"
          fill="black"
        />
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.5 8H23.7687V22.1062C23.7687 23.15 23.1954 24 22.4915 24H1.77725C1.07329 24 0.5 23.15 0.5 22.1062V8Z"
          fill="#DD0000"
        />
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.5 16H23.7687V22.1062C23.7687 23.1437 23.1954 23.9938 22.4957 24H1.77725C1.43884 23.9984 1.11462 23.7983 0.875326 23.4435C0.636035 23.0887 0.501111 22.608 0.5 22.1062L0.5 16Z"
          fill="#FFCE00"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_11_1194">
          <Rect
            width="23.2687"
            height="24"
            fill="white"
            transform="translate(0.5)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default GermanyIcon;
