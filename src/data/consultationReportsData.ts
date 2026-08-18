import { ConsultationReport } from '../types/hospital';
import { DOCTORS } from './hospitalData';

export const INITIAL_CONSULTATION_REPORTS: ConsultationReport[] = [
  {
    id: 'cr-1',
    reportNumber: 'WCH-CR-2026-9482',
    encounterDate: 'August 12, 2026 • 10:30 AM',
    appointmentId: 'apt-1',
    patientName: 'Kushagra Sisodia',
    patientId: 'pt-1',
    patientMrn: 'WCH-94821',
    patientAge: 34,
    patientGender: 'Male',
    patientPhone: '+1 (555) 234-5678',
    patientEmail: 'kushagrasisodia27@gmail.com',
    doctorId: 'doc-1',
    doctorName: 'Dr. Alexander Wright, MD',
    doctorTitle: 'Chief of Cardiology & Interventional Lead',
    doctorSpecialty: 'Interventional Cardiology & Coronary Therapeutics',
    doctorQualification: 'MD (Johns Hopkins), FACC, FSCAI, Board Certified in Cardiovascular Diseases',
    doctorRegNumber: 'NY-MED-849201',
    departmentName: 'Cardiology & Vascular Center',
    consultationType: 'In-Person OPD',
    chiefComplaints: [
      'Occasional exertional chest tightness during high-intensity treadmill runs (last 2 weeks)',
      'Borderline elevated resting blood pressure readings recorded on home cuff (136/88 mmHg)',
      'Family history of premature coronary artery disease (paternal uncle)'
    ],
    vitals: {
      bp: '132/84 mmHg',
      pulse: '68 bpm (Regular)',
      temp: '98.4 °F (Afebrile)',
      spo2: '99% on room air',
      weight: '76.4 kg',
      bmi: '23.8 kg/m² (Normal)'
    },
    provisionalDiagnosis: 'Stage 1 Essential Hypertension with Exertional Angina Equivalents (Rule out microvascular disease)',
    icd10Code: 'I10.9 (Essential Hypertension) / I20.9 (Angina Pectoris, Unspecified)',
    clinicalFindings: 'Patient is alert, oriented, and in no acute distress. S1 and S2 heart sounds clear with no murmurs, gallops, or friction rubs. Peripheral pulses intact bilaterally. No peripheral edema or jugular venous distension. Lungs clear to bilateral auscultation.',
    prescribedMedications: [
      {
        name: 'Micardis (Telmisartan)',
        generic: 'Telmisartan 40 mg',
        dosage: '40 mg Tablet',
        frequency: 'Once Daily (1-0-0)',
        timing: 'After Food',
        duration: '30 Days',
        instructions: 'Take every morning at the same time with a glass of water. Monitor blood pressure weekly.'
      },
      {
        name: 'Lipitor (Atorvastatin Calcium)',
        generic: 'Atorvastatin 20 mg',
        dosage: '20 mg Tablet',
        frequency: 'Once Daily (0-0-1)',
        timing: 'At Bedtime',
        duration: '30 Days',
        instructions: 'Take at night after dinner for optimal lipid modulation and endothelial plaque stability.'
      },
      {
        name: 'Aspirin Cardio (Enteric Coated)',
        generic: 'Acetylsalicylic Acid 81 mg',
        dosage: '81 mg EC Tablet',
        frequency: 'Once Daily (1-0-0)',
        timing: 'After Food',
        duration: '30 Days',
        instructions: 'Do not crush or chew. Take with main meal.'
      }
    ],
    investigationsOrdered: [
      'Comprehensive Lipid Panel (Direct LDL, HDL, Triglycerides, Non-HDL)',
      '12-Lead Resting ECG + Treadmill Stress Echocardiogram (TMT)',
      'High-Sensitivity C-Reactive Protein (hs-CRP) & HbA1c',
      'Coronary CT Angiography (CCTA) with Calcium Score'
    ],
    dietAndLifestyleAdvice: [
      'Adopt strict low-sodium DASH diet (limit sodium to < 1,800 mg/day).',
      'Engage in 30 minutes of zone-2 aerobic walking/cycling 5 days a week; avoid extreme peak anaerobic bursts until stress echo review.',
      'Maintain home blood pressure diary logged twice daily (morning upon waking and before bedtime).',
      'Optimize sleep hygiene (minimum 7.5 hours nightly) and stress reduction techniques.'
    ],
    followUpDate: 'September 12, 2026 (or earlier with diagnostic test reports)',
    warningSigns: 'Immediate emergency reporting to ER (or SOS Dispatch) if experiencing crushing retrosternal chest pain radiating to left arm/jaw, severe shortness of breath, diaphoresis, or presyncope.',
    digitalSignature: {
      signedBy: 'Dr. Alexander Wright, MD (Chief of Cardiology)',
      timestamp: '2026-08-12T10:45:00Z',
      signatureHash: 'SHA256:4f8e91b2c45d67a90f12389e1a8b948201cdfe67'
    },
    qrVerificationUrl: 'https://wecarehealth.org/verify-report?id=WCH-CR-2026-9482'
  },
  {
    id: 'cr-2',
    reportNumber: 'WCH-CR-2026-8831',
    encounterDate: 'August 05, 2026 • 02:15 PM',
    appointmentId: 'apt-2',
    patientName: 'Kushagra Sisodia',
    patientId: 'pt-1',
    patientMrn: 'WCH-94821',
    patientAge: 34,
    patientGender: 'Male',
    patientPhone: '+1 (555) 234-5678',
    patientEmail: 'kushagrasisodia27@gmail.com',
    doctorId: 'doc-2',
    doctorName: 'Dr. Elena Rostova, MD, PhD',
    doctorTitle: 'Director of Neuro-Oncology & Spine Surgery',
    doctorSpecialty: 'Neurology & Cerebrovascular Disorders',
    doctorQualification: 'MD, PhD (Harvard Medical School), FAANS, Board Certified in Neurological Surgery',
    doctorRegNumber: 'NY-MED-771920',
    departmentName: 'Neurology & Neuro Surgery',
    consultationType: 'In-Person OPD',
    chiefComplaints: [
      'Episodic throbbing unilateral left temporal headaches (3 episodes in past month)',
      'Associated photophobia, phonophobia, and mild nausea lasting 6–8 hours',
      'Aggravated by prolonged screen exposure and lack of sleep'
    ],
    vitals: {
      bp: '124/78 mmHg',
      pulse: '72 bpm',
      temp: '98.6 °F',
      spo2: '99%',
      weight: '76.0 kg',
      bmi: '23.7 kg/m²'
    },
    provisionalDiagnosis: 'Episodic Migraine without Aura with Cervicogenic Muscular Tension',
    icd10Code: 'G43.009 (Migraine without Aura, Not Intractable, Without Status Migrainosus)',
    clinicalFindings: 'Cranial nerves II through XII intact. Visual fields full to confrontation. No papilledema on fundoscopy. Deep tendon reflexes 2+ and symmetric. Mild tenderness over left suboccipital and trapezius muscle insertion.',
    prescribedMedications: [
      {
        name: 'Imitrex (Sumatriptan Succinate)',
        generic: 'Sumatriptan 50 mg',
        dosage: '50 mg Tablet',
        frequency: 'As Needed (PRN)',
        timing: 'With Water at Onset',
        duration: '6 Tablets (SOS)',
        instructions: 'Take 1 tablet at the very first onset of throbbing headache. May repeat once after 2 hours if pain persists (maximum 200mg/day).'
      },
      {
        name: 'Aleve (Naproxen Sodium)',
        generic: 'Naproxen Sodium 550 mg',
        dosage: '550 mg Tablet',
        frequency: 'As Needed (PRN)',
        timing: 'With Food',
        duration: '10 Tablets',
        instructions: 'Can be taken synergistically with Sumatriptan with a full meal to reduce neurogenic inflammation.'
      },
      {
        name: 'Magnesium Glycinate + Riboflavin (B2)',
        generic: 'Magnesium 400 mg + B2 100 mg',
        dosage: '1 Capsule Daily',
        frequency: 'Once Daily (0-0-1)',
        timing: 'At Bedtime',
        duration: '60 Days',
        instructions: 'Daily neuro-protective prophylaxis to elevate mitochondrial threshold and reduce migraine frequency.'
      }
    ],
    investigationsOrdered: [
      'Brain MRI with 3D TOF MR Angiography (Elective screening)',
      'Serum 25-OH Vitamin D & Serum Magnesium Levels'
    ],
    dietAndLifestyleAdvice: [
      'Maintain strict hydration (minimum 3 Liters water/day).',
      'Follow the 20-20-20 rule during computer screen sessions to prevent eye strain.',
      'Avoid identified dietary triggers (aged cheese, MSG, artificial sweeteners, skipping meals).',
      'Perform neck and cervical spine isometric stretching exercises twice daily.'
    ],
    followUpDate: 'October 15, 2026 (or sooner if headache frequency increases to > 4/month)',
    warningSigns: 'Seek emergency medical evaluation if headache is sudden "thunderclap" intensity, accompanied by fever, neck stiffness, speech difficulty, or focal limb weakness.',
    digitalSignature: {
      signedBy: 'Dr. Elena Rostova, MD, PhD (Director of Neurology)',
      timestamp: '2026-08-05T14:30:00Z',
      signatureHash: 'SHA256:7a9b3c4d1e2f567890abcdef1234567890abcdef'
    },
    qrVerificationUrl: 'https://wecarehealth.org/verify-report?id=WCH-CR-2026-8831'
  }
];

