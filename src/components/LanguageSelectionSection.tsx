import React, {useEffect} from 'react';
import {View, FlatList} from 'react-native';
import CommonButton from '../components/base/CommonButton';
import CommonInput from '../components/base/CommonInput';
import TheText from '../components/base/TheText';
import VerticalSpace from '../components/base/VerticalSpace';
import {Regular} from '../fonts';
import {BLACK, BRIGHTBLUE, GRAY, LIGHTGRAY} from '../colors';

const LanguageSelectionSection = ({
  title,
  isOpen,
  toggleMenu,
  selectedLanguage,
  languageFilter,
  setLanguageFilter,
  filteredLanguages,
  handleSelectLanguage,
  inputRef,
  icons,
  closeIconPress,
}: any) => {
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, inputRef]);

  return (
    <View>
      <View style={{width: '80%', height: 40}}>
        <TheText fontFamily={Regular} fontSize={16} color={BLACK}>
          {title}
        </TheText>
      </View>
      {!isOpen && (
        <CommonButton
          title={selectedLanguage || `Select ${title.toLowerCase()}`}
          onPress={toggleMenu}
          width={'80%'}
          color={selectedLanguage ? LIGHTGRAY : BRIGHTBLUE}
          textColor={BLACK}
          borderRadius={25}
          icon={icons.get(selectedLanguage)}
          iconPosition={'startOut'}
          justifyContent={selectedLanguage ? 'flex-start' : 'center'}
          closeIcon={!!selectedLanguage}
          closeIconPress={closeIconPress}
        />
      )}
      {isOpen && (
        <View
          style={{
            borderWidth: 1,
            borderColor: GRAY,
            maxWidth: '80%',
            borderRadius: 25,
            overflow: 'hidden',
            height: 242,
          }}>
          <CommonInput
            ref={inputRef}
            value={languageFilter}
            onChangeText={setLanguageFilter}
            onFocus={() => setLanguageFilter('')}
          />
          <FlatList
            data={filteredLanguages || []}
            keyExtractor={item => item}
            ListEmptyComponent={
              <TheText
                style={{textAlign: 'center', color: 'gray', marginTop: 20}}>
                No languages found.
              </TheText>
            }
            renderItem={({item}) => (
              <>
                <VerticalSpace height={4} />
                <CommonButton
                  title={item}
                  onPress={() => handleSelectLanguage(item)}
                  width={'80%'}
                  color={LIGHTGRAY}
                  textColor={BLACK}
                  borderRadius={25}
                  icon={icons.get(item)}
                  iconPosition={'startOut'}
                  justifyContent={'flex-start'}
                />
              </>
            )}
            horizontal={false}
          />
        </View>
      )}
    </View>
  );
};

export default LanguageSelectionSection;
