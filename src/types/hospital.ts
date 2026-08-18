export interface Doctor {
  id: string;
  name: string;
  title: string;
  departmentId: string;
  specialty: string;
  subSpecialties: string[];
  qualifications: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  image: string;
  bio: string;
  opdDays: string[];
  timings: string;
  fee: number;
  languages: string[];
  awards: string[];
  education: string[];
  isTeleconsultAvailable: boolean;
  isHeadOfDept?: boolean;
  badges: string[];
  nextAvailableSlot: string;
}

export interface Department {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  iconName: string;
  category: 'Surgical' | 'Medical' | 'Critical' | 'Diagnostic' | 'Women & Child';
  description: string;
  highlights: string[];
  stats: { label: string; value: string }[];
  leadDoctorId: string;
  emergencyAvailable: boolean;
  technologies: string[];
  procedures: string[];
  image: string;
  patientGuide: string;
}

export interface ClinicalService {
  id: string;
  title: string;
  category: 'Diagnostic' | 'Surgical' | 'Therapy' | 'Emergency' | 'Wellness';
  description: string;
  duration: string;
  price: string;
  iconName: string;
  features: string[];
  preparationTips: string;
  includesHomeCollection: boolean;
  turnaroundTime: string;
}

export interface HealthPackage {
  id: string;
  name: string;
  tagline: string;
  tag?: string;
  popular?: boolean;
  price: number;
  originalPrice: number;
  testsCount: number;
  fastingRequired: boolean;
  fastingHours?: number;
  reportTime: string;
  includedCategories: {
    category: string;
    tests: string[];
  }[];
  idealFor: string;
  image: string;
}

export interface Appointment {
  id: string;
  bookingReference: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  doctorId: string;
  doctorName: string;
  departmentId: string;
  departmentName: string;
  branchId?: string;
  branchName?: string;
  serviceType: string;
  date: string;
  timeSlot: string;
  consultType: 'In-Person' | 'Video Tele-Consult' | 'Home Visit';
  symptoms: string;
  status: 'Confirmed' | 'Completed' | 'Rescheduled' | 'Cancelled';
  paymentStatus: 'Paid' | 'Pay at Hospital' | 'Covered by Insurance';
  fee?: number;
  insuranceProvider?: string;
  policyNumber?: string;
  notes?: string;
  createdAt: string;
  tokenNumber: number;
  qrCodeSeed: string;
}

export interface Facility {
  id: string;
  name: string;
  category: 'Surgical Suites' | 'Diagnostic Imaging' | 'Critical Care' | 'Patient Rooms' | 'Robotics & AI';
  description: string;
  image: string;
  features: string[];
  specs: string[];
  badge?: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  age: number;
  location: string;
  condition: string;
  doctorName: string;
  department: string;
  story: string;
  quote: string;
  rating: number;
  avatar: string;
  outcomeStats: string;
  date: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Appointments' | 'Insurance & Billing' | 'Emergency' | 'International Patients';
}

export interface HealthArticle {
  id: string;
  title: string;
  subtitle: string;
  departmentId: string;
  departmentName: string;
  category: 'Breakthrough' | 'Clinical Guide' | 'Preventive Wellness' | 'Longevity' | 'Nutrition & Lifestyle';
  readTime: string;
  publishedDate: string;
  authorDoctorId?: string;
  authorDoctorName: string;
  authorRole: string;
  doctorAvatar: string;
  coverImage: string;
  summary: string;
  evidenceLevel: string; // e.g. 'Level 1: Clinical Trial (NEJM 2026)'
  keyTakeaways: string[];
  fullContent: string[];
  clinicalImplications: string;
  actionableSteps: string[];
  isAiCurated?: boolean;
  featured?: boolean;
  tags: string[];
}

export interface HealthTip {
  id: string;
  title: string;
  departmentId: string;
  departmentName: string;
  tip: string;
  actionItem: string;
  evidenceSource: string;
  authorDoctorName: string;
  category: string;
}

