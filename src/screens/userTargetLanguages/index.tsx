import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {MainStackParamList} from '../../navigation/MainStack';
import {WHITE} from '../../colors';

import MegaButton from '../../components/base/MegaButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SelectField from '../../components/base/SelectField';
import {getLanguage} from '../../asyncStorageApi/language';
import {useLanguage} from '../../hook/useLanguage';

type LanguageScreenNavigationProp = StackScreenProps<
  MainStackParamList,
  'UserTargetLanguages'
>;

interface Props {
  navigation: LanguageScreenNavigationProp;
}

const UserTargetLanguages: FC<Props> = ({navigation}) => {
  const safeAreaInsets = useSafeAreaInsets();

  const {languageToLearn, nativeLanguage} = useLanguage();

  return (
    <View
      style={[styles.container, {paddingBottom: safeAreaInsets.bottom + 16}]}>
      <SelectField
        label={'My native'}
        language={nativeLanguage}
        placeholder={'Your native language'}
      />
      <SelectField
        label={'I want to Learn'}
        language={languageToLearn}
        placeholder={'Language to learn'}
      />
      <View style={styles.flexSpace} />
      <MegaButton text={'Continue'} />
    </View>
  );
};

export default UserTargetLanguages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: WHITE,
    paddingHorizontal: 16,
    gap: 12,
  },

  flexSpace: {
    flex: 1,
  },
});
