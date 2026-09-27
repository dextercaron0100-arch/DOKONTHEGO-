export type ConditionInfo = {
  title: string;
  specialty: string;
  overview: string;
  symptoms: string[];
  treatment: string[];
  urgent: string;
  sources: { label: string; url: string }[];
};

export const conditionInformation: ConditionInfo[] = [
  {
    "title": "Acne & Eczema",
    "specialty": "Skin & Dermatology",
    "overview": "Acne involves blocked hair follicles; eczema causes inflamed, itchy skin. They need different treatments.",
    "symptoms": [
      "Acne: blackheads, whiteheads, inflamed spots or deeper tender lumps.",
      "Eczema: itching, dryness, cracked skin and patches that change colour."
    ],
    "treatment": [
      "Acne: gentle cleansing and pharmacist-advised topical treatments may help; persistent or scarring acne needs a dermatologist.",
      "Eczema: regular moisturising, avoiding irritants and clinician-prescribed anti-inflammatory creams can control flares."
    ],
    "urgent": "Seek same-day care for rapidly worsening eczema, painful swelling, pus, blisters or fever.",
    "sources": [
      {
        "label": "Acne",
        "url": "https://www.nhs.uk/conditions/acne/"
      },
      {
        "label": "Eczema",
        "url": "https://www.nhs.uk/conditions/atopic-eczema/"
      }
    ]
  },
  {
    "title": "Arthritis & Gout",
    "specialty": "Joints, Muscles & Bones",
    "overview": "Arthritis covers several joint disorders. Gout is a type of inflammatory arthritis linked to urate crystals.",
    "symptoms": [
      "Arthritis: joint pain, stiffness, swelling and reduced movement.",
      "Gout: sudden, intense pain with a hot, swollen joint, often the big toe."
    ],
    "treatment": [
      "Treatment depends on the cause and may include physiotherapy, exercise and medicines prescribed for pain or inflammation.",
      "Gout flares may need prescribed anti-inflammatory treatment; recurrent gout may need long-term urate-lowering medicine."
    ],
    "urgent": "A hot, swollen joint with fever or feeling unwell needs urgent assessment to rule out infection.",
    "sources": [
      {
        "label": "Arthritis",
        "url": "https://www.nhs.uk/conditions/arthritis/"
      },
      {
        "label": "Gout",
        "url": "https://www.nhs.uk/conditions/gout/"
      }
    ]
  },
  {
    "title": "Back Pain",
    "specialty": "Joints, Muscles & Bones",
    "overview": "Back pain often follows muscle strain, but nerve, joint and other conditions can also cause it.",
    "symptoms": [
      "Aching, stiffness, pain with movement or pain spreading into a leg may occur.",
      "Persistent pain, unexplained weight loss or worsening night pain should be assessed."
    ],
    "treatment": [
      "Keep gently active as tolerated and avoid prolonged bed rest; wrapped heat or cold packs may help.",
      "A clinician or pharmacist can advise on suitable pain relief. Persistent symptoms may need physiotherapy or further assessment."
    ],
    "urgent": "Go to an emergency department for new bladder or bowel problems, numbness around the genitals, weakness in both legs, or pain after a serious accident.",
    "sources": [
      {
        "label": "Back pain",
        "url": "https://www.nhs.uk/conditions/back-pain/"
      }
    ]
  },
  {
    "title": "Cancer",
    "specialty": "Cancer & Oncology",
    "overview": "Cancer involves uncontrolled cell growth. Symptoms vary widely, and early cancer may cause no noticeable symptoms.",
    "symptoms": [
      "Possible changes include a new lump, unexplained weight loss, unusual bleeding or a persistent change in bowel habits.",
      "A changing mole or a cough that does not improve also needs assessment. These symptoms often have other causes."
    ],
    "treatment": [
      "Diagnosis requires medical assessment and appropriate tests.",
      "Treatment depends on the cancer type and stage and may include surgery, radiotherapy, medicines or supportive care."
    ],
    "urgent": "Arrange assessment for unexplained or persistent changes. Severe bleeding or difficulty breathing needs emergency care; do not wait for an online booking.",
    "sources": [
      {
        "label": "Cancer",
        "url": "https://www.nhs.uk/conditions/cancer/"
      }
    ]
  },
  {
    "title": "Depression, Anxiety & Mental Health",
    "specialty": "Mental Health & Psychiatry",
    "overview": "Depression and anxiety can affect mood, thoughts, sleep and everyday functioning. Support and treatment can help.",
    "symptoms": [
      "Depression: persistent low mood, loss of interest, low energy or changes in sleep and appetite.",
      "Anxiety: difficult-to-control worry, restlessness, tension or disturbed sleep."
    ],
    "treatment": [
      "A clinician can assess symptoms and recommend talking therapy, self-help support and, when appropriate, medication.",
      "Regular sleep, activity and support from trusted people can complement treatment."
    ],
    "urgent": "If you may harm yourself or cannot stay safe, seek emergency help now and ask a trusted person to stay with you.",
    "sources": [
      {
        "label": "Depression",
        "url": "https://www.nhs.uk/mental-health/conditions/depression-in-adults/overview/"
      },
      {
        "label": "Anxiety",
        "url": "https://www.nhs.uk/mental-health/conditions/generalised-anxiety-disorder-gad/"
      }
    ]
  },
  {
    "title": "Diabetes",
    "specialty": "Diabetes & Endocrinology",
    "overview": "Diabetes causes blood sugar to stay too high. Symptoms alone cannot diagnose it, and some people have no symptoms.",
    "symptoms": [
      "Increased thirst, frequent urination, tiredness and unexplained weight loss can occur.",
      "Seek prompt assessment for new symptoms, particularly in a child."
    ],
    "treatment": [
      "Blood tests help identify diabetes and guide care.",
      "Type 1 diabetes requires insulin. Type 2 treatment may involve nutrition, physical activity and medicines, sometimes including insulin. Ongoing monitoring is important."
    ],
    "urgent": "Seek urgent care for suspected diabetes. Confusion, collapse or severe breathing difficulty requires emergency help.",
    "sources": [
      {
        "label": "Diabetes",
        "url": "https://www.nhs.uk/conditions/diabetes/"
      }
    ]
  },
  {
    "title": "Diarrhea, Hyperacidity & Hemorrhoids",
    "specialty": "Stomach, Digestion & Gastroenterology",
    "overview": "These are separate digestive problems: loose stools, acid-related heartburn and swollen blood vessels around the anus.",
    "symptoms": [
      "Diarrhea: frequent loose stools, cramps and possible dehydration.",
      "Acid reflux: burning behind the breastbone or a sour taste, often after meals.",
      "Hemorrhoids: itching, discomfort, lumps or bright-red bleeding with bowel movements."
    ],
    "treatment": [
      "Diarrhea: replace fluids; oral rehydration solution may help. Ask a clinician about persistent symptoms.",
      "Reflux: smaller meals, avoiding personal triggers and suitable acid-reducing treatment may help.",
      "Hemorrhoids: fibre, fluids and avoiding straining may ease symptoms; persistent symptoms need assessment."
    ],
    "urgent": "Vomiting blood, severe abdominal pain or heavy bleeding needs emergency care. Seek urgent advice for dehydration, bloody diarrhea or inability to keep fluids down. Do not assume rectal bleeding is hemorrhoids.",
    "sources": [
      {
        "label": "Diarrhea",
        "url": "https://www.nhs.uk/symptoms/diarrhoea-and-vomiting/"
      },
      {
        "label": "Acid reflux",
        "url": "https://www.nhs.uk/conditions/heartburn-and-acid-reflux/"
      },
      {
        "label": "Hemorrhoids",
        "url": "https://www.nhs.uk/conditions/piles-haemorrhoids/"
      }
    ]
  },
  {
    "title": "High Blood Pressure (Hypertension)",
    "specialty": "Heart & Cardiology",
    "overview": "High blood pressure puts extra strain on blood vessels and organs. A blood pressure check is needed to detect it.",
    "symptoms": [
      "Usually there are no early symptoms; feeling well does not rule it out.",
      "Repeated measurements may be needed to confirm a diagnosis."
    ],
    "treatment": [
      "Care may include reducing salt, regular activity, weight management when appropriate and prescribed blood pressure medicines.",
      "Follow your monitoring plan and discuss medicine changes with your clinician."
    ],
    "urgent": "Persistent chest pain, severe breathing difficulty, or sudden weakness or speech problems requires emergency help.",
    "sources": [
      {
        "label": "High blood pressure",
        "url": "https://www.nhs.uk/conditions/high-blood-pressure/"
      }
    ]
  },
  {
    "title": "UTI (Urinary Tract Infection)",
    "specialty": "Kidney & Urine",
    "overview": "A urinary tract infection can affect the bladder, urethra or kidneys.",
    "symptoms": [
      "Burning when urinating, needing to urinate more often or urgently, cloudy urine or lower abdominal discomfort may occur."
    ],
    "treatment": [
      "A clinician may assess symptoms and test urine. Antibiotics are prescribed when appropriate; take them as directed.",
      "Rest and adequate fluids can help symptoms, but do not replace needed medical treatment."
    ],
    "urgent": "Seek urgent assessment for fever, shaking chills, back pain below the ribs, blood in urine, pregnancy, or symptoms in children or men. Confusion or marked drowsiness needs emergency care.",
    "sources": [
      {
        "label": "Urinary tract infections",
        "url": "https://www.nhs.uk/conditions/urinary-tract-infections-utis/"
      }
    ]
  },
  {
    "title": "PCOS (Polycystic Ovary Syndrome) & Menopause",
    "specialty": "Obstetrics and Gynecology & Women’s Health",
    "overview": "Polycystic ovary syndrome is a hormonal condition. Menopause is a life stage associated with falling hormone levels; they are different conditions.",
    "symptoms": [
      "Polycystic ovary syndrome: irregular periods, acne, increased facial or body hair and fertility difficulties.",
      "Perimenopause: changing periods, hot flushes, night sweats, sleep disturbance or vaginal dryness."
    ],
    "treatment": [
      "Polycystic ovary syndrome care is tailored to symptoms and pregnancy goals, including lifestyle support and medicines when appropriate.",
      "Menopause care may include lifestyle measures, hormone therapy or non-hormonal options after discussing benefits and risks."
    ],
    "urgent": "Arrange a medical review for bleeding after menopause. Severe pelvic pain, fainting or heavy bleeding needs urgent assessment.",
    "sources": [
      {
        "label": "Polycystic ovary syndrome",
        "url": "https://www.nhs.uk/conditions/polycystic-ovary-syndrome-pcos/"
      },
      {
        "label": "Menopause symptoms",
        "url": "https://www.nhs.uk/conditions/menopause-and-perimenopause/symptoms/"
      },
      {
        "label": "Menopause treatment",
        "url": "https://www.nhs.uk/conditions/menopause-and-perimenopause/treatment/"
      }
    ]
  },
  {
    "title": "Headaches & Migraine",
    "specialty": "Brain & Nerves",
    "overview": "Headaches have many causes. Migraine can cause recurring attacks of head pain and other symptoms.",
    "symptoms": [
      "Migraine may cause throbbing pain, nausea and sensitivity to light or sound.",
      "Some people notice tiredness, visual changes or tingling before or during an attack."
    ],
    "treatment": [
      "Regular meals, hydration, sleep and a headache diary may help identify patterns.",
      "A clinician can recommend suitable pain relief, migraine-specific medicines or preventive treatment. Frequent painkiller use can worsen headaches."
    ],
    "urgent": "A sudden extremely severe headache, new weakness, speech or vision changes, confusion, or fever with a stiff neck needs emergency care.",
    "sources": [
      {
        "label": "Migraine",
        "url": "https://www.nhs.uk/conditions/migraine/"
      }
    ]
  },
  {
    "title": "Hyperthyroidism & Hypothyroidism (Thyroid)",
    "specialty": "Diabetes & Endocrinology",
    "overview": "An overactive thyroid produces too much thyroid hormone; an underactive thyroid produces too little. Blood tests help distinguish them.",
    "symptoms": [
      "Overactive thyroid: heat intolerance, sweating, tremor, palpitations or weight loss.",
      "Underactive thyroid: tiredness, feeling cold, constipation, weight gain or low mood."
    ],
    "treatment": [
      "Overactive thyroid may be treated with antithyroid medicine, radioactive iodine or surgery, depending on the cause.",
      "Underactive thyroid is usually treated with replacement thyroid hormone and follow-up blood tests."
    ],
    "urgent": "Seek urgent assessment for a rapid heartbeat with marked illness. Chest pain, collapse or confusion requires emergency care.",
    "sources": [
      {
        "label": "Overactive thyroid symptoms",
        "url": "https://www.nhs.uk/conditions/overactive-thyroid-hyperthyroidism/symptoms/"
      },
      {
        "label": "Overactive thyroid treatment",
        "url": "https://www.nhs.uk/conditions/overactive-thyroid-hyperthyroidism/treatment/"
      },
      {
        "label": "Underactive thyroid",
        "url": "https://www.nhs.uk/conditions/underactive-thyroid-hypothyroidism/"
      }
    ]
  }
];

