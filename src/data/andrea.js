export const andreaSchedule = [
  { time: "08:30", label: "Réveil", iconType: "sun", type: "routine" },
  { time: "08:45", label: "Skincare matin", iconType: "heart", type: "skincare", detail: "Nettoyant doux, sérum vitamine C, hydratant SPF 30+" },
  { time: "09:00", label: "Petit déjeuner", iconType: "meal", type: "meal", detail: "Porridge avoine, fruits rouges, 20g whey ou 2 œufs, café/thé" },
  { time: "09:00", label: "Compléments matin", iconType: "pill", type: "supplement", detail: "Collagène marin 10g, Vitamine C 500mg, Oméga-3 1g, Biotine" },
  { time: "10:30", label: "Booster pré-workout", iconType: "bolt", type: "supplement", detail: "Café noir ou booster léger + BCAA 5g" },
  { time: "11:00", label: "Séance de sport", iconType: "dumbbell", type: "sport", detail: "Voir programme du jour" },
  { time: "12:30", label: "Déjeuner post-workout", iconType: "meal", type: "meal", detail: "150g poulet ou thon, salade verte, avocat, légumes colorés" },
  { time: "15:30", label: "Collation", iconType: "meal", type: "meal", detail: "Fromage blanc 0%, fruits rouges, poignée d'amandes" },
  { time: "19:00", label: "Dîner", iconType: "meal", type: "meal", detail: "Poisson blanc ou œufs, légumes vapeur, patate douce (si sport)" },
  { time: "21:00", label: "Skincare soir", iconType: "heart", type: "skincare", detail: "Démaquillage, nettoyant, acide hyaluronique, crème nuit riche" },
  { time: "21:30", label: "Compléments soir", iconType: "pill", type: "supplement", detail: "Magnésium bisglycinate 300mg, Mélatonine 0.5mg (si besoin)" },
  { time: "23:00", label: "Coucher", iconType: "moon", type: "routine" },
];

export const andreaScheduleAfternoon = [
  { time: "08:30", label: "Réveil", iconType: "sun", type: "routine" },
  { time: "08:45", label: "Skincare matin", iconType: "heart", type: "skincare", detail: "Nettoyant doux, sérum vitamine C, hydratant SPF 30+" },
  { time: "09:00", label: "Petit déjeuner", iconType: "meal", type: "meal", detail: "Porridge avoine, fruits rouges, 20g whey ou 2 œufs, café/thé" },
  { time: "09:00", label: "Compléments matin", iconType: "pill", type: "supplement", detail: "Collagène marin 10g, Vitamine C 500mg, Oméga-3 1g, Biotine" },
  { time: "12:30", label: "Déjeuner", iconType: "meal", type: "meal", detail: "150g poulet ou thon, salade verte, avocat, légumes — repas principal avant l'entraînement" },
  { time: "14:15", label: "Collation pré-séance", iconType: "meal", type: "meal", detail: "Fromage blanc 0%, fruits rouges, banane — énergie légère avant le sport" },
  { time: "14:30", label: "Booster pré-workout", iconType: "bolt", type: "supplement", detail: "Café noir ou booster léger + BCAA 5g" },
  { time: "15:00", label: "Séance de sport", iconType: "dumbbell", type: "sport", detail: "Voir programme du jour" },
  { time: "16:15", label: "Collation post-entraînement", iconType: "meal", type: "meal", detail: "Fromage blanc 0%, fruits rouges, poignée d'amandes, 20g whey" },
  { time: "19:00", label: "Dîner", iconType: "meal", type: "meal", detail: "Poisson blanc ou œufs, légumes vapeur, patate douce" },
  { time: "21:00", label: "Skincare soir", iconType: "heart", type: "skincare", detail: "Démaquillage, nettoyant, acide hyaluronique, crème nuit riche" },
  { time: "21:30", label: "Compléments soir", iconType: "pill", type: "supplement", detail: "Magnésium bisglycinate 300mg, Mélatonine 0.5mg (si besoin)" },
  { time: "23:00", label: "Coucher", iconType: "moon", type: "routine" },
];