export function generateCustomConsultationReport(params: {
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  doctorName?: string;
  doctorId?: string;
  departmentName?: string;
  symptoms?: string;
  consultType?: 'In-Person OPD' | 'Video Tele-Consult' | 'Emergency Follow-up';
}): ConsultationReport {
  const doc = DOCTORS.find(d => d.id === params.doctorId || d.name === params.doctorName) || DOCTORS[0];
  const dateStr = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  const timeStr = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const reportId = `WCH-CR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  return {
    id: `cr-${Date.now()}`,
    reportNumber: reportId,
    encounterDate: `${dateStr} • ${timeStr}`,
    patientName: params.patientName || 'Kushagra Sisodia',
    patientId: 'pt-1',
    patientMrn: 'WCH-94821',
    patientAge: 34,
    patientGender: 'Male',
    patientPhone: params.patientPhone || '+1 (555) 234-5678',
    patientEmail: params.patientEmail || 'kushagrasisodia27@gmail.com',
    doctorId: doc.id,
    doctorName: doc.name,
    doctorTitle: doc.title,
    doctorSpecialty: doc.specialty,
    doctorQualification: doc.qualifications,
    doctorRegNumber: `NY-MED-${Math.floor(500000 + Math.random() * 400000)}`,
    departmentName: params.departmentName || doc.specialty,
    consultationType: params.consultType || 'In-Person OPD',
    chiefComplaints: params.symptoms 
      ? [params.symptoms, 'Routine comprehensive clinical evaluation and symptom review', 'Preventive health screening baseline review']
      : ['General clinical consultation review', 'Evaluation of recent symptoms and vital status'],
    vitals: {
      bp: '122/80 mmHg',
      pulse: '70 bpm (Normal Regular)',
      temp: '98.6 °F',
      spo2: '99% on ambient air',
      weight: '76.2 kg',
      bmi: '23.7 kg/m²'
    },
    provisionalDiagnosis: `Clinical Evaluation for ${params.symptoms ? params.symptoms.slice(0, 40) : 'General Medical Consultation'} (Favorable Prognosis)`,
    icd10Code: 'Z00.00 (General Adult Medical Examination without Abnormal Findings)',
    clinicalFindings: 'Patient is conscious, coherent, and comfortable. Chest bilateral entry clear. Heart sounds S1/S2 audible and regular. Abdomen soft, non-tender with normal bowel sounds. No peripheral edema.',
    prescribedMedications: [
      {
        name: 'Multivitamin Complex + Zinc & CoQ10',
        generic: 'Essential Micronutrients with CoQ10',
        dosage: '1 Softgel Daily',
        frequency: 'Once Daily (1-0-0)',
        timing: 'After Food',
        duration: '30 Days',
        instructions: 'Take after breakfast with water for cellular recovery.'
      },
      {
        name: 'Electrolyte Hydration Sachet (ORS)',
        generic: 'Sodium, Potassium, Citrate Formulation',
        dosage: '1 Sachet in 1L Water',
        frequency: 'Once Daily (PRN)',
        timing: 'With Meals',
        duration: '7 Days',
        instructions: 'Maintain optimal blood volume and cellular hydration.'
      }
    ],
    investigationsOrdered: [
      'Complete Blood Count (CBC) with ESR',
      'Comprehensive Metabolic Panel (CMP-14)',
      'Lipid Profile & Fasting Blood Sugar'
    ],
    dietAndLifestyleAdvice: [
      'Maintain balanced Mediterranean nutritional intake rich in fiber and omega-3s.',
      'Ensure 30 minutes of moderate daily exercise.',
      'Stay hydrated with at least 2.5–3.0 liters of water daily.',
      'Adequate restorative sleep (7–8 hours per night).'
    ],
    followUpDate: 'In 3 Weeks (or as needed based on symptom progression)',
    warningSigns: 'Contact hospital helpline immediately if experiencing sudden onset high fever (>102°F), acute breathing difficulty, severe localized pain, or persistent vomiting.',
    digitalSignature: {
      signedBy: `${doc.name} (${doc.title})`,
      timestamp: new Date().toISOString(),
      signatureHash: `SHA256:${Math.random().toString(36).substring(2, 12)}${Math.random().toString(36).substring(2, 12)}`
    },
    qrVerificationUrl: `https://wecarehealth.org/verify-report?id=${reportId}`
  };
}
