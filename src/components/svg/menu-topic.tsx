import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {WHITE} from '../../colors';

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const TopicIcon: React.FC<Props> = ({
  width = 24,
  height = 24,
  color = WHITE,
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <G clip-path="url(#clip0_69_1136)">
        <Path
          d="M7.71432 0.857147H2.57146C1.62469 0.857147 0.857178 1.62466 0.857178 2.57143V7.71429C0.857178 8.66106 1.62469 9.42858 2.57146 9.42858H7.71432C8.66109 9.42858 9.42861 8.66106 9.42861 7.71429V2.57143C9.42861 1.62466 8.66109 0.857147 7.71432 0.857147Z"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M21.4286 0.857147H16.2857C15.3389 0.857147 14.5714 1.62466 14.5714 2.57143V7.71429C14.5714 8.66106 15.3389 9.42858 16.2857 9.42858H21.4286C22.3753 9.42858 23.1428 8.66106 23.1428 7.71429V2.57143C23.1428 1.62466 22.3753 0.857147 21.4286 0.857147Z"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M7.71432 14.5714H2.57146C1.62469 14.5714 0.857178 15.339 0.857178 16.2857V21.4286C0.857178 22.3754 1.62469 23.1429 2.57146 23.1429H7.71432C8.66109 23.1429 9.42861 22.3754 9.42861 21.4286V16.2857C9.42861 15.339 8.66109 14.5714 7.71432 14.5714Z"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M21.4286 14.5714H16.2857C15.3389 14.5714 14.5714 15.339 14.5714 16.2857V21.4286C14.5714 22.3754 15.3389 23.1429 16.2857 23.1429H21.4286C22.3753 23.1429 23.1428 22.3754 23.1428 21.4286V16.2857C23.1428 15.339 22.3753 14.5714 21.4286 14.5714Z"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_69_1136">
          <Rect width="24" height="24" fill={color} />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default TopicIcon;
