import React, {FC, useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {MainStackParamList} from '../../navigation/MainStack';
import {WHITE} from '../../colors';

import MegaButton from '../../components/base/MegaButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SelectField from '../../components/base/SelectField';
import {LanguageType, saveLanguage} from '../../asyncStorageApi/language';
import {useLanguage} from '../../hook/useLanguage';

type LanguageScreenNavigationProp = StackScreenProps<
  MainStackParamList,
  'UserTargetLanguages'
>;

const UserTargetLanguages: FC<LanguageScreenNavigationProp> = ({
  navigation,
}) => {
  const safeAreaInsets = useSafeAreaInsets();

  const [isSaving, setSaving] = useState(false);

  const {languageToLearn, nativeLanguage} = useLanguage();

  const onLanguageFieldPress = useCallback(
    (languageType: LanguageType) =>
      navigation.navigate('SelectLanguage', {languageType}),
    [navigation],
  );

  const onNativeLanguagePress = useCallback(
    () => onLanguageFieldPress('native'),
    [onLanguageFieldPress],
  );

  const onLearnLanguagePress = useCallback(
    () => onLanguageFieldPress('learn'),
    [onLanguageFieldPress],
  );

  const onContinuePress = useCallback(async () => {
    if (languageToLearn && nativeLanguage) {
      setSaving(true);
      await saveLanguage({language: languageToLearn, type: 'learn'});
      await saveLanguage({language: nativeLanguage, type: 'native'});
      setSaving(false);
      navigation.navigate('SelectTopic');
    }
  }, [languageToLearn, nativeLanguage, navigation]);

  return (
    <View
      style={[styles.container, {paddingBottom: safeAreaInsets.bottom + 16}]}>
      <SelectField
        onPress={onNativeLanguagePress}
        label={'My native'}
        value={nativeLanguage}
        language={nativeLanguage}
        placeholder={'Your native language'}
      />
      <SelectField
        onPress={onLearnLanguagePress}
        label={'I want to Learn'}
        value={languageToLearn}
        language={languageToLearn}
        placeholder={'Language to learn'}
      />
      <View style={styles.flexSpace} />
      <MegaButton
        onPress={onContinuePress}
        loading={isSaving}
        disabled={!languageToLearn || !nativeLanguage}
        text={'Continue'}
      />
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
