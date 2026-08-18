import { PatientProfile, MedicalRecordEntry, LabResultReport, PrescriptionItem, BiometricActivityLog } from '../types/hospital';

export const PATIENT_PROFILES: PatientProfile[] = [
  {
    id: 'pt-1',
    mrn: 'WC-PT-84920',
    name: 'Sarah Jenkins',
    age: 44,
    gender: 'Female',
    dob: '1982-04-14',
    bloodGroup: 'A+',
    email: 'sarah.jenkins@example.com',
    phone: '+1 (555) 234-8901',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    address: '742 Evergreen Terrace, New York, NY 10001',
    emergencyContact: {
      name: 'Michael Jenkins',
      relationship: 'Spouse',
      phone: '+1 (555) 882-9912'
    },
    allergies: ['Penicillin (Moderate Rash)', 'Sulfa Drugs'],
    chronicConditions: ['Stage 1 Essential Hypertension', 'Mild Hyperlipidemia'],
    insurance: {
      provider: 'Blue Cross Blue Shield (Platinum PPO)',
      policyNumber: 'BCBS-88392019',
      groupNumber: 'GRP-99420',
      coverageLimit: '$500,000 / Year (100% Cashless)',
      status: 'Active',
      validUntil: '2027-12-31'
    },
    primaryDoctor: {
      name: 'Dr. Arthur Vance, MD, FACC',
      specialty: 'Chief of Cardiology',
      department: 'Cardiology & Heart Institute'
    },
    vitals: {
      bloodPressure: { systolic: 118, diastolic: 76, unit: 'mmHg', status: 'Optimal' },
      heartRate: { value: 68, unit: 'bpm', status: 'Optimal' },
      spO2: { value: 99, unit: '%', status: 'Optimal' },
      bloodGlucose: { value: 92, fasting: true, unit: 'mg/dL', status: 'Optimal' },
      bmi: { value: 22.4, status: 'Normal' },
      hba1c: { value: 5.3, unit: '%', status: 'Optimal' },
      lastRecorded: 'August 14, 2026 at 09:30 AM'
    }
  },
  {
    id: 'pt-2',
    mrn: 'WC-PT-59218',
    name: 'David Chen',
    age: 58,
    gender: 'Male',
    dob: '1968-11-20',
    bloodGroup: 'O+',
    email: 'david.chen@example.com',
    phone: '+1 (555) 438-1192',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    address: '120 Ocean Parkway, Brooklyn, NY 11218',
    emergencyContact: {
      name: 'Linda Chen',
      relationship: 'Daughter',
      phone: '+1 (555) 773-4412'
    },
    allergies: ['No known drug allergies (NKDA)'],
    chronicConditions: ['Post-Robotic Total Knee Arthroplasty (Right Knee)', 'Osteoarthritis'],
    insurance: {
      provider: 'UnitedHealthcare Global Health',
      policyNumber: 'UHC-9948102',
      groupNumber: 'GRP-3301',
      coverageLimit: '$750,000 / Year',
      status: 'Active',
      validUntil: '2028-06-30'
    },
    primaryDoctor: {
      name: 'Dr. Marcus Vance Sterling, MD',
      specialty: 'Director of Robotic Joint Replacement',
      department: 'Orthopedics & Joint Institute'
    },
    vitals: {
      bloodPressure: { systolic: 124, diastolic: 80, unit: 'mmHg', status: 'Normal' },
      heartRate: { value: 72, unit: 'bpm', status: 'Optimal' },
      spO2: { value: 98, unit: '%', status: 'Optimal' },
      bloodGlucose: { value: 104, fasting: true, unit: 'mg/dL', status: 'Normal' },
      bmi: { value: 25.1, status: 'Normal' },
      hba1c: { value: 5.6, unit: '%', status: 'Optimal' },
      lastRecorded: 'August 10, 2026 at 02:15 PM'
    }
  },
  {
    id: 'pt-3',
    mrn: 'WC-PT-31094',
    name: 'Elena Rostova',
    age: 36,
    gender: 'Female',
    dob: '1990-08-05',
    bloodGroup: 'B+',
    email: 'elena.rostova@example.com',
    phone: '+1 (555) 902-3341',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    address: '450 Lexington Ave, New York, NY 10017',
    emergencyContact: {
      name: 'Alexander Rostov',
      relationship: 'Brother',
      phone: '+1 (555) 332-1199'
    },
    allergies: ['NSAIDs (Ibuprofen / Aspirin sensitivity)'],
    chronicConditions: ['Cancer Genomic Surveillance (Post-Resection ctDNA Negative)'],
    insurance: {
      provider: 'Cigna Global Health Advantage',
      policyNumber: 'CGN-4491028',
      groupNumber: 'GRP-1049',
      coverageLimit: '$1,000,000 / Lifetime',
      status: 'Pre-Approved',
      validUntil: '2028-01-15'
    },
    primaryDoctor: {
      name: 'Dr. Evelyn Montgomery, BM BCh, FRCP',
      specialty: 'Head of Precision Oncology',
      department: 'Comprehensive Cancer Institute'
    },
    vitals: {
      bloodPressure: { systolic: 114, diastolic: 72, unit: 'mmHg', status: 'Optimal' },
      heartRate: { value: 64, unit: 'bpm', status: 'Optimal' },
      spO2: { value: 99, unit: '%', status: 'Optimal' },
      bloodGlucose: { value: 88, fasting: true, unit: 'mg/dL', status: 'Optimal' },
      bmi: { value: 21.2, status: 'Normal' },
      hba1c: { value: 5.0, unit: '%', status: 'Optimal' },
      lastRecorded: 'August 12, 2026 at 11:00 AM'
    }
  }
];

