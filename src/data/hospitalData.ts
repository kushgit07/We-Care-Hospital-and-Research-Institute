import { Department, Doctor, ClinicalService, HealthPackage, Facility, Testimonial, FAQItem, Appointment, HealthArticle, HealthTip } from '../types/hospital';

export const HOSPITAL_INFO = {
  name: 'We Care Hospital & Research Institute',
  shortName: 'We Care Hospital',
  tagline: 'Leading the Future of Medicine with Human Compassion',
  address: '450 Health Sciences Boulevard, Medical District, NY 10016',
  phoneEmergency: '+1 (800) 932-2731',
  phoneAppointments: '+1 (800) 932-2732',
  phoneGeneral: '+1 (212) 555-0199',
  email: 'care@wecarehospital.org',
  emergencyEmail: 'er-triage@wecarehospital.org',
  established: 1998,
  accreditations: ['JCI Gold Seal of Approval', 'NABH Accredited Tertiary Center', 'ISO 9001:2015', 'CAP Certified Laboratories', 'Magnet Nursing Excellence'],
  stats: {
    beds: 750,
    specialists: 380,
    annualSurgeries: 45000,
    patientSatisfaction: '99.4%',
    icuBeds: 160,
    roboticSurgeriesDone: 12500,
    emergencyResponseAvgMinutes: 7.8,
    yearsOfExcellence: 28,
  }
};

