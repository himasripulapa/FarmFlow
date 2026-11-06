import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { useTranslation } from 'react-i18next';

interface VoiceInputButtonProps {
  onResult: (text: string) => void;
  className?: string;
}

export const VoiceInputButton: React.FC<VoiceInputButtonProps> = ({ onResult, className = '' }) => {
  const { t } = useTranslation();
  const { isListening, startListening, stopListening, isSupported } = useSpeechRecognition((text) => {
    if (text) onResult(text);
  });

  const handleClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title={isSupported ? t('common.voiceInput') : 'Voice input not supported on this browser'}
      className={`relative p-2.5 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
        isListening
          ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-200'
          : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300'
      } ${className}`}
    >
      {isListening ? (
        <MicOff className="w-5 h-5" />
      ) : (
        <Mic className="w-5 h-5" />
      )}
      {isListening && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
        </span>
      )}
    </button>
  );
};