export const PATIENT_MEDICAL_RECORDS: Record<string, MedicalRecordEntry[]> = {
  'pt-1': [
    {
      id: 'rec-101',
      date: 'August 14, 2026',
      encounterType: 'Outpatient Consultation',
      departmentName: 'Cardiology & Heart Institute',
      attendingDoctor: 'Dr. Arthur Vance, MD, FACC',
      diagnosis: 'Stable Non-Obstructive Coronary Artery Calcification (CAC Score 24, Normal FFR-CT)',
      icd10Code: 'I25.10',
      clinicalSummary: 'Patient presented for annual cardiovascular precision review. 256-Slice Dual-Source Cardiac CT showed minimal non-calcified plaque in proximal LAD with an FFR-CT index of 0.88 (hemodynamically insignificant). Resting ECG normal sinus rhythm. Blood pressure controlled on low-dose therapy.',
      carePlan: 'Continue Rosuvastatin 5mg and Mediterranean polyphenol-rich nutrition. Maintain 150 min/week Zone-2 aerobic training. Follow-up lipid NMR panel in 6 months.',
      followUpAdvice: 'Repeat lipid profile and ApoB titration in February 2027.',
      vitalSummary: 'BP 118/76 mmHg | HR 68 bpm | SpO2 99% | BMI 22.4',
      attachments: [
        { title: 'FFR-CT 3D Coronary Hemodynamics Report', type: 'Imaging', url: '#' },
        { title: 'Lipid NMR & ApoB Advanced Biomarkers', type: 'Lab Report', url: '#' }
      ]
    },
    {
      id: 'rec-102',
      date: 'March 18, 2026',
      encounterType: 'Telehealth Review',
      departmentName: 'Gastroenterology Sciences',
      attendingDoctor: 'Dr. Rajeshwar Sen, MD',
      diagnosis: 'Functional Dyspepsia - Mild (Resolved)',
      icd10Code: 'K30',
      clinicalSummary: 'Virtual review following 4-week trial of dietary fiber optimization and probiotic supplementation. Symptoms of postprandial bloating have resolved completely. Patient reports 100% adherence to gut protocol.',
      carePlan: 'Continue gut microbiota maintenance diet with 35+ diverse plant fibers weekly. Discontinue OTC antacids.',
      followUpAdvice: 'As needed basis if symptoms recur.',
      vitalSummary: 'Self-reported BP 120/78 mmHg'
    },
    {
      id: 'rec-103',
      date: 'November 05, 2025',
      encounterType: 'Inpatient Admission',
      departmentName: 'Obstetrics & Gynecology',
      attendingDoctor: 'Dr. Vivienne LeClerc, MD',
      diagnosis: 'Hysteroscopic Polypectomy (Benign Endometrial Polyp Removal)',
      icd10Code: 'N84.0',
      clinicalSummary: 'Day-surgery hysteroscopy under light sedation. Total resection of 1.2cm benign fundal polyp with zero blood loss. Discharged after 4 hours of post-anesthesia observation in stable condition.',
      carePlan: 'Post-op analgesia with acetaminophen. Full pelvic rest for 10 days. Histopathology confirmed benign.',
      followUpAdvice: 'Routine annual pelvic ultrasound completed with clear cavity.',
      vitalSummary: 'BP 115/74 mmHg | HR 62 bpm | Discharged ambulatory',
      attachments: [
        { title: 'Surgical Operative & Pathology Report', type: 'Discharge Summary', url: '#' }
      ]
    }
  ],
  'pt-2': [
    {
      id: 'rec-201',
      date: 'August 08, 2026',
      encounterType: 'Outpatient Consultation',
      departmentName: 'Orthopedics & Joint Institute',
      attendingDoctor: 'Dr. Marcus Vance Sterling, MD',
      diagnosis: 'Post-Op 12-Week Right Knee Mako Robotic Arthroplasty (Excellent Recovery)',
      icd10Code: 'Z96.651',
      clinicalSummary: '12-week clinical milestone review. Active flexion 128°, full 0° extension achieved. Zero joint effusion or ligamentous laxity. Standing digital alignment radiographs show perfect implant seat at constitutional 2° varus. Patient walking 8,000 steps daily without cane.',
      carePlan: 'Graduate from physical therapy to independent home gym resistance program and pool swimming. Continue joint cartilage protective nutrition.',
      followUpAdvice: 'Routine 1-year implant surveillance x-ray in May 2027.',
      vitalSummary: 'BP 124/80 mmHg | HR 72 bpm | Knee Range: 0° - 128°',
      attachments: [
        { title: 'Digital Weight-Bearing Orthopedic X-Ray', type: 'Imaging', url: '#' },
        { title: 'Physical Therapy Milestone Scorecard', type: 'Lab Report', url: '#' }
      ]
    }
  ],
  'pt-3': [
    {
      id: 'rec-301',
      date: 'July 24, 2026',
      encounterType: 'Outpatient Consultation',
      departmentName: 'Comprehensive Cancer Institute',
      attendingDoctor: 'Dr. Evelyn Montgomery, BM BCh, FRCP',
      diagnosis: 'Molecular Residual Disease (MRD) Surveillance - ctDNA Negative (Complete Remission)',
      icd10Code: 'Z85.3',
      clinicalSummary: 'Liquid biopsy circulating tumor DNA (ctDNA) multiplex NGS panel showed 0.00% variant allele frequency across all tumor-informed mutations. Normal whole-body PET-CT metabolic scan.',
      carePlan: 'Continue surveillance protocol every 6 months. Maintain anti-inflammatory longevity diet and daily physical activity.',
      followUpAdvice: 'Next scheduled ctDNA blood draw in January 2027.',
      vitalSummary: 'BP 114/72 mmHg | HR 64 bpm | SpO2 99%'
    }
  ]
};

