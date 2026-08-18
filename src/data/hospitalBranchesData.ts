import { HospitalBranch } from '../types/hospital';

export const HOSPITAL_BRANCHES: HospitalBranch[] = [
  {
    id: 'branch-main',
    name: 'We Care Main Medical City & Quaternary Center',
    tagline: 'Flagship 750-Bed Quaternary Care Hospital & Academic Medical Campus',
    type: 'Main Medical City',
    address: '450 Health Sciences Boulevard, Medical District, NY 10016',
    district: 'Central Medical District',
    city: 'Metropolitan Core',
    coordinates: { x: 50, y: 46 },
    geoCoords: { lat: 40.7418, lng: -73.9782 },
    distanceFromCenter: '0.0 miles (HQ Campus)',
    travelTime: {
      drive: 'Current Location',
      transit: 'Direct Metro Line M1 (Station Entrance in Lobby)',
      ambulance: 'Immediate Rooftop Helipad & L1 Trauma Bay'
    },
    phone: '+1 (800) 932-2731',
    emergencyPhone: '+1 (800) 932-2732',
    openHours: '24 Hours / 7 Days (All Departments)',
    emergencyAvailable: true,
    bedCapacity: 750,
    availableBeds: 68,
    erWaitTime: '< 4 mins',
    rating: 4.98,
    reviewCount: 1420,
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80',
    specialtyBadges: ['Quaternary Center', 'Level 1 Trauma', 'Robotic Surgery Hub', 'Organ Transplant Center'],
    amenities: [
      '24/7 Level 1 Trauma Center',
      'Dual Rooftop Helipads',
      '18 Hybrid Robotic Operating Suites',
      'Intraoperative 3T MRI & PET-CT',
      'Automated Underground Valet (1,200 cars)',
      '24/7 Robotic Dispensing Pharmacy',
      'In-House Blood Bank & Stem Cell Lab',
      'Direct Metro Station Skywalk'
    ],
    departmentAvailability: [
      {
        departmentId: 'dept-cardio',
        departmentName: 'Cardiology & Heart Vascular Institute',
        isAvailable: true,
        status: 'Full Inpatient & Robotic Surgery',
        leadDoctorName: 'Dr. Arthur Vance',
        nextSlot: 'Today, 02:30 PM',
        operatingSuites: 5,
        keyServices: ['Robotic CABG', 'TAVR & Mitraclip', 'Primary Angioplasty 24/7', 'Pediatric Cardiac ICU']
      },
      {
        departmentId: 'dept-neuro',
        departmentName: 'Neurology, Neurosurgery & Spine Institute',
        isAvailable: true,
        status: 'Full Inpatient & Robotic Surgery',
        leadDoctorName: 'Dr. Elena Rostova',
        nextSlot: 'Today, 03:15 PM',
        operatingSuites: 4,
        keyServices: ['Awake Craniotomy', 'Endovascular Thrombectomy < 28m', 'Deep Brain Stimulation (DBS)', 'Endoscopic Spine']
      },
      {
        departmentId: 'dept-onco',
        departmentName: 'Comprehensive Cancer Institute',
        isAvailable: true,
        status: 'Full Inpatient & Robotic Surgery',
        leadDoctorName: 'Dr. Devika Rao',
        nextSlot: 'Tomorrow, 09:00 AM',
        operatingSuites: 4,
        keyServices: ['TrueBeam Radiosurgery', 'CAR-T & Bone Marrow Transplant', 'Robotic Onco-Resection', 'Genomic Profiling']
      },
      {
        departmentId: 'dept-ortho',
        departmentName: 'Orthopedics & Robotic Joint Replacement',
        isAvailable: true,
        status: 'Full Inpatient & Robotic Surgery',
        leadDoctorName: 'Dr. Marcus Holloway',
        nextSlot: 'Today, 04:00 PM',
        operatingSuites: 3,
        keyServices: ['Mako SmartRobotics Knee & Hip', '4K Arthroscopy Sports Clinic', 'Pelvic Fracture Unit', 'Rapid 48h Rehab']
      },
      {
        departmentId: 'dept-gastro',
        departmentName: 'Gastroenterology & Hepatobiliary Sciences',
        isAvailable: true,
        status: 'Full Inpatient & Robotic Surgery',
        leadDoctorName: 'Dr. Sophia Chen',
        nextSlot: 'Today, 01:45 PM',
        operatingSuites: 3,
        keyServices: ['Liver Transplant Unit', 'Third-Space Endoscopy POEM', 'SpyGlass Cholangioscopy', 'Fibroscan']
      },
      {
        departmentId: 'dept-peds',
        departmentName: 'Pediatrics & Advanced Neonatal ICU',
        isAvailable: true,
        status: 'Full Inpatient & Robotic Surgery',
        leadDoctorName: 'Dr. Julian Thorne',
        nextSlot: 'Today, 11:30 AM',
        operatingSuites: 2,
        keyServices: ['Level IV NICU 45 Beds', 'Pediatric Heart Surgery', 'Child-Life Specialists', 'High-Frequency Ventilation']
      },
      {
        departmentId: 'dept-obgyn',
        departmentName: 'Obstetrics, Gynecology & Fertility (IVF)',
        isAvailable: true,
        status: 'Full Inpatient & Robotic Surgery',
        leadDoctorName: 'Dr. Alistair Finch',
        nextSlot: 'Today, 02:00 PM',
        operatingSuites: 3,
        keyServices: ['Luxury LDRP Birthing Suites', 'Advanced IVF Clinic PGT-A', 'Robotic Myomectomy', 'Fetal Medicine 4D']
      },
      {
        departmentId: 'dept-renal',
        departmentName: 'Nephrology, Urology & Kidney Transplant',
        isAvailable: true,
        status: 'Full Inpatient & Robotic Surgery',
        leadDoctorName: 'Dr. Naomi Becker',
        nextSlot: 'Tomorrow, 10:30 AM',
        operatingSuites: 3,
        keyServices: ['Robotic Kidney Transplant', 'Moses 2.0 Laser Lithotripsy', '24/7 Ultrapure Hemodialysis', 'HoLEP Prostate']
      },
      {
        departmentId: 'dept-eye',
        departmentName: 'Ophthalmology & Refractive Eye Institute',
        isAvailable: true,
        status: 'Full Inpatient & Robotic Surgery',
        leadDoctorName: 'Dr. Marcus Holloway',
        nextSlot: 'Today, 03:00 PM',
        operatingSuites: 2,
        keyServices: ['Zeiss VisuMax 800 SMILE Pro', 'FLACS Robotic Cataract', 'Vitrectomy Retinal Care', 'Corneal Transplants']
      },
      {
        departmentId: 'dept-emergency',
        departmentName: '24/7 Emergency & Level 1 Trauma Care',
        isAvailable: true,
        status: 'Full Inpatient & Robotic Surgery',
        leadDoctorName: 'Dr. Arthur Vance',
        nextSlot: 'Walk-In 24/7 (Instant)',
        operatingSuites: 4,
        keyServices: ['Resuscitation Red Zone', 'Dedicated In-Situ ER CT', 'Point-of-Care Ultrasound', 'Air Ambulance Transfer']
      }
    ]
  },
  {
    id: 'branch-downtown',
    name: 'We Care Downtown Heart & Surgical Pavilion',
    tagline: 'Dedicated Center for Acute Cardiovascular, Vascular & Interventional Care',
    type: 'Surgical & Cardiac Pavilion',
    address: '120 Financial Plaza, Wall Street District, NY 10005',
    district: 'Financial District & Lower Metro',
    city: 'Downtown',
    coordinates: { x: 34, y: 68 },
    geoCoords: { lat: 40.7075, lng: -74.0090 },
    distanceFromCenter: '3.4 miles South',
    travelTime: {
      drive: '12 mins via FDR Drive',
      transit: '14 mins via Express Subway Line 4/5',
      ambulance: '6 mins (Dedicated Priority Corridor)'
    },
    phone: '+1 (212) 555-0301',
    emergencyPhone: '+1 (800) 932-2733',
    openHours: '24/7 Cardiac Emergency + 08:00 AM - 08:00 PM OPD',
    emergencyAvailable: true,
    bedCapacity: 220,
    availableBeds: 24,
    erWaitTime: '< 3 mins',
    rating: 4.96,
    reviewCount: 680,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    specialtyBadges: ['Chest Pain Center', 'Fast-Track Angioplasty', 'Vascular Institute', 'Executive OPD'],
    amenities: [
      '24/7 Acute Coronary Care Unit',
      '3 Hybrid Siemens Cath Labs',
      'Rapid Door-to-Balloon < 38 mins',
      'Executive Stress Testing & Cardiac CT',
      'Valet Parking & Executive Lounge',
      'High-Speed Vascular Recovery Ward'
    ],
    departmentAvailability: [
      {
        departmentId: 'dept-cardio',
        departmentName: 'Cardiology & Heart Vascular Institute',
        isAvailable: true,
        status: 'Full Inpatient & Robotic Surgery',
        leadDoctorName: 'Dr. Arthur Vance',
        nextSlot: 'Today, 03:00 PM',
        operatingSuites: 3,
        keyServices: ['Emergency Angioplasty', 'Electrophysiology & Ablation', 'TAVR Structural Clinic', 'Heart Failure Clinic']
      },
      {
        departmentId: 'dept-renal',
        departmentName: 'Nephrology, Urology & Kidney Transplant',
        isAvailable: true,
        status: 'Outpatient OPD & Day Care',
        leadDoctorName: 'Dr. Naomi Becker',
        nextSlot: 'Today, 04:15 PM',
        operatingSuites: 1,
        keyServices: ['Daycare Hemodialysis', 'Urology Stone Consultation', 'Cardio-Renal Clinic', 'Hypertension Screening']
      },
      {
        departmentId: 'dept-gastro',
        departmentName: 'Gastroenterology & Hepatobiliary Sciences',
        isAvailable: true,
        status: 'Outpatient OPD & Day Care',
        leadDoctorName: 'Dr. Sophia Chen',
        nextSlot: 'Tomorrow, 10:00 AM',
        operatingSuites: 1,
        keyServices: ['Diagnostic Gastroscopy', 'Colonoscopy Day Care', 'GERD & Reflux Clinic', 'Liver Function Screening']
      },
      {
        departmentId: 'dept-ortho',
        departmentName: 'Orthopedics & Robotic Joint Replacement',
        isAvailable: true,
        status: 'Outpatient OPD & Day Care',
        leadDoctorName: 'Dr. Marcus Holloway',
        nextSlot: 'Tomorrow, 02:00 PM',
        operatingSuites: 1,
        keyServices: ['Sports Medicine Consultation', 'Post-Op Physical Therapy', 'Joint Pain Injections', 'Spine Rehab']
      },
      {
        departmentId: 'dept-emergency',
        departmentName: '24/7 Emergency & Level 1 Trauma Care',
        isAvailable: true,
        status: 'Full Inpatient & Robotic Surgery',
        leadDoctorName: 'Dr. Elena Rostova',
        nextSlot: 'Walk-In 24/7 (Zero Wait)',
        operatingSuites: 2,
        keyServices: ['Cardiac Resuscitation Bay', 'Stroke Code Immediate Thrombolysis', 'Trauma Stabilization Bay']
      },
      {
        departmentId: 'dept-onco',
        departmentName: 'Comprehensive Cancer Institute',
        isAvailable: false,
        status: 'Not Available',
        leadDoctorName: 'Referral to Westside / Main Campus',
        nextSlot: 'Transfer Available',
        keyServices: ['Patients routed to Westside Cancer Center (4.5 miles)']
      },
      {
        departmentId: 'dept-peds',
        departmentName: 'Pediatrics & Advanced Neonatal ICU',
        isAvailable: false,
        status: 'Not Available',
        leadDoctorName: 'Referral to Uptown Campus',
        nextSlot: 'Transfer Available',
        keyServices: ['Pediatric cases routed to Uptown Children’s Hospital']
      },
      {
        departmentId: 'dept-obgyn',
        departmentName: 'Obstetrics, Gynecology & Fertility (IVF)',
        isAvailable: false,
        status: 'Not Available',
        leadDoctorName: 'Referral to Uptown Campus',
        nextSlot: 'Transfer Available',
        keyServices: ['Birthing & IVF routed to Uptown Campus']
      }
    ]
  },
  {
    id: 'branch-westside',
    name: 'We Care Westside Comprehensive Cancer Center',
    tagline: 'State-of-the-Art Sanctuary for Oncology, Genomics & Radiotherapy',
    type: 'Cancer & Research Institute',
    address: '880 Riverside Drive, Hudson Waterfront, NY 10032',
    district: 'Westside Riverfront District',
    city: 'Westside',
    coordinates: { x: 22, y: 32 },
    geoCoords: { lat: 40.7989, lng: -73.9680 },
    distanceFromCenter: '4.8 miles North-West',
    travelTime: {
      drive: '16 mins via West Side Highway',
      transit: '18 mins via Subway Line 1/A',
      ambulance: '8 mins with Police Escort Priority'
    },
    phone: '+1 (212) 555-0450',
    emergencyPhone: '+1 (800) 932-2735',
    openHours: '24/7 Oncology Inpatient & Emergency + 08:00 AM - 07:00 PM Chemotherapy',
    emergencyAvailable: true,
    bedCapacity: 180,
    availableBeds: 19,
    erWaitTime: '< 5 mins',
    rating: 4.99,
    reviewCount: 940,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    specialtyBadges: ['NCI Designated Alignment', 'TrueBeam Radiosurgery', 'CAR-T Center', 'Precision Genomics'],
    amenities: [
      '2 TrueBeam STx Linear Accelerators',
      '40-Bay Daycare Chemotherapy Lounge',
      'Dedicated Scalp-Cooling Hair Preservation',
      'Class 100 Bone Marrow Transplant Unit',
      'Digital PET-CT & Radioligand Lab',
      'Onco-Psychology & Integrative Wellness Sanctuary'
    ],
    departmentAvailability: [
      {
        departmentId: 'dept-onco',
        departmentName: 'Comprehensive Cancer Institute',
        isAvailable: true,
        status: 'Full Inpatient & Robotic Surgery',
        leadDoctorName: 'Dr. Devika Rao',
        nextSlot: 'Today, 01:30 PM',
        operatingSuites: 4,
        keyServices: ['Precision Immunotherapy', 'Stereotactic Radiosurgery', 'Bone Marrow Transplant', 'Robotic Tumor Resection']
      },
      {
        departmentId: 'dept-gastro',
        departmentName: 'Gastroenterology & Hepatobiliary Sciences',
        isAvailable: true,
        status: 'Advanced Diagnostics & Chemotherapy',
        leadDoctorName: 'Dr. Sophia Chen',
        nextSlot: 'Today, 03:30 PM',
        operatingSuites: 2,
        keyServices: ['GI Onco-Endoscopy', 'Liver Tumor Chemoembolization (TACE)', 'EUS Fine Needle Biopsy', 'Biliary Stenting']
      },
      {
        departmentId: 'dept-renal',
        departmentName: 'Nephrology, Urology & Kidney Transplant',
        isAvailable: true,
        status: 'Advanced Diagnostics & Chemotherapy',
        leadDoctorName: 'Dr. Naomi Becker',
        nextSlot: 'Tomorrow, 11:00 AM',
        operatingSuites: 2,
        keyServices: ['Robotic Prostatectomy', 'Bladder Tumor Resection', 'Onco-Nephrology Supportive Dialysis', 'Renal Cancer Suite']
      },
      {
        departmentId: 'dept-neuro',
        departmentName: 'Neurology, Neurosurgery & Spine Institute',
        isAvailable: true,
        status: 'Outpatient OPD & Day Care',
        leadDoctorName: 'Dr. Elena Rostova',
        nextSlot: 'Tomorrow, 03:00 PM',
        operatingSuites: 1,
        keyServices: ['Brain Tumor Radiosurgery Planning', 'Neuro-Oncology Clinic', 'Spine Metastasis Ablation', 'Neuropathy Clinic']
      },
      {
        departmentId: 'dept-emergency',
        departmentName: '24/7 Emergency & Level 1 Trauma Care',
        isAvailable: true,
        status: 'Emergency Only',
        leadDoctorName: 'Dr. Devika Rao',
        nextSlot: '24/7 Onco-Emergency Desk',
        operatingSuites: 1,
        keyServices: ['Neutropenic Fever Protocol', 'Acute Tumor Lysis Care', 'Oncological Resuscitation']
      },
      {
        departmentId: 'dept-peds',
        departmentName: 'Pediatrics & Advanced Neonatal ICU',
        isAvailable: false,
        status: 'Not Available',
        leadDoctorName: 'Referral to Uptown Campus',
        nextSlot: 'Transfer Available',
        keyServices: ['Pediatric oncology inpatient cases routed to Uptown Center']
      }
    ]
  },
  {
    id: 'branch-uptown',
    name: 'We Care Uptown Children & Women\'s Hospital',
    tagline: 'Specialized Mother, Child, Fertility & Pediatric Quaternary Hospital',
    type: 'Children & Women Hospital',
    address: '320 Park Heights Boulevard, Uptown Academic Zone, NY 10028',
    district: 'Uptown & Upper East Enclave',
    city: 'Uptown',
    coordinates: { x: 68, y: 22 },
    geoCoords: { lat: 40.7765, lng: -73.9554 },
    distanceFromCenter: '3.8 miles North',
    travelTime: {
      drive: '14 mins via Park Avenue',
      transit: '15 mins via Subway Line 6 / Q',
      ambulance: '7 mins (Specialized Neonatal Mobile ICU)'
    },
    phone: '+1 (212) 555-0890',
    emergencyPhone: '+1 (800) 932-2736',
    openHours: '24/7 Pediatric ER & Birthing Center + 08:00 AM - 08:00 PM Outpatient',
    emergencyAvailable: true,
    bedCapacity: 260,
    availableBeds: 32,
    erWaitTime: '< 3 mins (Child Fast-Track)',
    rating: 4.97,
    reviewCount: 1120,
    image: 'https://images.unsplash.com/photo-1502740479091-635887520276?auto=format&fit=crop&w=1200&q=80',
    specialtyBadges: ['Level IV NICU', 'Luxury LDRP Suites', 'Advanced IVF Clinic', 'Pediatric Surgical Hub'],
    amenities: [
      '24/7 Pediatric Emergency with Child-Life Staff',
      '45-Bed Level IV Neonatal ICU (Giraffe Omnibeds)',
      '18 Boutique LDRP Birthing Suites with Hydrotherapy Tubs',
      'RI Witness Certified IVF & Genetic Lab',
      'Indoor Pediatric Play Therapy Garden',
      'Specialized Neonatal Transport Ambulance'
    ],
    departmentAvailability: [
      {
        departmentId: 'dept-peds',
        departmentName: 'Pediatrics & Advanced Neonatal ICU',
        isAvailable: true,
        status: 'Full Inpatient & Robotic Surgery',
        leadDoctorName: 'Dr. Julian Thorne',
        nextSlot: 'Today, 01:15 PM',
        operatingSuites: 3,
        keyServices: ['Level IV NICU Micro-preemies', 'Pediatric Minimally Invasive Surgery', 'Painless Vaccination Clinic', 'Developmental Pediatrics']
      },
      {
        departmentId: 'dept-obgyn',
        departmentName: 'Obstetrics, Gynecology & Fertility (IVF)',
        isAvailable: true,
        status: 'Full Inpatient & Robotic Surgery',
        leadDoctorName: 'Dr. Alistair Finch',
        nextSlot: 'Today, 02:45 PM',
        operatingSuites: 3,
        keyServices: ['Natural & Water Birth Suites', 'High-Risk Pregnancy Unit', 'IVF & ICSI Genetic Screening', 'Robotic Laparoscopy']
      },
      {
        departmentId: 'dept-eye',
        departmentName: 'Ophthalmology & Refractive Eye Institute',
        isAvailable: true,
        status: 'Outpatient OPD & Day Care',
        leadDoctorName: 'Dr. Marcus Holloway',
        nextSlot: 'Tomorrow, 09:30 AM',
        operatingSuites: 1,
        keyServices: ['Pediatric Strabismus & Amblyopia', 'Retinopathy of Prematurity (ROP) RetCam', 'SMILE Pro Vision Correction', 'Family Eye Care']
      },
      {
        departmentId: 'dept-ortho',
        departmentName: 'Orthopedics & Robotic Joint Replacement',
        isAvailable: true,
        status: 'Outpatient OPD & Day Care',
        leadDoctorName: 'Dr. Marcus Holloway',
        nextSlot: 'Tomorrow, 01:30 PM',
        operatingSuites: 1,
        keyServices: ['Pediatric Scoliosis & Clubfoot Clinic', 'Women’s Bone Health & Osteoporosis', 'Sports Injury Rehab']
      },
      {
        departmentId: 'dept-emergency',
        departmentName: '24/7 Emergency & Level 1 Trauma Care',
        isAvailable: true,
        status: 'Full Inpatient & Robotic Surgery',
        leadDoctorName: 'Dr. Julian Thorne',
        nextSlot: 'Walk-In 24/7 (Child-Friendly)',
        operatingSuites: 2,
        keyServices: ['Pediatric Trauma Resuscitation', 'Obstetric Emergency Delivery Bay', 'Toxicology & Ingestion Clinic']
      },
      {
        departmentId: 'dept-cardio',
        departmentName: 'Cardiology & Heart Vascular Institute',
        isAvailable: false,
        status: 'Not Available',
        leadDoctorName: 'Referral to Main Campus',
        nextSlot: 'Transfer Available',
        keyServices: ['Adult cardiac surgeries routed to Main Medical City Campus']
      }
    ]
  },
  {
    id: 'branch-north-trauma',
    name: 'We Care North Suburban Trauma & Orthopedics Center',
    tagline: 'High-Velocity Emergency Trauma, Joint Replacement & Neuroscience Hub',
    type: 'Emergency & Trauma Hub',
    address: '1500 Expressway Way, North Metro Crossing, NY 10701',
    district: 'North Interstate Corridor',
    city: 'Suburban North',
    coordinates: { x: 76, y: 58 },
    geoCoords: { lat: 40.8520, lng: -73.9120 },
    distanceFromCenter: '8.2 miles North-East',
    travelTime: {
      drive: '18 mins via Interstate 87 Express',
      transit: '22 mins via Metro-North Commuter Train',
      ambulance: '9 mins (Interstate Emergency Corridor)'
    },
    phone: '+1 (914) 555-0911',
    emergencyPhone: '+1 (800) 932-2737',
    openHours: '24 Hours / 7 Days Non-Stop Operations',
    emergencyAvailable: true,
    bedCapacity: 310,
    availableBeds: 41,
    erWaitTime: '< 2 mins (Zero Red-Zone Delay)',
    rating: 4.95,
    reviewCount: 790,
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    specialtyBadges: ['Level-1 Trauma Certified', 'Mako Robotics Hub', 'Comprehensive Stroke Center', 'Air Heli-Base'],
    amenities: [
      'Dedicated Interstate Trauma Bay with 10 Resuscitation Bays',
      'Ground Helicopter Landing Base & Air Ambulances',
      'Mako Robotic Joint Replacement Theater',
      'Siemens High-Speed Polytrauma Dual-Source CT',
      'Suburban Drive-Through Emergency Triage',
      '60-Bed Surgical & Trauma Intensive Care (STICU)'
    ],
    departmentAvailability: [
      {
        departmentId: 'dept-emergency',
        departmentName: '24/7 Emergency & Level 1 Trauma Care',
        isAvailable: true,
        status: 'Full Inpatient & Robotic Surgery',
        leadDoctorName: 'Dr. Arthur Vance',
        nextSlot: 'Walk-In 24/7 (Instant Resuscitation)',
        operatingSuites: 4,
        keyServices: ['Polytrauma Damage Control Surgery', 'Mass Casualty Triage', 'Emergency Neurosurgical Decompression', 'Air Rescue Team']
      },
      {
        departmentId: 'dept-ortho',
        departmentName: 'Orthopedics & Robotic Joint Replacement',
        isAvailable: true,
        status: 'Full Inpatient & Robotic Surgery',
        leadDoctorName: 'Dr. Marcus Holloway',
        nextSlot: 'Today, 02:00 PM',
        operatingSuites: 3,
        keyServices: ['Mako Total Knee & Hip Arthroplasty', 'Pelvic & Complex Fracture Reconstruction', 'Same-Day Joint Mobility', 'Spine Trauma Center']
      },
      {
        departmentId: 'dept-neuro',
        departmentName: 'Neurology, Neurosurgery & Spine Institute',
        isAvailable: true,
        status: 'Full Inpatient & Robotic Surgery',
        leadDoctorName: 'Dr. Elena Rostova',
        nextSlot: 'Today, 03:45 PM',
        operatingSuites: 2,
        keyServices: ['Acute Stroke Thrombectomy Suite', 'Traumatic Brain Injury (TBI) Care', 'Endoscopic Spine Decompression', 'Intensive Neuro-ICU']
      },
      {
        departmentId: 'dept-cardio',
        departmentName: 'Cardiology & Heart Vascular Institute',
        isAvailable: true,
        status: 'Outpatient OPD & Day Care',
        leadDoctorName: 'Dr. Arthur Vance',
        nextSlot: 'Tomorrow, 10:00 AM',
        operatingSuites: 1,
        keyServices: ['Emergency Angioplasty Stabilization', 'Cardiology Outpatient Clinic', 'Echocardiography & Stress Testing']
      },
      {
        departmentId: 'dept-gastro',
        departmentName: 'Gastroenterology & Hepatobiliary Sciences',
        isAvailable: true,
        status: 'Outpatient OPD & Day Care',
        leadDoctorName: 'Dr. Sophia Chen',
        nextSlot: 'Tomorrow, 01:00 PM',
        operatingSuites: 1,
        keyServices: ['Acute GI Bleeding Endoscopy', 'Emergency Abdominal Ultrasound', 'Outpatient Digestive Clinic']
      },
      {
        departmentId: 'dept-onco',
        departmentName: 'Comprehensive Cancer Institute',
        isAvailable: false,
        status: 'Not Available',
        leadDoctorName: 'Referral to Westside Campus',
        nextSlot: 'Transfer Available',
        keyServices: ['Cancer patients routed to Westside Comprehensive Cancer Center']
      }
    ]
  },
  {
    id: 'branch-metro-ambulatory',
    name: 'We Care Midtown Ambulatory & Diagnostic Pavilion',
    tagline: 'Rapid Daycare Surgery, Executive Checkups, Advanced Imaging & Specialist OPD',
    type: 'Ambulatory & Diagnostic Care',
    address: '600 Lexington Avenue, Midtown Central, NY 10022',
    district: 'Midtown East Commercial Hub',
    city: 'Midtown',
    coordinates: { x: 44, y: 28 },
    geoCoords: { lat: 40.7580, lng: -73.9720 },
    distanceFromCenter: '1.9 miles North-East',
    travelTime: {
      drive: '8 mins via Lexington Ave',
      transit: '6 mins via Express Line 6 / E',
      ambulance: '4 mins Priority Ambulance'
    },
    phone: '+1 (212) 555-0670',
    emergencyPhone: '+1 (800) 932-2738',
    openHours: '07:00 AM - 09:00 PM Daily (Walk-In Diagnostic & OPD)',
    emergencyAvailable: false,
    bedCapacity: 80,
    availableBeds: 14,
    erWaitTime: 'Urgent Care < 6 mins',
    rating: 4.96,
    reviewCount: 520,
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    specialtyBadges: ['Same-Day Surgery', '3T MRI & High-Res CT', 'Executive Health Lounge', 'All-Specialty OPD'],
    amenities: [
      'Same-Day Discharge Daycare Surgical Theaters',
      'Wide-Bore Silent 3T MRI & 512-Slice Spectral CT',
      'Comprehensive Executive Health Screening Lounge',
      'Fast-Track Pathology Lab with 1-Hour Report Delivery',
      'Specialist OPD Consultations for All Major Disciplines',
      'Digital Telemedicine Studios'
    ],
    departmentAvailability: [
      {
        departmentId: 'dept-cardio',
        departmentName: 'Cardiology & Heart Vascular Institute',
        isAvailable: true,
        status: 'Outpatient OPD & Day Care',
        leadDoctorName: 'Dr. Arthur Vance',
        nextSlot: 'Today, 11:00 AM',
        operatingSuites: 1,
        keyServices: ['Executive Cardiac Screening', 'Holter 24h Monitoring', 'Preventive Cardiology Clinic', 'Echocardiography']
      },
      {
        departmentId: 'dept-neuro',
        departmentName: 'Neurology, Neurosurgery & Spine Institute',
        isAvailable: true,
        status: 'Outpatient OPD & Day Care',
        leadDoctorName: 'Dr. Elena Rostova',
        nextSlot: 'Today, 02:30 PM',
        operatingSuites: 1,
        keyServices: ['Headache & Migraine Center', '3T Brain MRI Diagnostic Scanning', 'EEG / EMG Nerve Studies', 'Memory & Cognitive Clinic']
      },
      {
        departmentId: 'dept-ortho',
        departmentName: 'Orthopedics & Robotic Joint Replacement',
        isAvailable: true,
        status: 'Outpatient OPD & Day Care',
        leadDoctorName: 'Dr. Marcus Holloway',
        nextSlot: 'Today, 03:30 PM',
        operatingSuites: 1,
        keyServices: ['Daycare Knee Arthroscopy', 'Platelet-Rich Plasma (PRP) Injections', 'Sports Injury Assessment', 'Physiotherapy']
      },
      {
        departmentId: 'dept-gastro',
        departmentName: 'Gastroenterology & Hepatobiliary Sciences',
        isAvailable: true,
        status: 'Outpatient OPD & Day Care',
        leadDoctorName: 'Dr. Sophia Chen',
        nextSlot: 'Tomorrow, 09:00 AM',
        operatingSuites: 2,
        keyServices: ['Painless Sedation Gastroscopy & Colonoscopy', 'Polypectomy Daycare', 'Non-Invasive Fibroscan', 'GI Wellness']
      },
      {
        departmentId: 'dept-eye',
        departmentName: 'Ophthalmology & Refractive Eye Institute',
        isAvailable: true,
        status: 'Outpatient OPD & Day Care',
        leadDoctorName: 'Dr. Marcus Holloway',
        nextSlot: 'Today, 01:00 PM',
        operatingSuites: 2,
        keyServices: ['Zeiss SMILE Pro Laser Vision', 'Robotic FLACS Cataract Day Surgery', 'Dry Eye Spa & Meibomian Gland Therapy', 'Retina Scan']
      },
      {
        departmentId: 'dept-renal',
        departmentName: 'Nephrology, Urology & Kidney Transplant',
        isAvailable: true,
        status: 'Outpatient OPD & Day Care',
        leadDoctorName: 'Dr. Naomi Becker',
        nextSlot: 'Tomorrow, 02:00 PM',
        operatingSuites: 1,
        keyServices: ['Urology Day Clinic', 'Kidney Health Screening', 'Prostate Check Panel', 'Renal Ultrasound']
      },
      {
        departmentId: 'dept-emergency',
        departmentName: '24/7 Emergency & Level 1 Trauma Care',
        isAvailable: false,
        status: 'Not Available',
        leadDoctorName: 'Urgent Care Only (Severe Trauma Routed to Main)',
        nextSlot: 'Urgent Care 08:00 AM - 08:00 PM',
        keyServices: ['Walk-in minor injury & urgent care clinic. Major trauma transferred to Main Campus']
      }
    ]
  }
];
