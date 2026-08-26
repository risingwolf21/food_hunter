import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationDE from '@/translation/translation.de.json';
import translationEN from '@/translation/translation.en.json';

const resources = {
    enGB: {
        translation: translationEN,
    },
    de: {
        translation: translationDE,
    },
};


i18n
    .use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'de'
    });