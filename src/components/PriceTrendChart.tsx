import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { HistoricalDataPoint } from '../types';
import { TrendingUp, BarChart3, DollarSign } from 'lucide-react';

interface PriceTrendChartProps {
  data: HistoricalDataPoint[];
}

export const PriceTrendChart: React.FC<PriceTrendChartProps> = ({ data }) => {
  const [metric, setMetric] = useState<'psf' | 'volume' | 'avgRent'>('psf');
  const [timeframe, setTimeframe] = useState<'5Y' | '3Y' | 'All'>('5Y');

  const filteredData = timeframe === '3Y' ? data.slice(-3) : data;

  const currentPsf = data[data.length - 1]?.psf || 0;
  const startPsf = data[0]?.psf || 0;
  const growthRate = startPsf ? (((currentPsf - startPsf) / startPsf) * 100).toFixed(1) : '0';

  return (
    <div id="historical-price-trend-card" className="bg-white rounded-2xl p-5 mb-4 border border-slate-200 shadow-sm text-left">
      <div className="flex justify-between items-center mb-3.5">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#0284C7]" />
            <h3 className="font-serif font-semibold text-slate-900 text-base md:text-lg">Historical Price Trend</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            5-Year Capital Appreciation: <span className="text-emerald-600 font-bold font-mono">+{growthRate}%</span>
          </p>
        </div>
        
        {/* Timeframe pill selector */}
        <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200 text-xs">
          <button
            id="timeframe-5y-btn"
            onClick={() => setTimeframe('5Y')}
            className={`px-2.5 py-1 rounded-md transition-all font-medium ${
              timeframe === '5Y' ? 'bg-[#0F172A] text-white font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            5 Years
          </button>
          <button
            id="timeframe-3y-btn"
            onClick={() => setTimeframe('3Y')}
            className={`px-2.5 py-1 rounded-md transition-all font-medium ${
              timeframe === '3Y' ? 'bg-[#0F172A] text-white font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3 Years
          </button>
        </div>
      </div>

      {/* Metric Switcher tabs */}
      <div className="flex gap-2 mb-3.5">
        <button
          id="metric-psf-tab"
          onClick={() => setMetric('psf')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
            metric === 'psf'
              ? 'bg-[#0F172A] text-white shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          Price (PSF)
        </button>
        <button
          id="metric-volume-tab"
          onClick={() => setMetric('volume')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
            metric === 'volume'
              ? 'bg-[#0F172A] text-white shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          Transactions Volume
        </button>
      </div>

      {/* Chart Canvas */}
      <div className="h-[210px] w-full bg-slate-50/70 rounded-xl p-2.5 border border-slate-200">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPsf" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0284C7" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#0284C7" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0, 0, 0, 0.06)" />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 11, fill: '#64748B' }}
              axisLine={{ stroke: '#CBD5E1' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#64748B' }}
              axisLine={false}
              tickLine={false}
              domain={metric === 'psf' ? ['dataMin - 100', 'dataMax + 100'] : ['auto', 'auto']}
              tickFormatter={(val) => (metric === 'psf' ? `$${val}` : `${val}`)}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const dataPoint = payload[0].payload as HistoricalDataPoint;
                  return (
                    <div className="bg-white text-slate-800 p-3 rounded-xl shadow-xl text-xs border border-slate-200">
                      <p className="font-serif font-bold text-[#0284C7]">{label}</p>
                      <p className="mt-1 text-slate-600">
                        Avg PSF: <span className="font-semibold text-slate-900 font-mono">S$ {dataPoint.psf.toLocaleString()}</span>
                      </p>
                      <p className="text-slate-600">
                        Volume: <span className="font-semibold text-slate-900">{dataPoint.volume} units</span>
                      </p>
                      {dataPoint.avgRent && (
                        <p className="text-slate-500">
                          Est. Rent: <span className="text-slate-800 font-mono">S$ {dataPoint.avgRent.toLocaleString()}/mo</span>
                        </p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            {metric === 'psf' ? (
              <Area
                type="monotone"
                dataKey="psf"
                stroke="#0284C7"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorPsf)"
                dot={{ r: 3.5, fill: '#0284C7', strokeWidth: 1.5, stroke: '#FFFFFF' }}
                activeDot={{ r: 6, fill: '#0369A1', stroke: '#FFFFFF', strokeWidth: 2 }}
              />
            ) : (
              <Area
                type="monotone"
                dataKey="volume"
                stroke="#6366F1"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorVolume)"
                dot={{ r: 3.5, fill: '#6366F1', strokeWidth: 1.5, stroke: '#FFFFFF' }}
                activeDot={{ r: 6, fill: '#4F46E5', stroke: '#FFFFFF', strokeWidth: 2 }}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between mt-2.5 px-1 text-[11px] text-slate-400">
        <span>Source: URA & HDB Real-Time Transaction Gateway</span>
        <span className="font-semibold text-[#0284C7] uppercase tracking-wider text-[10px]">Institutional Tier Data</span>
      </div>
    </div>
  );
};
