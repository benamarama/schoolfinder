import React, { useState } from 'react';
import { AgentInfo, Property } from '../types';
import { X, Send, Phone, MessageSquare, CheckCircle, Calendar, ShieldCheck, Award } from 'lucide-react';

interface ContactAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent: AgentInfo;
  property: Property;
}

export const ContactAgentModal: React.FC<ContactAgentModalProps> = ({
  isOpen,
  onClose,
  agent,
  property,
}) => {
  const [activeTab, setActiveTab] = useState<'message' | 'viewing'>('message');
  const [message, setMessage] = useState(
    `Hi ${agent.name}, I am interested in ${property.title} (${property.subtitle}) listed at S$ ${property.price.toLocaleString()}. Could you share more details or arrange a viewing?`
  );
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('14:00');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const quickPrompts = [
    'Schedule Physical Viewing',
    'Verify Primary School 1km Eligibility',
    'Request Past 12-Month Floor Transactions',
    'Enquire on Bank Valuation & Loan Eligibility',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        id="contact-agent-dialog"
        className="bg-[#141414] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-white/10 max-h-[90vh] flex flex-col text-left"
      >
        {/* Modal Header */}
        <div className="p-4 bg-[#0A0A0A] text-white flex justify-between items-center border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#A68A56] shrink-0">
              <img
                src={agent.avatar}
                alt={agent.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="serif font-bold text-base text-white">{agent.name}</h3>
                <span className="bg-[#A68A56]/20 border border-[#A68A56]/40 text-[#C8AA74] text-[10px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider">
                  Lead Agent
                </span>
              </div>
              <p className="text-xs text-[#C8AA74]">{agent.agency}</p>
              <div className="flex items-center gap-2 text-[11px] text-white/50 mt-0.5">
                <span className="flex items-center gap-0.5 text-amber-400 font-semibold">★ {agent.rating}</span>
                <span>•</span>
                <span>{agent.dealsClosed} deals closed in district</span>
              </div>
            </div>
          </div>
          <button
            id="close-contact-modal"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 text-left text-[#D1D1D1]">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#A68A56]/15 border border-[#A68A56]/30 rounded-full flex items-center justify-center mx-auto mb-4 text-[#C8AA74]">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="serif text-xl font-bold text-white mb-2">Enquiry Dispatched</h4>
              <p className="text-sm text-white/70 max-w-sm mx-auto mb-6">
                Thank you, <strong className="text-white">{senderName || 'Valued Buyer'}</strong>. {agent.name} has received your priority enquiry for <strong className="text-white">{property.title}</strong> and will connect via WhatsApp/Call shortly.
              </p>
              <div className="bg-[#1A1A1A] rounded-xl p-4 text-xs text-white/80 mb-6 text-left flex items-start gap-2 border border-white/10">
                <ShieldCheck className="w-5 h-5 text-[#A68A56] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">CEA Verified Direct Representative</p>
                  <p className="mt-0.5 text-white/60">CEA Reg: {agent.ceaRegNo || 'R048291A'}. All consultations comply with Singapore Council for Estate Agencies privacy standards.</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="w-full py-3 bg-[#A68A56] hover:bg-[#C8AA74] text-[#0A0A0A] rounded-xl font-bold uppercase tracking-wider text-xs transition-colors shadow-lg"
              >
                Back to Property Details
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Property summary banner */}
              <div className="bg-[#1A1A1A] p-3 rounded-xl flex items-center justify-between text-xs border border-white/10">
                <div>
                  <span className="font-bold text-white">{property.title}</span>
                  <p className="text-white/50">{property.subtitle}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[#C8AA74] text-sm">S$ {property.price.toLocaleString()}</span>
                  <p className="text-white/50 font-mono">S$ {property.psf} PSF</p>
                </div>
              </div>

              {/* Action Type Selector */}
              <div className="grid grid-cols-2 gap-2 bg-[#0A0A0A] p-1 rounded-xl text-xs border border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveTab('message')}
                  className={`py-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    activeTab === 'message'
                      ? 'bg-[#A68A56] text-[#0A0A0A] font-bold shadow-md'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <MessageSquare className={`w-3.5 h-3.5 ${activeTab === 'message' ? 'text-[#0A0A0A]' : 'text-[#A68A56]'}`} />
                  Direct Enquiry
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('viewing')}
                  className={`py-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    activeTab === 'viewing'
                      ? 'bg-[#A68A56] text-[#0A0A0A] font-bold shadow-md'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Calendar className={`w-3.5 h-3.5 ${activeTab === 'viewing' ? 'text-[#0A0A0A]' : 'text-[#A68A56]'}`} />
                  Book Viewing Slot
                </button>
              </div>

              {/* Quick Prompt Chips */}
              {activeTab === 'message' && (
                <div>
                  <p className="text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider text-[11px]">Suggested Inquiries:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {quickPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => setMessage(`Hi ${agent.name}, I would like to ${prompt.toLowerCase()} for ${property.title}.`)}
                        className="text-[11px] bg-[#1A1A1A] border border-white/10 hover:border-[#A68A56] hover:bg-[#252525] text-white/80 hover:text-white px-2.5 py-1 rounded-full transition-colors text-left"
                      >
                        + {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Schedule Viewing Fields */}
              {activeTab === 'viewing' && (
                <div className="grid grid-cols-2 gap-3 bg-[#1A1A1A] p-3 rounded-xl border border-white/10">
                  <div>
                    <label className="block text-xs font-semibold text-white mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required={activeTab === 'viewing'}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-white/10 bg-[#0A0A0A] text-white focus:outline-none focus:border-[#A68A56]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white mb-1">
                      Preferred Time
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-white/10 bg-[#0A0A0A] text-white focus:outline-none focus:border-[#A68A56]"
                    >
                      <option value="10:00" className="bg-[#0A0A0A] text-white">10:00 AM (Morning Slot)</option>
                      <option value="14:00" className="bg-[#0A0A0A] text-white">2:00 PM (Afternoon Slot)</option>
                      <option value="16:30" className="bg-[#0A0A0A] text-white">4:30 PM (Golden Hour Slot)</option>
                      <option value="19:00" className="bg-[#0A0A0A] text-white">7:00 PM (Evening Slot)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Message text area */}
              <div>
                <label className="block text-xs font-semibold text-white mb-1 uppercase tracking-wider text-[11px]">
                  Message / Special Requirements
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-white/10 bg-[#1A1A1A] text-white focus:outline-none focus:border-[#A68A56] resize-none"
                  placeholder="Ask about floor plan, unit orientation, school balloting chances..."
                />
              </div>

              {/* Contact info inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-white mb-1 uppercase tracking-wider text-[11px]">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Benjamin Tan"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-white/10 bg-[#1A1A1A] text-white focus:outline-none focus:border-[#A68A56]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white mb-1 uppercase tracking-wider text-[11px]">
                    Mobile Number (WhatsApp)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+65 9123 4567"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-white/10 bg-[#1A1A1A] text-white focus:outline-none focus:border-[#A68A56]"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  id="submit-agent-enquiry"
                  type="submit"
                  className="w-full py-3 bg-[#A68A56] hover:bg-[#C8AA74] text-[#0A0A0A] rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.99]"
                >
                  <Send className="w-4 h-4 text-[#0A0A0A]" />
                  {activeTab === 'viewing' ? 'Confirm Viewing Appointment' : 'Send Enquiry to Marcus'}
                </button>
              </div>

              {/* Direct call fallback */}
              <div className="flex items-center justify-center gap-2 text-xs text-white/50 pt-1">
                <span>Or direct phone call:</span>
                <a
                  href={`tel:${agent.phone}`}
                  className="font-bold text-[#C8AA74] hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" /> {agent.phone}
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