export const DEPARTMENTS: Department[] = [
  {
    id: 'dept-cardio',
    name: 'Cardiology & Heart Vascular Institute',
    slug: 'cardiology',
    tagline: 'Precision cardiovascular care & minimally invasive hybrid cardiac surgery',
    iconName: 'HeartPulse',
    category: 'Surgical',
    description: 'Our Heart Institute is recognized globally for breakthrough cardiac interventions, robotic bypass procedures, TAVR, and electrophysiology treatments with 99.2% success rates.',
    highlights: [
      '24/7 Primary Angioplasty & Door-to-Balloon time < 45 mins',
      'Dual-source Siemens Somatom Force CT Coronary Angiography',
      'Hybrid Operating Suites for complex aortic aneurysm repairs',
      'Dedicated Pediatric Cardiac ICU with ECMO support'
    ],
    stats: [
      { label: 'Angioplasties / Year', value: '4,200+' },
      { label: 'Surgical Success', value: '99.2%' },
      { label: 'Cath Labs', value: '5 Hybrid' }
    ],
    leadDoctorId: 'doc-1',
    emergencyAvailable: true,
    technologies: ['Siemens Artis Pheno Hybrid Cath Lab', '3D Carto-3 Cardiac Mapping', 'Impella Heart Pump', 'TAVR Valve Suite'],
    procedures: ['Coronary Angioplasty & Stenting', 'Robotic CABG', 'TAVR & Mitraclip', 'Pacemaker & ICD Implantation', 'Heart Failure Management'],
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80',
    patientGuide: 'Please bring your previous ECG records, lipid profile results, and a list of current medications.'
  },
  {
    id: 'dept-neuro',
    name: 'Neurology, Neurosurgery & Spine Institute',
    slug: 'neurology',
    tagline: 'Advanced brain tumor microsurgery, stroke intervention & endoscopic spine care',
    iconName: 'Brain',
    category: 'Surgical',
    description: 'Equipped with intraoperative 3T MRI and AI-guided stereotactic neuronavigation, our neurosurgeons treat acute ischemic strokes, brain aneurysms, and complex spine disorders.',
    highlights: [
      'Comprehensive Stroke Center with IV tPA & Thrombectomy < 30 mins',
      'Intraoperative Brain Mapping for eloquent cortex tumors',
      'Deep Brain Stimulation (DBS) for Parkinson’s & Dystonia',
      'Minimally Invasive Tubular Spine Endoscopy'
    ],
    stats: [
      { label: 'Neuro Surgeries / Yr', value: '3,100+' },
      { label: 'Stroke Window Time', value: '< 28 min' },
      { label: 'DBS Success', value: '98.6%' }
    ],
    leadDoctorId: 'doc-3',
    emergencyAvailable: true,
    technologies: ['BrainLAB Curve 3D Navigation', 'Zeiss Kinevo 900 4K 3D Microscope', 'Intraoperative 3T MRI Suite', 'Neuromonitoring NIM-Eclipse'],
    procedures: ['Awake Craniotomy', 'Mechanical Thrombectomy', 'Endoscopic Pituitary Surgery', 'Microdiscectomy & Spine Fusion', 'Epilepsy Surgery'],
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    patientGuide: 'Fast for 4 hours before MRI/CT contrast studies. Bring past MRI/CT scan films and neurology reports.'
  },
  {
    id: 'dept-onco',
    name: 'Comprehensive Cancer Institute',
    slug: 'oncology',
    tagline: 'Immunotherapy, robotic surgical oncology & TrueBeam precision radiotherapy',
    iconName: 'Activity',
    category: 'Surgical',
    description: 'A multi-disciplinary cancer care sanctuary combining genomics, targeted immunotherapy, DaVinci robotic resection, and TrueBeam stereotactic radiosurgery for maximum organ preservation.',
    highlights: [
      'Tumor Board review for 100% personalized precision protocols',
      'Varian TrueBeam Linear Accelerator with sub-millimeter accuracy',
      'CAR-T Cell Therapy and Bone Marrow Transplant Unit',
      'Daycare Chemotherapy Lounge with scalp-cooling hair preservation'
    ],
    stats: [
      { label: 'Cancer Patients Healed', value: '18,500+' },
      { label: 'Organ Preservations', value: '94%' },
      { label: 'BMT Unit Beds', value: '24 Class 100' }
    ],
    leadDoctorId: 'doc-5',
    emergencyAvailable: true,
    technologies: ['Varian TrueBeam STx', 'DaVinci Xi Surgical Robot', 'Next-Gen Sequencing Genomic Panel', 'PET-CT Digital Discovery'],
    procedures: ['Robotic Onco-Resection', 'Stereotactic Radiosurgery (SRS/SBRT)', 'Immunotherapy & Targeted Infusion', 'Autologous & Allogeneic BMT'],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    patientGuide: 'Bring all biopsy histopathology slides, IHC markers, and imaging scans in digital or film format.'
  },
  {
    id: 'dept-ortho',
    name: 'Orthopedics & Robotic Joint Replacement',
    slug: 'orthopedics',
    tagline: 'Mako robotic knee & hip arthroplasty, sports medicine & trauma reconstruction',
    iconName: 'Bone',
    category: 'Surgical',
    description: 'Pioneering ultra-precise Mako SmartRobotics for total and partial joint replacements with faster same-day mobilization, minimal blood loss, and rapid return to active life.',
    highlights: [
      'Mako Robotic Arm-Assisted Knee & Hip Joint Arthroplasty',
      'Arthroscopic Keyhole Surgery for ACL, PCL, and Meniscus Tears',
      'Same-day Rapid Recovery Program with specialized physical rehab',
      'Complex Pelvic & Acetabular Fracture Care'
    ],
    stats: [
      { label: 'Robotic Joints Replaced', value: '8,400+' },
      { label: 'Discharge in 48h', value: '96%' },
      { label: 'Patient Mobility Score', value: '99.1%' }
    ],
    leadDoctorId: 'doc-7',
    emergencyAvailable: true,
    technologies: ['Stryker Mako Robotic Arm', 'Smith & Nephew 4K Arthroscopy', 'Dynamic Gait Analysis Lab', 'Computer Navigation OrthoPilot'],
    procedures: ['Robotic Total Knee Replacement', 'Direct Anterior Hip Replacement', 'Shoulder Rotator Cuff Arthroscopy', 'Complex Trauma Reconstruction'],
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
    patientGuide: 'Wear comfortable athletic attire. Bring prior X-rays, MRI scans, and walking aids if used.'
  },
  {
    id: 'dept-gastro',
    name: 'Gastroenterology & Hepatobiliary Sciences',
    slug: 'gastroenterology',
    tagline: 'Advanced therapeutic endoscopy, liver transplant & metabolic GI surgery',
    iconName: 'Stethoscope',
    category: 'Medical',
    description: 'Comprehensive center for GI bleeding, inflammatory bowel diseases, liver cirrhosis, fatty liver reversal, endoscopic ultrasound (EUS), and liver transplants.',
    highlights: [
      'Third-Space Endoscopy: POEM, ESD, and EMR for early tumors',
      'Advanced Living Donor & Deceased Donor Liver Transplant program',
      'Endoscopic Retrograde Cholangiopancreatography (ERCP)',
      'Fibroscan non-invasive liver stiffness mapping'
    ],
    stats: [
      { label: 'Endoscopies / Year', value: '11,000+' },
      { label: 'Liver Transplants', value: '450+' },
      { label: 'Transplant Survival', value: '96.8%' }
    ],
    leadDoctorId: 'doc-9',
    emergencyAvailable: true,
    technologies: ['Olympus EVIS X1 Endoscopy System', 'SpyGlass DS Direct Cholangioscopy', 'Echosens Fibroscan 630 Expert'],
    procedures: ['Gastroscopy & Colonoscopy', 'ERCP Bile Duct Stone Clearance', 'Endoscopic Mucosal Resection (EMR)', 'Living Donor Liver Transplant'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    patientGuide: 'For upper GI endoscopy: fast for at least 8 hours. For colonoscopy: complete prescribed bowel preparation kit.'
  },
  {
    id: 'dept-peds',
    name: 'Pediatrics & Advanced Neonatal ICU',
    slug: 'pediatrics',
    tagline: 'Level IV NICU, pediatric sub-specialties & compassionate child-friendly care',
    iconName: 'Baby',
    category: 'Women & Child',
    description: 'Dedicated 24/7 pediatric emergency, pediatric intensive care (PICU), and Level IV NICU caring for micro-preemies starting at 24 weeks gestation with developmental follow-up.',
    highlights: [
      'Level IV Neonatal Intensive Care Unit (NICU) with Giraffe incubators',
      'Pediatric Cardiology, Neurology, and Pediatric Surgery specialists',
      'Child-life specialists & painless vaccination suites',
      'High-frequency oscillatory ventilation & Nitric Oxide therapy'
    ],
    stats: [
      { label: 'Preemies Saved', value: '4,500+' },
      { label: 'NICU Bed Capacity', value: '45 Beds' },
      { label: 'Surgeries on Infants', value: '1,200+' }
    ],
    leadDoctorId: 'doc-11',
    emergencyAvailable: true,
    technologies: ['GE Giraffe Omnibed Carestation', 'Dräger Babylog VN500 Ventilators', 'RetCam Neonatal Eye Imaging'],
    procedures: ['Neonatal Intensive Care', 'Pediatric Minimally Invasive Surgery', 'Congenital Heart Defect Repair', 'Vaccination & Milestone Tracking'],
    image: 'https://images.unsplash.com/photo-1502740479091-635887520276?auto=format&fit=crop&w=1200&q=80',
    patientGuide: 'Bring immunization records and birth summary records. Pediatric emergency desk is open 24 hours.'
  },
  {
    id: 'dept-obgyn',
    name: 'Obstetrics, Gynecology & Fertility (IVF)',
    slug: 'obgyn',
    tagline: 'Luxury birthing suites, high-risk pregnancy care & advanced IVF genetics',
    iconName: 'Sparkles',
    category: 'Women & Child',
    description: 'Holistic women-centric care encompassing natural gentle births in boutique LDRP suites, fetal medicine, advanced laparoscopic hysterectomy, and high-success IVF programs.',
    highlights: [
      'Private LDRP (Labor, Delivery, Recovery, Postpartum) luxury suites',
      'Advanced Fetal Medicine Unit with 4D HD-Live ultrasonography',
      'Robotic single-site surgery for endometriosis and fibroids',
      'High-success IVF clinic with Preimplantation Genetic Testing (PGT-A)'
    ],
    stats: [
      { label: 'Safe Deliveries', value: '26,000+' },
      { label: 'IVF Success Rate', value: '74.2%' },
      { label: 'LDRP Suites', value: '18 Private' }
    ],
    leadDoctorId: 'doc-13',
    emergencyAvailable: true,
    technologies: ['GE Voluson E10 Ultrasound with HD-Live', 'RI Witness IVF Security System', 'Storz 3D Laparoscopy'],
    procedures: ['Painless Epidural Delivery', 'High-Risk Pregnancy Management', 'Robotic Myomectomy', 'IVF & ICSI Embryo Transfer'],
    image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&w=1200&q=80',
    patientGuide: 'Prenatal ultrasound patients should drink 2 glasses of water 1 hour prior. Partner accompaniment welcome.'
  },
  {
    id: 'dept-renal',
    name: 'Nephrology, Urology & Kidney Transplant',
    slug: 'urology-nephrology',
    tagline: 'Laser stone ablation, hemodialysis & precision kidney transplants',
    iconName: 'ShieldCheck',
    category: 'Surgical',
    description: 'Center of excellence for kidney disease management, 24/7 dialysis suites with ultrapure water systems, robotic prostate surgery, and living/deceased donor kidney transplants.',
    highlights: [
      'Robotic-Assisted Laparoscopic Kidney Transplantation',
      'Holmium & Thulium Laser Enucleation of Prostate (HoLEP)',
      'Retrograde Intrarenal Surgery (RIRS) for dustless kidney stone removal',
      'CRRT and Slow Continuous Ultrafiltration for critically ill patients'
    ],
    stats: [
      { label: 'Kidney Transplants', value: '1,850+' },
      { label: 'Stone Clearances', value: '9,200+' },
      { label: 'Dialysis Sessions / Mo', value: '3,500+' }
    ],
    leadDoctorId: 'doc-15',
    emergencyAvailable: true,
    technologies: ['Lumenis Moses 2.0 Holmium Laser', 'Fresenius 5008S Hemodiafiltration', 'DaVinci Xi Robotic System'],
    procedures: ['Robotic Kidney Transplant', 'RIRS Laser Stone Fragmentation', 'HoLEP Prostate Laser Enucleation', 'Nocturnal & Online Hemodialysis'],
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    patientGuide: 'Serum creatinine and ultrasound KUB records required for renal consultations.'
  },
  {
    id: 'dept-eye',
    name: 'Ophthalmology & Refractive Eye Institute',
    slug: 'ophthalmology',
    tagline: 'Blade-free SMILE Pro laser, robotic cataract & micro-retinal surgery',
    iconName: 'Eye',
    category: 'Medical',
    description: 'World-class vision center featuring SMILE Pro refractive correction, premium multifocal lens implantation, vitreo-retinal surgery, and corneal transplant surgery.',
    highlights: [
      'Carl Zeiss VisuMax 800 SMILE Pro Laser (10 seconds laser time)',
      'Femtosecond Laser-Assisted Cataract Surgery (FLACS)',
      'Anti-VEGF intravitreal injection clinic for Macular Degeneration',
      'Pediatric strabismus & amblyopia treatment center'
    ],
    stats: [
      { label: 'Laser Vision Procedures', value: '22,000+' },
      { label: 'Cataract Success Rate', value: '99.7%' },
      { label: 'Corneal Transplants', value: '650+' }
    ],
    leadDoctorId: 'doc-17',
    emergencyAvailable: false,
    technologies: ['Zeiss VisuMax 800 SMILE Pro', 'Alcon Centurion Vision System', 'Optos Daytona Ultra-widefield Fundus'],
    procedures: ['SMILE Pro Refractive Surgery', 'Robotic FLACS Cataract Surgery', 'Vitrectomy for Retinal Detachment', 'Glaucoma Valve Implantation'],
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    patientGuide: 'Eye dilation may blur your vision for 2-3 hours. Please bring sunglasses and arrange for a driver.'
  },
  {
    id: 'dept-emergency',
    name: '24/7 Emergency & Level 1 Trauma Care',
    slug: 'emergency-trauma',
    tagline: 'Immediate multi-disciplinary life-saving resuscitation with zero triage delay',
    iconName: 'Ambulance',
    category: 'Critical',
    description: 'Certified Level-1 Emergency & Trauma Center with rooftop helipad, dedicated red-zone resuscitation bays, in-situ CT scanner, and on-site emergency surgeons ready 24/7.',
    highlights: [
      'Door-to-Doctor initial evaluation in under 3 minutes',
      'Advanced cardiac life support (ACLS) & trauma resuscitation protocols',
      'Mobile ICU Ambulances with real-time telemetry to hospital ER',
      'Dedicated rooftop helipad for swift regional air ambulance transfer'
    ],
    stats: [
      { label: 'Door to Triage', value: '< 3 mins' },
      { label: 'Trauma Resuscitation', value: '99.4%' },
      { label: 'Mobile ICU Fleet', value: '18 Units' }
    ],
    leadDoctorId: 'doc-19',
    emergencyAvailable: true,
    technologies: ['Dedicated Siemens Somatom GO ER CT', 'Point-of-Care Ultrasound (POCUS)', 'Zoll X-Series Cardiac Defibrillators'],
    procedures: ['Polytrauma Damage Control', 'Acute Cardiac & Stroke Resuscitation', 'Toxicology & Snakebite Antivenom', 'Emergency Airway & Thoracotomy'],
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    patientGuide: 'No prior appointment needed. Walk-in or call emergency hotline 24/7 at +1 (800) 932-2731.'
  }
];

export const DOCTORS: Doctor[] = [
  // Cardiology
  {
    id: 'doc-1',
    name: 'Dr. Arthur Vance, MD, FACC, FSCAI',
    title: 'Director & Chief of Cardiovascular Sciences',
    departmentId: 'dept-cardio',
    specialty: 'Interventional Cardiology & Structural Heart',
    subSpecialties: ['TAVR / TAVI', 'Complex Bifurcation Angioplasty', 'Left Main Stenting', 'Mitraclip'],
    qualifications: 'MD (Cardiology), Harvard Medical School | Fellowship in Interventional Cardiology, Cleveland Clinic',
    experienceYears: 24,
    rating: 4.98,
    reviewCount: 482,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Arthur Vance is an internationally celebrated interventional cardiologist who has performed over 12,000 coronary interventions and pioneered transcatheter aortic valve replacement techniques.',
    opdDays: ['Mon', 'Tue', 'Wed', 'Fri'],
    timings: '09:00 AM - 02:00 PM',
    fee: 220,
    languages: ['English', 'French'],
    awards: ['Lifetime Achievement in Cardiology 2023', 'Top Cardiologist Award - NY Medical Board (2020-2025)'],
    education: ['MD, Harvard Medical School', 'Residency in Internal Medicine, Johns Hopkins', 'Fellowship, Cleveland Clinic'],
    isTeleconsultAvailable: true,
    isHeadOfDept: true,
    badges: ['Head of Department', 'Top Rated', '12K+ Angioplasties'],
    nextAvailableSlot: 'Today, 02:30 PM'
  },
  {
    id: 'doc-2',
    name: 'Dr. Elena Rostova, MD, FACS',
    title: 'Senior Consultant - Cardiothoracic & Robotic Surgery',
    departmentId: 'dept-cardio',
    specialty: 'Minimally Invasive Cardiac Surgery',
    subSpecialties: ['Robotic CABG', 'Aortic Root Reconstruction', 'Heart Valve Repair', 'ECMO'],
    qualifications: 'MD, Johns Hopkins University | Fellowship in Thoracic Surgery, Mayo Clinic',
    experienceYears: 18,
    rating: 4.95,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1594824813576-96b6f04d7c04?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Rostova is a leader in robotic coronary bypass surgery and minimally invasive valve reconstruction, having delivered keynote lectures across 20+ countries.',
    opdDays: ['Tue', 'Thu', 'Sat'],
    timings: '10:00 AM - 04:00 PM',
    fee: 200,
    languages: ['English', 'Russian', 'German'],
    awards: ['Surgical Innovator Medal 2024', 'Women in Thoracic Surgery Pioneer'],
    education: ['MD, Johns Hopkins University', 'Surgical Residency, Mass General Hospital'],
    isTeleconsultAvailable: true,
    badges: ['Robotic Surgeon', 'Gold Medalist'],
    nextAvailableSlot: 'Tomorrow, 10:15 AM'
  },
  // Neurology
  {
    id: 'doc-3',
    name: 'Dr. Julian Sterling, MD, PhD, FAANS',
    title: 'Director & Chief of Neurosurgery & Spine',
    departmentId: 'dept-neuro',
    specialty: 'Cerebrovascular & Skull Base Neurosurgery',
    subSpecialties: ['Aneurysm Clipping', 'Awake Brain Mapping', 'Deep Brain Stimulation', 'Complex Spine'],
    qualifications: 'MD, PhD (Neurobiology), Stanford University | Fellowship in Skull Base Surgery, UCSF',
    experienceYears: 22,
    rating: 4.97,
    reviewCount: 420,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Sterling has pioneered micro-surgical techniques for deep-seated brain tumors using intraoperative 3T MRI, publishing over 65 peer-reviewed papers in high-impact medical journals.',
    opdDays: ['Mon', 'Wed', 'Thu'],
    timings: '09:00 AM - 01:00 PM',
    fee: 250,
    languages: ['English', 'Spanish'],
    awards: ['Distinguished Neurosurgeon of the Year', 'Brain Tumor Foundation Laureate'],
    education: ['MD & PhD, Stanford University School of Medicine', 'Neurosurgery Residency, UCSF'],
    isTeleconsultAvailable: true,
    isHeadOfDept: true,
    badges: ['Head of Department', 'Skull Base Expert', '3000+ Surgeries'],
    nextAvailableSlot: 'Today, 04:00 PM'
  },
  {
    id: 'doc-4',
    name: 'Dr. Maya Lin-Chavez, MD, FAAN',
    title: 'Senior Consultant Neurologist & Stroke Specialist',
    departmentId: 'dept-neuro',
    specialty: 'Comprehensive Stroke & Epilepsy',
    subSpecialties: ['Acute Stroke Thrombectomy', 'Refractory Epilepsy', 'Movement Disorders', 'Neuromodulation'],
    qualifications: 'MD, Columbia University | Fellowship in Vascular Neurology, NY Presbyterian',
    experienceYears: 16,
    rating: 4.92,
    reviewCount: 295,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Lin-Chavez leads the 24/7 Rapid Stroke Interventional Unit, specializing in time-critical neuro-interventions and comprehensive seizure disorder protocols.',
    opdDays: ['Mon', 'Tue', 'Thu', 'Sat'],
    timings: '11:00 AM - 05:00 PM',
    fee: 180,
    languages: ['English', 'Mandarin', 'Spanish'],
    awards: ['American Stroke Association Excellence Award', 'Clinical Research Fellowship Award'],
    education: ['MD, Columbia University Vagelos College of Physicians and Surgeons'],
    isTeleconsultAvailable: true,
    badges: ['Stroke Director', 'Epilepsy Lead'],
    nextAvailableSlot: 'Tomorrow, 11:30 AM'
  },
  // Oncology
  {
    id: 'doc-5',
    name: 'Dr. Alistair Montgomery, MD, FRCP',
    title: 'Chairman & Chief of Medical Oncology',
    departmentId: 'dept-onco',
    specialty: 'Precision Oncology & Immunotherapy',
    subSpecialties: ['Targeted Molecular Therapy', 'CAR-T Cell Therapy', 'Lung & GI Malignancies', 'Genomics'],
    qualifications: 'MD, University of Oxford | Fellowship, Memorial Sloan Kettering Cancer Center',
    experienceYears: 26,
    rating: 4.99,
    reviewCount: 540,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80',
    bio: 'A world-leading voice in precision genomics and immune checkpoint inhibitors, Dr. Montgomery designs bespoke therapeutic regimens targeting unique molecular tumor profiles.',
    opdDays: ['Mon', 'Tue', 'Thu', 'Fri'],
    timings: '08:30 AM - 01:30 PM',
    fee: 260,
    languages: ['English', 'German'],
    awards: ['Global Cancer Leadership Medal', 'Oncology Researcher of the Decade'],
    education: ['BM BCh, University of Oxford', 'Fellowship in Oncology, MSKCC New York'],
    isTeleconsultAvailable: true,
    isHeadOfDept: true,
    badges: ['Head of Department', 'Global Cancer Authority', 'Precision Pioneer'],
    nextAvailableSlot: 'Today, 03:15 PM'
  },
  {
    id: 'doc-6',
    name: 'Dr. Seraphina Patel, MD, FACS',
    title: 'Chief of Robotic Surgical Oncology',
    departmentId: 'dept-onco',
    specialty: 'Robotic & Organ-Preserving Surgical Oncology',
    subSpecialties: ['Robotic Gastrointestinal Oncosurgery', 'Breast Oncoplastic Surgery', 'HIPEC & PIPAC'],
    qualifications: 'MD, Yale School of Medicine | Fellowship in Surgical Oncology, MD Anderson Cancer Center',
    experienceYears: 17,
    rating: 4.96,
    reviewCount: 380,
    image: 'https://images.unsplash.com/photo-1594824813576-96b6f04d7c04?auto=format&fit=crop&w=800&q=80',
    bio: 'Specializing in minimally invasive DaVinci robotic resections and breast conservation oncoplastic surgeries with superior cosmetic and oncologic outcomes.',
    opdDays: ['Wed', 'Fri', 'Sat'],
    timings: '09:00 AM - 03:00 PM',
    fee: 210,
    languages: ['English', 'Hindi', 'Gujarati'],
    awards: ['Surgical Oncology Innovator of the Year', 'Excellence in Breast Reconstruction'],
    education: ['MD, Yale University', 'Surgical Oncology, MD Anderson Cancer Center'],
    isTeleconsultAvailable: true,
    badges: ['Robotic Surgeon', 'Breast Onco Lead'],
    nextAvailableSlot: 'Tomorrow, 09:30 AM'
  },
  // Orthopedics
  {
    id: 'doc-7',
    name: 'Dr. Marcus Vance Sterling, MD, FAAOS',
    title: 'Director of Orthopedics & Robotic Joint Center',
    departmentId: 'dept-ortho',
    specialty: 'Robotic Hip & Knee Arthroplasty',
    subSpecialties: ['Mako Total Knee Replacement', 'Direct Anterior Total Hip', 'Revision Joint Reconstruction'],
    qualifications: 'MD, University of Pennsylvania | Fellowship in Adult Reconstruction, Hospital for Special Surgery (HSS)',
    experienceYears: 21,
    rating: 4.96,
    reviewCount: 460,
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Marcus Sterling has completed over 6,000 robotic-assisted joint replacements with an average hospital discharge time under 36 hours and a 99.4% implant survival index.',
    opdDays: ['Mon', 'Wed', 'Fri'],
    timings: '08:00 AM - 02:00 PM',
    fee: 210,
    languages: ['English'],
    awards: ['HSS Master Surgeon Award', 'Excellence in Robotic Arthroplasty'],
    education: ['MD, University of Pennsylvania Perelman School of Medicine', 'Fellowship, HSS New York'],
    isTeleconsultAvailable: true,
    isHeadOfDept: true,
    badges: ['Head of Department', 'Mako Certified Pro', '6K+ Joint Replacements'],
    nextAvailableSlot: 'Today, 01:45 PM'
  },
  {
    id: 'doc-8',
    name: 'Dr. Chloe Davenport, MD',
    title: 'Senior Consultant - Sports Medicine & Arthroscopy',
    departmentId: 'dept-ortho',
    specialty: 'Sports Injuries & Arthroscopic Reconstruction',
    subSpecialties: ['ACL/PCL Multi-ligament Repair', 'Rotator Cuff Arthroscopy', 'Cartilage Restoration'],
    qualifications: 'MD, Duke University School of Medicine | Fellowship in Sports Medicine, Steadman Clinic',
    experienceYears: 14,
    rating: 4.93,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    bio: 'Former consultant surgeon to Olympic athletes, Dr. Davenport specializes in keyhole sports surgeries, regenerative stem cell therapy, and fast return-to-sport protocols.',
    opdDays: ['Tue', 'Thu', 'Sat'],
    timings: '10:00 AM - 04:00 PM',
    fee: 190,
    languages: ['English', 'Spanish'],
    awards: ['Sports Medicine Excellence Award 2022', 'Olympic Team Physician Recognition'],
    education: ['MD, Duke University', 'Sports Fellowship, The Steadman Clinic Colorado'],
    isTeleconsultAvailable: true,
    badges: ['Sports Injury Pro', 'Keyhole Expert'],
    nextAvailableSlot: 'Tomorrow, 10:00 AM'
  },
  // Gastroenterology
  {
    id: 'doc-9',
    name: 'Dr. Rajeshwar Sen, MD, DM, FACG',
    title: 'Director & Chief of Gastroenterology & Hepatology',
    departmentId: 'dept-gastro',
    specialty: 'Advanced Endoscopy & Hepatobiliary Sciences',
    subSpecialties: ['Therapeutic ERCP', 'Endoscopic Submucosal Dissection (ESD)', 'Liver Cirrhosis & Transplant'],
    qualifications: 'MD, DM (Gastroenterology), AIIMS New Delhi | Fellowship in Advanced Endoscopy, Tokyo University Hospital',
    experienceYears: 23,
    rating: 4.97,
    reviewCount: 490,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    bio: 'Renowned authority on advanced therapeutic GI endoscopy and complex biliary stenting, Dr. Sen is an international trainer in third-space endoscopic surgeries.',
    opdDays: ['Mon', 'Tue', 'Thu', 'Fri'],
    timings: '09:30 AM - 03:00 PM',
    fee: 200,
    languages: ['English', 'Hindi', 'Bengali'],
    awards: ['World Endoscopy Organization Master Educator', 'Distinguished Clinical Gastroenterologist'],
    education: ['MD & DM, AIIMS', 'Advanced Endoscopy Fellowship, Tokyo University Hospital'],
    isTeleconsultAvailable: true,
    isHeadOfDept: true,
    badges: ['Head of Department', 'Endoscopy Master', 'Global Trainer'],
    nextAvailableSlot: 'Today, 02:00 PM'
  },
  {
    id: 'doc-10',
    name: 'Dr. Natalie Dupont, MD, PhD',
    title: 'Consultant - Hepatology & Liver Transplant Medicine',
    departmentId: 'dept-gastro',
    specialty: 'Hepatology & Metabolic Liver Diseases',
    subSpecialties: ['MASH / NAFLD Reversal', 'Autoimmune Hepatitis', 'Pre & Post Liver Transplant Care'],
    qualifications: 'MD, Sorbonne University Paris | Post-doc Fellowship in Liver Disease, UCSF',
    experienceYears: 15,
    rating: 4.91,
    reviewCount: 260,
    image: 'https://images.unsplash.com/photo-1594824813576-96b6f04d7c04?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Dupont heads our innovative fatty liver reversal clinic using cutting-edge metabolic therapeutics and advanced elastography imaging.',
    opdDays: ['Wed', 'Thu', 'Sat'],
    timings: '10:00 AM - 04:00 PM',
    fee: 175,
    languages: ['English', 'French'],
    awards: ['EASL Young Investigator Award', 'Liver Foundation Research Medal'],
    education: ['MD, Sorbonne Université Paris', 'Hepatology, UCSF'],
    isTeleconsultAvailable: true,
    badges: ['Liver Specialist', 'MASH Reversal Lead'],
    nextAvailableSlot: 'Tomorrow, 01:15 PM'
  },
  // Pediatrics
  {
    id: 'doc-11',
    name: 'Dr. Kimberly Zhao, MD, FAAP',
    title: 'Chief of Pediatrics & Director of Level-IV NICU',
    departmentId: 'dept-peds',
    specialty: 'Neonatology & Critical Care Pediatrics',
    subSpecialties: ['Extreme Preterm Care', 'Neonatal Ventilation', 'Congenital Anomalies', 'Neurodevelopmental Follow-up'],
    qualifications: 'MD, Stanford School of Medicine | Fellowship in Neonatal-Perinatal Medicine, Boston Children’s Hospital',
    experienceYears: 20,
    rating: 4.99,
    reviewCount: 620,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    bio: 'Loved by thousands of families, Dr. Zhao specializes in saving vulnerable premature infants with extreme low birth weights down to 450 grams with compassionate, family-centered care.',
    opdDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    timings: '09:00 AM - 02:00 PM',
    fee: 170,
    languages: ['English', 'Mandarin'],
    awards: ['Golden Stethoscope Humanitarian Award', 'Pediatrician of the Year 2023'],
    education: ['MD, Stanford University', 'Neonatology Fellowship, Boston Children’s Hospital'],
    isTeleconsultAvailable: true,
    isHeadOfDept: true,
    badges: ['Head of Department', 'Preemie Champion', '5-Star Family Care'],
    nextAvailableSlot: 'Today, 11:00 AM'
  },
  {
    id: 'doc-12',
    name: 'Dr. Benjamin Hayes, MD',
    title: 'Consultant - Pediatric Cardiology & Congenital Heart',
    departmentId: 'dept-peds',
    specialty: 'Pediatric Cardiac Care & Echocardiography',
    subSpecialties: ['Fetal Echo', 'Congenital Heart Defect Diagnosis', 'Pediatric Arrhythmias'],
    qualifications: 'MD, Northwestern University | Pediatric Cardiology Fellowship, Children’s Hospital of Philadelphia (CHOP)',
    experienceYears: 13,
    rating: 4.94,
    reviewCount: 280,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
    bio: 'Dedicated to early detection and comprehensive non-invasive management of pediatric heart disorders in newborns, toddlers, and adolescents.',
    opdDays: ['Tue', 'Thu', 'Sat'],
    timings: '10:00 AM - 03:00 PM',
    fee: 185,
    languages: ['English'],
    awards: ['CHOP Pediatric Cardiology Fellow of the Year'],
    education: ['MD, Northwestern Feinberg', 'Pediatric Cardiology, CHOP'],
    isTeleconsultAvailable: true,
    badges: ['Child Heart Specialist', 'Fetal Echo Pro'],
    nextAvailableSlot: 'Tomorrow, 02:30 PM'
  },
  // OBGYN
  {
    id: 'doc-13',
    name: 'Dr. Vivienne LeClerc, MD, FACOG',
    title: 'Chief of Obstetrics, Gynecology & Fetal Medicine',
    departmentId: 'dept-obgyn',
    specialty: 'High-Risk Obstetrics & Advanced Laparoscopy',
    subSpecialties: ['Gentle Natural Birth', 'Fetal Medicine & 4D Scan', 'Endometriosis Excision', 'Robotic Myomectomy'],
    qualifications: 'MD, McGill University | Fellowship in Maternal-Fetal Medicine, Mount Sinai Hospital NY',
    experienceYears: 22,
    rating: 4.98,
    reviewCount: 590,
    image: 'https://images.unsplash.com/photo-1594824813576-96b6f04d7c04?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. LeClerc has safely delivered more than 8,000 babies and is a pioneer in gentle water birthing, high-risk twin gestations, and minimally invasive robotic gynecological surgeries.',
    opdDays: ['Mon', 'Tue', 'Wed', 'Fri'],
    timings: '09:00 AM - 03:00 PM',
    fee: 190,
    languages: ['English', 'French'],
    awards: ['Distinguished Obstetrician Award', 'Excellence in Maternal-Fetal Medicine'],
    education: ['MD, McGill University Faculty of Medicine', 'Maternal-Fetal Fellowship, Mount Sinai New York'],
    isTeleconsultAvailable: true,
    isHeadOfDept: true,
    badges: ['Head of Department', '8K+ Deliveries', 'Gentle Birthing Lead'],
    nextAvailableSlot: 'Today, 03:45 PM'
  },
  {
    id: 'doc-14',
    name: 'Dr. Aris Thorne, MD, PhD',
    title: 'Director of IVF & Reproductive Endocrinology',
    departmentId: 'dept-obgyn',
    specialty: 'Fertility & Assisted Reproductive Technologies',
    subSpecialties: ['IVF / ICSI', 'PGT Genetic Screening', 'Recurrent Pregnancy Loss', 'Fertility Preservation'],
    qualifications: 'MD, University of Cambridge | Fellowship in Reproductive Endocrinology, Cornell University',
    experienceYears: 16,
    rating: 4.95,
    reviewCount: 340,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    bio: 'Achieving a verified 74.2% clinical pregnancy rate in IVF cycles through individualized genetic screening protocols and blastocyst culture techniques.',
    opdDays: ['Tue', 'Thu', 'Sat'],
    timings: '09:00 AM - 01:00 PM',
    fee: 210,
    languages: ['English', 'Greek'],
    awards: ['ASRM Fertility Innovator Medal', 'Pioneer in Preimplantation Genetics'],
    education: ['MB BChir, University of Cambridge', 'Fellowship, Weill Cornell Medicine'],
    isTeleconsultAvailable: true,
    badges: ['IVF Director', '74% Success Rate'],
    nextAvailableSlot: 'Tomorrow, 09:15 AM'
  },
  // Urology & Nephrology
  {
    id: 'doc-15',
    name: 'Dr. Tariq Al-Mansoor, MD, FACS',
    title: 'Chief of Urology & Kidney Transplantation',
    departmentId: 'dept-renal',
    specialty: 'Robotic Uro-Oncology & Renal Transplantation',
    subSpecialties: ['Robotic Kidney Transplant', 'HoLEP Prostate Laser Surgery', 'RIRS Laser Stone Surgery'],
    qualifications: 'MD, Johns Hopkins | Fellowship in Robotic Uro-Oncology, Roswell Park Comprehensive Cancer Center',
    experienceYears: 21,
    rating: 4.97,
    reviewCount: 410,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Al-Mansoor is a master robotic surgeon who has conducted over 1,200 successful kidney transplants and 4,000 laser prostate enucleations without external incisions.',
    opdDays: ['Mon', 'Wed', 'Thu', 'Sat'],
    timings: '08:30 AM - 02:00 PM',
    fee: 215,
    languages: ['English', 'Arabic'],
    awards: ['Robotic Urology Pioneer Award', 'Kidney Transplant Leader 2024'],
    education: ['MD, Johns Hopkins School of Medicine', 'Robotic Fellowship, Roswell Park'],
    isTeleconsultAvailable: true,
    isHeadOfDept: true,
    badges: ['Head of Department', 'Transplant Master', 'Laser Stone Expert'],
    nextAvailableSlot: 'Today, 01:00 PM'
  },
  {
    id: 'doc-16',
    name: 'Dr. Rebecca Stern, MD, FASN',
    title: 'Director of Nephrology & Dialysis Services',
    departmentId: 'dept-renal',
    specialty: 'Clinical Nephrology & Dialysis',
    subSpecialties: ['Chronic Kidney Disease Management', 'Glomerulonephritis', 'Hemodiafiltration', 'Hypertension'],
    qualifications: 'MD, University of Chicago Pritzker | Nephrology Fellowship, Brigham and Women’s Hospital',
    experienceYears: 17,
    rating: 4.93,
    reviewCount: 290,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    bio: 'Leading our holistic renal health and dialysis wellness programs focusing on preserving residual renal function and patient vitality.',
    opdDays: ['Mon', 'Tue', 'Thu', 'Fri'],
    timings: '10:00 AM - 04:00 PM',
    fee: 180,
    languages: ['English', 'Hebrew'],
    awards: ['ASN Clinical Excellence in Nephrology', 'Dialysis Quality Leadership Award'],
    education: ['MD, University of Chicago', 'Fellowship, Brigham & Women’s Harvard'],
    isTeleconsultAvailable: true,
    badges: ['Renal Specialist', 'Dialysis Lead'],
    nextAvailableSlot: 'Tomorrow, 10:30 AM'
  },
  // Ophthalmology
  {
    id: 'doc-17',
    name: 'Dr. Sebastian Sterling-Cruz, MD, FACS',
    title: 'Director of Ophthalmology & Refractive Laser',
    departmentId: 'dept-eye',
    specialty: 'Refractive Cornea & Robotic Cataract',
    subSpecialties: ['SMILE Pro Laser', 'Contoura Vision LASIK', 'Premium Toric & Multifocal IOL', 'Keratoconus C3R'],
    qualifications: 'MD, Baylor College of Medicine | Fellowship in Cornea & Refractive Surgery, Bascom Palmer Eye Institute',
    experienceYears: 19,
    rating: 4.98,
    reviewCount: 510,
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Sterling-Cruz is a pioneer in blade-free Zeiss SMILE Pro laser vision correction and robotic cataract surgery, giving over 20,000 patients 20/20 vision.',
    opdDays: ['Mon', 'Tue', 'Thu', 'Fri', 'Sat'],
    timings: '09:00 AM - 04:00 PM',
    fee: 160,
    languages: ['English', 'Spanish'],
    awards: ['Bascom Palmer Alumni Innovator Award', 'Zeiss Refractive Pioneer 2024'],
    education: ['MD, Baylor College of Medicine', 'Cornea Fellowship, Bascom Palmer Eye Institute'],
    isTeleconsultAvailable: true,
    isHeadOfDept: true,
    badges: ['Head of Department', 'SMILE Pro Expert', '20K+ Clear Visions'],
    nextAvailableSlot: 'Today, 02:15 PM'
  },
  {
    id: 'doc-18',
    name: 'Dr. Ananya Iyer, MD, FRCS',
    title: 'Senior Consultant - Vitreo-Retina & Macular Diseases',
    departmentId: 'dept-eye',
    specialty: 'Medical & Surgical Retina',
    subSpecialties: ['Diabetic Retinopathy', 'Retinal Detachment Surgery', 'Macular Hole Repair', 'Anti-VEGF Therapy'],
    qualifications: 'MD, University College London (UCL) | Retina Fellowship, Moorfields Eye Hospital London',
    experienceYears: 15,
    rating: 4.95,
    reviewCount: 320,
    image: 'https://images.unsplash.com/photo-1594824813576-96b6f04d7c04?auto=format&fit=crop&w=800&q=80',
    bio: 'Specialist in 3D Heads-up micro-incision vitrectomy surgery for complex diabetic eye diseases and retinal detachments.',
    opdDays: ['Wed', 'Fri', 'Sat'],
    timings: '10:00 AM - 03:00 PM',
    fee: 175,
    languages: ['English', 'Tamil'],
    awards: ['Moorfields Surgical Retina Fellow Award'],
    education: ['MD, UCL London', 'Retina Fellowship, Moorfields Eye Hospital London'],
    isTeleconsultAvailable: true,
    badges: ['Retina Specialist', 'Micro-Vitrectomy Pro'],
    nextAvailableSlot: 'Tomorrow, 11:00 AM'
  },
  // Emergency
  {
    id: 'doc-19',
    name: 'Dr. Maxwell Drake, MD, FACEP',
    title: 'Director of Emergency Medicine & Trauma Resuscitation',
    departmentId: 'dept-emergency',
    specialty: 'Emergency Medicine & Disaster Management',
    subSpecialties: ['Polytrauma Life Support', 'Point-of-Care Ultrasound (POCUS)', 'Toxicology', 'Critical Resuscitation'],
    qualifications: 'MD, Georgetown University School of Medicine | Residency in Emergency Medicine, Bellevue Hospital NY',
    experienceYears: 20,
    rating: 4.99,
    reviewCount: 680,
    image: 'https://images.unsplash.com/photo-1622253692018-a87f54c9656a?auto=format&fit=crop&w=800&q=80',
    bio: 'Leading our 24/7 Level-1 Trauma team with military-grade precision, Dr. Drake coordinates acute trauma, stroke, and cardiac shock protocols with record-setting survival rates.',
    opdDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    timings: '24 Hours Emergency Rotations',
    fee: 150,
    languages: ['English', 'Spanish'],
    awards: ['National Hero in Emergency Medicine', 'Bellevue Trauma Excellence Award'],
    education: ['MD, Georgetown University', 'Emergency Medicine, Bellevue NYC'],
    isTeleconsultAvailable: false,
    isHeadOfDept: true,
    badges: ['Head of Department', '24/7 Level-1 Trauma', 'Rapid Response Lead'],
    nextAvailableSlot: '24/7 Emergency Walk-In Available'
  }
];

export const CLINICAL_SERVICES: ClinicalService[] = [
  {
    id: 'serv-robotic-surg',
    title: 'DaVinci Xi Robotic Surgery',
    category: 'Surgical',
    description: 'Precision minimally invasive surgery with 3D high-definition visualization and wristed instruments that bend and rotate far beyond the human hand.',
    duration: '1.5 - 3 Hours',
    price: 'Insurance Covered / Custom Plan',
    iconName: 'Cpu',
    features: ['Tiny 8mm incisions', 'Minimal blood loss & lower infection rate', 'Return home in 24-48 hours', 'Less postoperative pain'],
    preparationTips: 'Pre-anesthesia evaluation required 48 hours prior to surgical appointment.',
    includesHomeCollection: false,
    turnaroundTime: 'Same-day consultation'
  },
  {
    id: 'serv-3t-mri',
    title: 'Siemens 3T Silent Ultra-HD MRI',
    category: 'Diagnostic',
    description: 'High-field 3 Tesla magnetic resonance imaging with 70cm wide bore and acoustic reduction technology for claustrophobia-free, crystal-clear imaging.',
    duration: '30 - 45 Mins',
    price: '$450 - $850 (Covered by Insurance)',
    iconName: 'Layers',
    features: ['Ultra-silent scan sequence', '70cm wide comfortable bore', 'AI-assisted deep resolve reconstruction', 'Sub-millimeter nerve & cartilage details'],
    preparationTips: 'Remove all metal jewelry. Fast 4 hours prior if intravenous contrast is ordered.',
    includesHomeCollection: false,
    turnaroundTime: 'Reports within 3 hours'
  },
  {
    id: 'serv-pet-ct',
    title: 'Digital Discovery PET-CT Whole Body',
    category: 'Diagnostic',
    description: 'Ultra-sensitive digital molecular imaging to detect microscopic cancer spread, assess cardiac viability, and evaluate neurological disorders.',
    duration: '2 Hours (including tracer rest)',
    price: '$800 - $1,400',
    iconName: 'ScanLine',
    features: ['50% lower radiation dose', 'Ultra-fast 12-minute scan time', 'Precise metabolic tumor localization', 'Fused high-resolution anatomical maps'],
    preparationTips: 'Strict carbohydrate-free dinner night prior and 6-hour fasting before morning scan.',
    includesHomeCollection: false,
    turnaroundTime: 'Comprehensive report in 6 hours'
  },
  {
    id: 'serv-cath-lab',
    title: 'Emergency Primary Angioplasty (24/7)',
    category: 'Emergency',
    description: 'Immediate trans-radial catheterization to restore blood flow in blocked coronary arteries within our benchmark door-to-balloon time of 42 minutes.',
    duration: '45 - 90 Mins',
    price: 'Emergency TPA / Cashless TPA',
    iconName: 'HeartPulse',
    features: ['Wrist (Radial) entry for instant mobility', 'Drug-eluting third generation bio-stents', 'Intravascular Ultrasound (IVUS) & OCT guided', 'Zero waiting queue 24/7'],
    preparationTips: 'Immediate admission via 24/7 Emergency triage.',
    includesHomeCollection: false,
    turnaroundTime: 'Immediate live telemetry'
  },
  {
    id: 'serv-dialysis',
    title: 'High-Flux Online Hemodiafiltration',
    category: 'Therapy',
    description: 'Gentle, biocompatible blood filtration using online hemodiafiltration with ultrapure fluid, individual entertainment consoles, and dedicated nephrology supervision.',
    duration: '4 Hours',
    price: '$180 per session',
    iconName: 'Droplet',
    features: ['Superior middle-molecule toxin clearance', 'Reduced cardiovascular strain', 'Private cubicles with TV & WiFi', 'Individual dialyzer re-use safety protocols'],
    preparationTips: 'Take prescribed morning blood pressure medications as directed by nephrologist.',
    includesHomeCollection: false,
    turnaroundTime: 'Daily slots 06:00 AM - 10:00 PM'
  },
  {
    id: 'serv-home-lab',
    title: 'Doorstep Blood Sample & ECG Collection',
    category: 'Wellness',
    description: 'Certified phlebotomists arrive at your home or office with temperature-controlled vacutainers for 150+ blood tests and 12-lead portable ECG.',
    duration: '15 Mins at Home',
    price: 'Free with tests above $50',
    iconName: 'Home',
    features: ['Barcoded vacuum collection tubes', 'Real-time cold-chain GPS tracking', 'Digital reports delivered to your phone & WhatsApp', 'Complimentary doctor consultation review'],
    preparationTips: 'Maintain 10-12 hours overnight fasting for lipid/glucose panels.',
    includesHomeCollection: true,
    turnaroundTime: 'Reports within 4 - 8 hours'
  }
];

export const HEALTH_PACKAGES: HealthPackage[] = [
  {
    id: 'pkg-executive',
    name: 'Executive Whole-Body Vital Checkup',
    tagline: 'Comprehensive 85-parameter health blueprint for active professionals',
    tag: 'Most Popular',
    popular: true,
    price: 299,
    originalPrice: 480,
    testsCount: 85,
    fastingRequired: true,
    fastingHours: 10,
    reportTime: 'Same Day (6 Hours)',
    includedCategories: [
      { category: 'Cardiac & Lipid', tests: ['12-Lead Digital ECG', '2D Echocardiography / TMT', 'Lipid Profile 8 Parameters', 'Hs-CRP Cardiac Risk'] },
      { category: 'Liver & Renal', tests: ['Liver Function Test (11 Parameters)', 'Kidney Function & eGFR', 'Serum Electrolytes', 'Uric Acid'] },
      { category: 'Diabetes & Metabolism', tests: ['HbA1c Glycated Hemoglobin', 'Fasting Blood Sugar', 'Thyroid Profile (TSH, Free T3, Free T4)'] },
      { category: 'Imaging & Diagnostics', tests: ['Digital Chest X-Ray', 'Ultrasound Whole Abdomen & Pelvis', 'Pulmonary Function Test (PFT)'] },
      { category: 'Consultations', tests: ['Senior Physician Review', 'Cardiologist Consultation', 'Clinical Diet & Nutrition Counseling'] }
    ],
    idealFor: 'Men & Women aged 25-50 seeking a complete yearly baseline health assessment.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pkg-cardiac',
    name: 'Advanced Platinum Cardiac Shield',
    tagline: 'Deep dive into arterial health, calcium score & cardiovascular fitness',
    tag: 'Heart Care',
    popular: false,
    price: 380,
    originalPrice: 620,
    testsCount: 64,
    fastingRequired: true,
    fastingHours: 8,
    reportTime: 'Within 4 Hours',
    includedCategories: [
      { category: 'Advanced Cardiac Imaging', tests: ['Coronary Artery Calcium (CAC) CT Scan', 'Stress Echocardiogram', 'Carotid Doppler Arterial Intima Scan'] },
      { category: 'Biomarkers & Blood', tests: ['Apolipoprotein A1 & B', 'Lipoprotein(a)', 'Homocysteine High-Sensitivity', 'Troponin-I Sensitive'] },
      { category: 'Physiological Tests', tests: ['24-Hour Ambulatory Blood Pressure Map', 'Treadmill Stress Test (TMT)', 'PFT Spirometry'] },
      { category: 'Consultations', tests: ['1-on-1 Consultation with Chief Cardiologist', 'Personalized Exercise & Cardiac Diet Protocol'] }
    ],
    idealFor: 'Individuals with family history of heart disease, high stress, hypertension, or smokers.',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pkg-women',
    name: 'Women’s 360° Well-Woman Wellness',
    tagline: 'Dedicated hormone screening, breast mammography, cervix & bone density',
    tag: 'Women Specialist',
    popular: false,
    price: 340,
    originalPrice: 550,
    testsCount: 78,
    fastingRequired: true,
    fastingHours: 10,
    reportTime: 'Same Day',
    includedCategories: [
      { category: 'Oncology & Preventative Screening', tests: ['Digital 3D Breast Mammography / Breast USG', 'Liquid-Based Pap Smear (LBC)', 'HPV High-Risk DNA Screening'] },
      { category: 'Bone & Hormones', tests: ['DEXA Bone Mineral Density Scan', 'Vitamin D3 & Vitamin B12', 'Complete Hormone Panel (FSH, LH, Prolactin, AMH)'] },
      { category: 'General & Organ Profile', tests: ['Complete Blood Count with ESR', 'Iron Deficiency Anemia Profile', 'Thyroid Total Panel', 'USG Pelvis'] },
      { category: 'Consultations', tests: ['Consultation with Senior Gynecologist', 'Breast Specialist Exam', 'Dietician Consultation'] }
    ],
    idealFor: 'Women of all age groups prioritizing preventive hormonal, bone, and oncologic health.',
    image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pkg-senior',
    name: 'Senior Citizen Golden Years Shield',
    tagline: 'Comprehensive geriatric screening designed for vitality and fall prevention',
    tag: 'Senior Health',
    popular: false,
    price: 320,
    originalPrice: 510,
    testsCount: 92,
    fastingRequired: true,
    fastingHours: 10,
    reportTime: 'Same Day',
    includedCategories: [
      { category: 'Joints & Bone Health', tests: ['Dual Hip & Spine DEXA Bone Density', 'Rheumatoid Factor (RA)', 'Serum Calcium & Phosphorus', 'Uric Acid'] },
      { category: 'Neurological & Sensory', tests: ['Audiometry Hearing Assessment', 'Comprehensive Eye & Glaucoma Fundus Exam', 'Cognitive & Memory Baseline'] },
      { category: 'Prostate & Cardiac (For Men/Women)', tests: ['PSA Total (for men) / CA-125 (for women)', 'Echocardiogram', 'Renal Function with eGFR'] },
      { category: 'Consultations', tests: ['Geriatrician Physician Review', 'Orthopedic Joint Specialist', 'Physiotherapy Mobility Session'] }
    ],
    idealFor: 'Seniors aged 60+ to detect early arthritis, cardiovascular risk, osteoporosis, and sensory changes.',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80'
  }
];

export const FACILITIES: Facility[] = [
  {
    id: 'fac-robotic',
    name: 'DaVinci Xi Advanced Robotic Surgical Theater',
    category: 'Surgical Suites',
    description: 'Four multi-million dollar robotic operating rooms with laminar airflow, HEPA filtration (Class 100), and integrated telemedicine video streaming.',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80',
    features: ['3D 4K HD magnified stereoscopic vision', 'Tremor filtration micro-mechanics', 'Integrated intraoperative ultrasound probe', 'Zero ambient pathogen airflow'],
    specs: ['4 Robotic Theaters', 'Class 100 Cleanliness', 'Firefly Fluorescence Imaging'],
    badge: 'State-of-the-Art'
  },
  {
    id: 'fac-mri-suite',
    name: '3-Tesla Intraoperative Silent MRI & CT Hub',
    category: 'Diagnostic Imaging',
    description: 'Seamless diagnostic wing enabling real-time intraoperative scanning during delicate neurosurgeries without moving the patient out of the sterile field.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    features: ['Intraoperative sliding gantry rail system', 'Acoustic reduction technology (< 3dB)', 'Diffusion Tensor Tractography imaging', 'Real-time tumor resection margin check'],
    specs: ['3T Field Strength', '70cm Open Bore', 'AI Deep Learning Reconstruction'],
    badge: 'Intraoperative'
  },
  {
    id: 'fac-icu',
    name: 'Smart AI-Monitored Intensive Care Units (160 Beds)',
    category: 'Critical Care',
    description: 'Each private ICU bed features continuous non-invasive hemodynamic tracking, isolated negative pressure suites, and AI early sepsis detection warning systems.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    features: ['1:1 Dedicated Critical Care Nursing ratio', 'Negative pressure isolation for airborne protection', 'Central Philips IntelliSpace telemetry', 'Bedside hemodiafiltration port access'],
    specs: ['160 Total ICU Beds', '24/7 Intensivist Coverage', 'AI Sepsis Early Warning'],
    badge: 'Zero Infection Award'
  },
  {
    id: 'fac-suites',
    name: 'Presidential & Executive Healing Suites',
    category: 'Patient Rooms',
    description: 'Luxury hotel-grade private suites with separate attendant living quarters, panoramic city views, custom organic culinary menus, and 24/7 concierge assistance.',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80',
    features: ['Electric motorized multi-position beds', 'Smart room automation via iPad console', 'Private en-suite bathroom with walk-in shower', 'Chef-prepared therapeutic room dining'],
    specs: ['32 Luxury Suites', 'Dedicated Butler & Concierge', 'High-Speed Wi-Fi & Workstation'],
    badge: '5-Star Hospitality'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    patientName: 'Eleanor Sterling-Ward',
    age: 58,
    location: 'Manhattan, New York',
    condition: 'Complex Robotic Mitral Valve Repair',
    doctorName: 'Dr. Arthur Vance',
    department: 'Cardiology & Heart Institute',
    quote: 'I was back walking in Central Park just 10 days after robotic heart surgery. The precision and warmth of We Care Hospital gave me my life back.',
    story: 'After being diagnosed with severe mitral regurgitation, I was terrified of open-heart surgery. Dr. Arthur Vance and his robotic team explained every step. Through tiny keyhole incisions, my valve was repaired. The nursing staff was truly angelic.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    outcomeStats: '100% Valve Function Restored • Discharged in 48 Hours',
    date: 'February 2026',
    verified: true
  },
  {
    id: 'test-2',
    patientName: 'David K. Henderson',
    age: 64,
    location: 'Boston, Massachusetts',
    condition: 'Bilateral Robotic Knee Replacement',
    doctorName: 'Dr. Marcus Vance Sterling',
    department: 'Orthopedics & Joint Center',
    quote: 'Zero pain, no braces, and I played 18 holes of golf 6 weeks after surgery. The Mako robotic precision was simply miraculous.',
    story: 'I suffered from bone-on-bone knee osteoarthritis for 8 years. Dr. Marcus performed bilateral robotic knee replacement. I stood on my feet the very evening of the surgery. Today, I am completely pain-free.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    outcomeStats: 'Same-Day Mobilization • 100% Flexion Recovered',
    date: 'January 2026',
    verified: true
  },
  {
    id: 'test-3',
    patientName: 'Priya & Rahul Sharma',
    age: 33,
    location: 'Jersey City, New Jersey',
    condition: 'High-Risk Pregnancy & Preemie Twin Care',
    doctorName: 'Dr. Vivienne LeClerc & Dr. Kimberly Zhao',
    department: 'Obstetrics & Level-IV NICU',
    quote: 'Our twins were born at 28 weeks. The Level-IV NICU team under Dr. Zhao treated our babies like their own. Today, both are healthy, smiling 1-year-olds.',
    story: 'When my water broke early, the emergency team mobilized in seconds. Dr. LeClerc delivered our twins safely, and the NICU team cared for them for 42 days. We will forever be grateful to We Care Hospital.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    outcomeStats: 'Both Twins Discharged Healthy • Zero Neurological Sequelae',
    date: 'March 2026',
    verified: true
  },
  {
    id: 'test-4',
    patientName: 'Michael Chang',
    age: 49,
    location: 'Toronto, Canada (International Patient)',
    condition: 'Intraoperative MRI Brain Tumor Resection',
    doctorName: 'Dr. Julian Sterling',
    department: 'Neurology & Neurosurgery',
    quote: 'We flew from Canada specifically for Dr. Julian Sterling. The 3T intraoperative MRI confirmed 100% tumor removal before I even woke up.',
    story: 'Diagnosed with a meningioma close to my speech center, local doctors gave guarded prognoses. Dr. Sterling performed an awake craniotomy with intraoperative mapping. I experienced zero neurological deficit.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    outcomeStats: '100% Total Gross Resection • 0% Speech Deficit',
    date: 'November 2025',
    verified: true
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I book an appointment with a specialist at We Care Hospital?',
    answer: 'You can instantly book through our website by clicking "Book Appointment", selecting your desired department or doctor, choosing an available date and time slot, and receiving your instant confirmation pass. You may also call our 24/7 appointment desk at +1 (800) 932-2732.',
    category: 'Appointments'
  },
  {
    id: 'faq-2',
    question: 'Which health insurance providers do you accept for cashless hospitalization?',
    answer: 'We Care Hospital partners with over 50 major national and international insurance providers including BlueCross BlueShield, Aetna, Cigna, UnitedHealthcare, Medicare, Humana, Bupa, and Allianz. Our dedicated on-site Insurance Desk coordinates pre-authorization within 60 minutes for 100% paperless cashless processing.',
    category: 'Insurance & Billing'
  },
  {
    id: 'faq-3',
    question: 'What should I do in case of an acute medical emergency or trauma?',
    answer: 'In an emergency, immediately call our 24/7 Emergency Hotline at +1 (800) 932-2731 or click "SOS Emergency" in our app to dispatch a GPS-tracked Mobile ICU Ambulance. Our Level-1 Emergency Department operates 24/7 with zero triage queue.',
    category: 'Emergency'
  },
  {
    id: 'faq-4',
    question: 'Are video tele-consultations available for international and out-of-state patients?',
    answer: 'Yes, all our department heads and senior consultants provide secure, HIPAA-compliant HD video consultations. You can upload your medical records and scans during booking and receive digital e-prescriptions and care summaries directly to your patient portal.',
    category: 'Appointments'
  },
  {
    id: 'faq-5',
    question: 'What are the visiting hours for inpatient wards and ICUs?',
    answer: 'General Inpatient Wards: 10:00 AM – 01:00 PM and 04:30 PM – 08:00 PM. Intensive Care Units (ICU): 11:30 AM – 12:30 PM and 05:00 PM – 06:00 PM (restricted to 1 visitor at a time to maintain sterile zero-infection environments).',
    category: 'General'
  },
  {
    id: 'faq-6',
    question: 'What concierge services are provided for International Patients traveling from abroad?',
    answer: 'Our International Patient Services team assists with medical visa invitation letters, airport limousine pick-up/drop-off, dedicated multilingual translators (Arabic, French, Spanish, Russian, Japanese), currency exchange, and tailored accommodations for accompanying family members.',
    category: 'International Patients'
  },
  {
    id: 'faq-7',
    question: 'Can I get lab tests and diagnostic samples collected at my home?',
    answer: 'Yes! We offer 24/7 doorstep sample collection across the greater metropolitan area. Our certified phlebotomists use vacuum tubes and GPS-tracked temperature containers. Digital results are delivered via your portal within 4 to 8 hours.',
    category: 'General'
  },
  {
    id: 'faq-8',
    question: 'Do I need a physician referral before seeing a specialist?',
    answer: 'Most departments at We Care Hospital do not require a prior physician referral for outpatient consultations. However, if your specific insurance policy (e.g., HMO plan) mandates a referral for coverage, our admissions desk will gladly assist you in coordinating documentation.',
    category: 'Insurance & Billing'
  }
];

export const INSURANCE_PARTNERS = [
  'Blue Cross Blue Shield',
  'Aetna Health',
  'UnitedHealthcare',
  'Cigna Healthcare',
  'Humana',
  'Medicare / Medicaid',
  'Kaiser Permanente',
  'Bupa International',
  'Allianz Care',
  'MetLife Health',
  'Oscar Health',
  'Anthem'
];

export const INITIAL_MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'app-sample-1',
    bookingReference: 'WC-2026-9821',
    patientName: 'Jonathan Evans',
    patientPhone: '+1 (555) 234-5678',
    patientEmail: 'jonathan.evans@example.com',
    age: 45,
    gender: 'Male',
    doctorId: 'doc-1',
    doctorName: 'Dr. Arthur Vance, MD, FACC',
    departmentId: 'dept-cardio',
    departmentName: 'Cardiology & Heart Vascular Institute',
    serviceType: 'Routine Cardiac Follow-up & ECG Review',
    date: '2026-08-18',
    timeSlot: '10:30 AM',
    consultType: 'In-Person',
    symptoms: 'Mild intermittent palpitations during workouts',
    status: 'Confirmed',
    paymentStatus: 'Covered by Insurance',
    insuranceProvider: 'Blue Cross Blue Shield',
    policyNumber: 'BCBS-994821',
    notes: 'Please arrive 15 minutes early at Tower B, 4th Floor.',
    createdAt: '2026-08-14T10:00:00.000Z',
    tokenNumber: 14,
    qrCodeSeed: 'WC-PASS-9821'
  }
];

