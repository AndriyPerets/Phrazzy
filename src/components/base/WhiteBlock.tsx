import React from 'react';

import {StyleSheet, ViewProps, Pressable, PressableProps} from 'react-native';
import {WHITE} from '../../colors';

const WhiteBlock = ({
  style,
  children,
  ...restProps
}: PressableProps & ViewProps) => {
  return (
    <Pressable {...restProps} style={[styles.container, style]}>
      {children}
    </Pressable>
  );
};

export default WhiteBlock;

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    borderRadius: 32,
    padding: 20,
    overflow: 'hidden',
  },
});
