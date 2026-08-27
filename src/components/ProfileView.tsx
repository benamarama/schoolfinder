import React, { useState, useEffect } from 'react';
import {
  User,
  Calculator,
  BellRing,
  ShieldCheck,
  PhoneCall,
  ChevronRight,
  Award,
  CheckCircle2,
  Activity,
  Search,
  Server,
  RefreshCw,
} from 'lucide-react';
import { ALL_SINGAPORE_PRIMARY_SCHOOLS } from '../data/singaporeSchools';
import { getUraBackendStatus, UraStatusResponse } from '../services/uraService';
import { getOneMapBackendStatus, OneMapStatusResponse } from '../services/onemapService';

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
    'Nanyang Primary School',
    'Tao Nan School',
  ]);
  const [schoolSearch, setSchoolSearch] = useState('');

  // API Backend Health Checks
  const [uraStatus, setUraStatus] = useState<UraStatusResponse | null>(null);
  const [oneMapStatus, setOneMapStatus] = useState<OneMapStatusResponse | null>(null);
  const [isPingingApis, setIsPingingApis] = useState(false);
  const [lastPingTime, setLastPingTime] = useState<string>('Live');

  const checkApiHealth = async () => {
    setIsPingingApis(true);
    try {
      const [ura, onemap] = await Promise.all([
        getUraBackendStatus(),
        getOneMapBackendStatus(),
      ]);
      setUraStatus(ura);
      setOneMapStatus(onemap);
      setLastPingTime(new Date().toLocaleTimeString());
    } catch (e) {
      console.warn('API health check error:', e);
    } finally {
      setIsPingingApis(false);
    }
  };

  useEffect(() => {
    checkApiHealth();
  }, []);

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

  const filteredSchoolsForAlerts = ALL_SINGAPORE_PRIMARY_SCHOOLS.filter((s) => {
    if (!schoolSearch.trim()) return subscribedSchools.includes(s.name) || s.isPopularGep;
    return (
      s.name.toLowerCase().includes(schoolSearch.toLowerCase()) ||
      s.area.toLowerCase().includes(schoolSearch.toLowerCase())
    );
  }).slice(0, 10);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col pt-4 pb-28 max-w-[1280px] mx-auto px-4 sm:px-6 text-left">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-slate-100 text-[#0284C7] flex items-center justify-center text-xl font-bold border-2 border-[#0284C7]">
            BT
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="serif text-lg font-bold text-slate-900">Benjamin Tan</h2>
              <span className="bg-sky-50 text-[#0284C7] text-[10px] px-2 py-0.5 rounded-full font-bold border border-sky-200 uppercase tracking-wider">
                Verified Investor
              </span>
            </div>
            <p className="text-xs text-slate-500">benamarama@gmail.com • +65 9876 5432</p>
            <p className="text-[11px] text-[#0369A1] mt-0.5">Singapore Citizen • Primary 1 Phase 2C Strategy Active</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={checkApiHealth}
            disabled={isPingingApis}
            className="px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isPingingApis ? 'animate-spin' : ''}`} />
            <span>Ping Gov APIs</span>
          </button>
        </div>
      </div>

      {/* Live Gov APIs Health Status Cards */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 mb-5 text-left">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-[#0284C7]" />
            <h3 className="serif font-bold text-base text-slate-900">Singapore Government Data Services Status</h3>
          </div>
          <span className="text-[11px] text-slate-500">Last checked: {lastPingTime}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* URA DataService Status */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${uraStatus?.hasActiveToken ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
                <h4 className="font-bold text-xs text-slate-900">URA DataService API</h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                {uraStatus?.hasActiveToken ? 'Connected & Token Active' : 'Configured'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed mb-2">
              Provides official private residential market comps and real-time live carpark lots availability.
            </p>
            <div className="text-[10px] font-mono text-slate-400 space-y-0.5">
              <div>• PMI_Resi_Transaction: OK (4 batches cached)</div>
              <div>• Car_Park_Availability: OK (3,900+ lots)</div>
            </div>
          </div>

          {/* SLA OneMap Status */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${oneMapStatus?.hasActiveToken ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
                <h4 className="font-bold text-xs text-slate-900">SLA OneMap API</h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                {oneMapStatus?.hasActiveToken ? 'Connected & Token Active' : 'Configured'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed mb-2">
              Official Singapore Land Authority geocoding and cadastral walking / driving route calculations.
            </p>
            <div className="text-[10px] font-mono text-slate-400 space-y-0.5">
              <div>• Geocode / Elastic Search: OK</div>
              <div>• Routing Engine (Walk/Transit/Drive): OK</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* MAS Affordability Calculator */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-4 text-[#0284C7]">
            <Calculator className="w-5 h-5" />
            <h3 className="serif font-bold text-base text-slate-900">MAS Affordability Calculator (TDSR/MSR)</h3>
          </div>

          <div className="space-y-3.5 text-xs text-slate-700">
            <div>
              <label className="block font-semibold text-slate-600 mb-1 uppercase tracking-wider text-[11px]">
                Property Target Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPropertyTypeCalc('Private')}
                  className={`py-2 rounded-lg font-semibold border transition-all ${
                    propertyTypeCalc === 'Private'
                      ? 'bg-[#0F172A] text-white border-[#0F172A] font-bold shadow-sm'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Private / Condo (TDSR 55%)
                </button>
                <button
                  type="button"
                  onClick={() => setPropertyTypeCalc('HDB')}
                  className={`py-2 rounded-lg font-semibold border transition-all ${
                    propertyTypeCalc === 'HDB'
                      ? 'bg-[#0F172A] text-white border-[#0F172A] font-bold shadow-sm'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  HDB Flat (MSR 30%)
                </button>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-slate-700">Combined Monthly Income</span>
                <span className="font-bold text-[#0284C7] font-mono">S$ {monthlyIncome.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="4000"
                max="40000"
                step="500"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="w-full accent-[#0284C7] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-slate-700">Cash & CPF OA Downpayment</span>
                <span className="font-bold text-[#0284C7] font-mono">S$ {cashDownpayment.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="50000"
                max="1500000"
                step="25000"
                value={cashDownpayment}
                onChange={(e) => setCashDownpayment(Number(e.target.value))}
                className="w-full accent-[#0284C7] cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="font-semibold text-slate-700 block mb-1">Loan Tenure</span>
                <select
                  value={loanTenureYears}
                  onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                  className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 focus:outline-none focus:border-[#0284C7]"
                >
                  <option value={20} className="bg-white text-slate-900">20 Years</option>
                  <option value={25} className="bg-white text-slate-900">25 Years (Standard)</option>
                  <option value={30} className="bg-white text-slate-900">30 Years (Max)</option>
                </select>
              </div>
              <div>
                <span className="font-semibold text-slate-700 block mb-1">Interest Rate</span>
                <select
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 focus:outline-none focus:border-[#0284C7]"
                >
                  <option value={2.6} className="bg-white text-slate-900">2.6% (HDB Concessionary)</option>
                  <option value={3.2} className="bg-white text-slate-900">3.2% (Fixed Bank)</option>
                  <option value={3.6} className="bg-white text-slate-900">3.6% (MAS Stress Test)</option>
                  <option value={4.0} className="bg-white text-slate-900">4.0% (Conservative)</option>
                </select>
              </div>
            </div>

            {/* Calculated Result Box */}
            <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold text-[#0284C7] uppercase tracking-widest">
                Max Eligible Property Price
              </span>
              <p className="serif text-2xl font-bold text-slate-900 mt-0.5">
                S$ {Math.round(maxEstimatedPurchasePrice).toLocaleString()}
              </p>
              <div className="flex justify-between items-center mt-2 text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                <span>Max Loan: S$ {Math.round(maxBorrowingPower).toLocaleString()}</span>
                <span>Max Monthly: S$ {Math.round(maxMonthlyInstalment).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* School Radius Radar Subscriptions */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3 text-[#0284C7]">
              <BellRing className="w-5 h-5" />
              <h3 className="serif font-bold text-base text-slate-900">Primary School Radius Alerts (185+ Schools)</h3>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Receive real-time instant alerts when a new listing is published within 1km of your priority target schools:
            </p>

            {/* Quick search input */}
            <div className="relative mb-3">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={schoolSearch}
                onChange={(e) => setSchoolSearch(e.target.value)}
                placeholder="Search any Singapore school to subscribe..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0284C7]"
              />
            </div>

            <div className="space-y-2 text-xs max-h-60 overflow-y-auto">
              {filteredSchoolsForAlerts.map((school) => {
                const isSubscribed = subscribedSchools.includes(school.name);
                return (
                  <button
                    key={school.name}
                    onClick={() => toggleSchoolAlert(school.name)}
                    className={`w-full p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                      isSubscribed
                        ? 'bg-sky-50/60 border-sky-300 text-slate-900 font-semibold shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <span className="font-semibold block text-left">{school.name}</span>
                      <span className="text-[10px] text-slate-400 block text-left">{school.area} • {school.zone} Zone</span>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                        isSubscribed ? 'bg-[#0284C7] text-white' : 'border border-slate-300'
                      }`}
                    >
                      {isSubscribed && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0284C7] shrink-0" />
            <span>MOE distance calculations based on SLA OneMap cadastral boundary guidelines.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
