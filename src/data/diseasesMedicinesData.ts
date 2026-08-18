import { DiseaseMedicineGuide } from '../types/hospital';

export const DISEASES_MEDICINES_DATA: DiseaseMedicineGuide[] = [
  {
    id: 'dis-1',
    diseaseName: 'Type 2 Diabetes Mellitus',
    category: 'Endocrine & Metabolic',
    departmentName: 'Endocrinology & Diabetes',
    departmentId: 'endocrinology',
    severityLevel: 'Chronic Management',
    overview: 'A chronic metabolic condition characterized by insulin resistance and elevated blood glucose levels. Clinical treatment aims to maintain HbA1c < 7.0%, prevent cardiovascular endpoints, and preserve renal microvasculature.',
    commonSymptoms: [
      'Increased thirst (polydipsia)',
      'Frequent urination especially at night (polyuria)',
      'Unexplained weight loss & chronic fatigue',
      'Blurred vision & slow-healing sores',
      'Tingling or numbness in hands/feet'
    ],
    recommendedMedicines: [
      {
        rank: 1,
        brandName: 'Glucophage / Fortamet',
        genericName: 'Metformin Hydrochloride (XR)',
        drugClass: 'Biguanide (AMPK Activator)',
        standardDosage: '500 mg – 1000 mg Extended Release',
        frequencyAndTiming: 'Once to twice daily, strictly with or after meals',
        mechanismOfAction: 'Suppresses hepatic gluconeogenesis, increases peripheral insulin sensitivity, and improves cellular glucose uptake.',
        keyBenefits: 'Gold standard first-line therapy; weight-neutral, does not induce hypoglycemia as monotherapy.',
        precautions: 'Monitor eGFR (contraindicated if eGFR < 30 mL/min). Discontinue before iodinated contrast dye procedures.',
        prescriptionStatus: 'Rx Required'
      },
      {
        rank: 2,
        brandName: 'Jardiance',
        genericName: 'Empagliflozin',
        drugClass: 'SGLT2 Inhibitor',
        standardDosage: '10 mg – 25 mg once daily',
        frequencyAndTiming: 'Once daily in the morning with or without food',
        mechanismOfAction: 'Inhibits sodium-glucose co-transporter 2 in renal proximal tubules, promoting urinary glucose and sodium excretion.',
        keyBenefits: 'Proven reduction in cardiovascular mortality, heart failure hospitalization, and diabetic kidney disease progression.',
        precautions: 'Maintain optimal hydration; monitor for mycotic genital infections and rare euglycemic ketoacidosis.',
        prescriptionStatus: 'Rx Required'
      },
      {
        rank: 3,
        brandName: 'Ozempic / Rybelsus',
        genericName: 'Semaglutide',
        drugClass: 'GLP-1 Receptor Agonist',
        standardDosage: '0.5 mg – 1.0 mg Weekly SubQ or 7 mg – 14 mg Daily Oral',
        frequencyAndTiming: 'Inject once weekly OR oral tablet on empty stomach with 120ml plain water 30 mins before breakfast',
        mechanismOfAction: 'Glucose-dependent insulin secretion, glucagon suppression, and delayed gastric emptying with appetite control.',
        keyBenefits: 'Substantial HbA1c reduction, major weight loss, and proven cardio-renal risk reduction.',
        precautions: 'Start low dose to prevent nausea; contraindicated in patients with medullary thyroid carcinoma history.',
        prescriptionStatus: 'Rx Required'
      },
      {
        rank: 4,
        brandName: 'Januvia',
        genericName: 'Sitagliptin',
        drugClass: 'DPP-4 Inhibitor (Gliptin)',
        standardDosage: '100 mg once daily',
        frequencyAndTiming: 'Once daily, anytime with or without meals',
        mechanismOfAction: 'Slows the inactivation of incretin hormones (GLP-1/GIP), boosting endogenous insulin release.',
        keyBenefits: 'High tolerability, zero weight gain, and low risk of hypoglycemic episodes.',
        precautions: 'Dose adjustment needed in moderate-to-severe renal impairment; monitor for joint discomfort.',
        prescriptionStatus: 'Rx Required'
      },
      {
        rank: 5,
        brandName: 'Amaryl',
        genericName: 'Glimepiride',
        drugClass: 'Second-Generation Sulfonylurea',
        standardDosage: '1 mg – 4 mg once daily',
        frequencyAndTiming: 'Once daily immediately with breakfast or primary meal',
        mechanismOfAction: 'Stimulates pancreatic beta cells to release more insulin by closing ATP-sensitive potassium channels.',
        keyBenefits: 'Cost-effective, rapid lowering of postprandial and fasting plasma glucose.',
        precautions: 'Higher risk of hypoglycemia and mild weight gain; skip dose if skipping a meal.',
        prescriptionStatus: 'Rx Required'
      }
    ],
    lifestyleAndNonPharmaTips: [
      'Adopt a low-glycemic index Mediterranean or DASH nutritional plan rich in leafy greens and lean proteins.',
      'Engage in 150 minutes of moderate aerobic exercise plus 2 weekly resistance sessions.',
      'Continuous Glucose Monitoring (CGM) or self-monitoring before meals and 2 hours post-meal.',
      'Annual diabetic retinopathy retinal screening, microalbuminuria test, and podiatry foot checks.'
    ],
    whenToSeeDoctor: 'Blood glucose consistently > 250 mg/dL, ketones in urine, dizziness, non-healing foot ulcers, or frequent shakiness/hypoglycemia.',
    contraindicationsNote: 'Do not adjust insulin or oral anti-hyperglycemics without regular endocrinologist supervision.'
  },
  {
    id: 'dis-2',
    diseaseName: 'Essential Hypertension (High Blood Pressure)',
    category: 'Cardiovascular',
    departmentName: 'Cardiology & Vascular',
    departmentId: 'cardiology',
    severityLevel: 'Chronic Management',
    overview: 'Persistently elevated arterial blood pressure (>130/80 mmHg). Uncontrolled hypertension is the leading preventable cause of ischemic stroke, myocardial infarction, congestive heart failure, and chronic kidney disease.',
    commonSymptoms: [
      'Often asymptomatic ("Silent Killer")',
      'Occipital morning headaches',
      'Dizziness or lightheadedness upon standing',
      'Shortness of breath on exertion',
      'Chest tightness or palpitations'
    ],
    recommendedMedicines: [
      {
        rank: 1,
        brandName: 'Micardis',
        genericName: 'Telmisartan',
        drugClass: 'Angiotensin II Receptor Blocker (ARB)',
        standardDosage: '40 mg – 80 mg once daily',
        frequencyAndTiming: 'Once daily at a fixed time (morning or evening)',
        mechanismOfAction: 'Blocks AT1 receptors preventing vasoconstriction and aldosterone-induced sodium retention; activates PPAR-gamma.',
        keyBenefits: 'Longest 24-hour half-life among ARBs; superior organ protection without dry cough side effect.',
        precautions: 'Contraindicated in pregnancy; monitor serum potassium and creatinine periodically.',
        prescriptionStatus: 'Rx Required'
      },
      {
        rank: 2,
        brandName: 'Norvasc',
        genericName: 'Amlodipine Besylate',
        drugClass: 'Dihydropyridine Calcium Channel Blocker (CCB)',
        standardDosage: '5 mg – 10 mg once daily',
        frequencyAndTiming: 'Once daily in the morning or bedtime',
        mechanismOfAction: 'Inhibits calcium influx into vascular smooth muscle cells, causing potent peripheral arterial vasodilation.',
        keyBenefits: 'Excellent reduction in systolic blood pressure and central aortic stiffness.',
        precautions: 'Watch for dose-dependent peripheral pedal edema (ankle swelling); avoid grapefruit juice.',
        prescriptionStatus: 'Rx Required'
      },
      {
        rank: 3,
        brandName: 'Microzide',
        genericName: 'Hydrochlorothiazide / Chlorthalidone',
        drugClass: 'Thiazide-like Diuretic',
        standardDosage: '12.5 mg – 25 mg once daily',
        frequencyAndTiming: 'Once daily in the morning to prevent nighttime nocturia',
        mechanismOfAction: 'Inhibits Na+/Cl- cotransporter in distal convoluted tubule, increasing excretion of sodium and fluid volume.',
        keyBenefits: 'Synergizes strongly when combined with ARBs or ACE inhibitors; reduces stroke incidence.',
        precautions: 'Monitor electrolytes (hypokalemia, hyponatremia) and uric acid levels (gout caution).',
        prescriptionStatus: 'Rx Required'
      },
      {
        rank: 4,
        brandName: 'Toprol XL / Betaloc',
        genericName: 'Metoprolol Succinate (ER)',
        drugClass: 'Cardioselective Beta-1 Blocker',
        standardDosage: '25 mg – 100 mg once daily',
        frequencyAndTiming: 'Once daily with meals',
        mechanismOfAction: 'Competitively antagonizes beta-1 adrenergic receptors, lowering heart rate, cardiac output, and myocardial oxygen demand.',
        keyBenefits: 'First-line for hypertension with co-existing coronary artery disease, angina, or heart failure.',
        precautions: 'Do not discontinue abruptly; monitor for bradycardia (pulse < 55 bpm) and bronchospasm.',
        prescriptionStatus: 'Rx Required'
      },
      {
        rank: 5,
        brandName: 'Cozaar',
        genericName: 'Losartan Potassium',
        drugClass: 'Angiotensin II Receptor Blocker',
        standardDosage: '50 mg – 100 mg daily',
        frequencyAndTiming: 'Once or twice daily',
        mechanismOfAction: 'Blocks angiotensin II binding; promotes uricosuric excretion lowering serum uric acid.',
        keyBenefits: 'Renoprotective in diabetic patients with proteinuria; highly tolerated.',
        precautions: 'Avoid potassium supplements without doctor instruction; check BP regularly.',
        prescriptionStatus: 'Rx Required'
      }
    ],
    lifestyleAndNonPharmaTips: [
      'Limit dietary sodium to < 1,500 mg/day (strict adherence to DASH diet).',
      'Engage in brisk walking, swimming, or cycling 30–45 mins daily.',
      'Maintain home blood pressure diary logged twice daily (morning and evening).',
      'Limit alcohol consumption and eliminate tobacco smoking entirely.'
    ],
    whenToSeeDoctor: 'Systolic BP > 180 mmHg or Diastolic > 120 mmHg (Hypertensive Crisis), severe chest pain, visual disturbances, or sudden numbness.',
    contraindicationsNote: 'Blood pressure medications require titrated prescription based on kidney function, age, and cardiac history.'
  },
  {
    id: 'dis-3',
    diseaseName: 'Bronchial Asthma & Acute Bronchospasm',
    category: 'Respiratory',
    departmentName: 'Pulmonology & Respiratory Care',
    departmentId: 'pulmonology',
    severityLevel: 'Moderate',
    overview: 'A chronic inflammatory disorder of the airways characterized by hyperresponsiveness, reversible airflow limitation, mucosal edema, and bronchospasm.',
    commonSymptoms: [
      'Wheezing during exhalation',
      'Shortness of breath and chest tightness',
      'Nocturnal and early morning dry coughing fits',
      'Difficulty speaking in full sentences during flare-ups',
      'Decreased peak expiratory flow rate (PEFR)'
    ],
    recommendedMedicines: [
      {
        rank: 1,
        brandName: 'Symbicort / Foracort',
        genericName: 'Budesonide + Formoterol Fumarate',
        drugClass: 'Inhaled Corticosteroid (ICS) + LABA',
        standardDosage: '160/4.5 mcg or 200/6 mcg MDI/DPI',
        frequencyAndTiming: '1–2 puffs twice daily; also used as SMART reliever inhaler',
        mechanismOfAction: 'Budesonide suppresses airway mucosal inflammation while Formoterol delivers rapid 3-minute bronchodilation lasting 12 hours.',
        keyBenefits: 'GINA 2026 guideline-recommended single inhaler maintenance and reliever therapy (SMART).',
        precautions: 'Rinse mouth thoroughly with water and spit after inhalation to prevent oral candidiasis (thrush).',
        prescriptionStatus: 'Rx Required'
      },
      {
        rank: 2,
        brandName: 'Ventolin / ProAir',
        genericName: 'Salbutamol (Albuterol Sulfate)',
        drugClass: 'Short-Acting Beta-2 Agonist (SABA)',
        standardDosage: '100 mcg / actuation (1–2 puffs)',
        frequencyAndTiming: 'Every 4–6 hours as needed for sudden wheezing or 15 mins prior to exercise',
        mechanismOfAction: 'Stimulates adenylate cyclase in bronchial smooth muscle, producing immediate muscle relaxation and airway widening.',
        keyBenefits: 'Fast-acting emergency rescue relief within 5 minutes.',
        precautions: 'Overuse (> 2 canisters/year) indicates poor baseline control and increases exacerbation risk; may cause mild hand tremors.',
        prescriptionStatus: 'Rx Required'
      },
      {
        rank: 3,
        brandName: 'Singulair / Montair',
        genericName: 'Montelukast Sodium',
        drugClass: 'Leukotriene Receptor Antagonist (LTRA)',
        standardDosage: '10 mg oral tablet',
        frequencyAndTiming: 'Once daily at bedtime',
        mechanismOfAction: 'Selectively blocks cysteinyl leukotriene CysLT1 receptors, preventing allergen-induced bronchoconstriction.',
        keyBenefits: 'Excellent for allergic asthma, exercise-induced asthma, and concomitant allergic rhinitis.',
        precautions: 'Rare neuropsychiatric symptoms (vivid dreams, mood changes); take consistently.',
        prescriptionStatus: 'Rx Required'
      },
      {
        rank: 4,
        brandName: 'Atrovent',
        genericName: 'Ipratropium Bromide',
        drugClass: 'Short-Acting Muscarinic Antagonist (SAMA)',
        standardDosage: '20 mcg – 40 mcg MDI or Respule nebulization',
        frequencyAndTiming: '2 puffs three to four times daily as adjunct',
        mechanismOfAction: 'Inhibits vagally mediated acetylcholine reflexes, reducing bronchial vagal tone and mucus secretion.',
        keyBenefits: 'Useful in severe bronchospasm, beta-blocker induced asthma, and COPD overlap.',
        precautions: 'Avoid spraying into eyes (risk of pupillary dilation/glaucoma worsening); dry mouth.',
        prescriptionStatus: 'Rx Required'
      },
      {
        rank: 5,
        brandName: 'Deltasone / Omnipred',
        genericName: 'Prednisolone / Methylprednisolone',
        drugClass: 'Systemic Oral Corticosteroid',
        standardDosage: '20 mg – 40 mg daily for 5-day short burst',
        frequencyAndTiming: 'Once daily in the morning with a full meal',
        mechanismOfAction: 'Profoundly shuts down systemic eosinophilic and cytokine inflammation during acute asthma attacks.',
        keyBenefits: 'Prevents hospital admission and accelerates lung function recovery in acute exacerbations.',
        precautions: 'Short course (5–7 days) does not require taper; monitor blood sugar and gastric irritation.',
        prescriptionStatus: 'Rx Required'
      }
    ],
    lifestyleAndNonPharmaTips: [
      'Identify and avoid known environmental triggers (dust mites, pet dander, mold, tobacco smoke, cold dry air).',
      'Use a Peak Flow Meter (PEFR) daily to monitor early declines in lung function.',
      'Install HEPA air filters in bedroom and wash bedding in hot water weekly.',
      'Always carry the rescue reliever inhaler during travel and physical activities.'
    ],
    whenToSeeDoctor: 'Inability to complete sentences without gasping, fingernails or lips turning bluish, peak flow < 50% predicted, or reliever inhaler lasting less than 2 hours.',
    contraindicationsNote: 'Never discontinue daily maintenance steroid inhalers abruptly even when feeling completely well.'
  },
  {
    id: 'dis-4',
    diseaseName: 'Gastroesophageal Reflux Disease (GERD & Hyperacidity)',
    category: 'Gastroenterology',
    departmentName: 'Gastroenterology & Hepatology',
    departmentId: 'gastroenterology',
    severityLevel: 'Common & Mild',
    overview: 'A digestive disorder occurring when stomach acid and bile chronically flow back into the esophagus, irritating the mucosal lining and causing retrosternal burning.',
    commonSymptoms: [
      'Retrosternal heartburn (burning sensation in chest)',
      'Acid regurgitation and sour taste in mouth',
      'Difficulty swallowing (dysphagia) or globus sensation',
      'Chronic throat clearing, hoarseness, or dry cough',
      'Postprandial upper epigastric bloating'
    ],
    recommendedMedicines: [
      {
        rank: 1,
        brandName: 'Nexium / Sompraz',
        genericName: 'Esomeprazole Magnesium',
        drugClass: 'Proton Pump Inhibitor (PPI)',
        standardDosage: '20 mg – 40 mg once daily',
        frequencyAndTiming: 'Once daily in the morning, exactly 30–60 minutes before breakfast',
        mechanismOfAction: 'Irreversibly inhibits the H+/K+ ATPase enzyme system in gastric parietal cells, blocking gastric acid output by >90%.',
        keyBenefits: 'Superior esophageal mucosal healing rates and durable 24-hour symptom relief.',
        precautions: 'Do not crush enteric-coated capsules; long-term use requires monitoring of B12 and magnesium.',
        prescriptionStatus: 'Rx Required'
      },
      {
        rank: 2,
        brandName: 'Protonix / Pantocid',
        genericName: 'Pantoprazole Sodium',
        drugClass: 'Proton Pump Inhibitor',
        standardDosage: '40 mg once daily',
        frequencyAndTiming: '30 minutes before the first meal of the day',
        mechanismOfAction: 'Selective acid pump inhibitor with minimal CYP2C19 interaction.',
        keyBenefits: 'Safest PPI choice for cardiac patients taking Clopidogrel (Plavix).',
        precautions: 'Ensure full 4–8 week prescribed course is completed for erosive esophagitis healing.',
        prescriptionStatus: 'Rx Required'
      },
      {
        rank: 3,
        brandName: 'Pepcid / Famocid',
        genericName: 'Famotidine',
        drugClass: 'H2 Receptor Antagonist (H2RA)',
        standardDosage: '20 mg – 40 mg tablet',
        frequencyAndTiming: 'Once at bedtime or twice daily 15 mins before meals',
        mechanismOfAction: 'Competitively blocks histamine H2 receptors on parietal cells, reducing basal and nocturnal acid secretion.',
        keyBenefits: 'Fast onset of action (30–45 mins); ideal for breakthrough nighttime heartburn.',
        precautions: 'Tachyphylaxis (tolerance) can develop with continuous daily use over several weeks.',
        prescriptionStatus: 'OTC / Over-the-Counter'
      },
      {
        rank: 4,
        brandName: 'Gaviscon Double Action',
        genericName: 'Sodium Alginate + Potassium Bicarbonate',
        drugClass: 'Raft-Forming Antacid Barrier',
        standardDosage: '10 mL – 20 mL oral suspension',
        frequencyAndTiming: 'After meals and at bedtime (up to 4 times daily)',
        mechanismOfAction: 'Reacts with gastric acid to form a viscous alginate gel raft that floats atop stomach contents, physically blocking reflux.',
        keyBenefits: 'Provides instant mechanical physical barrier against acid, pepsin, and bile reflux within 3 minutes.',
        precautions: 'Space 2 hours apart from other oral medications to prevent absorption interference.',
        prescriptionStatus: 'OTC / Over-the-Counter'
      },
      {
        rank: 5,
        brandName: 'Carafate / Sucrafil',
        genericName: 'Sucralfate Suspension',
        drugClass: 'Cytoprotective Mucosal Coating Agent',
        standardDosage: '1 g / 10 mL suspension',
        frequencyAndTiming: '1 hour before meals and at bedtime on an empty stomach',
        mechanismOfAction: 'Binds negatively charged proteins in mucosal ulcers, forming an insoluble protective paste that resists acid and pepsin.',
        keyBenefits: 'Accelerates healing of gastric ulcers, chemical gastritis, and radiation esophagitis.',
        precautions: 'May cause mild constipation; contains aluminum (caution in renal insufficiency).',
        prescriptionStatus: 'Rx Required'
      }
    ],
    lifestyleAndNonPharmaTips: [
      'Elevate the head of your bed by 6–8 inches (15–20 cm) using bed risers or an orthopedic wedge pillow.',
      'Avoid lying down for at least 3 hours after finishing any meal.',
      'Eliminate trigger foods: deep-fried dishes, spicy peppers, chocolate, peppermint, coffee, and carbonated sodas.',
      'Eat smaller, more frequent meals rather than large heavy dinners.'
    ],
    whenToSeeDoctor: 'Progressive difficulty swallowing food, painful swallowing, unexplained weight loss, vomiting blood or black tarry stools.',
    contraindicationsNote: 'Persistent heartburn lasting > 3 weeks requires upper GI endoscopy to rule out Barrett’s esophagus or peptic ulcer disease.'
  },
  {
    id: 'dis-5',
    diseaseName: 'Migraine & Tension Cephalea',
    category: 'Neurology & Pain',
    departmentName: 'Neurology & Neuro Surgery',
    departmentId: 'neurology',
    severityLevel: 'Moderate',
    overview: 'A neurovascular disorder characterized by recurrent attacks of moderate-to-severe throbbing headache, often unilateral, associated with photophobia, phonophobia, nausea, and autonomic dysfunction.',
    commonSymptoms: [
      'Unilateral pulsating, pounding head pain',
      'Visual aura (flashing lights, zigzag scotomas) 20 mins prior',
      'Heightened sensitivity to light, sounds, and smells',
      'Nausea, vomiting, and dizziness',
      'Postdrome exhaustion ("migraine hangover") lasting 24 hours'
    ],
    recommendedMedicines: [
      {
        rank: 1,
        brandName: 'Imitrex / Suminat',
        genericName: 'Sumatriptan Succinate',
        drugClass: '5-HT1B/1D Receptor Agonist (Triptan)',
        standardDosage: '50 mg – 100 mg oral tablet or 6 mg SubQ',
        frequencyAndTiming: 'Take at the very first sign of headache phase; may repeat once after 2 hours if needed (max 200mg/24h)',
        mechanismOfAction: 'Selective agonist of serotonin 5-HT1B/1D receptors on intracranial blood vessels, causing selective vasoconstriction and inhibiting trigeminal calcitonin gene-related peptide (CGRP) release.',
        keyBenefits: 'Gold standard acute abortive therapy; eliminates pain, nausea, and photophobia within 60–90 minutes.',
        precautions: 'Contraindicated in coronary artery disease, uncontrolled hypertension, history of stroke/TIA, and hemiplegic migraine.',
        prescriptionStatus: 'Rx Required'
      },
      {
        rank: 2,
        brandName: 'Aleve / Naprosyn',
        genericName: 'Naproxen Sodium',
        drugClass: 'NSAID (COX-1/COX-2 Inhibitor)',
        standardDosage: '500 mg – 550 mg',
        frequencyAndTiming: 'Take immediately with food or water; can be co-administered with Sumatriptan',
        mechanismOfAction: 'Inhibits prostaglandin synthesis, relieving neurogenic perivascular inflammation.',
        keyBenefits: 'Long 12–17 hour duration of action; significantly lowers migraine recurrence rate.',
        precautions: 'Take with food to protect gastric mucosa; avoid in active peptic ulcer disease or severe renal impairment.',
        prescriptionStatus: 'OTC / Over-the-Counter'
      },
      {
        rank: 3,
        brandName: 'Inderal / Ciplar LA',
        genericName: 'Propranolol Hydrochloride (ER)',
        drugClass: 'Non-Selective Beta Blocker (Prophylaxis)',
        standardDosage: '40 mg – 80 mg daily (titrated to 160mg)',
        frequencyAndTiming: 'Once daily for daily preventive management',
        mechanismOfAction: 'Stabilizes cerebrovascular tone, reduces cortical spreading depression, and moderates central sympathetic transmission.',
        keyBenefits: 'First-line guideline prophylaxis; reduces migraine attack frequency by >50% in chronic sufferers.',
        precautions: 'Contraindicated in bronchial asthma and severe bradycardia; requires 8–12 weeks for full clinical response.',
        prescriptionStatus: 'Rx Required'
      },
      {
        rank: 4,
        brandName: 'Maxalt / Rizact',
        genericName: 'Rizatriptan Benzoate',
        drugClass: 'Second-Generation Triptan',
        standardDosage: '10 mg Orally Disintegrating Tablet (ODT)',
        frequencyAndTiming: 'Place on tongue at onset of headache; dissolves without water',
        mechanismOfAction: 'Potent central and peripheral 5-HT1B/1D agonist with high oral bioavailability.',
        keyBenefits: 'Rapid onset of relief (30 mins); ideal for patients with severe migraine-associated nausea.',
        precautions: 'Reduce dose to 5 mg if co-prescribed with Propranolol (due to metabolic inhibition).',
        prescriptionStatus: 'Rx Required'
      },
      {
        rank: 5,
        brandName: 'Excedrin Migraine',
        genericName: 'Paracetamol + Acetylsalicylic Acid + Caffeine',
        drugClass: 'Analgesic Adjuvant Combination',
        standardDosage: '2 tablets (250mg / 250mg / 65mg per tab)',
        frequencyAndTiming: 'At symptom onset with a full glass of water',
        mechanismOfAction: 'Multi-pathway pain blockade enhanced by caffeine-induced cranial vasoconstriction and accelerated absorption.',
        keyBenefits: 'Effective first-line OTC relief for mild-to-moderate attacks and tension headaches.',
        precautions: 'Do not exceed 2 days per week to avoid medication-overuse headache (rebound cephalea).',
        prescriptionStatus: 'OTC / Over-the-Counter'
      }
    ],
    lifestyleAndNonPharmaTips: [
      'Maintain a consistent sleep-wake schedule (irregular sleep is a potent trigger).',
      'Stay hydrated: drink at least 2.5–3 liters of water daily.',
      'Identify personal food triggers: aged cheeses, cured meats (nitrates), MSG, red wine, artificial sweeteners.',
      'Rest in a dark, quiet room with an ice pack on the forehead or neck during acute episodes.'
    ],
    whenToSeeDoctor: 'Sudden onset "thunderclap" headache (worst headache of life), fever with stiff neck, new neurological deficits (weakness, speech difficulty), or onset after age 50.',
    contraindicationsNote: 'Frequent use of acute pain medications (> 10 days/month) can cause debilitating Medication-Overuse Headache (MOH).'
  },
  {
    id: 'dis-6',
    diseaseName: 'Osteoarthritis & Degenerative Joint Disease',
    category: 'Orthopedics & Joint',
    departmentName: 'Orthopedics & Joint Replacement',
    departmentId: 'orthopedics',
    severityLevel: 'Chronic Management',
    overview: 'A progressive degenerative joint disease characterized by breakdown of articular cartilage, subchondral bone remodeling, osteophyte formation, and low-grade synovial inflammation.',
    commonSymptoms: [
      'Joint pain exacerbated by weight-bearing and activity',
      'Morning joint stiffness lasting < 30 minutes',
      'Crepitus (grating/crackling sensation on movement)',
      'Bony enlargement and reduced range of motion (knees/hips)',
      'Joint instability and localized tenderness'
    ],
    recommendedMedicines: [
      {
        rank: 1,
        brandName: 'Celebrex / Celib',
        genericName: 'Celecoxib',
        drugClass: 'Selective COX-2 Inhibitor NSAID',
        standardDosage: '100 mg – 200 mg once or twice daily',
        frequencyAndTiming: 'With meals at the lowest effective dose for shortest needed duration',
        mechanismOfAction: 'Selectively inhibits cyclooxygenase-2 enzyme, suppressing pro-inflammatory prostaglandin synthesis without disrupting protective COX-1 in stomach lining.',
        keyBenefits: 'Potent joint pain and stiffness reduction with significantly lower GI ulcer/bleeding risk compared to traditional NSAIDs.',
        precautions: 'Use caution in patients with pre-existing ischemic cardiovascular disease; monitor blood pressure.',
        prescriptionStatus: 'Rx Required'
      },
      {
        rank: 2,
        brandName: 'Voltaren Arthritis Gel',
        genericName: 'Diclofenac Diethylamine Topical Gel 1.16% / 2.32%',
        drugClass: 'Topical NSAID',
        standardDosage: '2 g – 4 g applied to affected joint',
        frequencyAndTiming: 'Gently rub onto affected knees, hands, or ankles 3–4 times daily',
        mechanismOfAction: 'Penetrates directly through the dermis into synovial fluid, inhibiting localized inflammatory cascades.',
        keyBenefits: 'First-line knee/hand OA guideline recommendation; minimal systemic absorption (<6%), sparing stomach and kidneys.',
        precautions: 'Wash hands after application (unless treating hands); do not apply to broken skin or open wounds.',
        prescriptionStatus: 'OTC / Over-the-Counter'
      },
      {
        rank: 3,
        brandName: 'Tylenol 8HR Arthritis / Dolo 650',
        genericName: 'Paracetamol (Acetaminophen) ER',
        drugClass: 'Centrally Acting Analgesic',
        standardDosage: '650 mg – 1000 mg Extended Release',
        frequencyAndTiming: 'Every 8 hours with water (maximum 3000 mg/day)',
        mechanismOfAction: 'Inhibits central nervous system prostaglandin synthesis and activates descending serotonergic pain inhibitory pathways.',
        keyBenefits: 'Excellent safety profile in elderly patients; no GI ulceration, bleeding, or renal strain.',
        precautions: 'Strictly avoid exceeding 3 g/day to prevent hepatotoxicity; avoid heavy alcohol use.',
        prescriptionStatus: 'OTC / Over-the-Counter'
      },
      {
        rank: 4,
        brandName: 'Osteo Bi-Flex / Triple Flex',
        genericName: 'Glucosamine Sulfate + Chondroitin + MSM',
        drugClass: 'Chondroprotective Dietary Supplement',
        standardDosage: '1500 mg Glucosamine / 1200 mg Chondroitin daily',
        frequencyAndTiming: 'Once daily or in divided doses with meals',
        mechanismOfAction: 'Supplies biological building blocks for glycosaminoglycans and proteoglycans in extracellular cartilage matrix.',
        keyBenefits: 'Supports cartilage structural integrity, reduces joint friction, and improves mobility over 12+ weeks of consistent use.',
        precautions: 'May interact with Warfarin (increases INR); caution in shellfish allergy (if derived from crustaceans).',
        prescriptionStatus: 'OTC / Over-the-Counter'
      },
      {
        rank: 5,
        brandName: 'Synvisc-One / Euflexxa',
        genericName: 'High Molecular Weight Hyaluronic Acid (Viscosupplement)',
        drugClass: 'Intra-articular Joint Lubricant',
        standardDosage: '6 mL single intra-articular injection',
        frequencyAndTiming: 'Administered under ultrasound guidance by an orthopedic specialist once every 6 months',
        mechanismOfAction: 'Restores rheological viscoelasticity of synovial fluid, cushioning articular shock and inhibiting nociceptive mechanoreceptors.',
        keyBenefits: 'Provides 6 months of sustained knee pain relief without daily pill burden.',
        precautions: 'Must be administered under sterile clinical conditions; temporary post-injection joint soreness for 24 hours.',
        prescriptionStatus: 'Hospital Administered'
      }
    ],
    lifestyleAndNonPharmaTips: [
      'Weight management: each pound of body weight lost removes 4 pounds of pressure from the knees.',
      'Low-impact joint exercises: swimming, water aerobics, stationary cycling, and quadriceps strengthening.',
      'Use supportive footwear with shock-absorbing insoles and consider an unloader knee brace if indicated.',
      'Apply heat therapy before exercise to loosen stiff joints and cold packs after activity to reduce swelling.'
    ],
    whenToSeeDoctor: 'Severe joint swelling with redness and warmth (possible septic arthritis or gout), sudden inability to bear weight, or knee "giving way".',
    contraindicationsNote: 'Advanced stage 4 bone-on-bone osteoarthritis with severe deformity may require robotic total joint arthroplasty.'
  },
  {
    id: 'dis-7',
    diseaseName: 'Allergic Rhinitis & Seasonal Pollinosis',
    category: 'Allergy & ENT',
    departmentName: 'ENT & Head-Neck Surgery',
    departmentId: 'ent',
    severityLevel: 'Common & Mild',
    overview: 'An IgE-mediated inflammatory condition of the nasal mucosa triggered by airborne allergens (pollen, house dust mites, mold spores, animal dander).',
    commonSymptoms: [
      'Repetitive sneezing bouts upon waking',
      'Profuse clear watery rhinorrhea (runny nose)',
      'Nasal congestion and mouth breathing',
      'Itchy nose, palate, throat, and inner ears',
      'Allergic shiners (dark circles under eyes) & itchy watery eyes'
    ],
    recommendedMedicines: [
      {
        rank: 1,
        brandName: 'Flonase / Avamys',
        genericName: 'Fluticasone Furoate / Propionate',
        drugClass: 'Intranasal Corticosteroid Spray (INCS)',
        standardDosage: '2 sprays per nostril once daily (50 mcg/actuation)',
        frequencyAndTiming: 'Once daily in the morning; point nozzle slightly outward toward ear, not nasal septum',
        mechanismOfAction: 'Inhibits inflammatory cytokines, mast cells, and eosinophil migration directly at the nasal mucosal interface.',
        keyBenefits: 'Single most effective first-line medication for all nasal symptoms (congestion, sneezing, rhinorrhea).',
        precautions: 'Requires 3–5 days of continuous daily use for peak efficacy; avoid spraying directly on nasal septum.',
        prescriptionStatus: 'OTC / Over-the-Counter'
      },
      {
        rank: 2,
        brandName: 'Allegra / Fexova',
        genericName: 'Fexofenadine Hydrochloride',
        drugClass: 'Second-Generation Non-Sedating Antihistamine',
        standardDosage: '120 mg – 180 mg once daily',
        frequencyAndTiming: 'Once daily with a glass of water (avoid grapefruit/apple/orange juice for 2 hours)',
        mechanismOfAction: 'Selective peripheral H1 receptor antagonist; does not cross the blood-brain barrier.',
        keyBenefits: 'True 100% non-drowsy formulation; zero impairment of driving or cognitive work.',
        precautions: 'Fruit juices contain organic anion-transporting polypeptides that reduce drug absorption.',
        prescriptionStatus: 'OTC / Over-the-Counter'
      },
      {
        rank: 3,
        brandName: 'Xyzal / Levocet',
        genericName: 'Levocetirizine Dihydrochloride',
        drugClass: 'Active R-Enantiomer Antihistamine',
        standardDosage: '5 mg once daily',
        frequencyAndTiming: 'Once daily in the evening/bedtime',
        mechanismOfAction: 'High affinity peripheral H1 blocker with rapid 1-hour onset and anti-inflammatory properties.',
        keyBenefits: 'Potent relief for severe itching, hives, and nighttime allergic flare-ups.',
        precautions: 'May cause mild drowsiness in sensitive individuals; take at bedtime.',
        prescriptionStatus: 'OTC / Over-the-Counter'
      },
      {
        rank: 4,
        brandName: 'Dymista / Ryaltris',
        genericName: 'Azelastine Hydrochloride + Fluticasone Propionate',
        drugClass: 'Combination Intranasal Antihistamine + Steroid',
        standardDosage: '1 spray per nostril twice daily',
        frequencyAndTiming: 'Morning and evening daily',
        mechanismOfAction: 'Dual-action: Azelastine provides instant 15-minute symptom relief while Fluticasone provides sustained anti-inflammatory control.',
        keyBenefits: 'Significantly faster and more complete relief than either single agent alone for moderate-to-severe rhinitis.',
        precautions: 'May cause temporary bitter taste if snorted too hard; keep head tilted slightly down.',
        prescriptionStatus: 'Rx Required'
      },
      {
        rank: 5,
        brandName: 'Sinus Rinse / NeilMed',
        genericName: 'Hypertonic / Isotonic Saline Nasal Irrigation',
        drugClass: 'Mechanical Mucociliary Wash',
        standardDosage: '240 mL buffered saline rinse per nostril',
        frequencyAndTiming: 'Once or twice daily prior to medicated nasal sprays',
        mechanismOfAction: 'Physically washes away trapped allergens, mucus crusts, and inflammatory mediators while improving ciliary beat frequency.',
        keyBenefits: '100% drug-free, safe in pregnancy and children, enhances penetration of nasal steroid sprays.',
        precautions: 'Always use distilled, sterile, or previously boiled water (never use unboiled tap water).',
        prescriptionStatus: 'OTC / Over-the-Counter'
      }
    ],
    lifestyleAndNonPharmaTips: [
      'Keep windows closed during high pollen counts (especially windy mornings) and use air conditioning with HEPA filtration.',
      'Shower and wash hair after returning indoors from outdoor activities to remove pollen particles.',
      'Encase pillows and mattresses in allergen-impermeable dust mite covers.',
      'Wear sunglasses outdoors to shield eyes from airborne pollen.'
    ],
    whenToSeeDoctor: 'Symptoms unresponsive to dual therapy, unilateral nasal obstruction, persistent foul-smelling discharge, or recurrent sinus infections.',
    contraindicationsNote: 'Avoid over-the-counter decongestant nasal sprays (Oxymetazoline/Otrivin) for > 3 consecutive days to prevent rebound rhinitis medicamentosa.'
  },
  {
    id: 'dis-8',
    diseaseName: 'Hyperlipidemia & Arteriosclerotic Risk',
    category: 'Cardiovascular',
    departmentName: 'Cardiology & Lipid Clinic',
    departmentId: 'cardiology',
    severityLevel: 'Chronic Management',
    overview: 'Abnormally elevated levels of low-density lipoprotein cholesterol (LDL-C), triglycerides, and apolipoprotein B, driving arterial atheroma plaque deposition and vascular occlusion.',
    commonSymptoms: [
      'Entirely asymptomatic until arterial narrowing occurs',
      'Corneal arcus (white ring around iris edge in younger adults)',
      'Xanthelasma (yellowish cholesterol deposits around eyelids)',
      'Tendon xanthomas (fatty deposits on Achilles tendon/knuckles)',
      'Angina or claudication upon vigorous exertion'
    ],
    recommendedMedicines: [
      {
        rank: 1,
        brandName: 'Lipitor / Storvas',
        genericName: 'Atorvastatin Calcium',
        drugClass: 'HMG-CoA Reductase Inhibitor (High-Intensity Statin)',
        standardDosage: '20 mg – 80 mg once daily',
        frequencyAndTiming: 'Once daily at bedtime or evening with or without food',
        mechanismOfAction: 'Competitively inhibits HMG-CoA reductase, the rate-limiting enzyme in cholesterol biosynthesis; upregulates hepatic LDL receptors.',
        keyBenefits: 'Reduces LDL-C by 40%–55%; proven plaque stabilization, anti-inflammatory, and secondary prevention of stroke/MI.',
        precautions: 'Check baseline liver function (ALT/AST); report persistent unexplained muscle ache or tenderness.',
        prescriptionStatus: 'Rx Required'
      },
      {
        rank: 2,
        brandName: 'Crestor / Rosuvas',
        genericName: 'Rosuvastatin Calcium',
        drugClass: 'Hydrophilic High-Intensity Statin',
        standardDosage: '10 mg – 40 mg once daily',
        frequencyAndTiming: 'Once daily at any time of day',
        mechanismOfAction: 'High-potency HMG-CoA reductase inhibition with minimal CYP3A4 metabolism.',
        keyBenefits: 'Highest LDL-C lowering efficacy (up to 60%) and significant HDL-C raising effect with low drug-drug interaction profile.',
        precautions: 'Start with 5mg in Asian patients or severe renal impairment; monitor for myalgias.',
        prescriptionStatus: 'Rx Required'
      },
      {
        rank: 3,
        brandName: 'Zetia / Ezetrol',
        genericName: 'Ezetimibe',
        drugClass: 'Niemann-Pick C1-Like 1 (NPC1L1) Inhibitor',
        standardDosage: '10 mg once daily',
        frequencyAndTiming: 'Once daily combined with a statin or as monotherapy',
        mechanismOfAction: 'Selectively inhibits intestinal absorption of dietary and biliary cholesterol at the brush border.',
        keyBenefits: 'Provides an additional 15%–20% LDL-C reduction when added to statin without increasing muscle toxicity.',
        precautions: 'Well tolerated; mild GI upset or diarrhea occasionally reported.',
        prescriptionStatus: 'Rx Required'
      },
      {
        rank: 4,
        brandName: 'Repatha / Praluent',
        genericName: 'Evolocumab / Alirocumab',
        drugClass: 'PCSK9 Monoclonal Antibody Inhibitor',
        standardDosage: '140 mg SubQ injection every 2 weeks or 420 mg monthly',
        frequencyAndTiming: 'Pre-filled autoinjector pen injected subcutaneously',
        mechanismOfAction: 'Binds PCSK9 protein, preventing degradation of LDL receptors and clearing massive amounts of LDL from circulation.',
        keyBenefits: 'Dramatically drops LDL-C by 60%–70% even in refractory familial hypercholesterolemia or statin intolerance.',
        precautions: 'Requires cold chain storage (2°C – 8°C); mild injection site reactions.',
        prescriptionStatus: 'Rx Required'
      },
      {
        rank: 5,
        brandName: 'Vascepa / Epadel',
        genericName: 'Icosapent Ethyl (Pure EPA)',
        drugClass: 'Purified Omega-3 Fatty Acid Ester',
        standardDosage: '2 g twice daily (4 g/day total)',
        frequencyAndTiming: 'With meals twice daily',
        mechanismOfAction: 'Inhibits hepatic VLDL synthesis, reduces triglyceride-rich lipoproteins, and incorporates into cell membranes.',
        keyBenefits: 'Proven in REDUCE-IT trial to lower cardiovascular events by 25% in patients with elevated triglycerides.',
        precautions: 'Slightly increased risk of atrial fibrillation/flutter in susceptible individuals; monitor bleeding parameters if on anticoagulants.',
        prescriptionStatus: 'Rx Required'
      }
    ],
    lifestyleAndNonPharmaTips: [
      'Eliminate trans-fats and reduce saturated fats to < 6% of total daily caloric intake.',
      'Increase soluble dietary fiber (oats, psyllium husk, beans, lentils, flaxseeds) by 10–25 grams daily.',
      'Incorporate plant sterols/stanols (2 g/day) and extra virgin olive oil.',
      'Achieve 150+ minutes of aerobic cardiovascular exercise weekly to optimize HDL and triglyceride clearance.'
    ],
    whenToSeeDoctor: 'Total cholesterol > 250 mg/dL, LDL > 190 mg/dL, or family history of premature heart attack before age 50.',
    contraindicationsNote: 'Statins must be temporarily held during pregnancy and acute severe liver injury.'
  }
];
