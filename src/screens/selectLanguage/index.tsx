import React from 'react';
import {StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {MainStackParamList} from '../../navigation/MainStack';
import {WHITE} from '../../colors';
import CommonButton from '../../components/base/CommonButton';

type LanguageScreenNavigationProp = StackScreenProps<
  MainStackParamList,
  'SelectLanguage'
>;

const SelectLanguage = ({navigation}: LanguageScreenNavigationProp) => {
  return (
    <View style={styles.container}>
    </View>
  );
};

export default SelectLanguage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
