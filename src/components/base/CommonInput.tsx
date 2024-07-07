import React, {forwardRef, ForwardedRef} from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps,
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  Dimensions,
  Pressable,
} from 'react-native';
import {BLACK, GRAY, LIGHTGRAY} from '../../colors';

const screenWidth = Dimensions.get('window').width;

interface Props extends TextInputProps {
  fontSize?: number;
  color?: string;
  height?: number;
  width?: string | number;
  borderColor?: string;
  borderRadius?: number;
  editable?: boolean;
  saveEdit?: (index: number) => void;
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
      height = 50,
      value,
      onChangeText,
      width = '100%',
      borderColor,
      borderRadius,
      editable = false,
      saveEdit,
      ...restProps
    },
    ref: ForwardedRef<TextInput>,
  ) => {
    const calculatedWidth =
      typeof width === 'number'
        ? width
        : (parseFloat(width) / 100) * screenWidth;

    return (
      <TouchableWithoutFeedback onPress={() => (ref as any).current?.focus()}>
        <View
          style={[
            styles.container,
            {
              height: height,
              width: calculatedWidth,
              borderColor: borderColor || LIGHTGRAY,
              borderWidth: borderColor ? 1 : 0,
              borderRadius: borderRadius || 16,
            },
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
          {editable && (
            <Pressable
              onPress={saveEdit as any}
              style={{
                width: 50,
                height: 20,
                position: 'absolute',
                right: 0,
                bottom: -6,
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: GRAY,
                borderRadius: 16,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={
                  {
                    // width: 24,
                    // height: 24,
                    // justifyContent: 'center',
                    // alignItems: 'center',
                  }
                }>
                save
              </Text>
            </Pressable>
          )}
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