export const PATIENT_LAB_RESULTS: Record<string, LabResultReport[]> = {
  'pt-1': [
    {
      id: 'lab-101',
      testName: 'Advanced Cardiovascular Biomarkers & Lipid NMR Profile',
      category: 'Cardiology / Biomarkers',
      collectedDate: 'August 14, 2026 at 07:30 AM',
      reportedDate: 'August 14, 2026 at 11:15 AM',
      status: 'Reviewed by Doctor',
      authorDoctorName: 'Dr. Arthur Vance, MD, FACC',
      parameters: [
        { name: 'Total Cholesterol', value: '162', referenceRange: '< 200', unit: 'mg/dL', status: 'Normal' },
        { name: 'LDL-C (Calculated)', value: '58', referenceRange: '< 70 (High Risk) / < 100', unit: 'mg/dL', status: 'Normal' },
        { name: 'HDL-C (Good)', value: '68', referenceRange: '> 50', unit: 'mg/dL', status: 'Normal' },
        { name: 'Triglycerides', value: '84', referenceRange: '< 150', unit: 'mg/dL', status: 'Normal' },
        { name: 'Apolipoprotein B (ApoB)', value: '62', referenceRange: '< 80', unit: 'mg/dL', status: 'Normal' },
        { name: 'High-Sensitivity CRP (hs-CRP)', value: '0.45', referenceRange: '< 1.0 (Low Risk)', unit: 'mg/L', status: 'Normal' },
        { name: 'Lipoprotein(a)', value: '18', referenceRange: '< 30', unit: 'nmol/L', status: 'Normal' },
        { name: 'High-Sensitivity Troponin I', value: '< 1.2', referenceRange: '< 14.0', unit: 'ng/L', status: 'Normal' }
      ],
      clinicalInterpretation: 'Lipid panel demonstrates exceptional response to micro-dose statin therapy and lifestyle adherence. ApoB and LDL-C are safely below primary atherogenic thresholds. Systemic vascular inflammation (hs-CRP) is very low.',
      doctorNotes: 'Excellent numbers, Sarah. Keep up the morning Mediterranean diet and Zone-2 runs.'
    },
    {
      id: 'lab-102',
      testName: 'Comprehensive Metabolic Panel (CMP-14) & Renal Function',
      category: 'Biochemistry',
      collectedDate: 'August 14, 2026 at 07:30 AM',
      reportedDate: 'August 14, 2026 at 10:45 AM',
      status: 'Reviewed by Doctor',
      authorDoctorName: 'Dr. Arthur Vance, MD, FACC',
      parameters: [
        { name: 'Fasting Plasma Glucose', value: '92', referenceRange: '70 - 99', unit: 'mg/dL', status: 'Normal' },
        { name: 'Hemoglobin A1c (HbA1c)', value: '5.3', referenceRange: '< 5.7', unit: '%', status: 'Normal' },
        { name: 'Serum Creatinine', value: '0.82', referenceRange: '0.50 - 1.10', unit: 'mg/dL', status: 'Normal' },
        { name: 'eGFR (CKD-EPI)', value: '> 95', referenceRange: '> 60', unit: 'mL/min/1.73m²', status: 'Normal' },
        { name: 'Blood Urea Nitrogen (BUN)', value: '14', referenceRange: '7 - 20', unit: 'mg/dL', status: 'Normal' },
        { name: 'Sodium', value: '140', referenceRange: '135 - 145', unit: 'mEq/L', status: 'Normal' },
        { name: 'Potassium', value: '4.3', referenceRange: '3.5 - 5.0', unit: 'mEq/L', status: 'Normal' },
        { name: 'ALT (SGPT)', value: '18', referenceRange: '7 - 35', unit: 'U/L', status: 'Normal' },
        { name: 'AST (SGOT)', value: '20', referenceRange: '8 - 33', unit: 'U/L', status: 'Normal' }
      ],
      clinicalInterpretation: 'Renal filtration and hepatic transaminases are within optimal reference thresholds with excellent glycemic stability.',
      doctorNotes: 'Kidney and liver function are completely healthy.'
    },
    {
      id: 'lab-103',
      testName: 'Complete Blood Count (CBC with Automated Differential)',
      category: 'Hematology',
      collectedDate: 'August 14, 2026 at 07:30 AM',
      reportedDate: 'August 14, 2026 at 09:50 AM',
      status: 'Final',
      authorDoctorName: 'Dr. Arthur Vance, MD, FACC',
      parameters: [
        { name: 'Hemoglobin', value: '13.8', referenceRange: '12.0 - 15.5', unit: 'g/dL', status: 'Normal' },
        { name: 'Hematocrit', value: '41.2', referenceRange: '36.0 - 46.0', unit: '%', status: 'Normal' },
        { name: 'White Blood Cell Count (WBC)', value: '6.2', referenceRange: '4.5 - 11.0', unit: 'x10³/µL', status: 'Normal' },
        { name: 'Platelet Count', value: '264', referenceRange: '150 - 450', unit: 'x10³/µL', status: 'Normal' },
        { name: 'Mean Corpuscular Volume (MCV)', value: '88.5', referenceRange: '80.0 - 100.0', unit: 'fL', status: 'Normal' }
      ],
      clinicalInterpretation: 'Normal normocytic normochromic red cell indices with no evidence of cytopenia or infection.',
      doctorNotes: 'CBC parameters normal.'
    }
  ],
  'pt-2': [
    {
      id: 'lab-201',
      testName: 'Orthopedic Joint Inflammatory & Coagulation Panel',
      category: 'Hematology',
      collectedDate: 'August 08, 2026 at 08:00 AM',
      reportedDate: 'August 08, 2026 at 11:30 AM',
      status: 'Reviewed by Doctor',
      authorDoctorName: 'Dr. Marcus Vance Sterling, MD',
      parameters: [
        { name: 'Erythrocyte Sedimentation Rate (ESR)', value: '11', referenceRange: '0 - 20', unit: 'mm/hr', status: 'Normal' },
        { name: 'C-Reactive Protein (CRP)', value: '1.2', referenceRange: '< 3.0', unit: 'mg/L', status: 'Normal' },
        { name: 'Serum 25-OH Vitamin D3', value: '48.5', referenceRange: '30.0 - 100.0', unit: 'ng/mL', status: 'Normal' },
        { name: 'Serum Calcium', value: '9.6', referenceRange: '8.5 - 10.2', unit: 'mg/dL', status: 'Normal' }
      ],
      clinicalInterpretation: 'Zero post-operative peri-prosthetic inflammation. Excellent bone-mineral Vitamin D levels supporting osseointegration.',
      doctorNotes: 'Healing is ahead of schedule. Keep exercising daily.'
    }
  ],
  'pt-3': [
    {
      id: 'lab-301',
      testName: 'NextGen Liquid Biopsy: Circulating Tumor DNA (ctDNA) MRD Panel',
      category: 'Genomics & Oncology',
      collectedDate: 'July 24, 2026 at 09:00 AM',
      reportedDate: 'July 28, 2026 at 04:30 PM',
      status: 'Reviewed by Doctor',
      authorDoctorName: 'Dr. Evelyn Montgomery, BM BCh, FRCP',
      parameters: [
        { name: 'ctDNA Variant Allele Fraction (VAF)', value: '0.00%', referenceRange: '0.00% (Undetectable)', unit: '%', status: 'Normal' },
        { name: 'Tumor-Informed Somatic Mutation Track', value: 'Negative (0 / 16 tracked loci)', referenceRange: 'Negative', unit: 'Calls', status: 'Normal' },
        { name: 'CA 15-3 Biomarker', value: '12.4', referenceRange: '< 30.0', unit: 'U/mL', status: 'Normal' },
        { name: 'CEA (Carcinoembryonic Antigen)', value: '1.1', referenceRange: '< 3.0', unit: 'ng/mL', status: 'Normal' }
      ],
      clinicalInterpretation: 'Molecular Residual Disease (MRD) testing is strictly NEGATIVE with 99.8% analytical sensitivity. No microscopic tumor recurrence detected.',
      doctorNotes: 'Clean bill of health, Elena! The ctDNA remains completely negative.'
    }
  ]
};

