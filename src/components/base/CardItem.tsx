import React, {useCallback, useMemo} from 'react';

import {
  StyleSheet,
  ViewStyle,
  StyleProp,
  Image,
  ImageSourcePropType,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {BLUR, GRAY, LIGHTGRAY} from '../../colors';
import TheText from './TheText';
import {Bold} from '../../fonts';

import {languageIcons} from '../../config/icons';
import {Language} from '../../asyncStorageApi/language';

const {width, height} = Dimensions.get('window');

interface Item<T> {
  value: T;
  label: string;
}

interface Props<T> {
  onPress?: (value: T) => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  item: Item<T>;
  leftIcon?: ImageSourcePropType;
  language?: Language;
  isSelected?: boolean;
}

const CardItem = <T = string,>({
  style,
  onPress,
  disabled,
  item,
  leftIcon,
  language,
  isSelected,
}: Props<T>) => {
  const fieldBackgroundColorStyle = useMemo((): ViewStyle => {
    if (disabled) {
      return {
        backgroundColor: GRAY,
      };
    }
    return {backgroundColor: isSelected ? BLUR : LIGHTGRAY};
  }, [disabled, isSelected]);

  const onItemPress = useCallback(
    () => onPress?.(item.value),
    [item.value, onPress],
  );

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onItemPress}
      style={[styles.container, fieldBackgroundColorStyle, style]}>
      <View style={styles.leftContainer}>
        {leftIcon ? (
          <Image style={styles.leftIconImg} source={leftIcon} />
        ) : null}
        {language ? (
          <View style={styles.languageIconContainer}>
            {languageIcons.get(language)}
          </View>
        ) : null}
        <TheText fontSize={16} fontFamily={Bold}>
          {item.label}
        </TheText>
      </View>
    </TouchableOpacity>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  container: {
    minHeight: height / 6,
    width: width / 1.5,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  languageIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 8,
  },

  leftIconImg: {
    width: 20,
    height: 20,
  },
});
