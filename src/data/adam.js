export const ADAM = {
  name: "Adam",
  objectif: "Prise de masse",
  pdj: {
    items: [
      "Whey 30g (1 shaker) dans 300ml lait",
      "Riz 80g cuit",
      "3 oeufs brouillés",
      "Café"
    ]
  },
  complements_matin: [
    "Collagène marin 10g + jus 1/2 citron",
    "Créatine 5g dans un verre d'eau",
    "Oméga 3 (2 caps)"
  ],
  complements_soir: [
    "Magnésium bisglycinate 350mg"
  ],
  collation: [
    "Fromage blanc 150g + miel 10g",
    "Noix cerneaux 30g",
    "2 galettes de riz (26g)"
  ],
  dejeuner: [
    "Riz 150g cuit",
    "Poulet 200g",
    "Légumes surgelés 150g",
    "Huile d'olive 5ml"
  ],
  diner: [
    "Riz 120g cuit",
    "Poulet 180g",
    "Légumes 150g",
    "Huile d'olive 5ml"
  ],
  equipement: [
    "Barre de développé couché",
    "Haltères",
    "Tour de musculation (dips + relevés de jambes + barre de traction)",
    "Tapis fitness",
    "Élastiques",
    "Corde à sauter"
  ],
  semaine: [
    {
      jour: "Lundi",
      focus: "Push — Poitrine · Épaules · Triceps",
      sport: true,
      planning: [
        { t: "08:30", type: "skin", label: "Skincare matin", detail: "Nettoyant doux · Acide hyaluronique sérum · Hydratant · SPF 50" },
        { t: "08:45", type: "supp", label: "Compléments réveil", detail: "Collagène marin 10g + jus 1/2 citron · Créatine 5g · Oméga 3 (2 caps)" },
        { t: "09:00", type: "pdj", label: "Petit-déjeuner", detail: "Whey 30g (1 shaker) · Riz 80g cuit · 3 oeufs brouillés · Café" },
        { t: "10:15", type: "food", label: "Collation pré-séance", detail: "2 oeufs durs · Yaourt nature 125g · 2 galettes de riz (26g)" },
        { t: "10:30", type: "supp", label: "Booster pré-workout", detail: "1 mesure dans 300ml eau — 30 min avant la séance" },
        { t: "11:00", type: "sport", label: "Séance Push — 60 min", seance: "push", detail: "Développé couché barre 4×6-8 · Développé incliné barre 3×8-10 · Développé militaire barre 4×8 · Élévations latérales haltères 3×12 · Dips tour musculation 3×10-12 · Extensions triceps haltère 3×12" },
        { t: "12:15", type: "food", label: "Repas post-entraînement", detail: "Whey 30g (1 shaker) · Riz 100g cuit · Poulet 150g" },
        { t: "14:30", type: "food", label: "Déjeuner", detail: "Riz 150g cuit · Poulet 200g · Légumes surgelés 150g · Huile d'olive 5ml" },
        { t: "17:00", type: "food", label: "Collation", detail: "Fromage blanc 150g + miel 10g · Noix cerneaux 30g · 2 galettes de riz (26g)" },
        { t: "20:00", type: "food", label: "Dîner", detail: "Riz 120g cuit · Poulet 180g · Légumes 150g · Huile d'olive 5ml" },
        { t: "22:00", type: "supp", label: "Magnésium", detail: "Magnésium bisglycinate 350mg" },
        { t: "22:15", type: "skin", label: "Skincare soir", detail: "Nettoyant · Acide hyaluronique sérum · Crème nuit" },
        { t: "23:00", type: "rest", label: "Coucher", detail: "8h de sommeil minimum" }
      ]
    },
    {
      jour: "Mardi",
      focus: "Pull — Dos · Biceps",
      sport: true,
      planning: [
        { t: "08:30", type: "skin", label: "Skincare matin", detail: "Nettoyant doux · Acide hyaluronique sérum · Hydratant · SPF 50" },
        { t: "08:45", type: "supp", label: "Compléments réveil", detail: "Collagène marin 10g + jus 1/2 citron · Créatine 5g · Oméga 3 (2 caps)" },
        { t: "09:00", type: "pdj", label: "Petit-déjeuner", detail: "Whey 30g (1 shaker) · Riz 80g cuit · 3 oeufs brouillés · Café" },
        { t: "10:15", type: "food", label: "Collation pré-séance", detail: "Fromage blanc 150g · 2 tranches pain complet (60g)" },
        { t: "10:30", type: "supp", label: "Booster pré-workout", detail: "1 mesure dans 300ml eau — 30 min avant" },
        { t: "11:00", type: "sport", label: "Séance Pull — 60 min", seance: "pull", detail: "Rowing barre 4×6-8 · Soulevé de terre barre 3×5 · Curl barre 4×8-10 · Shrugs barre 3×15 · Face pull élastique 3×15 · Curl marteau haltères 3×12 · Tractions négatives tour 3×5" },
        { t: "12:15", type: "food", label: "Repas post-entraînement", detail: "Whey 30g (1 shaker) · Riz 100g cuit · Poulet 150g" },
        { t: "14:30", type: "food", label: "Déjeuner", detail: "Riz 150g cuit · Poulet 200g · Légumes surgelés 150g · Huile d'olive 5ml" },
        { t: "17:00", type: "food", label: "Collation", detail: "Yaourt grec 200g · Noix cerneaux 30g" },
        { t: "20:00", type: "food", label: "Dîner", detail: "Riz 120g cuit · Poulet 180g · Légumes 150g · Huile d'olive 5ml" },
        { t: "22:00", type: "supp", label: "Magnésium", detail: "Magnésium bisglycinate 350mg" },
        { t: "22:15", type: "skin", label: "Skincare soir", detail: "Nettoyant · Acide hyaluronique sérum · Crème nuit" },
        { t: "23:00", type: "rest", label: "Coucher", detail: "8h minimum" }
      ]
    },
    {
      jour: "Mercredi",
      focus: "Legs — Quadri · Ischios · Fessiers",
      sport: true,
      planning: [
        { t: "08:30", type: "skin", label: "Skincare matin", detail: "Nettoyant doux · Acide hyaluronique sérum · Hydratant · SPF 50" },
        { t: "08:45", type: "supp", label: "Compléments réveil", detail: "Collagène marin 10g + jus 1/2 citron · Créatine 5g · Oméga 3 (2 caps)" },
        { t: "09:00", type: "pdj", label: "Petit-déjeuner", detail: "Whey 30g (1 shaker) · Riz 80g cuit · 3 oeufs brouillés · Café" },
        { t: "10:15", type: "food", label: "Banane pré-séance", detail: "1 banane 120g · Eau 500ml" },
        { t: "10:30", type: "supp", label: "Booster pré-workout", detail: "1 mesure — séance jambes la plus intense" },
        { t: "11:00", type: "sport", label: "Séance Legs — 65 min", seance: "legs", detail: "Squat barre 5×5-6 · Romanian deadlift barre 4×8 · Fentes marchées haltères 4×12 · Glute bridge barre lesté 4×12 · Step-up chaise haltères 3×12 · Mollets unipodal 4×20" },
        { t: "12:20", type: "food", label: "Repas post-entraînement", detail: "Whey 30g (1 shaker) · Riz 100g cuit · Poulet 150g" },
        { t: "14:30", type: "food", label: "Déjeuner", detail: "Riz 150g cuit · Poulet 200g · Légumes surgelés 150g · Huile d'olive 5ml" },
        { t: "17:00", type: "food", label: "Collation", detail: "Fromage blanc 150g + miel 10g · Noix cerneaux 30g · Galettes de riz 26g" },
        { t: "20:00", type: "food", label: "Dîner", detail: "Riz 120g cuit · Poulet 180g · Légumes 150g · Huile d'olive 5ml" },
        { t: "22:00", type: "supp", label: "Magnésium", detail: "Magnésium bisglycinate 350mg" },
        { t: "22:15", type: "skin", label: "Skincare soir", detail: "Nettoyant · Acide hyaluronique sérum · Crème nuit" },
        { t: "23:00", type: "rest", label: "Coucher", detail: "8h — jambes se reconstruisent la nuit" }
      ]
    },
    {
      jour: "Jeudi",
      focus: "Push bis — Poitrine · Épaules",
      sport: true,
      planning: [
        { t: "08:30", type: "skin", label: "Skincare matin", detail: "Nettoyant doux · Acide hyaluronique sérum · Hydratant · SPF 50" },
        { t: "08:45", type: "supp", label: "Compléments réveil", detail: "Collagène marin 10g + jus 1/2 citron · Créatine 5g · Oméga 3 (2 caps)" },
        { t: "09:00", type: "pdj", label: "Petit-déjeuner", detail: "Whey 30g (1 shaker) · Riz 80g cuit · 3 oeufs brouillés · Café" },
        { t: "10:15", type: "food", label: "Collation pré-séance", detail: "Yaourt grec 200g · 2 galettes de riz (26g)" },
        { t: "10:30", type: "supp", label: "Booster pré-workout", detail: "1 mesure dans 300ml eau — 30 min avant" },
        { t: "11:00", type: "sport", label: "Séance Push bis — 55 min", seance: "push", detail: "Développé incliné haltères 4×10 · Écarté couché haltères 3×12 · Arnold press haltères 3×10 · Pompes classiques 3×max · Kickback triceps haltère 3×15 · Dips tour musculation 3×12" },
        { t: "12:05", type: "food", label: "Repas post-entraînement", detail: "Whey 30g (1 shaker) · Riz 100g cuit · Poulet 150g" },
        { t: "14:30", type: "food", label: "Déjeuner", detail: "Riz 150g cuit · Poulet 200g · Légumes surgelés 150g · Huile d'olive 5ml" },
        { t: "17:00", type: "food", label: "Collation", detail: "Fromage blanc 150g + miel 10g · Noix cerneaux 30g" },
        { t: "20:00", type: "food", label: "Dîner", detail: "Riz 120g cuit · Poulet 180g · Légumes 150g · Huile d'olive 5ml" },
        { t: "22:00", type: "supp", label: "Magnésium", detail: "Magnésium bisglycinate 350mg" },
        { t: "22:15", type: "skin", label: "Skincare soir", detail: "Nettoyant · Acide hyaluronique sérum · Crème nuit" },
        { t: "23:00", type: "rest", label: "Coucher", detail: "8h minimum" }
      ]
    },
    {
      jour: "Vendredi",
      focus: "Pull bis — Dos · Biceps · Trapèzes",
      sport: true,
      planning: [
        { t: "08:30", type: "skin", label: "Skincare matin", detail: "Nettoyant doux · Acide hyaluronique sérum · Hydratant · SPF 50" },
        { t: "08:45", type: "supp", label: "Compléments réveil", detail: "Collagène marin 10g + jus 1/2 citron · Créatine 5g · Oméga 3 (2 caps)" },
        { t: "09:00", type: "pdj", label: "Petit-déjeuner", detail: "Whey 30g (1 shaker) · Riz 80g cuit · 3 oeufs brouillés · Café" },
        { t: "10:15", type: "food", label: "Collation pré-séance", detail: "2 oeufs durs · 1 banane 120g · Eau 400ml" },
        { t: "10:30", type: "supp", label: "Booster pré-workout", detail: "Dernier booster de la semaine recommandé" },
        { t: "11:00", type: "sport", label: "Séance Pull bis — 60 min", seance: "pull", detail: "Rowing barre haltères 4×8 · Tirage élastique haut 3×12 · Shrugs haltères 3×15 · Curl concentré haltère 3×12 · Gainage planche 3×45s · Relevés de jambes tour musculation 3×15" },
        { t: "12:10", type: "food", label: "Repas post-entraînement", detail: "Whey 30g (1 shaker) · Riz 100g cuit · Poulet 150g" },
        { t: "14:30", type: "food", label: "Déjeuner", detail: "Riz 150g cuit · Poulet 200g · Légumes surgelés 150g · Huile d'olive 5ml" },
        { t: "17:00", type: "food", label: "Collation", detail: "Fromage blanc 150g + miel 10g · Noix cerneaux 30g · Galettes de riz 26g" },
        { t: "20:00", type: "food", label: "Dîner", detail: "Riz 120g cuit · Poulet 180g · Légumes 150g · Huile d'olive 5ml" },
        { t: "22:00", type: "supp", label: "Magnésium", detail: "Magnésium bisglycinate 350mg" },
        { t: "22:15", type: "skin", label: "Skincare soir", detail: "Nettoyant · Acide hyaluronique sérum · Crème nuit" },
        { t: "23:00", type: "rest", label: "Coucher", detail: "8h minimum" }
      ]
    },
    {
      jour: "Samedi",
      focus: "Legs bis + Cardio corde",
      sport: true,
      planning: [
        { t: "08:30", type: "skin", label: "Skincare matin", detail: "Nettoyant doux · Acide hyaluronique sérum · Hydratant · SPF 50" },
        { t: "08:45", type: "supp", label: "Compléments réveil", detail: "Collagène marin 10g + jus 1/2 citron · Créatine 5g · Oméga 3 (2 caps) — pas de booster" },
        { t: "09:00", type: "pdj", label: "Petit-déjeuner", detail: "Whey 30g (1 shaker) · Riz 80g cuit · 3 oeufs brouillés · Café" },
        { t: "10:15", type: "food", label: "Banane pré-séance", detail: "1 banane 120g · Eau 500ml" },
        { t: "11:00", type: "sport", label: "Séance Legs + Cardio — 65 min", seance: "legs", detail: "Corde à sauter 10 min · Squat sauté 3×15 · Fentes latérales haltères 3×12 · Hip thrust barre lesté 4×12 · Step-up chaise haltères 3×12 · Mollets unipodal 4×20 · Étirements 10 min" },
        { t: "12:20", type: "food", label: "Repas post-entraînement", detail: "Whey 30g (1 shaker) · Riz 100g cuit · Poulet 150g" },
        { t: "14:30", type: "food", label: "Déjeuner", detail: "Riz 150g cuit · Poulet 200g · Légumes surgelés 150g · Huile d'olive 5ml" },
        { t: "17:00", type: "food", label: "Collation", detail: "Fromage blanc 150g + miel 10g · Noix cerneaux 30g" },
        { t: "20:00", type: "food", label: "Dîner", detail: "Riz 120g cuit · Poulet 180g · Légumes 150g · Huile d'olive 5ml" },
        { t: "22:00", type: "supp", label: "Magnésium", detail: "Magnésium bisglycinate 350mg" },
        { t: "22:15", type: "skin", label: "Skincare soir", detail: "Nettoyant · Acide hyaluronique sérum · Crème nuit" },
        { t: "23:00", type: "rest", label: "Coucher", detail: "8h — repos total demain" }
      ]
    },
    {
      jour: "Dimanche",
      focus: "Repos total — récupération",
      sport: false,
      planning: [
        { t: "08:30", type: "skin", label: "Skincare matin", detail: "Nettoyant doux · Acide hyaluronique sérum · Hydratant · SPF si sortie" },
        { t: "08:45", type: "supp", label: "Compléments réveil", detail: "Collagène marin 10g + jus 1/2 citron · Créatine 5g · Oméga 3 (2 caps)" },
        { t: "09:00", type: "pdj", label: "Petit-déjeuner", detail: "Whey 30g (1 shaker) · Riz 80g cuit · 3 oeufs brouillés · Café" },
        { t: "13:00", type: "food", label: "Déjeuner", detail: "Riz 150g cuit · Poulet 200g · Légumes 150g · Huile d'olive 5ml" },
        { t: "16:30", type: "food", label: "Collation", detail: "Fromage blanc 150g + miel 10g · Noix cerneaux 30g" },
        { t: "20:00", type: "food", label: "Dîner", detail: "Riz 120g cuit · Poulet 180g · Légumes 150g" },
        { t: "22:00", type: "supp", label: "Magnésium", detail: "Magnésium bisglycinate 350mg" },
        { t: "22:15", type: "skin", label: "Skincare soir", detail: "Nettoyant · Acide hyaluronique sérum · Crème nuit" },
        { t: "22:45", type: "rest", label: "Coucher tôt", detail: "Bien récupéré pour lundi Push" }
      ]
    }
  ],
  exercices: {
    push: {
      label: "Push — Poitrine · Épaules · Triceps",
      exercices: [
        { nom: "Développé couché BARRE", sets: "4×6-8", muscles: ["Poitrine","Triceps","Épaules avant"], conseil: "Prise légèrement plus large que les épaules. Barre descend jusqu'à effleurer la poitrine, coudes à 45-75°. Andréa te spotte.", yt: "https://www.youtube.com/results?search_query=developpe+couche+barre+technique" },
        { nom: "Développé incliné barre", sets: "3×8-10", muscles: ["Poitrine haute","Épaules avant"], conseil: "Surélève les épaules si pas de banc incliné. Barre descend vers le haut de la poitrine.", yt: "https://www.youtube.com/results?search_query=developpe+incline+barre+technique" },
        { nom: "Développé militaire barre", sets: "4×8", muscles: ["Épaules","Triceps","Trapèzes"], conseil: "Debout ou assis, barre au niveau du menton. Pousse vers le haut, rentre le ventre.", yt: "https://www.youtube.com/results?search_query=developpe+militaire+barre+technique" },
        { nom: "Élévations latérales haltères", sets: "3×12", muscles: ["Épaules latérales"], conseil: "Monte les bras sur les côtés jusqu'à hauteur des épaules. Coudes légèrement fléchis. Ne balance pas.", yt: "https://www.youtube.com/results?search_query=elevations+laterales+halteres+technique" },
        { nom: "Dips tour de musculation", sets: "3×10-12", muscles: ["Triceps","Poitrine basse"], conseil: "Barres parallèles de la tour. Descends à 90°, corps droit. Ajoute un sac lesté pour progresser.", yt: "https://www.youtube.com/results?search_query=dips+barres+paralleles+technique" },
        { nom: "Extensions triceps haltère", sets: "3×12", muscles: ["Triceps"], conseil: "Haltère à deux mains derrière la tête. Coudes pointés vers le plafond, fixes. Étend les bras vers le haut.", yt: "https://www.youtube.com/results?search_query=extension+triceps+haltere+tete+technique" }
      ]
    },
    pull: {
      label: "Pull — Dos · Biceps · Trapèzes",
      exercices: [
        { nom: "Rowing barre", sets: "4×6-8", muscles: ["Grand dorsal","Rhomboïdes","Biceps"], conseil: "Buste penché à 45°, barre en prise pronation. Tire vers le nombril en serrant les omoplates.", yt: "https://www.youtube.com/results?search_query=rowing+barre+dos+technique" },
        { nom: "Soulevé de terre barre", sets: "3×5", muscles: ["Dos complet","Ischios","Fessiers","Trapèzes"], conseil: "Barre au sol, dos plat, regard devant. Pousse dans le sol avec les jambes, barre contre les tibias.", yt: "https://www.youtube.com/results?search_query=souleve+de+terre+barre+technique" },
        { nom: "Curl barre", sets: "4×8-10", muscles: ["Biceps","Avant-bras"], conseil: "Coudes FIXES contre le corps. Fléchis jusqu'aux épaules. Ne balance pas.", yt: "https://www.youtube.com/results?search_query=curl+barre+biceps+technique" },
        { nom: "Shrugs barre", sets: "3×15", muscles: ["Trapèzes supérieurs"], conseil: "Monte les épaules vers les oreilles le plus haut possible. Tiens 1 sec en haut.", yt: "https://www.youtube.com/results?search_query=shrugs+barre+trapezes+technique" },
        { nom: "Face pull élastique", sets: "3×15", muscles: ["Épaules arrière","Rotateurs"], conseil: "Élastique fixé haut. Tire vers ton visage en écartant les mains. Coudes à hauteur des épaules.", yt: "https://www.youtube.com/results?search_query=face+pull+elastique+technique" },
        { nom: "Tractions négatives tour", sets: "3×5", muscles: ["Grand dorsal","Biceps"], conseil: "Monte en sautant, descends en 5-7 secondes. Programme progression 8 semaines vers la traction complète.", yt: "https://www.youtube.com/results?search_query=tractions+negatives+technique+debutant" },
        { nom: "Curl marteau haltères", sets: "3×12", muscles: ["Biceps","Brachial","Avant-bras"], conseil: "Paumes se font face. Coudes fixes. Travaille plus l'avant-bras.", yt: "https://www.youtube.com/results?search_query=curl+marteau+haltere+technique" }
      ]
    },
    legs: {
      label: "Legs — Quadri · Ischios · Mollets",
      exercices: [
        { nom: "Squat barre", sets: "5×5-6", muscles: ["Quadriceps","Fessiers","Ischios","Dos"], conseil: "Barre sur les trapèzes. Pieds à largeur d'épaules, orteils à 30°. Cuisses parallèles au sol. Andréa te spotte.", yt: "https://www.youtube.com/results?search_query=squat+barre+technique+debutant" },
        { nom: "Romanian deadlift barre", sets: "4×8", muscles: ["Ischios","Fessiers","Lombaires"], conseil: "Barre devant les cuisses. Pousse les hanches en arrière. Dos plat. Sens l'étirement des ischios.", yt: "https://www.youtube.com/results?search_query=romanian+deadlift+barre+technique" },
        { nom: "Fentes marchées haltères", sets: "4×12", muscles: ["Quadriceps","Fessiers"], conseil: "Grand pas avant, genou arrière descend près du sol. Buste droit. Alterne les jambes.", yt: "https://www.youtube.com/results?search_query=fentes+marchees+halteres+technique" },
        { nom: "Glute bridge barre lesté", sets: "4×12", muscles: ["Fessiers","Ischios"], conseil: "Allongé sur le dos, barre en travers des hanches (serviette de protection). Pousse les hanches vers le plafond.", yt: "https://www.youtube.com/results?search_query=glute+bridge+barre+leste+technique" },
        { nom: "Step-up chaise haltères", sets: "3×12", muscles: ["Quadriceps","Fessiers"], conseil: "Monte sur une chaise stable. Pousse sur le pied posé sans t'aider avec l'autre. Descends lentement.", yt: "https://www.youtube.com/results?search_query=step+up+chaise+halteres+technique" },
        { nom: "Mollets unipodal", sets: "4×20", muscles: ["Mollets"], conseil: "Sur un pied, tiens un mur. Monte sur la pointe le plus haut possible. Descends lentement sous la cheville.", yt: "https://www.youtube.com/results?search_query=mollets+unipodal+technique" }
      ]
    }
  }
};

// JS dayOfWeek (0=Sun … 6=Sat) → semaine index (0=Lundi … 6=Dimanche)
const JS_TO_SEMAINE = [6, 0, 1, 2, 3, 4, 5];

export const adamProgram = JS_TO_SEMAINE.map((si) => {
  const day = ADAM.semaine[si];
  if (!day.sport) return "rest";
  const sportSlot = day.planning.find((s) => s.type === "sport");
  return sportSlot?.seance ?? "rest";
});

export const adamExercises = Object.fromEntries(
  Object.entries(ADAM.exercices).map(([key, workout]) => [key, {
    label: workout.label,
    exercises: workout.exercices.map((ex) => ({
      name: ex.nom,
      sets: ex.sets,
      muscles: ex.muscles,
      tip: ex.conseil,
      url: ex.yt,
    })),
  }])
);

export const adamMacros = { calories: 3200, protein: 200, carbs: 380, fat: 90 };
