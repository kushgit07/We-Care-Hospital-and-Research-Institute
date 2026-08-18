import React, { useState, useMemo } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Cell, 
  ReferenceLine 
} from 'recharts';
import { 
  Clock, 
  Flame, 
  Leaf, 
  Zap, 
  Calendar, 
  Info, 
  TrendingDown, 
  Sparkles,
  BarChart3,
  LineChart as LineChartIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Doctor } from '../types/hospital';

interface DoctorPeakHoursChartProps {
  doctor: Doctor;
  onSelectSlotToBook?: (day: string, time: string) => void;
}

export interface HourSlotData {
  hour: string;
  fullTime: string;
  demand: number; // 0 - 100%
  avgWaitMins: number;
  status: 'Quiet' | 'Moderate' | 'Peak';
  statusColor: string;
  isOpdActive: boolean;
  recommendation: string;
}

export interface DayTrafficSummary {
  day: string;
  fullDay: string;
  avgDemand: number;
  isOpdDay: boolean;
  busiestWindow: string;
  quietestWindow: string;
  status: 'Quiet' | 'Moderate' | 'Peak';
}

const ALL_DAYS = [
  { short: 'Mon', full: 'Monday' },
  { short: 'Tue', full: 'Tuesday' },
  { short: 'Wed', full: 'Wednesday' },
  { short: 'Thu', full: 'Thursday' },
  { short: 'Fri', full: 'Friday' },
  { short: 'Sat', full: 'Saturday' }
];

const TIME_HOURS = [
  { label: '8 AM', full: '08:00 AM - 09:00 AM', base: 45 },
  { label: '9 AM', full: '09:00 AM - 10:00 AM', base: 88 },
  { label: '10 AM', full: '10:00 AM - 11:00 AM', base: 92 },
  { label: '11 AM', full: '11:00 AM - 12:00 PM', base: 78 },
  { label: '12 PM', full: '12:00 PM - 01:00 PM', base: 55 },
  { label: '1 PM', full: '01:00 PM - 02:00 PM', base: 35 },
  { label: '2 PM', full: '02:00 PM - 03:00 PM', base: 28 },
  { label: '3 PM', full: '03:00 PM - 04:00 PM', base: 38 },
  { label: '4 PM', full: '04:00 PM - 05:00 PM', base: 64 },
  { label: '5 PM', full: '05:00 PM - 06:00 PM', base: 76 },
  { label: '6 PM', full: '06:00 PM - 07:00 PM', base: 48 }
];

// Helper to generate deterministic data tailored to each doctor
function getDoctorHourlySchedule(doc: Doctor, dayShort: string): HourSlotData[] {
  // Deterministic seed from doc id and day
  const docSeed = doc.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const dayIndex = ALL_DAYS.findIndex(d => d.short === dayShort);
  const isOpdDay = doc.opdDays.includes(dayShort);

  return TIME_HOURS.map((slot, index) => {
    // Modifier depending on day and doctor specialty
    let dayMod = 0;
    if (dayShort === 'Mon') dayMod = 12; // Monday morning rush
    else if (dayShort === 'Sat') dayMod = 15; // Weekend rush
    else if (dayShort === 'Thu' || dayShort === 'Tue') dayMod = -10; // Quieter mid-week

    // Specialty modifier
    let specMod = 0;
    if (doc.departmentId.includes('pediatric')) {
      if (index >= 7) specMod = 18; // Pediatrics busy in late afternoon
    } else if (doc.departmentId.includes('cardio') || doc.departmentId.includes('ortho')) {
      if (index <= 3) specMod = 15; // Cardio & Ortho busy in mornings
    }

    const pseudoRandom = Math.sin(docSeed * 13 + dayIndex * 7 + index * 5) * 8;
    let demand = Math.round(slot.base + dayMod + specMod + pseudoRandom);
    
    // Bound demand between 15% and 98%
    demand = Math.max(15, Math.min(98, demand));

    // Determine status & wait time
    let status: 'Quiet' | 'Moderate' | 'Peak' = 'Moderate';
    let statusColor = '#f59e0b'; // amber
    let avgWaitMins = Math.round(5 + (demand / 100) * 25);
    let recommendation = 'Normal patient flow. Short queue.';

    if (demand < 42) {
      status = 'Quiet';
      statusColor = '#10b981'; // emerald
      avgWaitMins = Math.max(3, Math.round(4 + (demand / 100) * 8));
      recommendation = '⚡ Optimal booking window! Minimal wait time (< 10 mins).';
    } else if (demand >= 72) {
      status = 'Peak';
      statusColor = '#ef4444'; // rose/red
      avgWaitMins = Math.round(20 + ((demand - 70) / 30) * 15);
      recommendation = '🔥 Heavy rush hour. Recommended to book in advance.';
    }

    // Check if slot falls in general doctor OPD timing range
    // Default timings e.g. "09:00 AM - 02:00 PM"
    const isOpdActive = isOpdDay;

    return {
      hour: slot.label,
      fullTime: slot.full,
      demand,
      avgWaitMins,
      status,
      statusColor,
      isOpdActive,
      recommendation
    };
  });
}