export const PATIENT_PRESCRIPTIONS: Record<string, PrescriptionItem[]> = {
  'pt-1': [
    {
      id: 'rx-1',
      medicationName: 'Rosuvastatin Calcium',
      genericName: 'Rosuvastatin 5 mg Tablet',
      dosage: '5 mg',
      frequency: 'Once Daily',
      timing: 'At Bedtime',
      duration: '90 Days',
      startDate: '2026-06-01',
      endDate: '2026-09-01',
      prescribedBy: 'Dr. Arthur Vance, MD, FACC',
      departmentName: 'Cardiology & Heart Institute',
      instructions: 'Take 1 tablet at bedtime with or without food for arterial plaque stability.',
      refillsRemaining: 3,
      status: 'Active'
    },
    {
      id: 'rx-2',
      medicationName: 'Telmisartan 20 mg',
      genericName: 'Telmisartan 20 mg Oral Tablet',
      dosage: '20 mg',
      frequency: 'Once Daily',
      timing: 'Before Meals',
      duration: '90 Days',
      startDate: '2026-06-01',
      endDate: '2026-09-01',
      prescribedBy: 'Dr. Arthur Vance, MD, FACC',
      departmentName: 'Cardiology & Heart Institute',
      instructions: 'Take 1 tablet every morning with water. Maintains blood pressure below 120/80.',
      refillsRemaining: 2,
      status: 'Active'
    },
    {
      id: 'rx-3',
      medicationName: 'CoQ10 Ubiquinol High Absorption',
      genericName: 'Ubiquinol 100 mg Softgel',
      dosage: '100 mg',
      frequency: 'Once Daily',
      timing: 'With Food',
      duration: '90 Days',
      startDate: '2026-06-01',
      endDate: '2026-09-01',
      prescribedBy: 'Dr. Arthur Vance, MD, FACC',
      departmentName: 'Cardiology & Heart Institute',
      instructions: 'Mitochondrial cellular support alongside lipid protocol.',
      refillsRemaining: 4,
      status: 'Active'
    }
  ],
  'pt-2': [
    {
      id: 'rx-201',
      medicationName: 'Celecoxib 100 mg',
      genericName: 'Celecoxib Oral Capsule',
      dosage: '100 mg',
      frequency: 'As Needed (PRN)',
      timing: 'After Meals',
      duration: '30 Days',
      startDate: '2026-07-01',
      endDate: '2026-08-31',
      prescribedBy: 'Dr. Marcus Vance Sterling, MD',
      departmentName: 'Orthopedics & Joint Institute',
      instructions: 'Take only if experiencing mild post-rehabilitation exercise soreness.',
      refillsRemaining: 1,
      status: 'Active'
    },
    {
      id: 'rx-202',
      medicationName: 'Cholecalciferol (Vitamin D3)',
      genericName: 'Vitamin D3 2,000 IU Capsule',
      dosage: '2,000 IU',
      frequency: 'Once Daily',
      timing: 'With Food',
      duration: '180 Days',
      startDate: '2026-05-15',
      endDate: '2026-11-15',
      prescribedBy: 'Dr. Marcus Vance Sterling, MD',
      departmentName: 'Orthopedics & Joint Institute',
      instructions: 'Take with morning meal to optimize bone-implant osseointegration.',
      refillsRemaining: 2,
      status: 'Active'
    }
  ],
  'pt-3': [
    {
      id: 'rx-301',
      medicationName: 'Curcumin-Phospholipid Complex & Omega-3 EPA',
      genericName: 'Theracurmin 600mg + EPA 1000mg',
      dosage: '1 Packet Daily',
      frequency: 'Once Daily',
      timing: 'With Food',
      duration: '180 Days',
      startDate: '2026-04-01',
      endDate: '2026-10-01',
      prescribedBy: 'Dr. Evelyn Montgomery, BM BCh',
      departmentName: 'Comprehensive Cancer Institute',
      instructions: 'Anti-inflammatory wellness protocol for ongoing cellular surveillance.',
      refillsRemaining: 3,
      status: 'Active'
    }
  ]
};