export const HEALTH_ARTICLES: HealthArticle[] = [
  {
    id: 'art-cardio-1',
    title: 'AI-Enhanced FFR-CT: Eliminating Invasive Angiograms in Coronary Artery Assessment',
    subtitle: 'How 3D computational fluid dynamics derived from non-invasive CT scans are transforming ischemic heart disease diagnosis.',
    departmentId: 'dept-cardio',
    departmentName: 'Cardiology & Heart Vascular Institute',
    category: 'Breakthrough',
    readTime: '4 min read',
    publishedDate: 'August 2026',
    authorDoctorId: 'doc-1',
    authorDoctorName: 'Dr. Arthur Vance, MD, FACC',
    authorRole: 'Chief of Cardiology & Structural Heart',
    doctorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80',
    evidenceLevel: 'Level 1: Multicenter Clinical Trial (JACC / NEJM 2026)',
    summary: 'Fractional Flow Reserve calculated via coronary computed tomography (FFR-CT) accurately predicts vessel-specific ischemia with a 92% concordance to invasive wire pullbacks, reducing unnecessary diagnostic catheterizations by up to 61%.',
    keyTakeaways: [
      'Non-invasive calculation of pressure gradients across coronary lesions using AI algorithms.',
      'Eliminates arterial puncture and hospital overnight stays for over 60% of stable angina patients.',
      'Guides precise stent placement or medical management with millimeter-level boundary maps.'
    ],
    fullContent: [
      'Traditionally, determining whether an intermediate 50-70% coronary stenosis restricted blood flow required an invasive cardiac catheterization procedure with pressure-wire insertion.',
      'At We Care Heart Institute, our latest high-pitch CT scans combined with AI deep-learning fluid dynamics simulate pressure drops directly from high-resolution images within 20 minutes.',
      'The multi-center ADVANCE trial confirmed that patients managed with FFR-CT guidance experienced significantly lower rates of major adverse cardiovascular events (MACE) and 45% lower healthcare expenditures.',
      'This diagnostic precision ensures that only patients who truly benefit from coronary stents undergo catheterization, while others receive optimized medical therapy and lifestyle rehabilitation.'
    ],
    clinicalImplications: 'Reduces diagnostic angiograms by 61% and guides target vessel revascularization with zero invasive risk.',
    actionableSteps: [
      'If you have exertional chest tightness or borderline stress test results, request an FFR-CT consultation.',
      'Maintain an LDL-C target < 55 mg/dL if plaque calcification is identified.',
      'Engage in 150 minutes of zone-2 aerobic cardiovascular training weekly.'
    ],
    featured: true,
    tags: ['Cardiology', 'AI Diagnostics', 'Coronary Health', 'Non-Invasive']
  },
  {
    id: 'art-neuro-1',
    title: 'Extending the Golden Window: AI Perfusion Imaging in Acute Ischemic Stroke',
    subtitle: 'Endovascular thrombectomy guided by automated mismatch mapping saves brain tissue up to 24 hours post-onset.',
    departmentId: 'dept-neuro',
    departmentName: 'Neurology, Neurosurgery & Spine Institute',
    category: 'Breakthrough',
    readTime: '5 min read',
    publishedDate: 'July 2026',
    authorDoctorId: 'doc-3',
    authorDoctorName: 'Dr. Julian Sterling, MD, FAANS',
    authorRole: 'Director of Neurosurgery & Stroke Center',
    doctorAvatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1000&q=80',
    evidenceLevel: 'Level 1: DEFUSE-3 & DAWN Clinical Trials (AHA/ASA Guidelines)',
    summary: 'Automated neuro-perfusion software accurately quantifies penumbral salvageable brain parenchyma versus ischemic core, permitting successful clot retrieval far beyond the historical 4.5-hour timeframe.',
    keyTakeaways: [
      'Identifies the "tissue clock" rather than strict chronologic time.',
      'Microcatheter stent-retriever suction restores cerebral flow in under 22 minutes door-to-recanalization.',
      'Over 58% of treated patients achieve functional independence (mRS 0-2) at 90 days.'
    ],
    fullContent: [
      'For decades, acute stroke management was limited by the strict 4.5-hour IV tPA window. Patients waking up with deficits were frequently excluded from acute intervention.',
      'With AI-powered CT and MR Perfusion integrated into our 24/7 Stroke Protocol, algorithms compute the ischemic core volume versus under-perfused salvageable brain penumbra in real time.',
      'When salvageable tissue exceeds 15 mL with a mismatch ratio > 1.8, our neuro-interventional team performs mechanical thrombectomy under biplane fluoroscopy.',
      'Rapid recanalization prevents permanent hemiplegia and aphasia, restoring blood supply to millions of neurons per minute saved.'
    ],
    clinicalImplications: 'Extends mechanical thrombectomy intervention eligibility up to 24 hours post-stroke onset with high functional recovery rates.',
    actionableSteps: [
      'Remember the B.E. F.A.S.T protocol (Balance, Eyes, Face, Arms, Speech, Time).',
      'Never give aspirin or food to someone suspected of having an acute stroke before hospital CT imaging.',
      'Call emergency dispatch immediately; do not wait to see if symptoms improve.'
    ],
    featured: true,
    tags: ['Stroke', 'Neurology', 'Emergency Care', 'Neuroscience']
  },
  {
    id: 'art-ortho-1',
    title: 'Kinematic Alignment in Mako Robotic Knee Replacement: Restoring Natural Joint Dynamics',
    subtitle: 'Why personalized bone balancing outperforms mechanical axes for zero-pain joint longevity and same-day walking.',
    departmentId: 'dept-ortho',
    departmentName: 'Orthopedics & Robotic Joint Replacement',
    category: 'Clinical Guide',
    readTime: '4 min read',
    publishedDate: 'August 2026',
    authorDoctorId: 'doc-7',
    authorDoctorName: 'Dr. Marcus Vance Sterling, MD, FAAOS',
    authorRole: 'Director of Orthopedics & Robotic Joint Center',
    doctorAvatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80',
    evidenceLevel: 'Level 1: Randomized Controlled Trial (Bone & Joint Journal 2025)',
    summary: 'Robotic-assisted kinematic alignment respects the patient’s constitutional knee anatomy and ligament tension, eliminating the "unnatural knee" feeling and achieving 99.4% 10-year implant survival.',
    keyTakeaways: [
      'Sub-millimeter 3D preoperative CT mapping and dynamic robotic haptic boundary feedback.',
      'Preserves cruciate ligaments and collateral tension without extensive soft tissue release.',
      'Patients ambulate within 3 hours of surgery and require 70% fewer opioid analgesics.'
    ],
    fullContent: [
      'Traditional knee replacement forced all knees into a standard mechanical 0-degree straight line. However, over 80% of human knees naturally carry 2-4 degrees of natural constitutional varus or valgus.',
      'Mako Robotic technology enables surgeons to execute functional kinematic alignment with 0.5mm and 0.5-degree accuracy.',
      'By balancing the flexion and extension gaps dynamically on screen prior to making any bone cuts, soft tissues remain untouched, virtually eliminating postoperative stiffness.',
      'Over 90% of our robotic joint patients report that their replaced joint feels completely natural during stair climbing and recreational sports.'
    ],
    clinicalImplications: 'Ensures optimal implant stability, minimal blood loss, and rapid return to low-impact sports within 4-6 weeks.',
    actionableSteps: [
      'Strengthen quadriceps and hamstring muscles prior to scheduled surgery for accelerated post-op rehab.',
      'Maintain adequate Vitamin D3 levels (> 30 ng/mL) for optimal bone-implant osseointegration.',
      'Avoid high-impact jumping; embrace swimming, cycling, and golf.'
    ],
    featured: false,
    tags: ['Robotic Surgery', 'Orthopedics', 'Knee Health', 'Rehabilitation']
  },
  {
    id: 'art-onco-1',
    title: 'Circulating Tumor DNA (ctDNA) Liquid Biopsies: Catching Cancer Relapse Months Earlier',
    subtitle: 'How simple blood draws detect microscopic residual disease with ultra-high sensitivity following surgery.',
    departmentId: 'dept-onco',
    departmentName: 'Comprehensive Cancer Institute',
    category: 'Breakthrough',
    readTime: '6 min read',
    publishedDate: 'July 2026',
    authorDoctorId: 'doc-5',
    authorDoctorName: 'Dr. Evelyn Montgomery, BM BCh, FRCP',
    authorRole: 'Head of Oncology & Precision Therapeutics',
    doctorAvatar: 'https://images.unsplash.com/photo-1594824813576-96b6f04d7c04?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1000&q=80',
    evidenceLevel: 'Level 1: Meta-Analysis & Clinical Trials (Nature Medicine 2025/2026)',
    summary: 'Next-generation sequencing for tumor-specific somatic mutations in circulating cell-free DNA detects molecular residual disease (MRD) up to 8.5 months before radiologic CT/PET scan visibility.',
    keyTakeaways: [
      'Tailors adjuvant chemotherapy only to patients with detectable molecular residual disease.',
      'Spares ctDNA-negative patients the toxicity of unnecessary systemic chemotherapy.',
      'Provides an early intervention window when tumor burden is at the single-cell level.'
    ],
    fullContent: [
      'After curative-intent surgical resection of solid tumors (colon, lung, breast), the primary clinical question is whether microscopic cancer cells remain.',
      'By sequencing the primary tumor genome and designing bespoke multiplex PCR/NGS panels, our laboratory tracks patient-specific mutations in routine peripheral blood draws.',
      'The DYNAMIC and CIRCULATE trials have demonstrated that ctDNA-guided therapy improves disease-free survival while sparing thousands of patients unnecessary adjuvant toxicities.',
      'Liquid biopsies represent the forefront of true personalized oncology, turning surveillance into a proactive therapeutic window.'
    ],
    clinicalImplications: 'Enables ultra-early targeted immunotherapy or targeted drugs when cancer cells are most vulnerable.',
    actionableSteps: [
      'Ask your surgical oncologist about personalized tumor-informed ctDNA testing following surgery.',
      'Ensure whole exome sequencing of tumor tissue is archived during initial biopsy or resection.',
      'Maintain anti-inflammatory nutrition rich in polyphenols, omega-3 fatty acids, and dietary fiber.'
    ],
    featured: true,
    tags: ['Oncology', 'Genomics', 'Liquid Biopsy', 'Cancer Prevention']
  },
  {
    id: 'art-gastro-1',
    title: 'The Gut Microbiome & Metabolic Liver Health: Reversing MASH / NAFLD with Targeted Nutrition',
    subtitle: 'Evidence-based protocols to restore the intestinal barrier and resolve hepatic steatosis without medications.',
    departmentId: 'dept-gastro',
    departmentName: 'Gastroenterology & Hepatobiliary Sciences',
    category: 'Nutrition & Lifestyle',
    readTime: '4 min read',
    publishedDate: 'August 2026',
    authorDoctorId: 'doc-9',
    authorDoctorName: 'Dr. Rajeshwar Sen, MD, DM, FACG',
    authorRole: 'Director of Gastroenterology & Hepatology',
    doctorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1000&q=80',
    evidenceLevel: 'Level 1: Systematic Review & EASL Guidelines 2025',
    summary: 'A 7-10% reduction in body weight combined with high prebiotic fermentable fiber and polyphenol intake reduces liver fat by 58% and reverses stage 1-2 fibrosis within 24 weeks.',
    keyTakeaways: [
      'Targeted dietary fiber increases short-chain fatty acid (SCFA) production (butyrate & acetate).',
      'Minimizes gut microbial endotoxin translocation (LPS) that triggers hepatic inflammation.',
      'Transient elastography (FibroScan) tracks liver stiffness improvements quantitatively.'
    ],
    fullContent: [
      'Metabolic dysfunction-associated steatohepatitis (MASH) is now the fastest-growing cause of end-stage liver disease worldwide, closely linked to insulin resistance and ultra-processed food consumption.',
      'Our Liver Wellness Clinic utilizes high-definition FibroScan elastography alongside gut microbiome profiling to design personalized nutritional protocols.',
      'Eliminating high-fructose corn syrup, incorporating extra virgin olive oil (rich in oleocanthal), and consuming 35+ grams of diverse plant fibers weekly repairs the tight junctions of the gut mucosa.',
      'Clinical studies show that within 6 months, over 75% of compliant patients demonstrate complete resolution of hepatic steatosis.'
    ],
    clinicalImplications: 'Reverses early hepatic fibrosis and significantly reduces the risk of cardiovascular events and cirrhosis.',
    actionableSteps: [
      'Consume at least 30 diverse plant species per week (vegetables, berries, legumes, nuts, seeds).',
      'Replace refined cooking oils with cold-pressed extra virgin olive oil.',
      'Get a painless 10-minute FibroScan liver screening if you have metabolic syndrome or elevated ALT/AST.'
    ],
    featured: false,
    tags: ['Gastroenterology', 'Gut Health', 'Liver Wellness', 'Nutrition']
  },
  {
    id: 'art-peds-1',
    title: 'Childhood Sleep Architecture & Cognitive Resilience: Protecting Circadian Rhythms',
    subtitle: 'How deep slow-wave sleep shapes memory consolidation, emotional stability, and immune strength in growing children.',
    departmentId: 'dept-peds',
    departmentName: 'Pediatrics & Advanced Neonatal ICU',
    category: 'Preventive Wellness',
    readTime: '3 min read',
    publishedDate: 'August 2026',
    authorDoctorId: 'doc-11',
    authorDoctorName: 'Dr. Kimberly Zhao, MD, FAAP',
    authorRole: 'Chief of Pediatrics & NICU',
    doctorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1000&q=80',
    evidenceLevel: 'Level 1: American Academy of Pediatrics (AAP) Consensus Statement',
    summary: 'Consistent 9-11 hours of restorative sleep in school-aged children enhances prefrontal cortex executive function, reduces ADHD-like symptoms by 34%, and boosts antibody production following vaccinations.',
    keyTakeaways: [
      'Growth hormone secretion peaks during Stage 3 deep slow-wave sleep.',
      'Blue light exposure within 60 minutes of bedtime suppresses melatonin onset by up to 90 minutes.',
      'Consistent wake-up times anchor circadian pacemakers and improve academic focus.'
    ],
    fullContent: [
      'In our pediatric development clinics, over 40% of behavioral and attentional complaints are traced directly to chronic circadian disruption and insufficient sleep duration.',
      'During non-REM deep sleep, the brain’s glymphatic system clears metabolic waste and transfers short-term memories from the hippocampus to long-term neocortical storage.',
      'Implementing a screen-free "power-down hour" with warm ambient lighting and consistent bedtime routines results in measurable improvements in mood regulation within 14 days.',
      'Adequate sleep also strengthens natural killer cell activity, reducing annual pediatric viral illnesses by nearly half.'
    ],
    clinicalImplications: 'Promotes optimal neurodevelopment, emotional regulation, and physical growth in infants, children, and adolescents.',
    actionableSteps: [
      'Remove all tablets, smartphones, and televisions from children’s bedrooms at night.',
      'Expose children to 15-30 minutes of natural morning sunlight before school.',
      'Consult a pediatric specialist if your child snores loudly or breathes through the mouth during sleep.'
    ],
    featured: false,
    tags: ['Pediatrics', 'Sleep Health', 'Child Wellness', 'Brain Development']
  },
  {
    id: 'art-obgyn-1',
    title: 'Pre-Conception Genetic Carrier Screening & Fetal Echocardiography Advancements',
    subtitle: 'Comprehensive expanded carrier screening and 4D fetal cardiac imaging ensure optimal maternal-fetal outcomes.',
    departmentId: 'dept-obgyn',
    departmentName: 'Obstetrics, Gynecology & Fertility',
    category: 'Clinical Guide',
    readTime: '4 min read',
    publishedDate: 'July 2026',
    authorDoctorId: 'doc-13',
    authorDoctorName: 'Dr. Vivienne LeClerc, MD, FACOG',
    authorRole: 'Chief of Obstetrics & Fetal Medicine',
    doctorAvatar: 'https://images.unsplash.com/photo-1594824813576-96b6f04d7c04?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&w=1000&q=80',
    evidenceLevel: 'Level 1: ACOG Practice Bulletin & Fetal Medicine Foundation',
    summary: 'Expanded pre-conception screening for 500+ recessive monogenic conditions combined with early 16-week 4D fetal echocardiography detects congenital anomalies with > 95% specificity, allowing planned in-utero or immediate neonatal interventions.',
    keyTakeaways: [
      'Identifies silent carrier status for spinal muscular atrophy, cystic fibrosis, and hemoglobinopathies.',
      'Early fetal echocardiography identifies ductal-dependent cardiac lesions before birth.',
      'Seamless coordination between maternal-fetal medicine and Level-IV NICU teams ensures zero-delay delivery care.'
    ],
    fullContent: [
      'Modern obstetrics has shifted from reactive care to proactive maternal-fetal precision medicine.',
      'Pre-conception genetic carrier testing allows couples to understand reproductive risks and explore options such as PGT-M preimplantation testing or targeted prenatal monitoring.',
      'Furthermore, 4D HD-Live fetal echocardiography evaluates the four cardiac chambers, outflow tracts, and aortic arch with millimeter clarity at 18-22 weeks.',
      'Planning delivery in a tertiary surgical center ensures immediate surgical or catheter-based correction for critical congenital heart disease.'
    ],
    clinicalImplications: 'Dramatically reduces unexpected neonatal emergency transfers and optimizes maternal-fetal bonding.',
    actionableSteps: [
      'Schedule a pre-pregnancy wellness consultation 3-6 months before attempting conception.',
      'Start taking 400-800 mcg of active methylated folate (L-methylfolate) daily to prevent neural tube defects.',
      'Ensure standard second-trimester anomaly scans include dedicated fetal cardiac views.'
    ],
    featured: false,
    tags: ['Maternal Health', 'Fetal Medicine', 'Genetics', 'Pregnancy Care']
  },
  {
    id: 'art-longevity-1',
    title: 'Cellular Senescence, NAD+ Dynamics & SGLT-2 Protections: The 2026 Longevity Blueprint',
    subtitle: 'How modern metabolic cardiology and nephrology protocols are extending human healthspan by a decade.',
    departmentId: 'dept-renal',
    departmentName: 'Nephrology, Urology & Kidney Transplant',
    category: 'Longevity',
    readTime: '5 min read',
    publishedDate: 'August 2026',
    authorDoctorId: 'doc-16',
    authorDoctorName: 'Dr. Rebecca Stern, MD, FASN',
    authorRole: 'Director of Nephrology & Dialysis Services',
    doctorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1000&q=80',
    evidenceLevel: 'Level 1: Landmark Trials (EMPA-KIDNEY, DAPA-CKD, Science Translational Medicine)',
    summary: 'SGLT-2 inhibitors and GLP-1 receptor agonists reduce chronic kidney disease progression by 37%, lower systemic vascular inflammation, and mimic calorie-restriction longevity pathways at the cellular level.',
    keyTakeaways: [
      'Lowers intraglomerular hypertension and preserves nephron filtration integrity.',
      'Shifts cellular fuel utilization toward clean ketone body energetics.',
      'Reduces all-cause cardiovascular and renal mortality across diabetic and non-diabetic cohorts.'
    ],
    fullContent: [
      'Renal microvascular health is the single strongest predictor of systemic vascular aging and cognitive preservation.',
      'Originally developed for glycemic control, SGLT-2 inhibitors have emerged as the most potent organ-protective class of the decade.',
      'By activating renal tubuloglomerular feedback, reducing hypoxia, and upregulating sirtuin-1 (SIRT1) longevity genes, these medications protect both the heart and kidneys simultaneously.',
      'When paired with zone-2 exercise, resistance training, and time-restricted feeding, cellular autophagy is optimized and arterial stiffness is reduced.'
    ],
    clinicalImplications: 'Slows chronic renal decline and reduces cardiovascular hospitalization rates by over 30%.',
    actionableSteps: [
      'Screen urine albumin-to-creatinine ratio (uACR) annually alongside serum creatinine.',
      'Prioritize resistance training 3x weekly to maintain muscle mass (sarcopenia prevention).',
      'Maintain blood pressure consistently below 120/80 mmHg using evidence-based lifestyle modifications.'
    ],
    featured: true,
    tags: ['Longevity', 'Kidney Health', 'Metabolic Health', 'Preventive Medicine']
  }
];

