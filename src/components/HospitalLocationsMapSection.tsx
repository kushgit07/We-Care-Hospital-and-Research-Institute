import React, { useState, useMemo, useRef } from 'react';
import { 
  MapPin, 
  Navigation, 
  Compass, 
  Building2, 
  Layers, 
  Clock, 
  Phone, 
  Ambulance, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Sparkles, 
  ChevronRight, 
  Eye, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ShieldCheck, 
  Activity, 
  Filter, 
  Search, 
  ArrowRight, 
  Car, 
  Train, 
  Plane, 
  ExternalLink, 
  Radio, 
  Sliders, 
  Bed, 
  Maximize2,
  Stethoscope,
  X,
  Share2,
  Copy,
  Check
} from 'lucide-react';
import { HOSPITAL_BRANCHES } from '../data/hospitalBranchesData';
import { DEPARTMENTS } from '../data/hospitalData';
import { HospitalBranch, BranchDepartmentAvailability } from '../types/hospital';

interface HospitalLocationsMapSectionProps {
  onOpenBooking?: (departmentId?: string, doctorId?: string, branchId?: string) => void;
  onOpenEmergencyModal?: () => void;
}

type MapTheme = 'clinical-dark' | 'medical-light' | 'blueprint';

export const HospitalLocationsMapSection: React.FC<HospitalLocationsMapSectionProps> = ({
  onOpenBooking,
  onOpenEmergencyModal
}) => {
  // Active selected branch
  const [selectedBranchId, setSelectedBranchId] = useState<string>(HOSPITAL_BRANCHES[0].id);
  
  // Filter by department
  const [selectedDepartmentFilter, setSelectedDepartmentFilter] = useState<string>('all');
  
  // Search text query
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Map interactive state
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [mapTheme, setMapTheme] = useState<MapTheme>('clinical-dark');
  const [showTransitLayer, setShowTransitLayer] = useState<boolean>(true);
  const [showAmbulanceCorridors, setShowAmbulanceCorridors] = useState<boolean>(true);
  const [showTrafficFlow, setShowTrafficFlow] = useState<boolean>(false);
  const [hoveredBranchId, setHoveredBranchId] = useState<string | null>(null);
  
  // Directions Modal
  const [directionsModalOpen, setDirectionsModalOpen] = useState<boolean>(false);
  const [copiedAddress, setCopiedAddress] = useState<boolean>(false);

  // Selected Branch object
  const selectedBranch = useMemo(() => {
    return HOSPITAL_BRANCHES.find(b => b.id === selectedBranchId) || HOSPITAL_BRANCHES[0];
  }, [selectedBranchId]);

  // Filtered branches list
  const filteredBranches = useMemo(() => {
    return HOSPITAL_BRANCHES.filter(branch => {
      // Text search match
      const matchesSearch = 
        branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        branch.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        branch.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        branch.type.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Department filter match
      if (selectedDepartmentFilter === 'all') return true;

      const deptAvail = branch.departmentAvailability.find(d => d.departmentId === selectedDepartmentFilter);
      return deptAvail && deptAvail.isAvailable;
    });
  }, [searchQuery, selectedDepartmentFilter]);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.8));
  const handleResetMap = () => {
    setZoomLevel(1);
    setSelectedBranchId(HOSPITAL_BRANCHES[0].id);
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  // Helper for status badge color
  const getStatusBadgeStyle = (status: BranchDepartmentAvailability['status']) => {
    switch (status) {
      case 'Full Inpatient & Robotic Surgery':
        return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30';
      case 'Outpatient OPD & Day Care':
        return 'bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-500/30';
      case 'Advanced Diagnostics & Chemotherapy':
        return 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30';
      case 'Emergency Only':
        return 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30';
      case 'Not Available':
      default:
        return 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-700';
    }
  };

  return (
    <section id="locations-map" className="py-20 bg-slate-900 text-slate-100 relative overflow-hidden transition-colors duration-200">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-teal-400 animate-spin-slow" />
            <span>Interactive Campus & Branch Network</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 font-heading">
            Hospital Locations & <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-sky-300 to-indigo-400">Department Availability</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Explore our state-of-the-art medical city campuses, specialized surgical institutes, and regional emergency trauma centers. Filter live department availability, bed occupancy, and transit access across all branches.
          </p>
        </div>

        {/* Global Filter Bar: Department Quick Selector + Text Search */}
        <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-4 sm:p-5 mb-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 min-w-[260px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search branch name, district, or address..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-700/80 text-white placeholder:text-slate-500 text-xs sm:text-sm font-medium focus:outline-none focus:border-teal-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Department Filter Chips Carousel */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-thin scrollbar-thumb-slate-700">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1.5 pl-1">
                <Filter className="w-3.5 h-3.5 text-teal-400" />
                Specialty:
              </span>

              <button
                onClick={() => setSelectedDepartmentFilter('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  selectedDepartmentFilter === 'all'
                    ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20 font-black'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                All Departments ({HOSPITAL_BRANCHES.length} Campuses)
              </button>

              {DEPARTMENTS.slice(0, 7).map(dept => {
                const availableCount = HOSPITAL_BRANCHES.filter(b => {
                  const d = b.departmentAvailability.find(item => item.departmentId === dept.id);
                  return d && d.isAvailable;
                }).length;

                return (
                  <button
                    key={dept.id}
                    onClick={() => setSelectedDepartmentFilter(dept.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 flex items-center gap-1.5 transition-all ${
                      selectedDepartmentFilter === dept.id
                        ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20 font-black'
                        : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-teal-500/50 hover:text-white'
                    }`}
                  >
                    <span>{dept.name.split('&')[0].trim()}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      selectedDepartmentFilter === dept.id ? 'bg-slate-950/30 text-slate-950 font-black' : 'bg-slate-800 text-teal-400'
                    }`}>
                      {availableCount}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>
        </div>

        {/* Master Interactive Map & Branch Matrix Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: The Interactive Map Viewport (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            
            {/* Map Canvas Frame */}
            <div className="relative rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden min-h-[480px] sm:min-h-[560px] flex items-center justify-center group">
              
              {/* Map Theme Visual Styling Layers */}
              <div 
                className="absolute inset-0 transition-transform duration-500 ease-out origin-center"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                {/* SVG Vector Map Canvas Placeholder Engine */}
                <svg
                  viewBox="0 0 1000 750"
                  className="w-full h-full object-cover select-none pointer-events-none"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <defs>
                    {/* Grid Pattern */}
                    <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(45, 212, 191, 0.08)" strokeWidth="1" />
                    </pattern>

                    {/* Technical Blueprint Grid Pattern */}
                    <pattern id="blueprintGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(99, 102, 241, 0.12)" strokeWidth="0.75" />
                    </pattern>

                    {/* Gradient Shaders */}
                    <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0284c7" stopOpacity="0.35" />
                      <stop offset="50%" stopColor="#0369a1" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#075985" stopOpacity="0.4" />
                    </linearGradient>

                    <linearGradient id="highwayGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.6" />
                    </linearGradient>

                    {/* Pulse Animation */}
                    <radialGradient id="hospitalRadius">
                      <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Base Background Fill based on theme */}
                  <rect 
                    width="1000" 
                    height="750" 
                    fill={mapTheme === 'blueprint' ? '#090d16' : mapTheme === 'medical-light' ? '#0f172a' : '#030712'} 
                  />

                  {/* Grid System */}
                  <rect 
                    width="1000" 
                    height="750" 
                    fill={mapTheme === 'blueprint' ? 'url(#blueprintGrid)' : 'url(#mapGrid)'} 
                  />

                  {/* Topographical Metro River / Waterway Curve */}
                  <path
                    d="M -50,150 C 200,180 300,320 420,400 C 550,490 620,600 800,680 C 900,720 1050,730 1100,740 L 1100,800 L -50,800 Z"
                    fill="url(#riverGradient)"
                    stroke="rgba(56, 189, 248, 0.4)"
                    strokeWidth="2"
                  />
                  
                  {/* River Label */}
                  <text x="260" y="320" fill="rgba(56, 189, 248, 0.45)" fontSize="11" fontWeight="700" letterSpacing="3" transform="rotate(32, 260, 320)">
                    HUDSON MEDICAL WATERWAY CANAL
                  </text>

                  {/* Major Expressways & City Arteries */}
                  <path
                    d="M 50,700 L 350,550 L 500,460 L 780,280 L 950,150"
                    fill="none"
                    stroke="rgba(148, 163, 184, 0.25)"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 50,700 L 350,550 L 500,460 L 780,280 L 950,150"
                    fill="none"
                    stroke="url(#highwayGlow)"
                    strokeWidth="2.5"
                    strokeDasharray={showTrafficFlow ? "8, 6" : "none"}
                    className={showTrafficFlow ? "animate-pulse" : ""}
                  />

                  {/* North-South Interstate Arterial Corridor */}
                  <path
                    d="M 760,20 L 760,350 L 500,460 L 340,680 L 340,740"
                    fill="none"
                    stroke="rgba(148, 163, 184, 0.2)"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 760,20 L 760,350 L 500,460 L 340,680 L 340,740"
                    fill="none"
                    stroke="rgba(56, 189, 248, 0.5)"
                    strokeWidth="2"
                  />

                  {/* Metro Transit System Layer (Green & Orange lines) */}
                  {showTransitLayer && (
                    <g opacity="0.85">
                      {/* Metro Line 1 (Teal Route) */}
                      <path
                        d="M 100,200 L 220,320 L 440,280 L 500,460 L 680,220 L 850,260"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3.5"
                        strokeDasharray="4, 4"
                      />
                      {/* Metro Line 2 (Purple Route) */}
                      <path
                        d="M 340,700 L 340,550 L 500,460 L 760,580 L 900,600"
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="3"
                        strokeDasharray="5, 3"
                      />
                      {/* Metro Stations Nodes */}
                      <circle cx="220" cy="320" r="5" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />
                      <circle cx="440" cy="280" r="5" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />
                      <circle cx="500" cy="460" r="7" fill="#14b8a6" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="680" cy="220" r="5" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />
                      <circle cx="340" cy="680" r="5" fill="#0f172a" stroke="#a855f7" strokeWidth="2.5" />
                      <circle cx="760" cy="580" r="5" fill="#0f172a" stroke="#a855f7" strokeWidth="2.5" />
                    </g>
                  )}

                  {/* 24/7 Ambulance Priority Corridors (Pulsing Red/Cyan Lines) */}
                  {showAmbulanceCorridors && (
                    <g opacity="0.9">
                      <path
                        d="M 500,460 L 340,680"
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="2.5"
                        strokeDasharray="6, 6"
                        className="animate-pulse"
                      />
                      <path
                        d="M 500,460 L 220,320"
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="2.5"
                        strokeDasharray="6, 6"
                        className="animate-pulse"
                      />
                      <path
                        d="M 500,460 L 680,220"
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="2.5"
                        strokeDasharray="6, 6"
                        className="animate-pulse"
                      />
                      <path
                        d="M 500,460 L 760,580"
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="2.5"
                        strokeDasharray="6, 6"
                        className="animate-pulse"
                      />
                    </g>
                  )}

                  {/* District Boundary Blocks & Urban Architecture Zones */}
                  <rect x="80" y="80" width="120" height="90" rx="10" fill="rgba(30, 41, 59, 0.4)" stroke="rgba(71, 85, 105, 0.3)" strokeWidth="1" />
                  <text x="95" y="105" fill="rgba(148, 163, 184, 0.5)" fontSize="9" fontWeight="700">ZONE A: ACADEMIC</text>

                  <rect x="580" y="80" width="140" height="90" rx="10" fill="rgba(30, 41, 59, 0.4)" stroke="rgba(71, 85, 105, 0.3)" strokeWidth="1" />
                  <text x="595" y="105" fill="rgba(148, 163, 184, 0.5)" fontSize="9" fontWeight="700">UPTOWN ENCLAVE</text>

                  <rect x="800" y="440" width="150" height="120" rx="10" fill="rgba(30, 41, 59, 0.4)" stroke="rgba(71, 85, 105, 0.3)" strokeWidth="1" />
                  <text x="815" y="465" fill="rgba(148, 163, 184, 0.5)" fontSize="9" fontWeight="700">EXPRESSWAY CORRIDOR</text>

                  <rect x="180" y="600" width="130" height="90" rx="10" fill="rgba(30, 41, 59, 0.4)" stroke="rgba(71, 85, 105, 0.3)" strokeWidth="1" />
                  <text x="195" y="625" fill="rgba(148, 163, 184, 0.5)" fontSize="9" fontWeight="700">FINANCIAL DISTRICT</text>

                  {/* Central Flagship Medical City Zone Highlight */}
                  <circle cx="500" cy="460" r="90" fill="url(#hospitalRadius)" />
                  <circle cx="500" cy="460" r="60" fill="none" stroke="rgba(20, 184, 166, 0.3)" strokeWidth="1.5" strokeDasharray="4, 4" />

                  {/* Compass Rose Indicator */}
                  <g transform="translate(920, 80)">
                    <circle cx="0" cy="0" r="24" fill="rgba(15, 23, 42, 0.8)" stroke="rgba(71, 85, 105, 0.6)" strokeWidth="1" />
                    <polygon points="0,-18 5,0 -5,0" fill="#14b8a6" />
                    <polygon points="0,18 5,0 -5,0" fill="#64748b" />
                    <text x="-4" y="-7" fill="#ffffff" fontSize="9" fontWeight="bold">N</text>
                  </g>
                </svg>

                {/* Interactive Dynamic HTML Map Markers Overlay */}
                {HOSPITAL_BRANCHES.map((branch) => {
                  const isSelected = branch.id === selectedBranchId;
                  const isHovered = branch.id === hoveredBranchId;
                  
                  // Check if this branch matches the active department filter
                  const deptInfo = selectedDepartmentFilter !== 'all' 
                    ? branch.departmentAvailability.find(d => d.departmentId === selectedDepartmentFilter)
                    : null;
                  
                  const isDeptAvailable = deptInfo ? deptInfo.isAvailable : true;

                  return (
                    <div
                      key={branch.id}
                      style={{
                        left: `${branch.coordinates.x}%`,
                        top: `${branch.coordinates.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      className="absolute z-20 pointer-events-auto cursor-pointer"
                      onClick={() => setSelectedBranchId(branch.id)}
                      onMouseEnter={() => setHoveredBranchId(branch.id)}
                      onMouseLeave={() => setHoveredBranchId(null)}
                    >
                      {/* Pulse Radar Ring for Emergency / Selected Hubs */}
                      {(isSelected || branch.emergencyAvailable) && (
                        <div className={`absolute -inset-3 rounded-full animate-ping opacity-40 pointer-events-none ${
                          isSelected ? 'bg-teal-400' : 'bg-sky-400'
                        }`} />
                      )}

                      {/* Main Map Marker Pin */}
                      <div className={`relative flex items-center justify-center transition-all duration-300 ${
                        isSelected 
                          ? 'scale-125 z-30' 
                          : isHovered 
                          ? 'scale-115 z-25' 
                          : isDeptAvailable 
                          ? 'scale-100' 
                          : 'opacity-50 scale-90'
                      }`}>
                        
                        {/* Outer Glowing Capsule */}
                        <div className={`p-2 rounded-2xl flex items-center justify-center shadow-2xl transition-all border ${
                          isSelected
                            ? 'bg-gradient-to-tr from-teal-500 to-indigo-600 text-slate-950 border-white ring-4 ring-teal-400/40 shadow-teal-500/50'
                            : isDeptAvailable
                            ? 'bg-slate-900/90 backdrop-blur-md text-teal-400 border-teal-500/50 hover:border-teal-400 hover:bg-slate-800'
                            : 'bg-slate-900/80 text-slate-400 border-slate-700'
                        }`}>
                          <Building2 className="w-5 h-5" />
                        </div>

                        {/* Status Dot */}
                        <span className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-slate-950 ${
                          branch.emergencyAvailable ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                        }`} />
                      </div>

                      {/* Branch Name Label Badge below Marker */}
                      <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all pointer-events-none shadow-xl border ${
                        isSelected
                          ? 'bg-slate-950 text-teal-300 border-teal-500/80 z-30 scale-105'
                          : 'bg-slate-950/80 backdrop-blur-sm text-slate-300 border-slate-800'
                      }`}>
                        <div className="flex items-center gap-1.5">
                          <span>{branch.name.replace('We Care ', '').split('&')[0].trim()}</span>
                          {selectedDepartmentFilter !== 'all' && (
                            <span className={`w-2 h-2 rounded-full ${isDeptAvailable ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                          )}
                        </div>
                      </div>

                    </div>
                  );
                })}

              </div>

              {/* Floating Map Canvas Controls Bar (Top Right) */}
              <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
                <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-1.5 flex flex-col gap-1 shadow-xl">
                  <button
                    onClick={handleZoomIn}
                    className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                    title="Zoom In (+)"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleZoomOut}
                    className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                    title="Zoom Out (-)"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleResetMap}
                    className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                    title="Reset Map View"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                {/* Theme Selector */}
                <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-1.5 flex flex-col gap-1 shadow-xl">
                  <button
                    onClick={() => setMapTheme('clinical-dark')}
                    className={`p-2 rounded-xl text-xs font-bold transition-all ${
                      mapTheme === 'clinical-dark' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Clinical Dark Matrix"
                  >
                    <Layers className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setMapTheme('blueprint')}
                    className={`p-2 rounded-xl text-xs font-bold transition-all ${
                      mapTheme === 'blueprint' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Architectural Blueprint"
                  >
                    <Compass className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Floating Layer Toggles (Bottom Left) */}
              <div className="absolute bottom-4 left-4 z-30 flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setShowTransitLayer(prev => !prev)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all backdrop-blur-md border shadow-lg ${
                    showTransitLayer
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60'
                      : 'bg-slate-900/80 text-slate-400 border-slate-800'
                  }`}
                >
                  <Train className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Metro Rail</span>
                </button>

                <button
                  onClick={() => setShowAmbulanceCorridors(prev => !prev)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all backdrop-blur-md border shadow-lg ${
                    showAmbulanceCorridors
                      ? 'bg-rose-950/80 text-rose-300 border-rose-700/60'
                      : 'bg-slate-900/80 text-slate-400 border-slate-800'
                  }`}
                >
                  <Ambulance className="w-3.5 h-3.5 text-rose-400" />
                  <span>Ambulance Corridors</span>
                </button>

                <button
                  onClick={() => setShowTrafficFlow(prev => !prev)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all backdrop-blur-md border shadow-lg ${
                    showTrafficFlow
                      ? 'bg-sky-950/80 text-sky-300 border-sky-700/60'
                      : 'bg-slate-900/80 text-slate-400 border-slate-800'
                  }`}
                >
                  <Car className="w-3.5 h-3.5 text-sky-400" />
                  <span>Live Traffic</span>
                </button>
              </div>

              {/* Live Active Campus Quick Header Card (Top Left) */}
              <div className="absolute top-4 left-4 z-30 max-w-xs bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-3 shadow-2xl animate-in fade-in duration-200">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-400">
                    Active Hospital Campus
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white leading-tight truncate">
                  {selectedBranch.name}
                </h4>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                  {selectedBranch.district} • {selectedBranch.distanceFromCenter}
                </p>
              </div>

            </div>

            {/* Branch Quick Carousel Cards Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredBranches.map(branch => {
                const isSelected = branch.id === selectedBranchId;
                return (
                  <button
                    key={branch.id}
                    onClick={() => setSelectedBranchId(branch.id)}
                    className={`p-3 rounded-2xl text-left transition-all border ${
                      isSelected
                        ? 'bg-teal-500/10 border-teal-500/60 shadow-lg shadow-teal-500/10 ring-1 ring-teal-500/40'
                        : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">
                        {branch.type.split('&')[0].trim()}
                      </span>
                      {branch.emergencyAvailable && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                          24/7 ER
                        </span>
                      )}
                    </div>
                    <h5 className="text-xs font-bold text-white line-clamp-1">
                      {branch.name.replace('We Care ', '')}
                    </h5>
                    <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                      {branch.district}
                    </p>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Right Column: Selected Branch Detailed Deep-Dive & Department Availability (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Selected Branch Main Info Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-teal-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

              {/* Branch Header & Type */}
              <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-teal-500/15 text-teal-300 border border-teal-500/30">
                      {selectedBranch.type}
                    </span>
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                      ★ {selectedBranch.rating} <span className="text-slate-500">({selectedBranch.reviewCount})</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight font-heading">
                    {selectedBranch.name}
                  </h3>
                  
                  <p className="text-xs text-slate-400 mt-1">
                    {selectedBranch.tagline}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
              </div>

              {/* Key Metrics Bento: Beds, ER Wait, Open Hours */}
              <div className="grid grid-cols-3 gap-2.5 my-5">
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Bed Capacity</span>
                  <span className="text-base font-black text-white">{selectedBranch.bedCapacity}</span>
                  <span className="text-[10px] text-emerald-400 font-semibold block">{selectedBranch.availableBeds} Avail</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">ER Wait Time</span>
                  <span className="text-base font-black text-rose-400">{selectedBranch.erWaitTime}</span>
                  <span className="text-[10px] text-slate-400 font-semibold block">Triage Ready</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Emergency</span>
                  <span className="text-base font-black text-emerald-400">
                    {selectedBranch.emergencyAvailable ? '24/7 L1' : 'OPD'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold block">Active Desk</span>
                </div>
              </div>

              {/* Address & Direct Actions */}
              <div className="space-y-3 pb-5 border-b border-slate-800">
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-white">{selectedBranch.address}</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">{selectedBranch.district}, {selectedBranch.city}</p>
                  </div>
                  <button
                    onClick={() => handleCopyAddress(selectedBranch.address)}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    title="Copy address"
                  >
                    {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>{selectedBranch.openHours}</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                  <span className="font-mono">{selectedBranch.phone}</span>
                </div>
              </div>

              {/* Transit & Commute Highlights */}
              <div className="py-4 border-b border-slate-800">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-teal-400" /> Transit & Access Time
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Car className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span><strong>Drive:</strong> {selectedBranch.travelTime.drive}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Train className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span><strong>Transit:</strong> {selectedBranch.travelTime.transit}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 flex items-center gap-3">
                <button
                  onClick={() => onOpenBooking?.(undefined, undefined, selectedBranch.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-teal-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book at this Campus</span>
                </button>

                <button
                  onClick={() => setDirectionsModalOpen(true)}
                  className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm border border-slate-700 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-teal-400" />
                  <span>Directions</span>
                </button>
              </div>

            </div>

            {/* Department Availability Matrix for this Branch */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-teal-400" />
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    Specialized Department Availability
                  </h4>
                </div>
                <span className="text-[11px] text-slate-400">
                  {selectedBranch.departmentAvailability.filter(d => d.isAvailable).length} Active Specialties
                </span>
              </div>

              {/* Department Items List */}
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700">
                {selectedBranch.departmentAvailability.map((deptAvail) => (
                  <div
                    key={deptAvail.departmentId}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      deptAvail.isAvailable
                        ? 'bg-slate-900/90 border-slate-800 hover:border-teal-500/40'
                        : 'bg-slate-900/40 border-slate-800/50 opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h5 className="text-xs font-bold text-white">
                            {deptAvail.departmentName}
                          </h5>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${getStatusBadgeStyle(deptAvail.status)}`}>
                            {deptAvail.status}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-400 mt-1">
                          Lead: <span className="text-slate-200 font-semibold">{deptAvail.leadDoctorName}</span>
                          {deptAvail.operatingSuites && (
                            <span> • {deptAvail.operatingSuites} Robotic Suites</span>
                          )}
                        </p>

                        {/* Key Services Tags */}
                        {deptAvail.keyServices && deptAvail.keyServices.length > 0 && (
                          <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                            {deptAvail.keyServices.slice(0, 3).map((srv, sIdx) => (
                              <span key={sIdx} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60">
                                {srv}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* 1-Click Department Booking */}
                      {deptAvail.isAvailable && (
                        <button
                          onClick={() => onOpenBooking?.(deptAvail.departmentId, undefined, selectedBranch.id)}
                          className="shrink-0 p-2 rounded-xl bg-teal-500/10 hover:bg-teal-500 text-teal-400 hover:text-slate-950 transition-all text-xs font-bold flex items-center gap-1"
                          title={`Book ${deptAvail.departmentName} at ${selectedBranch.name}`}
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Book</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Amenities Checklist */}
              <div className="mt-5 pt-4 border-t border-slate-800">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Campus Facilities & Tech
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {selectedBranch.amenities.slice(0, 6).map((amenity, aIdx) => (
                    <div key={aIdx} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span className="truncate">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Turn-by-Turn Directions & Navigation Modal */}
      {directionsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-white relative">
            
            <button
              onClick={() => setDirectionsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
                <Navigation className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Campus Navigation Guide</span>
                <h3 className="text-xl font-bold text-white">{selectedBranch.name}</h3>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-400 mb-1">
                  <Car className="w-4 h-4" />
                  <span>Driving & Valet Parking</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Enter via main gate on {selectedBranch.address}. Automated multi-level underground parking and complimentary valet assistance is available 24/7 at Entrance B.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
                  <Train className="w-4 h-4" />
                  <span>Public Transit & Metro</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedBranch.travelTime.transit}. Connected via covered pedestrian skywalk directly into the Main Atrium.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-400 mb-1">
                  <Ambulance className="w-4 h-4" />
                  <span>Emergency Trauma Bay Access</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Red-zone trauma ambulances should use Ramp 1 on the East Perimeter with direct elevator access to the Resuscitation Unit.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between gap-4">
              <button
                onClick={() => handleCopyAddress(selectedBranch.address)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
              >
                {copiedAddress ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                <span>{copiedAddress ? 'Address Copied!' : 'Copy GPS Coordinates'}</span>
              </button>

              <button
                onClick={() => setDirectionsModalOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors"
              >
                Close Guide
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
