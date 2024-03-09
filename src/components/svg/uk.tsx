import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const UKIcon: React.FC<Props> = ({
  width = 25,
  height = 24, // color = BRIGHTBLUE,
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 25 24" fill="none">
      <G clip-path="url(#clip0_10_447)">
        <Path
          d="M1.74783 24H23.2522C23.9435 23.9438 24.5 23.1125 24.5 22.1062V1.89375C24.5 0.85625 23.913 0.00625 23.1913 0H1.8087C1.08696 0.00625 0.5 0.85625 0.5 1.89375V22.1C0.5 23.1125 1.05652 23.9438 1.74783 24Z"
          fill="#FEFEFE"
        />
        <Path
          d="M10.8217 14.3938V24H14.1609V14.3938H24.5V9.59375H14.1609V0H10.8217V9.59375H0.5V14.3938H10.8217Z"
          fill="#C8102E"
        />
        <Path
          d="M15.2739 7.76875V0H23.2C23.7478 0.0125 24.2174 0.50625 24.4087 1.2L15.2739 7.76875Z"
          fill="#012169"
        />
        <Path
          d="M15.2739 16.2312V24H23.2522C23.7783 23.9562 24.2218 23.4687 24.4087 22.8L15.2739 16.2312Z"
          fill="#012169"
        />
        <Path
          d="M9.70821 16.2312V24H1.74734C1.22125 23.9562 0.773429 23.4687 0.59082 22.7875L9.70821 16.2312Z"
          fill="#012169"
        />
        <Path
          d="M9.70821 7.76875V0H1.79952C1.25169 0.0125 0.777777 0.5125 0.59082 1.2125L9.70821 7.76875Z"
          fill="#012169"
        />
        <Path d="M0.5 8H3.82609L0.5 5.60625V8Z" fill="#012169" />
        <Path d="M24.5 8H21.1565L24.5 5.59375V8Z" fill="#012169" />
        <Path d="M24.5 16H21.1565L24.5 18.4063V16Z" fill="#012169" />
        <Path d="M0.5 16H3.82609L0.5 18.3937V16Z" fill="#012169" />
        <Path
          d="M24.5 2.03125L16.2174 8H18.0696L24.5 3.375V2.03125Z"
          fill="#C8102E"
        />
        <Path
          d="M8.76522 16H6.91304L0.5 20.6125V21.9563L8.78261 16H8.76522Z"
          fill="#C8102E"
        />
        <Path
          d="M5.07391 8.00626H6.92609L0.5 3.38126V4.71876L5.07391 8.00626Z"
          fill="#C8102E"
        />
        <Path
          d="M19.9044 15.9937H18.0522L24.5 20.6375V19.3L19.9044 15.9937Z"
          fill="#C8102E"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_10_447">
          <Rect x="0.5" width="24" height="24" rx="12" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default UKIcon;
