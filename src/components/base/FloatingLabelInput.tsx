import React, {useState, useRef, forwardRef} from 'react';
import {
  Animated,
  TextInput,
  View,
  StyleSheet,
  TextInputProps,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Platform,
} from 'react-native';
import {LIGHTGREEN, RED, WHITE} from '../../colors';
import {verticalSpaceHeight11} from '../../utils/utils';
import {IFormValues} from '../../types';
import {Regular} from '../../fonts';
import useValidate from '../../hooks/useValidate';

interface Props extends TextInputProps {
  fieldType: 'name' | 'email' | 'password';
  placeholder: string;
  textColor?: string;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  onClearError?: (fieldType: keyof IFormValues) => void;
  validateField: (field: keyof IFormValues, value: any) => string | undefined;
  onBlur?: () => void;
  enableShowAlertOnBlur: (message: string) => void;
  setFieldTouched?: (fieldType: keyof IFormValues) => void;
  showAlertOnBlur: boolean;
}

const FloatingLabelInput = forwardRef<TextInput, Props>(
  (
    {
      placeholder,
      textColor = WHITE,
      rightIcon,
      onRightIconPress,
      onClearError,
      validateField,
      fieldType,
      onBlur,
      enableShowAlertOnBlur,
      setFieldTouched,
      showAlertOnBlur,
      ...textInputProps
    },
    ref,
  ) => {
    const [isValid, setIsValid] = useState(true); //валидация
    const [isFocused, setIsFocused] = useState(false); //анимация метки
    const [hasText, setHasText] = useState(!!textInputProps.value); //содержит текст
    const [isInitialRender, setIsInitialRender] = useState(true); //первый текущий рендер
    const animatedIsFocused = useRef(
      new Animated.Value(hasText ? 1 : 0),
    ).current; //анимация метки ввода (placeholder). 1 - в фокусе, 0 - не в фокусе
    const [borderColor, setBorderColor] = useState(WHITE); //цвет рамки
    const [firstCharTyped, setFirstCharTyped] = useState(false); //первый символ введен
    const [hasFocused, setHasFocused] = useState(false); //фокус при монтировании
    const placeholderColor = isValid && hasText ? WHITE : RED; //цвет метки
    const paddingTop = verticalSpaceHeight11; //вертикальный отступ
    const {showAlert} = useValidate();

    // Анимация метки ввода (placeholder)
    const handleFocus = () => {
      setIsFocused(true);
      setIsInitialRender(false);
      animatedIsFocused.setValue(1);

      // Change borderColor to LIGHTGREEN only if the field is valid
      if (isValid) {
        setBorderColor(LIGHTGREEN);
      }

      setHasFocused(true);
    };

    // Анимация метки ввода (placeholder)
    const handleBlur = () => {
      setIsFocused(false);
      onBlur?.();
      setFieldTouched?.(fieldType);

      // Trigger validation only if text has been entered
      if (hasText) {
        const fieldError = validateField(fieldType, textInputProps.value);
        setIsValid(!fieldError);

        if (fieldError) {
          setBorderColor(RED);
          if (showAlertOnBlur) {
            enableShowAlertOnBlur(fieldError);
            showAlert(fieldError);
          }
        } else {
          setBorderColor(WHITE);
          onClearError?.(fieldType);
        }
      }

      // Reset initial render state
      setIsInitialRender(false);
    };

    // Анимация метки ввода (placeholder)
    const handleChangeText = (text: string) => {
      setHasText(text.length > 0);
      setIsInitialRender(false);
      if (textInputProps.onChangeText) {
        textInputProps.onChangeText(text);
      }

      if (hasFocused) {
        const fieldError = validateField(fieldType, text);
        setIsValid(!fieldError);

        if (!fieldError) {
          setIsValid(true);
          setBorderColor(WHITE);
        }
      }
    };

    // Анимация метки ввода (placeholder)
    const handleKeyPress = (
      e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    ) => {
      const key = e.nativeEvent.key;
      if (!firstCharTyped) {
        if (key === key.toUpperCase() && key !== key.toLowerCase()) {
          textInputProps.onChangeText?.(key.toLowerCase());
          setFirstCharTyped(true);
          return;
        }
      }
      setFirstCharTyped(true);
    };

    // Анимация метки ввода (placeholder)
    const labelStyle: Animated.WithAnimatedObject<TextStyle> = {
      position: 'absolute',
      left: 18,
      top: animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 4], // Adjusted for larger initial size
      }),
      fontSize: animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 10], // Adjusted for larger initial size
      }),
      color: isInitialRender
        ? WHITE
        : isFocused && !hasText && isValid
        ? WHITE
        : !hasText
        ? RED
        : placeholderColor,
      fontFamily: Regular,
    };

    // Анимация метки ввода (placeholder)
    const inputStyle: Animated.WithAnimatedObject<ViewStyle> = {
      ...styles.input,
      paddingTop,
      borderColor: borderColor,
    };

    return (
      <View style={styles.container}>
        <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>
        <Animated.View style={inputStyle}>
          <TextInput
            {...textInputProps}
            ref={ref}
            style={{color: hasText || isFocused ? WHITE : textColor}}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={handleChangeText}
            onKeyPress={handleKeyPress}
            placeholderTextColor={placeholderColor}
            blurOnSubmit
            autoCapitalize={'none'}
          />
        </Animated.View>
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {},
  input: {
    height: 50,
    borderColor: WHITE,
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: Platform.OS === 'android' ? 14 : 18,
  },
  rightIcon: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
});

export default FloatingLabelInput;