function getDoctorWeeklySummary(doc: Doctor): DayTrafficSummary[] {
  return ALL_DAYS.map(dayObj => {
    const hourly = getDoctorHourlySchedule(doc, dayObj.short);
    const avgDemand = Math.round(hourly.reduce((sum, h) => sum + h.demand, 0) / hourly.length);
    const isOpdDay = doc.opdDays.includes(dayObj.short);

    let status: 'Quiet' | 'Moderate' | 'Peak' = 'Moderate';
    if (avgDemand < 45) status = 'Quiet';
    else if (avgDemand >= 70) status = 'Peak';

    return {
      day: dayObj.short,
      fullDay: dayObj.full,
      avgDemand,
      isOpdDay,
      busiestWindow: '09:30 AM – 11:30 AM',
      quietestWindow: '02:00 PM – 04:00 PM',
      status
    };
  });
}

export const DoctorPeakHoursChart: React.FC<DoctorPeakHoursChartProps> = ({
  doctor,
  onSelectSlotToBook
}) => {
  // Default selected day to first doctor OPD day or Monday
  const initialDay = doctor.opdDays.length > 0 ? doctor.opdDays[0] : 'Mon';
  const [selectedDay, setSelectedDay] = useState<string>(initialDay);
  const [chartType, setChartType] = useState<'area' | 'bar'>('area');
  const [viewMode, setViewMode] = useState<'hourly' | 'weekly'>('hourly');

  // Compute dataset for chosen day
  const hourlyData = useMemo(() => {
    return getDoctorHourlySchedule(doctor, selectedDay);
  }, [doctor, selectedDay]);

  const weeklyData = useMemo(() => {
    return getDoctorWeeklySummary(doctor);
  }, [doctor]);

  // Compute quietest and busiest slots for active day
  const { quietestSlot, busiestSlot, avgDayWait } = useMemo(() => {
    let quiet = hourlyData[0];
    let busy = hourlyData[0];
    let totalWait = 0;

    hourlyData.forEach(slot => {
      totalWait += slot.avgWaitMins;
      if (slot.demand < quiet.demand) quiet = slot;
      if (slot.demand > busy.demand) busy = slot;
    });

    return {
      quietestSlot: quiet,
      busiestSlot: busy,
      avgDayWait: Math.round(totalWait / hourlyData.length)
    };
  }, [hourlyData]);

  // Custom Tooltip for Recharts Hourly
  const CustomHourlyTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: HourSlotData = payload[0].payload;
      return (
        <div className="bg-slate-900/95 text-white p-3 rounded-2xl shadow-xl border border-slate-700/80 backdrop-blur-md text-xs space-y-2 min-w-[220px]">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
            <span className="font-bold text-slate-200 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              <span>{data.fullTime}</span>
            </span>
            <span 
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                data.status === 'Quiet'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : data.status === 'Peak'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              {data.status === 'Quiet' && '🌿 Quiet Hour'}
              {data.status === 'Moderate' && '⚡ Moderate'}
              {data.status === 'Peak' && '🔥 Peak Rush'}
            </span>
          </div>

          <div className="space-y-1 text-slate-300">
            <div className="flex items-center justify-between">
              <span>Appointment Demand:</span>
              <strong className="text-white font-mono">{data.demand}% Load</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Est. In-Clinic Wait:</span>
              <strong className="text-white font-mono">~{data.avgWaitMins} mins</strong>
            </div>
          </div>

          <div className="pt-1.5 border-t border-slate-800/80 text-[11px] text-teal-300">
            {data.recommendation}
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom Tooltip for Weekly View
  const CustomWeeklyTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: DayTrafficSummary = payload[0].payload;
      return (
        <div className="bg-slate-900/95 text-white p-3 rounded-2xl shadow-xl border border-slate-700/80 backdrop-blur-md text-xs space-y-1.5 min-w-[200px]">
          <div className="flex items-center justify-between font-bold border-b border-slate-800 pb-1">
            <span>{data.fullDay}</span>
            {data.isOpdDay ? (
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800">
                OPD Available
              </span>
            ) : (
              <span className="text-[10px] text-slate-400">On-Call Only</span>
            )}
          </div>
          <p className="text-slate-300">
            Average Day Load: <strong className="text-white font-mono">{data.avgDemand}%</strong>
          </p>
          <p className="text-[11px] text-teal-300">
            🌿 Best Window: {data.quietestWindow}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-4">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-700/80 pb-3.5">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-500/20">
              <TrendingDown className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold font-heading text-slate-900 dark:text-white">
              Appointment Traffic & Peak vs. Quiet Hours
            </h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time appointment congestion metrics to help you select the fastest, lowest-wait consultation slot.
          </p>
        </div>

        {/* View mode toggle (Hourly Day vs Weekly Overview) */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-200/80 dark:bg-slate-900/80 p-1 rounded-xl border border-slate-300/60 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setViewMode('hourly')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              viewMode === 'hourly'
                ? 'bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Clock className="w-3 h-3" />
            <span>Hourly by Day</span>
          </button>
          
          <button
            type="button"
            onClick={() => setViewMode('weekly')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              viewMode === 'weekly'
                ? 'bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Calendar className="w-3 h-3" />
            <span>Weekly Trend</span>
          </button>
        </div>
      </div>

      {/* Day Selector Pills (when in Hourly view mode) */}
      {viewMode === 'hourly' && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-slate-400 mr-1 shrink-0">Select Day:</span>
          {ALL_DAYS.map(dayObj => {
            const isOpdDay = doctor.opdDays.includes(dayObj.short);
            const isSelected = selectedDay === dayObj.short;

            return (
              <button
                key={dayObj.short}
                type="button"
                onClick={() => setSelectedDay(dayObj.short)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 border ${
                  isSelected
                    ? 'bg-teal-600 text-white border-teal-500 shadow-xs'
                    : isOpdDay
                      ? 'bg-teal-50/80 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 border-teal-200 dark:border-teal-800/80 hover:bg-teal-100'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <span>{dayObj.full}</span>
                {isOpdDay && (
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-teal-500'}`} />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Chart Legend / Threshold Guide */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] pt-1">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 font-medium text-emerald-700 dark:text-emerald-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>🌿 Quiet Hour (&lt;42% Demand • &lt;10m Wait)</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium text-amber-700 dark:text-amber-300">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>⚡ Moderate (42-70%)</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium text-rose-700 dark:text-rose-300">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>🔥 Peak Rush (&gt;70% • ~25m Wait)</span>
          </div>
        </div>

        {viewMode === 'hourly' && (
          <div className="flex items-center gap-1 text-slate-400">
            <button
              type="button"
              onClick={() => setChartType(chartType === 'area' ? 'bar' : 'area')}
              className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
              title={`Switch to ${chartType === 'area' ? 'Bar Chart' : 'Smooth Area'}`}
            >
              {chartType === 'area' ? <BarChart3 className="w-3.5 h-3.5" /> : <LineChartIcon className="w-3.5 h-3.5" />}
            </button>
          </div>
        )}
      </div>

      {/* Recharts Main Canvas Container */}
      <div className="w-full h-52 sm:h-56 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {viewMode === 'hourly' ? (
            chartType === 'area' ? (
              <AreaChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" opacity={0.2} />
                <XAxis 
                  dataKey="hour" 
                  tick={{ fontSize: 11, fill: '#64748b' }} 
                  axisLine={{ stroke: '#cbd5e1', strokeWidth: 1 }}
                  tickLine={false}
                />
                <YAxis 
                  domain={[0, 100]} 
                  tick={{ fontSize: 10, fill: '#64748b' }} 
                  axisLine={false}
                  tickLine={false}
                  unit="%"
                />
                <Tooltip content={<CustomHourlyTooltip />} />
                
                {/* Reference Line for Peak Threshold */}
                <ReferenceLine 
                  y={70} 
                  stroke="#ef4444" 
                  strokeDasharray="3 3" 
                  strokeOpacity={0.6}
                  label={{ value: 'Peak Rush Line', position: 'insideTopRight', fill: '#ef4444', fontSize: 9 }} 
                />

                {/* Reference Line for Quiet Threshold */}
                <ReferenceLine 
                  y={40} 
                  stroke="#10b981" 
                  strokeDasharray="3 3" 
                  strokeOpacity={0.6}
                  label={{ value: 'Quiet Slot Threshold', position: 'insideBottomRight', fill: '#10b981', fontSize: 9 }} 
                />

                <Area 
                  type="monotone" 
                  dataKey="demand" 
                  stroke="#0d9488" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#trafficGradient)" 
                  activeDot={{ r: 5, stroke: '#0d9488', strokeWidth: 2, fill: '#ffffff' }}
                />
              </AreaChart>
            ) : (
              <BarChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" opacity={0.2} />
                <XAxis 
                  dataKey="hour" 
                  tick={{ fontSize: 11, fill: '#64748b' }} 
                  axisLine={{ stroke: '#cbd5e1', strokeWidth: 1 }}
                  tickLine={false}
                />
                <YAxis 
                  domain={[0, 100]} 
                  tick={{ fontSize: 10, fill: '#64748b' }} 
                  axisLine={false}
                  tickLine={false}
                  unit="%"
                />
                <Tooltip content={<CustomHourlyTooltip />} />
                <Bar dataKey="demand" radius={[6, 6, 0, 0]}>
                  {hourlyData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.status === 'Quiet' ? '#10b981' : entry.status === 'Peak' ? '#f43f5e' : '#f59e0b'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            )
          ) : (
            /* Weekly Bar Comparison */
            <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" opacity={0.2} />
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 11, fill: '#64748b' }} 
                axisLine={{ stroke: '#cbd5e1', strokeWidth: 1 }}
                tickLine={false}
              />
              <YAxis 
                domain={[0, 100]} 
                tick={{ fontSize: 10, fill: '#64748b' }} 
                axisLine={false}
                tickLine={false}
                unit="%"
              />
              <Tooltip content={<CustomWeeklyTooltip />} />
              <Bar dataKey="avgDemand" radius={[6, 6, 0, 0]}>
                {weeklyData.map((entry, index) => (
                  <Cell 
                    key={`weekly-cell-${index}`} 
                    fill={entry.avgDemand < 45 ? '#10b981' : entry.avgDemand > 68 ? '#f43f5e' : '#0d9488'} 
                  />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Smart Booking Insight Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
        <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1 mb-0.5">
            <Leaf className="w-3 h-3 text-emerald-600" />
            <span>Optimal Quiet Slot</span>
          </span>
          <p className="font-bold text-emerald-950 dark:text-emerald-200 text-xs">
            {quietestSlot.fullTime.split(' - ')[0]} ({quietestSlot.demand}% Load)
          </p>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-400">
            Est. wait &lt; {quietestSlot.avgWaitMins} minutes
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 flex items-center gap-1 mb-0.5">
            <Flame className="w-3 h-3 text-rose-600" />
            <span>Peak Rush Window</span>
          </span>
          <p className="font-bold text-rose-950 dark:text-rose-200 text-xs">
            {busiestSlot.fullTime.split(' - ')[0]} ({busiestSlot.demand}% Load)
          </p>
          <span className="text-[10px] text-rose-700 dark:text-rose-400">
            Est. wait ~{busiestSlot.avgWaitMins} minutes
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 flex items-center gap-1 mb-0.5">
            <Sparkles className="w-3 h-3 text-teal-600" />
            <span>Smart AI Scheduling Tip</span>
          </span>
          <p className="text-[11px] text-teal-950 dark:text-teal-200 leading-snug">
            Booking on <strong className="font-bold">Thursday / Tuesday afternoons (2–4 PM)</strong> saves ~18 mins in lobby wait time.
          </p>
        </div>
      </div>

    </div>
  );
};