export interface PatientProfile {
  id: string;
  mrn: string; // Medical Record Number
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  bloodGroup: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  allergies: string[];
  chronicConditions: string[];
  insurance: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
    coverageLimit: string;
    status: 'Active' | 'Pre-Approved' | 'Renewal Needed';
    validUntil: string;
  };
  primaryDoctor: {
    name: string;
    specialty: string;
    department: string;
  };
  vitals: {
    bloodPressure: { systolic: number; diastolic: number; unit: string; status: 'Optimal' | 'Normal' | 'Elevated' };
    heartRate: { value: number; unit: string; status: 'Optimal' | 'Normal' | 'Elevated' };
    spO2: { value: number; unit: string; status: 'Optimal' | 'Normal' };
    bloodGlucose: { value: number; fasting: boolean; unit: string; status: 'Optimal' | 'Normal' | 'Elevated' };
    bmi: { value: number; status: 'Normal' | 'Underweight' | 'Overweight' };
    hba1c?: { value: number; unit: string; status: 'Optimal' | 'Borderline' | 'Elevated' };
    lastRecorded: string;
  };
}

export interface MedicalRecordEntry {
  id: string;
  date: string;
  encounterType: 'Outpatient Consultation' | 'Inpatient Admission' | 'Emergency Care' | 'Telehealth Review' | 'Surgical Procedure';
  departmentName: string;
  attendingDoctor: string;
  diagnosis: string;
  icd10Code: string;
  clinicalSummary: string;
  carePlan: string;
  followUpAdvice: string;
  vitalSummary?: string;
  attachments?: { title: string; type: 'Lab Report' | 'Imaging' | 'Discharge Summary'; url: string }[];
}

export interface LabResultReport {
  id: string;
  testName: string;
  category: 'Hematology' | 'Biochemistry' | 'Cardiology / Biomarkers' | 'Genomics & Oncology' | 'Radiology & Imaging' | 'Endocrinology';
  collectedDate: string;
  reportedDate: string;
  status: 'Final' | 'Reviewed by Doctor' | 'Critical Flag';
  authorDoctorName: string;
  parameters: {
    name: string;
    value: string;
    referenceRange: string;
    unit: string;
    status: 'Normal' | 'High' | 'Low' | 'Critical';
  }[];
  clinicalInterpretation: string;
  doctorNotes: string;
  imagingUrl?: string;
}

export interface PrescriptionItem {
  id: string;
  medicationName: string;
  genericName: string;
  dosage: string;
  frequency: string;
  timing: 'Before Meals' | 'After Meals' | 'At Bedtime' | 'With Food';
  duration: string;
  startDate: string;
  endDate: string;
  prescribedBy: string;
  departmentName: string;
  instructions: string;
  refillsRemaining: number;
  status: 'Active' | 'Completed' | 'Discontinued';
}

export interface BiometricActivityLog {
  id: string;
  patientId: string;
  timestamp: string;
  method: 'Face ID' | 'Touch ID' | 'PIN Fallback' | 'Demo Fast-Auth';
  device: string;
  ipAddress: string;
  location: string;
  status: 'Authorized' | 'Enclave Decrypted' | 'Verified';
  confidenceScore?: number;
  enclaveRef: string;
}

export interface ConsultationReportMedication {
  name: string;
  generic: string;
  dosage: string;
  frequency: string;
  timing: 'Before Food' | 'After Food' | 'With Meals' | 'At Bedtime' | 'As Needed / At Onset' | 'With Food' | string;
  duration: string;
  instructions: string;
}

export interface ConsultationReport {
  id: string;
  reportNumber: string;
  encounterDate: string;
  appointmentId?: string;
  patientName: string;
  patientId: string;
  patientMrn: string;
  patientAge: number;
  patientGender: 'Male' | 'Female' | 'Other';
  patientPhone: string;
  patientEmail: string;
  doctorId: string;
  doctorName: string;
  doctorTitle: string;
  doctorSpecialty: string;
  doctorQualification: string;
  doctorRegNumber: string;
  departmentName: string;
  consultationType: 'In-Person OPD' | 'Video Tele-Consult' | 'Emergency Follow-up';
  chiefComplaints: string[];
  vitals: {
    bp: string;
    pulse: string;
    temp: string;
    spo2: string;
    weight: string;
    bmi: string;
  };
  provisionalDiagnosis: string;
  icd10Code: string;
  clinicalFindings: string;
  prescribedMedications: ConsultationReportMedication[];
  investigationsOrdered: string[];
  dietAndLifestyleAdvice: string[];
  followUpDate: string;
  warningSigns: string;
  digitalSignature: {
    signedBy: string;
    timestamp: string;
    signatureHash: string;
  };
  qrVerificationUrl: string;
}

