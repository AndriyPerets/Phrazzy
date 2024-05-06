import React, {forwardRef, ForwardedRef} from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps,
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import {BLACK, GRAY} from '../../colors';

interface Props extends TextInputProps {
  fontSize?: number;
  color?: string;
  containerHeight?: number;
}

const CommonInput = forwardRef<RNTextInput, Props>(
  (
    {
      fontSize = 16,
      color = BLACK,
      placeholder = 'search...',
      style,
      onFocus,
      onBlur,
      containerHeight = 50,
      value,
      onChangeText,
      ...restProps
    },
    ref: ForwardedRef<TextInput>,
  ) => {
    return (
      <TouchableWithoutFeedback onPress={() => (ref as any).current?.focus()}>
        <View
          style={[
            styles.container,
            containerHeight ? {height: containerHeight} : {},
          ]}>
          {(!value || value.length === 0) && (
            <View style={styles.placeholderMainContainer}>
              <Text style={styles.placeholderMain}>{placeholder}</Text>
            </View>
          )}
          <RNTextInput
            ref={ref}
            {...restProps}
            onFocus={onFocus}
            onBlur={onBlur}
            onChangeText={onChangeText}
            value={value}
            style={[styles.input, {fontSize, color}, style]}
            placeholder=""
          />
        </View>
      </TouchableWithoutFeedback>
    );
  },
);

export default CommonInput;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // borderRadius: 16,
    position: 'relative',
    paddingRight: 18,
  },
  input: {
    flex: 1,
    paddingHorizontal: 24,
    borderRadius: 32,
    // borderColor: 'red',
    // borderWidth: 1,
  },
  placeholderMainContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    justifyContent: 'center',
    display: 'flex',
  },
  placeholderMain: {
    fontSize: 16,
    color: GRAY,
    paddingHorizontal: 24,
  },
});
