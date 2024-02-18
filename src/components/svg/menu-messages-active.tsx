import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {MEDIUMGRAY, WHITE} from '../../colors';

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const MessagesActiveIcon: React.FC<Props> = ({
  width = 24,
  height = 24,
  color = WHITE,
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18.4699 16.83L18.8599 19.99C18.9599 20.82 18.0699 21.4 17.3599 20.97L13.8999 18.91C13.6599 18.77 13.5999 18.47 13.7299 18.23C14.2299 17.31 14.4999 16.27 14.4999 15.23C14.4999 11.57 11.3599 8.59 7.49989 8.59C6.70989 8.59 5.93989 8.71 5.21989 8.95C4.84989 9.07 4.48989 8.73 4.57989 8.35C5.48989 4.71 8.98989 2 13.1699 2C18.0499 2 21.9999 5.69 21.9999 10.24C21.9999 12.94 20.6099 15.33 18.4699 16.83Z"
        fill={color}
      />
      <Path
        d="M13 15.2298C13 16.4198 12.56 17.5198 11.82 18.3898C10.83 19.5898 9.26 20.3598 7.5 20.3598L4.89 21.9098C4.45 22.1798 3.89 21.8098 3.95 21.2998L4.2 19.3298C2.86 18.3998 2 16.9098 2 15.2298C2 13.4698 2.94 11.9198 4.38 10.9998C5.27 10.4198 6.34 10.0898 7.5 10.0898C10.54 10.0898 13 12.3898 13 15.2298Z"
        fill={color}
      />
    </Svg>
  );
};

export default MessagesActiveIcon;