export interface RecommendedMedicineItem {
  rank: number;
  brandName: string;
  genericName: string;
  drugClass: string;
  standardDosage: string;
  frequencyAndTiming: string;
  mechanismOfAction: string;
  keyBenefits: string;
  precautions: string;
  prescriptionStatus: 'Rx Required' | 'OTC / Over-the-Counter' | 'Hospital Administered';
}

export interface DiseaseMedicineGuide {
  id: string;
  diseaseName: string;
  category: 'Cardiovascular' | 'Endocrine & Metabolic' | 'Respiratory' | 'Gastroenterology' | 'Neurology & Pain' | 'Infectious & General' | 'Orthopedics & Joint' | 'Allergy & ENT' | 'Urology & Kidney' | 'Mental Wellness';
  departmentName: string;
  departmentId: string;
  severityLevel: 'Common & Mild' | 'Moderate' | 'Chronic Management' | 'Requires Urgent Review';
  overview: string;
  commonSymptoms: string[];
  recommendedMedicines: RecommendedMedicineItem[];
  lifestyleAndNonPharmaTips: string[];
  whenToSeeDoctor: string;
  contraindicationsNote: string;
}

export interface AIMedicationItem {
  rank: number;
  brandName: string;
  genericName: string;
  drugClass: string;
  standardDosage: string;
  frequencyAndTiming: string;
  prescriptionStatus: 'Rx Required' | 'OTC / Over-the-Counter' | 'Hospital Administered' | string;
  efficacyRank: string;
  mechanismOfAction: string;
  keyBenefits: string;
  precautions: string;
  commonSideEffects?: string[];
}

export interface BranchDepartmentAvailability {
  departmentId: string;
  departmentName: string;
  isAvailable: boolean;
  status: 'Full Inpatient & Robotic Surgery' | 'Outpatient OPD & Day Care' | 'Advanced Diagnostics & Chemotherapy' | 'Emergency Only' | 'Not Available';
  leadDoctorName: string;
  nextSlot: string;
  operatingSuites?: number;
  keyServices: string[];
}

export interface HospitalBranch {
  id: string;
  name: string;
  tagline: string;
  type: 'Main Medical City' | 'Surgical & Cardiac Pavilion' | 'Cancer & Research Institute' | 'Children & Women Hospital' | 'Emergency & Trauma Hub' | 'Ambulatory & Diagnostic Care';
  address: string;
  district: string;
  city: string;
  coordinates: { x: number; y: number }; // Relative percentage on interactive map canvas (0-100)
  geoCoords: { lat: number; lng: number };
  distanceFromCenter: string;
  travelTime: {
    drive: string;
    transit: string;
    ambulance: string;
  };
  phone: string;
  emergencyPhone: string;
  openHours: string;
  emergencyAvailable: boolean;
  bedCapacity: number;
  availableBeds: number;
  erWaitTime: string;
  rating: number;
  reviewCount: number;
  image: string;
  amenities: string[];
  departmentAvailability: BranchDepartmentAvailability[];
  specialtyBadges: string[];
}

export interface AIMedicationSearchResult {
  diseaseQuery: string;
  diseaseName: string;
  category: string;
  severityLevel: string;
  overview: string;
  urgencyLevel: 'Routine' | 'Urgent' | 'Emergency' | string;
  primaryDepartmentId: string;
  primaryDepartmentName: string;
  recommendedDoctorId: string;
  recommendedDoctorName: string;
  doctorSpecialty: string;
  doctorAvatar: string;
  medications: AIMedicationItem[];
  lifestyleProtocols?: string[];
  recommendedDiagnostics?: string[];
  redFlagSymptoms?: string[];
  clinicalDisclaimer?: string;
  isAiGenerated?: boolean;
  lifestyleAndHomeCare?: string[];
  whenToSeekEmergencyCare?: string[];
  disclaimer?: string;
}