export const andreaExercises = {
  glutes: {
    label: "Fessiers — Gluteus Maximus & Médius",
    exercises: [
      { name: "Hip Thrust barre", sets: "4×10", url: "https://www.youtube.com/watch?v=xDmFkJxPzeM", tip: "Menton rentré, poussée sur les talons" },
      { name: "Squat sumo haltère", sets: "4×12", url: "https://www.youtube.com/watch?v=kkDDce88lC0", tip: "Orteils ouverts à 45°, genoux dans l'axe" },
      { name: "Fentes bulgares", sets: "3×10/jambe", url: "https://www.youtube.com/watch?v=2C-uNgKwPLE", tip: "Pied arrière surélevé, descente verticale" },
      { name: "Abduction hanche cable", sets: "3×15", url: "https://www.youtube.com/watch?v=niiz8p8BDYQ", tip: "Mouvement lent et contrôlé" },
      { name: "Good morning", sets: "3×12", url: "https://www.youtube.com/watch?v=YA-h3n9L4YU", tip: "Dos droit, charnière à la hanche" },
      { name: "Donkey kicks câble", sets: "3×15/jambe", url: "https://www.youtube.com/watch?v=yABRcXSRnBw", tip: "Core serré, ne pas basculer le bassin" },
    ],
  },
  hiit: {
    label: "HIIT — Brûlage & Cardio Intense",
    exercises: [
      { name: "Burpees", sets: "4×20s on / 10s off", url: "https://www.youtube.com/watch?v=auBLPXO8Fww", tip: "Qualité avant vitesse sur les premiers rounds" },
      { name: "Jump squats", sets: "4×20s", url: "https://www.youtube.com/watch?v=CVaEhXotL7M", tip: "Réception douce, genoux fléchis" },
      { name: "Mountain climbers", sets: "4×30s", url: "https://www.youtube.com/watch?v=nmwgirgXLYM", tip: "Hanches stables, rythme rapide" },
      { name: "Corde à sauter", sets: "3×45s", url: "https://www.youtube.com/watch?v=FJmRQ5iTXKE", tip: "Sauts légers, regard devant" },
      { name: "Squat jump 180°", sets: "3×10", url: "https://www.youtube.com/watch?v=CqMCMVY8vqE", tip: "Atterrissage en squat profond" },
      { name: "High knees", sets: "4×30s", url: "https://www.youtube.com/watch?v=8opcQdC-V-U", tip: "Bras actifs, genoux à hauteur de hanches" },
    ],
  },
  cardio: {
    label: "Cardio — Endurance & Affinage",
    exercises: [
      { name: "Marche inclinée tapis", sets: "30 min à 6-8% inclinaison", url: "https://www.youtube.com/watch?v=ySdKt1H5kog", tip: "Ne pas tenir les barres, balancement naturel des bras" },
      { name: "Vélo elliptique", sets: "20 min intensité modérée", url: "https://www.youtube.com/watch?v=DH0Q5_Z7D7A", tip: "Résistance qui permet de parler" },
      { name: "Gainage planche", sets: "3×45s", url: "https://www.youtube.com/watch?v=pSHjTRCQxIw", tip: "Corps droit de la tête aux talons" },
      { name: "Russian twists", sets: "3×20", url: "https://www.youtube.com/watch?v=wkD8rjkodUI", tip: "Pieds décollés pour plus de difficulté" },
      { name: "Crunchs vélo", sets: "3×20", url: "https://www.youtube.com/watch?v=9FGilxCbdz8", tip: "Coude vers genou opposé, lentement" },
      { name: "Étirements full body", sets: "10 min", url: "https://www.youtube.com/watch?v=sTANio_2E0Q", tip: "Respiration profonde, tenir 30s par posture" },
    ],
  },
};

export const andreaProgram = ["glutes", "cardio", "hiit", "rest", "glutes", "hiit", "cardio"];

export const andreaMacros = { calories: 1800, protein: 140, carbs: 160, fat: 65 };
