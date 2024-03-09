import React from 'react';
import {TextProps, Text} from 'react-native';
import {Regular} from '../../fonts';
import {BLACK} from '../../colors';

export interface TheTextProps extends TextProps {
  bold?: boolean;
  italic?: boolean;
  extraBoldItalic?: boolean;
  extraBold?: boolean;
  black?: boolean;
  extraLight?: boolean;
  light?: boolean;
  medium?: boolean;
  semiBold?: boolean;
  thin?: boolean;
  fontSize?: number;
  color?: string;
  letterSpacingPercent?: number;
  textTransform?: 'capitalize' | 'uppercase' | 'lowercase';
  fontFamily?: string;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  underline?: boolean;
}

const TheText = ({
  children,
  style,
  fontSize = 20,
  color = BLACK,
  letterSpacingPercent,
  textTransform,
  fontFamily = Regular,
  textAlign,
  underline,
  ...restProps
}: TheTextProps) => {
  return (
    <Text
      allowFontScaling={false}
      {...restProps}
      style={[
        {
          letterSpacing: letterSpacingPercent,
          fontFamily: fontFamily,
          fontSize: fontSize,
          color: color,
          textTransform: textTransform,
          textAlign: textAlign,
          textDecorationLine: underline ? 'underline' : 'none',
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export default TheText;
