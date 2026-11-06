import React, { useEffect, useState, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { QrCode, Upload, X, Check, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess?: (batchId: string) => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({
  isOpen,
  onClose,
  onScanSuccess
}) => {
  const navigate = useNavigate();
  const [manualId, setManualId] = useState('');
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  const sampleBatches = [
    'FF-2026-000101',
    'FF-2026-000102',
    'FF-2026-000103',
    'FF-2026-000104',
    'FF-2026-000105'
  ];

  const handleDetected = (scannedText: string) => {
    let cleanId = scannedText.trim();
    if (cleanId.includes('/trace/')) {
      cleanId = cleanId.split('/trace/').pop() || cleanId;
    }
    if (onScanSuccess) {
      onScanSuccess(cleanId);
    } else {
      navigate(`/trace/${cleanId}`);
    }
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;

    // Small delay to ensure modal DOM is mounted
    const timer = setTimeout(() => {
      try {
        if (!scannerRef.current && document.getElementById('qr-reader')) {
          const scanner = new Html5QrcodeScanner(
            'qr-reader',
            { fps: 10, qrbox: { width: 220, height: 220 } },
            false
          );
          scanner.render(
            (decodedText) => {
              handleDetected(decodedText);
              try { scanner.clear(); } catch { /* ignore */ }
            },
            () => { /* silent scan error */ }
          );
          scannerRef.current = scanner;
        }
      } catch (err) {
        console.error('QR scanner initialization failed', err);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      if (scannerRef.current) {
        try {
          scannerRef.current.clear();
        } catch { /* ignore */ }
        scannerRef.current = null;
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl relative space-y-5 animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
            <QrCode className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
              Scan Batch QR Code
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Point camera at FarmFlow QR sticker or enter Batch ID manually
            </p>
          </div>
        </div>

        {/* Camera Container */}
        <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-2 border border-slate-200 dark:border-slate-700 min-h-[240px] flex flex-col items-center justify-center overflow-hidden">
          <div id="qr-reader" className="w-full"></div>
        </div>

        {/* Quick Demo Pickers */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Or Click a Demo Batch ID to Preview:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {sampleBatches.map(id => (
              <button
                key={id}
                onClick={() => handleDetected(id)}
                className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200 transition-colors"
              >
                {id}
              </button>
            ))}
          </div>
        </div>

        {/* Manual ID Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (manualId.trim()) handleDetected(manualId);
          }}
          className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-800"
        >
          <input
            type="text"
            value={manualId}
            onChange={(e) => setManualId(e.target.value)}
            placeholder="Type Batch ID (e.g. FF-2026-000101)"
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-slate-800"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-semibold flex items-center gap-1 shrink-0"
          >
            <span>Trace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
