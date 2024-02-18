import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
  View,
  Dimensions,
} from 'react-native';
import {DARKGRAY, GRAY, WHITE} from '../../colors';
import TheText from './TheText';

interface Props extends PressableProps {
  title: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  color?: string;
  textColor?: string;
  borderColor?: string;
  icon?: JSX.Element;
  iconPosition?: 'start' | 'end' | 'startOut' | 'endOut';
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  isLoading?: boolean;
  iconSize?: number;
  height?: number;
  width?: string | number;
  fontSize?: number;
}

const screenWidth = Dimensions.get('window').width;

const CommonButton = ({
  style,
  title,
  disabled,
  color,
  textColor,
  borderColor,
  textStyle,
  icon,
  iconPosition = 'end',
  textTransform,
  isLoading,
  iconSize = 24,
  height = 50,
  width = '100%',
  fontSize = 14,
  ...restTouchableOpacityProps
}: Props) => {
  const calculatedWidth =
    typeof width === 'number' ? width : (parseFloat(width) / 100) * screenWidth;
  const backgroundColor = isLoading ? GRAY : color || GRAY;
  const contentOpacity = isLoading ? 0.9 : 1;
  const renderIconSpace = () => (
    <View style={{width: iconSize, height: iconSize}} />
  );
  const renderSpacer = () => <View style={{width: 8}} />;
  return (
    <Pressable
      disabled={disabled}
      {...restTouchableOpacityProps}
      style={[
        styles.container,
        {
          height: height,
          width: calculatedWidth,
          backgroundColor: backgroundColor || GRAY,
          borderColor: borderColor || DARKGRAY,
          borderWidth: borderColor ? 1 : 0,
          opacity: contentOpacity,
        },
        style,
      ]}>
      {isLoading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {iconPosition === 'startOut' && icon}
          {icon && iconPosition === 'endOut' && renderIconSpace()}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              // borderWidth: 1,
              // borderColor: 'red',
            }}>
            {iconPosition === 'start' && icon}
            {icon && iconPosition === 'start' && renderSpacer()}
            <TheText
              style={[
                textStyle,
                {textTransform: textTransform},
                {fontSize: fontSize},
                // {opacity: disabled ? 0.9 : 1, textTransform: textTransform},
              ]}
              color={textColor || WHITE}
              bold>
              {title}
            </TheText>
            {iconPosition === 'end' && renderSpacer()}
            {iconPosition === 'end' && icon}
          </View>
          {iconPosition === 'endOut' && icon}
          {icon && iconPosition === 'startOut' && renderIconSpace()}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 10,
    // borderWidth: 1,
    // borderColor: 'red',
  },
});

export default CommonButton;
