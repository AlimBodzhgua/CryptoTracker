import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

//@ts-ignore
import enTranslation from '../../../../public/locales/en/translation.json';
//@ts-ignore
import ruTranslation from '../../../../public/locales/ru/translation.json';

const resources = {
	en: {
		translation: enTranslation,
	},
	ru: {
		translation: ruTranslation,
	},
};

i18n.use(initReactI18next).init({
	resources,
	lng: 'en',
	fallbackLng: 'en',
	debug: false,
	interpolation: {
		escapeValue: false,
	},
	react: {
		useSuspense: false,
	},
});

export default i18n;