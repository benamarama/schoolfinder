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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#141414] rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-white/10 text-left">
        <div className="p-4 bg-[#0A0A0A] text-white flex justify-between items-center border-b border-white/10">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#A68A56]" />
            <h3 className="serif font-bold text-base text-white">Share Property</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 text-left space-y-4 text-[#D1D1D1]">
          <div className="flex items-center gap-3 p-3 bg-[#1A1A1A] rounded-xl border border-white/10">
            <img
              src={property.image}
              alt={property.title}
              className="w-14 h-14 rounded-lg object-cover"
              referrerPolicy="no-referrer"
            />
            <div>
              <h4 className="font-semibold text-sm text-white">{property.title}</h4>
              <p className="text-xs text-white/50">{property.subtitle}</p>
              <p className="text-xs font-bold text-[#C8AA74] mt-0.5 font-mono">S$ {property.price.toLocaleString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleWhatsApp}
              className="py-3 px-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </button>
            <button
              onClick={handleEmail}
              className="py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Mail className="w-4 h-4 text-[#A68A56]" />
              Email Link
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wider text-[11px]">Direct Listing URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="w-full text-xs p-2.5 rounded-lg border border-white/10 bg-[#1A1A1A] text-white/70 truncate focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="px-4 bg-[#A68A56] hover:bg-[#C8AA74] text-[#0A0A0A] rounded-lg font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors uppercase tracking-wider shadow-md"
              >
                {copied ? <Check className="w-4 h-4 text-[#0A0A0A]" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
