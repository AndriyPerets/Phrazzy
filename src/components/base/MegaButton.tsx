import React, {useCallback, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  ImageStyle,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {BLACK, GRAY, LIGHTERGRAY, LIGHTGRAY, RED, WHITE} from '../../colors';
import {Bold, Regular} from '../../fonts';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant = 'contained' | 'outlined' | 'text';
export type ButtonType = 'primary' | 'error';
export const BUTTON_HEIGHTS: {
  [key in ButtonSize]: number;
} = Object.freeze({
  small: 30,
  medium: 36,
  large: 52,
});

interface Props {
  style?: StyleProp<ViewStyle>;
  leftIcon?: ImageSourcePropType;
  leftIconStyle?: StyleProp<ImageStyle>;
  rightIcon?: ImageSourcePropType;
  rightIconStyle?: StyleProp<ImageStyle>;
  text: string;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
  type?: ButtonType;
  size?: ButtonSize;
}

const MegaButton = ({
  style,
  onPress,
  leftIconStyle,
  rightIconStyle,
  leftIcon,
  rightIcon,
  textStyle,
  text,
  disabled,
  loading,
  variant = 'contained',
  type = 'primary',
  size = 'large',
}: Props) => {
  const [pressed, setPressed] = useState(false);

  const onPressIn = useCallback(() => {
    setPressed(true);
  }, []);

  const onPressOut = useCallback(() => {
    setTimeout(() => setPressed(false), 300);
  }, []);

  const leftIconColorStyle = useMemo(
    (): ImageStyle => ({
      tintColor: disabled || loading ? GRAY : WHITE,
    }),
    [disabled, loading],
  );

  const rightIconColorStyle = useMemo(
    (): ImageStyle => ({
      tintColor: disabled || loading ? GRAY : WHITE,
    }),
    [disabled, loading],
  );

  const backgroundColorStyle = useMemo((): ViewStyle => {
    switch (variant) {
      case 'contained': {
        if (disabled || loading) {
          return {
            backgroundColor: GRAY,
          };
        }
        switch (type) {
          case 'error':
            return {
              backgroundColor: RED,
            };

          case 'primary':
          default:
            return {
              backgroundColor: BLACK,
            };
        }
      }

      case 'outlined':
      case 'text':
      default:
        return {
          backgroundColor: 'transparent',
        };
    }
  }, [disabled, loading, type, variant]);

  const borderStyle = useMemo((): ViewStyle => {
    if (variant === 'outlined') {
      if (disabled || loading) {
        return {
          borderWidth: 1,
          borderColor: LIGHTGRAY,
        };
      }
      return {
        borderWidth: 1,
        borderColor: LIGHTERGRAY,
      };
    }
    return {};
  }, [disabled, loading, variant]);

  const containerStyle = useMemo((): ViewStyle => {
    switch (size) {
      case 'small':
        return {
          height: BUTTON_HEIGHTS.small,
          paddingHorizontal: 10,
        };

      case 'medium':
        return {
          height: BUTTON_HEIGHTS.small,
          paddingHorizontal: 14,
        };

      case 'large':
      default:
        return {
          height: BUTTON_HEIGHTS.large,
          paddingHorizontal: 24,
        };
    }
  }, [size]);

  const textFontStyle = useMemo((): TextStyle => {
    switch (size) {
      case 'small':
        return {
          fontSize: 16,
          fontFamily: Regular,
          fontWeight: 'bold',
        };

      case 'medium':
        return {
          fontSize: 17,
          fontFamily: Regular,
          fontWeight: 'bold',
        };

      case 'large':
      default:
        return {
          fontSize: 18,
          fontFamily: Bold,
          fontWeight: 'bold',
        };
    }
  }, [size]);

  const textColorStyle = useMemo(() => {
    if (disabled || loading) {
      return {
        color: LIGHTERGRAY,
      };
    }
    switch (variant) {
      case 'contained':
        return {
          color: WHITE,
        };

      case 'outlined':
      case 'text':
      default:
        return {
          color: BLACK,
        };
    }
  }, [disabled, loading, variant]);

  const pressedStyle = useMemo(
    () => ({
      transform: pressed ? [{scale: 0.97}] : [{scale: 1}],
    }),
    [pressed],
  );

  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled || loading}
      style={[
        styles.container,
        containerStyle,
        backgroundColorStyle,
        borderStyle,
        pressedStyle,
        style,
      ]}
      onPress={onPress}>
      <>
        {loading ? (
          <ActivityIndicator
            style={!!text && styles.loader}
            color={LIGHTERGRAY}
            size={'small'}
          />
        ) : null}

        {!loading && leftIcon ? (
          <Image
            style={[
              styles.leftIcon,
              leftIconColorStyle,
              !!text && styles.leftIconMargin,
              leftIconStyle,
            ]}
            source={leftIcon}
            resizeMode={'contain'}
          />
        ) : null}

        {text ? (
          <Text
            style={[textFontStyle, textColorStyle, textStyle]}
            numberOfLines={1}>
            {text}
          </Text>
        ) : null}

        {rightIcon ? (
          <Image
            style={[
              styles.rightIcon,
              !!text && styles.rightIconMargin,
              rightIconColorStyle,
              rightIconStyle,
            ]}
            source={rightIcon}
            resizeMode={'contain'}
          />
        ) : null}
      </>
    </Pressable>
  );
};

MegaButton.defaultProps = {
  leftIconStyle: undefined,
  leftIcon: undefined,
  rightIconStyle: undefined,
  rightIcon: undefined,
  disabled: false,
  loading: false,
  size: 'large',
  style: undefined,
  onPress: undefined,
  textStyle: undefined,
  variant: 'contained',
  type: 'primary',
};

export default MegaButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    minWidth: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  loader: {
    marginRight: 8,
  },

  leftIcon: {
    height: 16,
    width: 16,
  },

  rightIcon: {
    height: 24,
    width: 24,
  },

  rightIconMargin: {
    marginLeft: 8,
  },

  leftIconMargin: {
    marginRight: 8,
  },
});
