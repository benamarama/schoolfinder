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
    <div id="historical-price-trend-card" className="bg-[#141414] rounded-2xl p-5 mb-4 border border-white/10 shadow-xl text-left">
      <div className="flex justify-between items-center mb-3.5">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#A68A56]" />
            <h3 className="font-serif font-semibold text-white text-base md:text-lg">Historical Price Trend</h3>
          </div>
          <p className="text-xs text-white/50 mt-0.5">
            5-Year Capital Appreciation: <span className="text-emerald-400 font-bold font-mono">+{growthRate}%</span>
          </p>
        </div>
        
        {/* Timeframe pill selector */}
        <div className="flex items-center bg-[#1A1A1A] rounded-lg p-0.5 border border-white/10 text-xs">
          <button
            id="timeframe-5y-btn"
            onClick={() => setTimeframe('5Y')}
            className={`px-2.5 py-1 rounded-md transition-all font-medium ${
              timeframe === '5Y' ? 'bg-[#A68A56] text-[#0A0A0A] font-bold shadow-sm' : 'text-white/60 hover:text-white'
            }`}
          >
            5 Years
          </button>
          <button
            id="timeframe-3y-btn"
            onClick={() => setTimeframe('3Y')}
            className={`px-2.5 py-1 rounded-md transition-all font-medium ${
              timeframe === '3Y' ? 'bg-[#A68A56] text-[#0A0A0A] font-bold shadow-sm' : 'text-white/60 hover:text-white'
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
              ? 'bg-[#A68A56] text-[#0A0A0A] shadow-md'
              : 'bg-[#1E1E1E] text-white/70 hover:bg-[#252525] border border-white/10'
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
              ? 'bg-[#A68A56] text-[#0A0A0A] shadow-md'
              : 'bg-[#1E1E1E] text-white/70 hover:bg-[#252525] border border-white/10'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          Transactions Volume
        </button>
      </div>

      {/* Chart Canvas */}
      <div className="h-[210px] w-full bg-[#0A0A0A]/80 rounded-xl p-2.5 border border-white/10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPsf" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#A68A56" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#A68A56" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C8AA74" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#C8AA74" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.06)" />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 11, fill: 'rgba(255, 255, 255, 0.5)' }}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: 'rgba(255, 255, 255, 0.5)' }}
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
                    <div className="bg-[#161616] text-white p-3 rounded-xl shadow-2xl text-xs border border-[#A68A56]/40 backdrop-blur-xl">
                      <p className="font-serif font-bold text-[#C8AA74]">{label}</p>
                      <p className="mt-1 text-white/80">
                        Avg PSF: <span className="font-semibold text-white font-mono">S$ {dataPoint.psf.toLocaleString()}</span>
                      </p>
                      <p className="text-white/80">
                        Volume: <span className="font-semibold text-white">{dataPoint.volume} units</span>
                      </p>
                      {dataPoint.avgRent && (
                        <p className="text-white/60">
                          Est. Rent: <span className="text-white font-mono">S$ {dataPoint.avgRent.toLocaleString()}/mo</span>
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
                stroke="#A68A56"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorPsf)"
                dot={{ r: 3.5, fill: '#A68A56', strokeWidth: 1.5, stroke: '#0A0A0A' }}
                activeDot={{ r: 6, fill: '#C8AA74', stroke: '#0A0A0A', strokeWidth: 2 }}
              />
            ) : (
              <Area
                type="monotone"
                dataKey="volume"
                stroke="#C8AA74"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorVolume)"
                dot={{ r: 3.5, fill: '#C8AA74', strokeWidth: 1.5, stroke: '#0A0A0A' }}
                activeDot={{ r: 6, fill: '#A68A56', stroke: '#0A0A0A', strokeWidth: 2 }}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between mt-2.5 px-1 text-[11px] text-white/40">
        <span>Source: URA & HDB Real-Time Transaction Gateway</span>
        <span className="font-semibold text-[#C8AA74] uppercase tracking-wider text-[10px]">Institutional Tier Data</span>
      </div>
    </div>
  );
};