export const PATIENT_BIOMETRIC_LOGS: Record<string, BiometricActivityLog[]> = {
  'pt-1': [
    {
      id: 'bio-log-101',
      patientId: 'pt-1',
      timestamp: 'August 15, 2026 at 06:42 PM',
      method: 'Face ID',
      device: 'Apple iPhone 16 Pro Max • iOS 19.4',
      ipAddress: '192.168.1.104 (Protected VPN)',
      location: 'New York, NY (Hospital Campus Wi-Fi)',
      status: 'Authorized',
      confidenceScore: 99.98,
      enclaveRef: 'SEC-ENC-7F4A-981'
    },
    {
      id: 'bio-log-102',
      patientId: 'pt-1',
      timestamp: 'August 14, 2026 at 09:28 AM',
      method: 'Touch ID',
      device: 'MacBook Pro 16" (M3 Max) • Safari 19.2',
      ipAddress: '172.56.21.88',
      location: 'New York, NY (Residential Gateway)',
      status: 'Verified',
      confidenceScore: 99.99,
      enclaveRef: 'SEC-ENC-3C81-442'
    },
    {
      id: 'bio-log-103',
      patientId: 'pt-1',
      timestamp: 'August 11, 2026 at 03:15 PM',
      method: 'Face ID',
      device: 'iPad Pro 13" (M4) • iPadOS 19.4',
      ipAddress: '192.168.1.112',
      location: 'New York, NY (Cardiology Clinic Waiting Lounge)',
      status: 'Enclave Decrypted',
      confidenceScore: 99.95,
      enclaveRef: 'SEC-ENC-99D2-110'
    }
  ],
  'pt-2': [
    {
      id: 'bio-log-201',
      patientId: 'pt-2',
      timestamp: 'August 15, 2026 at 11:30 AM',
      method: 'Touch ID',
      device: 'Samsung Galaxy S26 Ultra • Chrome 134',
      ipAddress: '198.51.100.42',
      location: 'Brooklyn, NY (Orthopedics Outpatient Wi-Fi)',
      status: 'Authorized',
      confidenceScore: 99.97,
      enclaveRef: 'SEC-ENC-88B1-992'
    },
    {
      id: 'bio-log-202',
      patientId: 'pt-2',
      timestamp: 'August 10, 2026 at 02:10 PM',
      method: 'PIN Fallback',
      device: 'Hospital Patient Kiosk #4 • Touch Terminal',
      ipAddress: '10.200.4.15',
      location: 'We Care Hospital Main Lobby',
      status: 'Verified',
      confidenceScore: 100.0,
      enclaveRef: 'SEC-PIN-4412-008'
    }
  ],
  'pt-3': [
    {
      id: 'bio-log-301',
      patientId: 'pt-3',
      timestamp: 'August 13, 2026 at 10:05 AM',
      method: 'Face ID',
      device: 'Apple iPhone 15 Pro • iOS 19.4',
      ipAddress: '198.51.100.77',
      location: 'New York, NY (Cancer Institute Telehealth)',
      status: 'Authorized',
      confidenceScore: 99.99,
      enclaveRef: 'SEC-ENC-55E3-771'
    }
  ]
};

