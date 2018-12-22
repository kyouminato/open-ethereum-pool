import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
  intl: Ember.inject.service(),

	model: function() {
    var url = config.APP.ApiUrl + 'api/stats';

    var that = this;

    return Ember.$.getJSON(url).then(function (data) {
      var obj = Ember.Object.create(data);

      obj.language = Ember.computed({
        get() {
          var lang = window.localStorage.getItem('lang');

          var supportedLocales = that.get('intl.locales');

          // Is recorded default language supported by the ember-intl?
          // If not, fallback to normal default language
          // Or is it first time to load lang, so it's empty value?
          // If yes, then do the same
          // Use en-us as a default language
          if (lang === null || !supportedLocales.includes(lang)) {
            return 'en-us';
          } else {
            return lang;
          }
        },
        set(key, lang) {
          window.localStorage.setItem('lang', lang);
        }
      });

      return obj;
    });
	},

  afterModel: function(model) {
    this.get('intl').setLocale(model.get('language'));
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    Ember.run.later(this, this.refresh, 5000);
  },

  actions: {
    // This event will be called when model / controller declares that it need to refresh display
    refreshNeeded: function() {
      this.refresh();
    }
  }
});
