import React from 'react';

import {StyleSheet, ViewProps, Pressable} from 'react-native';
import {GRAY} from '../../colors';

interface Props {
  radius: number;
  width?: number;
  color?: string;
  onPress?: () => void;
}

const CircleContainer = ({
  style,
  children,
  radius,
  color,
  width,
  onPress,
  ...restProps
}: ViewProps & Props) => {
  return (
    <Pressable
      onPress={onPress}
      {...restProps}
      style={[
        styles.container,
        style,
        {
          height: radius * 2,
          width: width || radius * 2,
          borderRadius: radius,
          backgroundColor: color || GRAY,
        },
      ]}>
      {children}
    </Pressable>
  );
};

export default CircleContainer;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
