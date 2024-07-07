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
import {GRAY, LIGHTGRAY, WHITE} from '../../colors';
import TheText from './TheText';
import CloseSmallIcon from '../svg/closeSmall';
import EditIcon from '../svg/edit';
import CloseIcon from '../svg/close';

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
  borderRadius?: number;
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between';
  closeIcon?: boolean;
  closeIconPress?: () => void;
  editable?: boolean;
  editPhrase?: () => void;
  deletePhrase?: () => void;
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
  borderRadius,
  justifyContent = 'center',
  closeIcon,
  closeIconPress,
  editable,
  editPhrase,
  deletePhrase,
  ...restTouchableOpacityProps
}: Props) => {
  const calculatedWidth =
    typeof width === 'number' ? width : (parseFloat(width) / 100) * screenWidth;
  const backgroundColor = isLoading ? GRAY : color || GRAY;
  const contentOpacity = isLoading ? 0.9 : 1;
  const renderIcon = (icon: JSX.Element | undefined) => (
    <View
      style={{
        width: iconSize,
        height: iconSize,
        borderRadius: iconSize / 2,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: iconPosition === 'start' ? 8 : 0,
        marginLeft: iconPosition === 'end' ? 8 : 0,
      }}>
      {icon}
    </View>
  );
  // const renderSpacer = () => <View style={{width: 8}} />;
  return (
    <Pressable
      disabled={disabled}
      {...restTouchableOpacityProps}
      style={({pressed}) => [
        styles.container,
        {
          height: height,
          width: calculatedWidth,
          backgroundColor: pressed ? LIGHTGRAY : backgroundColor || GRAY,
          borderColor: borderColor || LIGHTGRAY,
          borderWidth: borderColor ? 1 : 0,
          opacity: pressed ? 0.5 : contentOpacity,
          borderRadius: borderRadius || 16,
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
          <View style={{width: iconSize}}>
            {icon && iconPosition === 'startOut' && renderIcon(icon)}
            {/*{icon && iconPosition === 'endOut' && renderSpacer()}*/}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: justifyContent || 'center',
              alignItems: 'center',
              // borderWidth: 1,
              // borderColor: 'red',
            }}>
            <View style={{width: iconSize}}>
              {/*{icon && iconPosition === 'start' && renderSpacer()}*/}
              {icon && iconPosition === 'start' && renderIcon(icon)}
            </View>
            <TheText
              style={[
                textStyle,
                {textTransform: textTransform},
                {fontSize: fontSize},
              ]}
              color={textColor || WHITE}
              bold>
              {title}
            </TheText>
            <View style={{width: iconSize}}>
              {/*{iconPosition === 'end' && renderSpacer()}*/}
              {iconPosition === 'end' && renderIcon(icon)}
            </View>
          </View>
          <View style={{width: iconSize}}>
            {icon && iconPosition === 'endOut' && renderIcon(icon)}
            {/*{icon && iconPosition === 'startOut' && renderSpacer()}*/}
          </View>
          {closeIcon && (
            <Pressable
              onPress={closeIconPress}
              style={{
                width: iconSize,
                height: iconSize,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CloseIcon width={16} height={16} />
            </Pressable>
          )}
          {editable && (
            <>
              <Pressable
                onPress={deletePhrase}
                style={{
                  width: iconSize,
                  height: iconSize,
                  position: 'absolute',
                  left: -10,
                  top: -16,
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: GRAY,
                  borderRadius: iconSize / 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CloseSmallIcon />
              </Pressable>
              <Pressable
                onPress={editPhrase}
                style={{
                  width: iconSize,
                  height: iconSize,
                  position: 'absolute',
                  right: -10,
                  bottom: -16,
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: GRAY,
                  borderRadius: iconSize / 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <EditIcon />
              </Pressable>
            </>
          )}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderRadius: 16,
    paddingHorizontal: 10,
  },
});

export default CommonButton;
