import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const langLocaleMap: Record<string, string> = {
  en: 'en-IN',
  te: 'te-IN',
  hi: 'hi-IN',
  ta: 'ta-IN',
  ml: 'ml-IN'
};

export function useSpeechSynthesis() {
  const { i18n } = useTranslation();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const speak = useCallback((text: string) => {
    if (!isSupported) return;

    window.speechSynthesis.cancel(); // Stop ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langLocaleMap[i18n.language] || 'en-IN';
    utterance.rate = 0.9; // Slightly slower for clarity

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [isSupported, i18n.language]);

  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isSupported]);

  return { isSpeaking, speak, stop, isSupported };
}
