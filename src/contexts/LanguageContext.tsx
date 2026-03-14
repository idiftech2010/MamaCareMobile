import React, { createContext, useContext, useState, useCallback } from 'react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá', flag: '🇳🇬' },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa', flag: '🇳🇬' },
  { code: 'ig', name: 'Igbo', nativeName: 'Igbo', flag: '🇳🇬' },
  { code: 'zu', name: 'Zulu', nativeName: 'isiZulu', flag: '🇿🇦' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
];

const translations: Record<string, Record<string, string>> = {
  en: {
    home: 'Home',
    assessment: 'Risk Assessment',
    telemedicine: 'Telemedicine',
    education: 'Education',
    wearables: 'Wearables',
    login: 'Sign In',
    logout: 'Logout',
    profile: 'Profile',
  },
  yo: {
    home: 'Ile',
    assessment: 'Iṣiro Ewu',
    telemedicine: 'Telemedicine',
    education: 'Eko',
    wearables: 'Awọn ẹrọ',
    login: 'Wole',
    logout: 'Jade',
    profile: 'Profaili',
  },
};

interface LanguageContextType {
  currentLang: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  languages: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLang] = useState('en');

  const setLanguage = useCallback((lang: string) => {
    setCurrentLang(lang);
  }, []);

  const t = useCallback((key: string): string => {
    const langTranslations = translations[currentLang] || translations['en'];
    return langTranslations[key] || translations['en'][key] || key;
  }, [currentLang]);

  return (
    <LanguageContext.Provider value={{ currentLang, setLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
