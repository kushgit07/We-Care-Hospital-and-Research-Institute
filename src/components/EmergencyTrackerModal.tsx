import React, { useState, useEffect } from 'react';
import { 
  X, 
  Ambulance, 
  PhoneCall, 
  MapPin, 
  Clock, 
  ShieldAlert, 
  Navigation, 
  Radio, 
  CheckCircle2, 
  AlertOctagon, 
  HeartHandshake,
  Activity
} from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { dispatchEmergencyToSupabase } from '../services/backendService';

interface EmergencyTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyTrackerModal: React.FC<EmergencyTrackerModalProps> = ({
  isOpen,
  onClose
}) => {
  const [dispatchActive, setDispatchActive] = useState(false);
  const [etaMinutes, setEtaMinutes] = useState(6);
  const [etaSeconds, setEtaSeconds] = useState(45);
  const [locationName, setLocationName] = useState('Determining current GPS coordinates...');
  const [patientCondition, setPatientCondition] = useState('Severe Chest Discomfort');

  useEffect(() => {
    if (dispatchActive) {
      const timer = setInterval(() => {
        setEtaSeconds((prev) => {
          if (prev > 0) return prev - 1;
          if (etaMinutes > 0) {
            setEtaMinutes((m) => m - 1);
            return 59;
          }
          return 0;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [dispatchActive, etaMinutes]);

  const handleTriggerDispatch = () => {
    setDispatchActive(true);
    const loc = 'Broadway & 34th St, Manhattan, NY (GPS Lat 40.7505, Long -73.9880)';
    setLocationName(loc);

    dispatchEmergencyToSupabase({
      patientName: 'Emergency Caller',
      contactPhone: HOSPITAL_INFO.phoneEmergency,
      locationAddress: loc,
      emergencyNature: patientCondition
    }).catch(err => console.info('Dispatch logged:', err));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-slate-900 border border-rose-700/60 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl text-white relative animate-in zoom-in-95 duration-200 my-auto">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 rounded-t-3xl border-b border-rose-900/60 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
            <span className="text-xs font-black uppercase tracking-widest text-rose-400">
              24/7 Level-1 Emergency & Mobile ICU Dispatch
            </span>
          </div>

          <h3 className="text-2xl font-extrabold font-heading text-white">
            Emergency Response Command
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Real-time ambulance dispatch with hospital ER pre-alert and vital telemetry.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          
          {/* Direct Rapid Call Banner */}
          <div className="p-4 rounded-2xl bg-rose-600/20 border border-rose-500/40 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-rose-600/40">
                <PhoneCall className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-rose-300">
                  Instant ER Hotline (24/7 Zero Queue)
                </p>
                <a
                  href={`tel:${HOSPITAL_INFO.phoneEmergency}`}
                  className="text-xl sm:text-2xl font-extrabold text-white hover:underline font-heading"
                >
                  {HOSPITAL_INFO.phoneEmergency}
                </a>
              </div>
            </div>

            <a
              href={`tel:${HOSPITAL_INFO.phoneEmergency}`}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all text-center"
            >
              Call Trauma Desk
            </a>
          </div>

          {/* Ambulance Dispatch Simulation Box */}
          {!dispatchActive ? (
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4">
              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  Request Immediate Mobile ICU Ambulance
                </h4>
                <p className="text-xs text-slate-400">
                  Our nearest ALS (Advanced Life Support) mobile ICU ambulance will be dispatched to your current GPS position.
                </p>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Primary Emergency Condition
                </label>
                <select
                  value={patientCondition}
                  onChange={(e) => setPatientCondition(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                >
                  <option value="Severe Chest Pain / Possible Heart Attack">Severe Chest Pain / Heart Attack</option>
                  <option value="Suspected Acute Stroke (Facial Droop / Speech)">Suspected Acute Stroke</option>
                  <option value="Road Accident / Polytrauma">Road Accident / Polytrauma</option>
                  <option value="Severe Breathing Difficulty">Severe Breathing Difficulty</option>
                  <option value="Uncontrolled Bleeding / Fracture">Uncontrolled Bleeding / Fracture</option>
                  <option value="Obstetric Emergency / Active Labor">Obstetric Emergency / Active Labor</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleTriggerDispatch}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-rose-900/50 transition-all flex items-center justify-center gap-2"
              >
                <Ambulance className="w-5 h-5" />
                <span>Dispatch Nearest Mobile ICU Now</span>
              </button>
            </div>
          ) : (
            /* Active Tracking View */
            <div className="p-5 rounded-2xl bg-slate-800/90 border border-teal-500/50 space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Mobile ICU #04 En Route
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-400">
                  Priority Status: Code Red
                </span>
              </div>

              {/* Countdown Box */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Estimated Time of Arrival
                  </span>
                  <div className="text-3xl font-extrabold text-teal-400 font-heading mt-0.5">
                    0{etaMinutes}:{etaSeconds < 10 ? `0${etaSeconds}` : etaSeconds} <span className="text-xs text-slate-400 font-normal">mins</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Speed / Distance
                  </span>
                  <span className="text-sm font-bold text-white">
                    48 mph • 2.1 miles away
                  </span>
                </div>
              </div>

              {/* Crew & ER status */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/80">
                  <span className="text-[10px] text-slate-400 block">Paramedic In-Charge</span>
                  <span className="font-bold text-white">Officer Marcus Green (EMT-P)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/80">
                  <span className="text-[10px] text-slate-400 block">Hospital Red Bay</span>
                  <span className="font-bold text-emerald-400">Resuscitation Bay #2 Reserved</span>
                </div>
              </div>

              {/* Destination */}
              <div className="flex items-center gap-2 text-xs text-slate-300 p-2.5 bg-slate-900/60 rounded-xl">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="truncate">Pickup: {locationName}</span>
              </div>
            </div>
          )}

          {/* First Aid Guidance While Waiting */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 text-xs space-y-2">
            <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
              <AlertOctagon className="w-4 h-4 text-amber-400" />
              <span>What to Do While Waiting for the Ambulance:</span>
            </h4>
            <ul className="space-y-1 text-slate-400 list-disc list-inside">
              <li>Keep patient calm in a seated, comfortable position with open airflow.</li>
              <li>Loosen tight clothing around neck and chest.</li>
              <li>Do not offer solid foods or oral fluids in acute chest discomfort.</li>
              <li>Keep past medical prescriptions and ID ready for the paramedic crew.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 rounded-b-3xl border-t border-slate-800 text-center text-xs text-slate-500">
          We Care Hospital Level-1 Trauma Center • Rooftop Helipad Operational 24/7
        </div>
      </div>
    </div>
  );
};
