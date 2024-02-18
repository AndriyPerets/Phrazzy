import React, {useState, forwardRef, ForwardedRef, useRef} from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput as RNTextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import {BLACK, WHITE, LIGHTGREEN} from '../../colors';

interface Props extends TextInputProps {
  fontSize?: number;
  color?: string;
  outlineColor?: string;
  activeOutlineColor?: string;
  placeholderStyle?: {
    color?: string;
    fontSize?: number;
    fontFamily?: string;
  };
  placeholderActive?: string;
  placeholderMain?: string;
  borderRadius?: number;
  containerHeight?: number;
  icon?: JSX.Element;
}

const CommonInput = forwardRef<RNTextInput, Props>(
  (
    {
      fontSize,
      color = BLACK,
      outlineColor = WHITE,
      activeOutlineColor = LIGHTGREEN,
      placeholderActive,
      placeholderMain,
      style,
      onFocus,
      onBlur,
      placeholderStyle = {},
      borderRadius,
      containerHeight,
      icon,
      ...restProps
    },
    ref: ForwardedRef<TextInput>,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<RNTextInput>(null);
    // const focusInput = () => {
    //   // Проверяем, является ли ref объектом ref и имеет ли он свойство current
    //   if (typeof ref === 'object' && ref?.current) {
    //     ref.current.focus();
    //   }
    // };

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
      if (onFocus) {
        onFocus(e);
      }
      // Use inputValue state for length
      const textLength = inputValue.length;
      inputRef.current?.setNativeProps({
        selection: {
          start: textLength,
          end: textLength,
        },
      });
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);
      if (onBlur) {
        onBlur(e);
      }
    };

    // Логика отображения плейсхолдера
    const shouldShowPlaceholderMain =
      !isFocused && !restProps.value && placeholderMain;

    return (
      <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
        <View
          style={[
            styles.container,
            {
              borderColor: isFocused ? activeOutlineColor : outlineColor,
              borderRadius,
            },
            containerHeight ? {height: containerHeight} : {},
          ]}>
          {/* Условие для отображения placeholderMain, если нет фокуса и значения */}
          {shouldShowPlaceholderMain && (
            <View style={styles.placeholderMainContainer}>
              <Text style={styles.placeholderMain}>{placeholderMain}</Text>
            </View>
          )}
          {/* Условие для отображения обычного плейсхолдера и placeholderActive только если нет placeholderMain или он не должен отображаться */}
          {!shouldShowPlaceholderMain && (
            <Text
              style={[
                styles.placeholder,
                {fontSize: 12, color: placeholderStyle.color || '#000'},
              ]}>
              {isFocused ? placeholderActive : restProps.placeholder}
            </Text>
          )}
          <RNTextInput
            ref={ref}
            {...restProps}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={text => {
              setInputValue(text);
              if (restProps.onChangeText) {
                restProps.onChangeText(text);
              }
            }}
            value={inputValue} // Control the input with the state
            style={[styles.input, {fontSize, color}, style]}
            placeholder=""
          />
          {!shouldShowPlaceholderMain && icon}
        </View>
      </TouchableWithoutFeedback>
    );
  },
);

export default CommonInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // borderRadius: 16,
    position: 'relative',
    paddingRight: 18,
  },
  input: {
    flex: 1,
    paddingHorizontal: 24,
    // paddingVertical: 16,
    borderRadius: 32,
    marginTop: 12,
    // borderColor: 'red',
    // borderWidth: 1,
  },
  placeholder: {
    position: 'absolute',
    left: 24,
    top: 6,
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
    color: WHITE,
    paddingHorizontal: 24,
  },
});
