import Ember from 'ember';

var fancyLanguageNames = {
  'en-us': 'English (US)',
  'ja-jp': '日本語',
};

export function formatLanguageName(value) {
  // If fancy name was not available, then use its key as its name
  if (typeof fancyLanguageNames[value] === 'undefined') {
    return value;
  }

  return fancyLanguageNames[value];
}

export default Ember.Helper.helper(formatLanguageName);
