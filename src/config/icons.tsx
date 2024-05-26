import React from 'react';
import UKIcon from '../components/svg/uk';
import UkraineIcon from '../components/svg/ukrane';
import GermanyIcon from '../components/svg/germany';

export const languageIcons = new Map<string, JSX.Element>([
  ['English', <UKIcon />],
  ['Spanish', <UkraineIcon />],
  ['French', <GermanyIcon />],
  ['German', <GermanyIcon />],
  ['Italian', <UkraineIcon />],
  ['Japanese', <UKIcon />],
  ['Chinese', <UKIcon />],
  ['Turkish', <UkraineIcon />],
  ['Swedish', <GermanyIcon />],
  ['Russian', <GermanyIcon />],
  ['Portuguese', <UkraineIcon />],
  ['Polish', <UKIcon />],
  ['Norwegian', <UKIcon />],
  ['Korean', <UkraineIcon />],
  ['Hindi', <GermanyIcon />],
  ['Greek', <GermanyIcon />],
  ['Finnish', <UkraineIcon />],
]);
