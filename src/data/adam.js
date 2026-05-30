export const adamSchedule = [
  { time: "08:30", label: "Réveil", iconType: "sun", type: "routine" },
  {
    time: "08:45",
    label: "Petit déjeuner",
    iconType: "meal",
    type: "meal",
    detail: "4 œufs brouillés, 100g flocons d'avoine, banane, 30g whey",
  },
  {
    time: "08:45",
    label: "Compléments matin",
    iconType: "pill",
    type: "supplement",
    detail: "Créatine 5g, Oméga-3 2g, Vitamine D 2000UI",
  },
  {
    time: "10:30",
    label: "Booster pré-workout",
    iconType: "bolt",
    type: "supplement",
    detail: "Booster + 5g BCAA dans eau froide",
  },
  { time: "11:00", label: "Séance de sport", iconType: "dumbbell", type: "sport", detail: "Voir programme du jour" },
  {
    time: "12:30",
    label: "Repas post-entraînement",
    iconType: "meal",
    type: "meal",
    detail: "200g poulet/saumon, 200g riz, légumes verts, 30g whey",
  },
  {
    time: "15:00",
    label: "Collation",
    iconType: "meal",
    type: "meal",
    detail: "200g fromage blanc 0%, 30g amandes, pomme",
  },
  {
    time: "19:00",
    label: "Dîner",
    iconType: "meal",
    type: "meal",
    detail: "200g viande rouge ou œufs, patate douce, salade",
  },
  {
    time: "20:00",
    label: "Compléments soir",
    iconType: "pill",
    type: "supplement",
    detail: "ZMA ou Magnésium, 30g caséine si faim",
  },
  { time: "23:00", label: "Coucher", iconType: "moon", type: "routine" },
];

export const adamScheduleAfternoon = [
  { time: "08:30", label: "Réveil", iconType: "sun", type: "routine" },
  {
    time: "09:00",
    label: "Petit déjeuner",
    iconType: "meal",
    type: "meal",
    detail: "4 œufs brouillés, 100g flocons d'avoine, banane, 30g whey",
  },
  {
    time: "09:00",
    label: "Compléments matin",
    iconType: "pill",
    type: "supplement",
    detail: "Créatine 5g, Oméga-3 2g, Vitamine D 2000UI",
  },
  {
    time: "12:30",
    label: "Déjeuner",
    iconType: "meal",
    type: "meal",
    detail: "200g poulet/poisson, riz basmati, légumes — repas complet avant l'entraînement",
  },
  {
    time: "14:15",
    label: "Collation pré-séance",
    iconType: "meal",
    type: "meal",
    detail: "Banane, 30g whey, 50g flocons d'avoine — énergie rapide",
  },
  {
    time: "14:30",
    label: "Booster pré-workout",
    iconType: "bolt",
    type: "supplement",
    detail: "Booster + 5g BCAA dans eau froide",
  },
  { time: "15:00", label: "Séance de sport", iconType: "dumbbell", type: "sport", detail: "Voir programme du jour" },
  {
    time: "16:15",
    label: "Repas post-entraînement",
    iconType: "meal",
    type: "meal",
    detail: "200g poulet/saumon, 200g riz, légumes verts, 30g whey",
  },
  {
    time: "19:00",
    label: "Dîner",
    iconType: "meal",
    type: "meal",
    detail: "200g viande rouge ou œufs, patate douce, salade",
  },
  {
    time: "20:00",
    label: "Compléments soir",
    iconType: "pill",
    type: "supplement",
    detail: "ZMA ou Magnésium, 30g caséine si faim",
  },
  { time: "23:00", label: "Coucher", iconType: "moon", type: "routine" },
];

export const adamExercises = {
  push: {
    label: "Push — Pectoraux / Épaules / Triceps",
    exercises: [
      { name: "Développé couché barre", sets: "4×8", url: "https://www.youtube.com/watch?v=rT7DgCr-3pg", tip: "Dos plat, omoplates serrées" },
      { name: "Développé incliné haltères", sets: "3×10", url: "https://www.youtube.com/watch?v=8iPEnn-ltC8", tip: "Inclinaison 30-45°" },
      { name: "Élévations latérales", sets: "4×12", url: "https://www.youtube.com/watch?v=3VcKaXpzqRo", tip: "Coudes légèrement fléchis" },
      { name: "Développé militaire haltères", sets: "3×10", url: "https://www.youtube.com/watch?v=M2rwvNhTOu0", tip: "Core engagé, pas d'hyperextension" },
      { name: "Dips lestés", sets: "3×10", url: "https://www.youtube.com/watch?v=2z8JmcrW-As", tip: "Pencher légèrement en avant pour les pecs" },
      { name: "Extensions triceps corde", sets: "3×12", url: "https://www.youtube.com/watch?v=vB5OHsJ3EME", tip: "Coudes fixes, contraction complète" },
    ],
  },
  pull: {
    label: "Pull — Dos / Biceps / Trapèzes",
    exercises: [
      { name: "Tractions lestées", sets: "4×6", url: "https://www.youtube.com/watch?v=eGo4IYlbE5g", tip: "Tirez les coudes vers les hanches" },
      { name: "Rowing barre", sets: "4×8", url: "https://www.youtube.com/watch?v=G8l_8chR5BE", tip: "Dos droit, tirer vers le nombril" },
      { name: "Tirage vertical prise large", sets: "3×10", url: "https://www.youtube.com/watch?v=CAwf7n6Luuc", tip: "Pointer les coudes vers le sol" },
      { name: "Rowing unilatéral haltère", sets: "3×10", url: "https://www.youtube.com/watch?v=pYcpY20QaE8", tip: "Rotation légère du buste" },
      { name: "Curl biceps barre", sets: "3×10", url: "https://www.youtube.com/watch?v=kwG2ipFRgfo", tip: "Coudes fixes contre le corps" },
      { name: "Curl marteau haltères", sets: "3×12", url: "https://www.youtube.com/watch?v=TwD-YGVP4Bk", tip: "Poignets neutres, contrôle excentrique" },
    ],
  },
  legs: {
    label: "Legs — Quadriceps / Ischio / Mollets",
    exercises: [
      { name: "Squat barre", sets: "4×8", url: "https://www.youtube.com/watch?v=ultWZbUMPL8", tip: "Parallèle ou sous le parallèle" },
      { name: "Presse à cuisses", sets: "4×10", url: "https://www.youtube.com/watch?v=IZxyjW7MPJQ", tip: "Pieds largeur épaules, genoux dans l'axe" },
      { name: "Fentes marchées haltères", sets: "3×12", url: "https://www.youtube.com/watch?v=L8fvypPrv9Y", tip: "Grand pas, genou arrière proche du sol" },
      { name: "Leg curl allongé", sets: "4×10", url: "https://www.youtube.com/watch?v=1Tq3QdYUuHs", tip: "Hanches plaquées contre le banc" },
      { name: "Romanian Deadlift", sets: "3×10", url: "https://www.youtube.com/watch?v=jEy_czb3RKA", tip: "Dos droit, descente contrôlée" },
      { name: "Mollets debout machine", sets: "4×15", url: "https://www.youtube.com/watch?v=gwLzBJYoWlI", tip: "Amplitude complète, tenir 1s en haut" },
    ],
  },
};

export const adamProgram = ["push", "pull", "legs", "rest", "push", "pull", "legs"];

export const adamMacros = { calories: 3200, protein: 200, carbs: 380, fat: 90 };
