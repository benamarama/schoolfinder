import React, { useState } from 'react';
import { User, Calculator, BellRing, ShieldCheck, PhoneCall, ChevronRight, Award, CheckCircle2 } from 'lucide-react';
import { MOCK_SCHOOLS } from '../data/mockProperties';

export const ProfileView: React.FC = () => {
  // Singapore Mortgage Calculator State (MAS TDSR: 55%, MSR: 30%)
  const [monthlyIncome, setMonthlyIncome] = useState(12000);
  const [cashDownpayment, setCashDownpayment] = useState(250000);
  const [loanTenureYears, setLoanTenureYears] = useState(25);
  const [interestRate, setInterestRate] = useState(3.6);
  const [propertyTypeCalc, setPropertyTypeCalc] = useState<'Private' | 'HDB'>('Private');

  // School Alerts Subscriptions
  const [subscribedSchools, setSubscribedSchools] = useState<string[]>([
    'Rosyth School',
    'Nanyang Primary School'
  ]);

  // TDSR calculation (55% of monthly income)
  const maxMonthlyInstalment = propertyTypeCalc === 'HDB' ? monthlyIncome * 0.30 : monthlyIncome * 0.55;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTenureYears * 12;
  const maxBorrowingPower =
    (maxMonthlyInstalment * (1 - Math.pow(1 + monthlyRate, -totalMonths))) / monthlyRate;
  const maxEstimatedPurchasePrice = maxBorrowingPower + cashDownpayment;

  const toggleSchoolAlert = (school: string) => {
    if (subscribedSchools.includes(school)) {
      setSubscribedSchools(subscribedSchools.filter((s) => s !== school));
    } else {
      setSubscribedSchools([...subscribedSchools, school]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#D1D1D1] flex flex-col pt-16 pb-28 max-w-[1200px] mx-auto px-4 text-left">
      {/* Profile Header */}
      <div className="bg-[#141414] rounded-2xl p-5 shadow-2xl border border-white/10 mb-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#1A1A1A] text-[#C8AA74] flex items-center justify-center text-xl font-bold border-2 border-[#A68A56]">
            BT
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="serif text-lg font-bold text-white">Benjamin Tan</h2>
              <span className="bg-[#A68A56]/20 text-[#C8AA74] text-[10px] px-2 py-0.5 rounded-full font-bold border border-[#A68A56]/30 uppercase tracking-wider">
                Verified Investor
              </span>
            </div>
            <p className="text-xs text-white/50">ben.tan@singapore-capital.sg • +65 9876 5432</p>
            <p className="text-[11px] text-[#C8AA74]/80 mt-0.5">Singapore Citizen • First Property Buyer (0% ABSD)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* MAS Affordability Calculator */}
        <div className="bg-[#141414] rounded-2xl p-5 shadow-xl border border-white/10">
          <div className="flex items-center gap-2 mb-4 text-[#A68A56]">
            <Calculator className="w-5 h-5" />
            <h3 className="serif font-bold text-base text-white">MAS Affordability Calculator (TDSR/MSR)</h3>
          </div>

          <div className="space-y-3.5 text-xs text-[#D1D1D1]">
            <div>
              <label className="block font-semibold text-white/70 mb-1 uppercase tracking-wider text-[11px]">
                Property Target Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPropertyTypeCalc('Private')}
                  className={`py-2 rounded-lg font-semibold border transition-all ${
                    propertyTypeCalc === 'Private'
                      ? 'bg-[#A68A56] text-[#0A0A0A] border-[#A68A56] font-bold shadow-md'
                      : 'bg-[#1A1A1A] text-white/60 border-white/10 hover:bg-white/5'
                  }`}
                >
                  Private / Condo (TDSR 55%)
                </button>
                <button
                  type="button"
                  onClick={() => setPropertyTypeCalc('HDB')}
                  className={`py-2 rounded-lg font-semibold border transition-all ${
                    propertyTypeCalc === 'HDB'
                      ? 'bg-[#A68A56] text-[#0A0A0A] border-[#A68A56] font-bold shadow-md'
                      : 'bg-[#1A1A1A] text-white/60 border-white/10 hover:bg-white/5'
                  }`}
                >
                  HDB Flat (MSR 30%)
                </button>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-white/80">Combined Monthly Income</span>
                <span className="font-bold text-[#C8AA74] font-mono">S$ {monthlyIncome.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="4000"
                max="40000"
                step="500"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="w-full accent-[#A68A56] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-white/80">Cash & CPF OA Downpayment</span>
                <span className="font-bold text-[#C8AA74] font-mono">S$ {cashDownpayment.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="50000"
                max="1500000"
                step="25000"
                value={cashDownpayment}
                onChange={(e) => setCashDownpayment(Number(e.target.value))}
                className="w-full accent-[#A68A56] cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="font-semibold text-white/80 block mb-1">Loan Tenure</span>
                <select
                  value={loanTenureYears}
                  onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                  className="w-full p-2 border border-white/10 rounded-lg bg-[#1A1A1A] text-white focus:outline-none focus:border-[#A68A56]"
                >
                  <option value={20} className="bg-[#141414] text-white">20 Years</option>
                  <option value={25} className="bg-[#141414] text-white">25 Years (Standard)</option>
                  <option value={30} className="bg-[#141414] text-white">30 Years (Max)</option>
                </select>
              </div>
              <div>
                <span className="font-semibold text-white/80 block mb-1">Interest Rate</span>
                <select
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full p-2 border border-white/10 rounded-lg bg-[#1A1A1A] text-white focus:outline-none focus:border-[#A68A56]"
                >
                  <option value={2.6} className="bg-[#141414] text-white">2.6% (HDB Concessionary)</option>
                  <option value={3.2} className="bg-[#141414] text-white">3.2% (Fixed Bank)</option>
                  <option value={3.6} className="bg-[#141414] text-white">3.6% (MAS Stress Test)</option>
                  <option value={4.0} className="bg-[#141414] text-white">4.0% (Conservative)</option>
                </select>
              </div>
            </div>

            {/* Calculated Result Box */}
            <div className="mt-4 p-4 bg-[#1A1A1A] rounded-xl border border-white/10">
              <span className="text-[11px] font-bold text-[#C8AA74] uppercase tracking-widest">
                Max Eligible Property Price
              </span>
              <p className="serif text-2xl font-bold text-white mt-0.5">
                S$ {Math.round(maxEstimatedPurchasePrice).toLocaleString()}
              </p>
              <div className="flex justify-between items-center mt-2 text-[11px] text-white/50 pt-2 border-t border-white/10">
                <span>Max Loan: S$ {Math.round(maxBorrowingPower).toLocaleString()}</span>
                <span>Max Monthly: S$ {Math.round(maxMonthlyInstalment).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* School Radius Radar Subscriptions */}
        <div className="bg-[#141414] rounded-2xl p-5 shadow-xl border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3 text-[#A68A56]">
              <BellRing className="w-5 h-5" />
              <h3 className="serif font-bold text-base text-white">Primary School Radius Alerts</h3>
            </div>
            <p className="text-xs text-white/50 mb-3">
              Receive real-time instant alerts when a new listing is published within 1km of your priority target schools:
            </p>

            <div className="space-y-2 text-xs">
              {MOCK_SCHOOLS.map((school) => {
                const isSubscribed = subscribedSchools.includes(school);
                return (
                  <button
                    key={school}
                    onClick={() => toggleSchoolAlert(school)}
                    className={`w-full p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                      isSubscribed
                        ? 'bg-[#1A1A1A] border-[#A68A56] text-white font-semibold shadow-sm'
                        : 'bg-[#141414] border-white/10 text-white/50 hover:text-white/80'
                    }`}
                  >
                    <span>{school}</span>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                        isSubscribed ? 'bg-[#A68A56] text-[#0A0A0A]' : 'border border-white/20'
                      }`}
                    >
                      {isSubscribed && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 p-3 bg-[#1A1A1A] rounded-xl border border-white/10 text-[11px] text-white/50 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#A68A56] shrink-0" />
            <span>MOE distance calculations based on SLA OneMap cadastral boundary guidelines.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