export const HEALTH_TIPS: HealthTip[] = [
  {
    id: 'tip-1',
    title: 'The 3-Minute Post-Meal Walk for Blood Sugar Spikes',
    departmentId: 'dept-cardio',
    departmentName: 'Cardiology & Heart Institute',
    tip: 'A brisk 3 to 5 minute stroll immediately after your largest meal contracts major leg muscle groups, activating GLUT4 glucose transporters without requiring insulin surges.',
    actionItem: 'Walk around your office floor or living room for 5 minutes after lunch.',
    evidenceSource: 'Sports Medicine Journal Meta-Analysis & ADA Guidelines',
    authorDoctorName: 'Dr. Arthur Vance, MD',
    category: 'Metabolic & Heart'
  },
  {
    id: 'tip-2',
    title: 'The 20-20-20 Rule for Digital Eye Strain & Macular Health',
    departmentId: 'dept-eye',
    departmentName: 'Ophthalmology Institute',
    tip: 'Every 20 minutes of screen time, gaze at an object at least 20 feet away for 20 seconds. This relaxes the ciliary muscles and prevents chronic accommodative spasm and dry eyes.',
    actionItem: 'Place a small timer or sticky note beside your computer monitor.',
    evidenceSource: 'American Academy of Ophthalmology (AAO)',
    authorDoctorName: 'Dr. Sebastian Sterling-Cruz, MD',
    category: 'Vision & Focus'
  },
  {
    id: 'tip-3',
    title: 'Ergonomic Cervical Spine Alignment to Prevent "Text Neck"',
    departmentId: 'dept-neuro',
    departmentName: 'Neurology & Spine Institute',
    tip: 'Bending your head forward at a 45-degree angle places 49 pounds of mechanical gravitational load on your cervical discs, leading to premature cervical spondylosis.',
    actionItem: 'Elevate your smartphone or monitor to eye level so your chin remains parallel to the floor.',
    evidenceSource: 'Surgical Technology International Spine Biomechanics',
    authorDoctorName: 'Dr. Julian Sterling, MD',
    category: 'Spine & Posture'
  },
  {
    id: 'tip-4',
    title: 'Targeted Hydration to Prevent Calcium Oxalate Kidney Stones',
    departmentId: 'dept-renal',
    departmentName: 'Nephrology & Urology Institute',
    tip: 'Adding freshly squeezed lemon juice to morning water increases urinary citrate excretion, binding free calcium and preventing 85% of crystal aggregations.',
    actionItem: 'Drink 2.5 - 3 Liters of fluid daily and add a slice of fresh lemon.',
    evidenceSource: 'American Urological Association (AUA) Guidelines',
    authorDoctorName: 'Dr. Tariq Al-Mansoor, MD',
    category: 'Renal & Urology'
  },
  {
    id: 'tip-5',
    title: 'Omega-3 Fatty Acids for Joint Cartilage Preservation',
    departmentId: 'dept-ortho',
    departmentName: 'Orthopedics & Joint Center',
    tip: 'Daily intake of 2,000mg EPA/DHA inhibits matrix metalloproteinases (MMPs) that break down knee cartilage, reducing joint morning stiffness by 42%.',
    actionItem: 'Incorporate wild salmon, walnuts, chia seeds, or molecularly distilled fish oil.',
    evidenceSource: 'Arthritis & Rheumatology Clinical Trials',
    authorDoctorName: 'Dr. Marcus Vance Sterling, MD',
    category: 'Joints & Bones'
  },
  {
    id: 'tip-6',
    title: 'Circadian Polyphenols for Healthy Gut Microbiota',
    departmentId: 'dept-gastro',
    departmentName: 'Gastroenterology Sciences',
    tip: 'Dark berries, green tea, and 85%+ dark chocolate contain flavonoids that act as prebiotic fuel for Akkermansia muciniphila, the key bacterium that strengthens your gut lining.',
    actionItem: 'Enjoy a small bowl of fresh blueberries or blackberries as an afternoon snack.',
    evidenceSource: 'Gastroenterology & Gut Microbes Research',
    authorDoctorName: 'Dr. Rajeshwar Sen, MD',
    category: 'Gut & Digestion'
  }
];

