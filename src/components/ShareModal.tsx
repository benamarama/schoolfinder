import React, { useState } from 'react';
import { X, Copy, Check, Share2, MessageCircle, Mail } from 'lucide-react';
import { Property } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  property,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Check out ${property.title} in ${property.subtitle} on PropRadius: S$ ${property.price.toLocaleString()} (S$ ${property.psf} PSF). ${shareUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Property Listing: ${property.title}`);
    const body = encodeURIComponent(
      `Take a look at this property listing:\n\n${property.title} - ${property.subtitle}\nPrice: S$ ${property.price.toLocaleString()} (${property.psf} PSF)\nBedrooms: ${property.bedrooms} Bed | ${property.bathrooms} Bath | ${property.sqft} sqft\n\nLink: ${shareUrl}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 text-left">
        <div className="p-4 bg-slate-50 text-slate-900 flex justify-between items-center border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#0284C7]" />
            <h3 className="serif font-bold text-base text-slate-900">Share Property</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 text-left space-y-4 text-slate-700">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <img
              src={property.image}
              alt={property.title}
              className="w-14 h-14 rounded-lg object-cover"
              referrerPolicy="no-referrer"
            />
            <div>
              <h4 className="font-semibold text-sm text-slate-900">{property.title}</h4>
              <p className="text-xs text-slate-500">{property.subtitle}</p>
              <p className="text-xs font-bold text-[#0284C7] mt-0.5 font-mono">S$ {property.price.toLocaleString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleWhatsApp}
              className="py-3 px-4 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </button>
            <button
              onClick={handleEmail}
              className="py-3 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <Mail className="w-4 h-4 text-[#0284C7]" />
              Email Link
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider text-[11px]">Direct Listing URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 truncate focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="px-4 bg-[#0F172A] hover:bg-slate-800 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors uppercase tracking-wider shadow-sm"
              >
                {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
