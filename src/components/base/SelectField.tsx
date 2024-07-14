import React, {useMemo} from 'react';

import {
  StyleSheet,
  ViewProps,
  ViewStyle,
  StyleProp,
  Image,
  ImageSourcePropType,
  View,
  TouchableOpacity,
} from 'react-native';
import {GRAY, LIGHTGRAY} from '../../colors';
import TheText from './TheText';
import {Bold} from '../../fonts';

import rightChevron from '../../../public/assets/images/rightChevron.png';
import {languageIcons} from '../../config/icons';
import {Language} from '../../asyncStorageApi/language';

interface Props extends ViewProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  loading?: boolean;
  value?: string;
  placeholder: string;
  label?: string;
  leftIcon?: ImageSourcePropType;
  language?: Language;
}

const CircleContainer = ({
  style,
  onPress,
  disabled,
  loading,
  value,
  label,
  placeholder,
  leftIcon,
  language,
}: Props) => {
  const fieldBackgroundColorStyle = useMemo((): ViewStyle => {
    if (disabled || loading) {
      return {
        backgroundColor: GRAY,
      };
    }
    return {backgroundColor: LIGHTGRAY};
  }, [disabled, loading]);

  return (
    <View style={style}>
      {label ? <TheText style={styles.label}>{label}</TheText> : null}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={[styles.fieldContainer, fieldBackgroundColorStyle]}>
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
            {value || placeholder}
          </TheText>
        </View>
        {disabled ? null : (
          <Image style={styles.rightChevronImg} source={rightChevron} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CircleContainer;

const styles = StyleSheet.create({
  fieldContainer: {
    minHeight: 52,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  label: {
    marginBottom: 12,
  },

  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rightChevronImg: {
    width: 20,
    height: 20,
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
