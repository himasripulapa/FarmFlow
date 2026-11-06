import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSpeechSynthesis } from '../../hooks/useSpeechSynthesis';
import { useTranslation } from 'react-i18next';

interface SpeechSynthButtonProps {
  textToRead: string;
  label?: string;
  className?: string;
}

export const SpeechSynthButton: React.FC<SpeechSynthButtonProps> = ({
  textToRead,
  label,
  className = ''
}) => {
  const { t } = useTranslation();
  const { isSpeaking, speak, stop, isSupported } = useSpeechSynthesis();

  if (!isSupported) return null;

  const handleToggle = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(textToRead);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
        isSpeaking
          ? 'bg-amber-500 text-white animate-pulse shadow-md'
          : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 dark:bg-amber-950 dark:text-amber-200'
      } ${className}`}
    >
      {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-600" />}
      <span>{label || t('common.voiceRead')}</span>
    </button>
  );
};
