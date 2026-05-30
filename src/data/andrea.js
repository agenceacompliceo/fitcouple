export const ANDREA = {
  name: "Andréa",
  objectif: "Affinage & galbe fessiers",
  pdj: {
    items: [
      "Matcha 1 cuil. (2g) + 200ml lait chaud",
      "2 oeufs brouillés",
      "Flocons d'avoine 40g secs",
      "1 banane 120g"
    ]
  },
  complements_matin: [
    "Collagène marin 10g + jus 1/2 citron",
    "Créatine 5g dans un verre d'eau",
    "Oméga 3 (2 caps)",
    "Glutamine 5g dans un verre d'eau"
  ],
  complements_soir: [
    "Magnésium bisglycinate 350mg"
  ],
  collation: [
    "Fromage blanc 0% 150g",
    "Carotte 100g"
  ],
  dejeuner: [
    "Riz 80g cuit",
    "Poulet 150g",
    "Légumes surgelés 200g",
    "Vinaigrette légère (5ml huile + citron)"
  ],
  diner: [
    "Riz 70g cuit",
    "Poulet 150g",
    "Légumes 200g",
    "Eau citronnée"
  ],
  equipement: [
    "Haltères",
    "Tour de musculation (relevés de jambes suspendus + dips)",
    "Tapis fitness",
    "Élastiques de résistance",
    "Corde à sauter"
  ],
  semaine: [
    {
      jour: "Lundi",
      focus: "Fessiers A — Glutes · Ischios",
      sport: true,
      planning: [
        { t: "08:30", type: "skin", label: "Skincare matin", detail: "Nettoyant · Acide hyaluronique sérum · Hydratant · SPF 50 — obligatoire car kit curcuma le soir" },
        { t: "08:45", type: "supp", label: "Compléments réveil", detail: "Collagène marin 10g + jus 1/2 citron · Créatine 5g · Oméga 3 (2 caps) · Glutamine 5g" },
        { t: "09:00", type: "pdj", label: "Petit-déjeuner", detail: "Matcha 1 cuil. (2g) + 200ml lait chaud · 2 oeufs brouillés · Flocons d'avoine 40g · 1 banane 120g" },
        { t: "10:15", type: "food", label: "Collation pré-séance", detail: "Yaourt nature 0% 125g · Noix cerneaux 15g" },
        { t: "10:45", type: "food", label: "Banane 15 min avant", detail: "1 banane 120g — énergie rapide pour la séance fessiers" },
        { t: "11:00", type: "sport", label: "Séance Fessiers A — 55 min", seance: "fessA", detail: "Hip thrust haltères 4×12 · Glute bridge unilatéral 3×15 · Donkey kicks élastique 3×20 · Romanian deadlift haltères 3×12 · Abduction élastique debout 3×15 · Étirements fessiers 10 min" },
        { t: "12:05", type: "food", label: "Repas post-entraînement", detail: "Yaourt grec 200g · Riz 60g cuit · 2 oeufs durs" },
        { t: "12:10", type: "supp", label: "Glutamine post-séance", detail: "Glutamine 5g dans un verre d'eau" },
        { t: "14:30", type: "food", label: "Déjeuner", detail: "Riz 80g cuit · Poulet 150g · Légumes surgelés 200g · Vinaigrette légère" },
        { t: "17:00", type: "food", label: "Collation", detail: "Fromage blanc 0% 150g · Carotte 100g" },
        { t: "20:00", type: "food", label: "Dîner", detail: "Riz 70g cuit · Poulet 150g · Légumes 200g · Eau citronnée" },
        { t: "22:00", type: "supp", label: "Magnésium", detail: "Magnésium bisglycinate 350mg — réduit le cortisol" },
        { t: "22:15", type: "skin", label: "Skincare soir", detail: "Démaquillant · Nettoyant · Kit curcuma zones ciblées · Acide hyaluronique · Crème nuit" },
        { t: "23:00", type: "rest", label: "Coucher", detail: "8h — fessiers se reconstruisent la nuit" }
      ]
    },
    {
      jour: "Mardi",
      focus: "Cardio HIIT — Ventre · Hanches",
      sport: true,
      planning: [
        { t: "08:30", type: "skin", label: "Skincare matin", detail: "Nettoyant · Acide hyaluronique · Hydratant · SPF 50" },
        { t: "08:45", type: "supp", label: "Compléments réveil", detail: "Collagène marin 10g + jus 1/2 citron · Créatine 5g · Oméga 3 (2 caps) · Glutamine 5g" },
        { t: "09:00", type: "pdj", label: "Petit-déjeuner", detail: "Matcha 1 cuil. (2g) + 200ml lait chaud · 2 oeufs brouillés · Flocons d'avoine 40g · 1 banane 120g" },
        { t: "10:30", type: "food", label: "Matcha froid pré-cardio", detail: "1 cuil. matcha (2g) dans 250ml eau froide — brûle-graisses avant HIIT" },
        { t: "11:00", type: "sport", label: "Cardio HIIT — 45 min", seance: "hiit", detail: "Corde à sauter intervalles 30 min (40s effort / 20s repos) · Gainage planche 3×45s · Mountain climbers 3×30 · Crunchs obliques 3×20 · Vacuum abdominal 3×30s" },
        { t: "12:00", type: "food", label: "Repas post-cardio", detail: "Yaourt grec 200g · Riz 60g cuit · 2 oeufs durs" },
        { t: "12:05", type: "supp", label: "Glutamine post-séance", detail: "Glutamine 5g dans eau" },
        { t: "14:30", type: "food", label: "Déjeuner", detail: "Riz 80g cuit · Poulet 150g · Légumes surgelés 200g · Vinaigrette légère" },
        { t: "17:00", type: "food", label: "Collation", detail: "Yaourt 0% 125g · Carotte 100g · Tisane verte" },
        { t: "20:00", type: "food", label: "Dîner", detail: "Riz 70g cuit · Poulet 150g · Légumes 200g · Eau citronnée" },
        { t: "22:00", type: "supp", label: "Magnésium", detail: "Magnésium bisglycinate 350mg — post-HIIT évite les crampes" },
        { t: "22:15", type: "skin", label: "Skincare soir", detail: "Démaquillant · Nettoyant · Kit curcuma · Acide hyaluronique · Crème nuit" },
        { t: "23:00", type: "rest", label: "Coucher", detail: "8h minimum" }
      ]
    },
    {
      jour: "Mercredi",
      focus: "Full body léger — récupération active",
      sport: true,
      planning: [
        { t: "08:30", type: "skin", label: "Skincare matin", detail: "Nettoyant · Acide hyaluronique · Hydratant · SPF 50" },
        { t: "08:45", type: "supp", label: "Compléments réveil", detail: "Collagène marin 10g + jus 1/2 citron · Créatine 5g · Oméga 3 (2 caps) · Glutamine 5g" },
        { t: "09:00", type: "pdj", label: "Petit-déjeuner", detail: "Matcha 1 cuil. (2g) + 200ml lait chaud · 2 oeufs brouillés · Flocons d'avoine 40g · 1 banane 120g" },
        { t: "10:45", type: "food", label: "Collation pré-séance", detail: "Yaourt nature 0% 125g · Noix cerneaux 15g" },
        { t: "11:00", type: "sport", label: "Full body léger — 50 min", seance: "full", detail: "Squat goblet haltère 3×15 · Fentes arrière alternées 3×12 · Pompes genoux 3×12 · Superman tapis 3×15 · Mobilité et étirements 15 min" },
        { t: "12:00", type: "food", label: "Post-séance", detail: "Yaourt grec 200g · Riz 60g cuit · 2 oeufs durs" },
        { t: "14:30", type: "food", label: "Déjeuner", detail: "Riz 80g cuit · Poulet 150g · Légumes surgelés 200g · Vinaigrette légère" },
        { t: "17:00", type: "food", label: "Collation", detail: "Fromage blanc 0% 150g · Carotte 100g · Tisane" },
        { t: "20:00", type: "food", label: "Dîner", detail: "Riz 70g cuit · Poulet 150g · Légumes 200g · Eau citronnée" },
        { t: "22:00", type: "supp", label: "Magnésium", detail: "Magnésium bisglycinate 350mg" },
        { t: "22:15", type: "skin", label: "Skincare soir", detail: "Démaquillant · Nettoyant · Kit curcuma · Acide hyaluronique · Crème nuit" },
        { t: "23:00", type: "rest", label: "Coucher", detail: "8h minimum" }
      ]
    },
    {
      jour: "Jeudi",
      focus: "Fessiers B — Glutes · Quadri (intense)",
      sport: true,
      planning: [
        { t: "08:30", type: "skin", label: "Skincare matin", detail: "Nettoyant · Acide hyaluronique · Hydratant · SPF 50" },
        { t: "08:45", type: "supp", label: "Compléments réveil", detail: "Collagène marin 10g + jus 1/2 citron · Créatine 5g · Oméga 3 (2 caps) · Glutamine 5g" },
        { t: "09:00", type: "pdj", label: "Petit-déjeuner", detail: "Matcha 1 cuil. (2g) + 200ml lait chaud · 2 oeufs brouillés · Flocons d'avoine 40g · 1 banane 120g" },
        { t: "10:15", type: "food", label: "Collation pré-séance", detail: "Yaourt nature 0% 125g · 2 galettes de riz (26g)" },
        { t: "10:45", type: "food", label: "Banane 15 min avant", detail: "1 banane 120g — séance intense fessiers" },
        { t: "11:00", type: "sport", label: "Séance Fessiers B — 60 min", seance: "fessB", detail: "Squat bulgare haltères 4×10 · Hip thrust élastique sur tapis 4×15 · Kickback élastique 4×15 · Fentes marchées haltères 3×12 · Abduction latérale sol élastique 3×20 · Étirements fessiers 10 min" },
        { t: "12:10", type: "food", label: "Repas post-entraînement", detail: "Yaourt grec 200g · Riz 60g cuit · 2 oeufs durs" },
        { t: "12:15", type: "supp", label: "Glutamine post-séance", detail: "Glutamine 5g — récupération prioritaire" },
        { t: "14:30", type: "food", label: "Déjeuner", detail: "Riz 80g cuit · Poulet 150g · Légumes surgelés 200g · Vinaigrette légère" },
        { t: "17:00", type: "food", label: "Collation", detail: "Fromage blanc 0% 150g · Carotte 100g · Tisane" },
        { t: "20:00", type: "food", label: "Dîner", detail: "Riz 70g cuit · Poulet 150g · Légumes 200g · Eau citronnée" },
        { t: "22:00", type: "supp", label: "Magnésium", detail: "Magnésium bisglycinate 350mg — fessiers très sollicités" },
        { t: "22:15", type: "skin", label: "Skincare soir", detail: "Démaquillant · Nettoyant · Kit curcuma · Acide hyaluronique · Crème nuit" },
        { t: "23:00", type: "rest", label: "Coucher", detail: "8h — fessiers se consolident la nuit" }
      ]
    },
    {
      jour: "Vendredi",
      focus: "Cardio modéré + Gainage",
      sport: true,
      planning: [
        { t: "08:30", type: "skin", label: "Skincare matin", detail: "Nettoyant · Acide hyaluronique · Hydratant · SPF 50" },
        { t: "08:45", type: "supp", label: "Compléments réveil", detail: "Collagène marin 10g + jus 1/2 citron · Créatine 5g · Oméga 3 (2 caps) · Glutamine 5g" },
        { t: "09:00", type: "pdj", label: "Petit-déjeuner", detail: "Matcha 1 cuil. (2g) + 200ml lait chaud · 2 oeufs brouillés · Flocons d'avoine 40g · 1 banane 120g" },
        { t: "10:30", type: "food", label: "Matcha froid pré-cardio", detail: "1 cuil. matcha (2g) dans 250ml eau froide" },
        { t: "11:00", type: "sport", label: "Cardio modéré + Gainage — 50 min", seance: "cardio", detail: "Corde à sauter rythme modéré 20 min · Gainage latéral 3×30s · Leg raise suspendus tour musculation 3×15 · Russian twist haltère léger 3×20 · Vacuum abdominal 3×30s · Étirements 10 min" },
        { t: "12:00", type: "food", label: "Post-séance", detail: "Yaourt grec 200g · Riz 60g cuit · 2 oeufs durs" },
        { t: "12:05", type: "supp", label: "Glutamine", detail: "Glutamine 5g post-séance" },
        { t: "14:30", type: "food", label: "Déjeuner", detail: "Riz 80g cuit · Poulet 150g · Légumes surgelés 200g · Vinaigrette légère" },
        { t: "17:00", type: "food", label: "Collation", detail: "Fromage blanc 0% 150g · Carotte 100g · Tisane verte" },
        { t: "20:00", type: "food", label: "Dîner", detail: "Riz 70g cuit · Poulet 150g · Légumes 200g · Eau citronnée" },
        { t: "22:00", type: "supp", label: "Magnésium", detail: "Magnésium bisglycinate 350mg" },
        { t: "22:15", type: "skin", label: "Skincare soir", detail: "Démaquillant · Nettoyant · Kit curcuma · Acide hyaluronique · Crème nuit" },
        { t: "23:00", type: "rest", label: "Coucher", detail: "8h minimum" }
      ]
    },
    {
      jour: "Samedi",
      focus: "Fessiers C intensif — séance culminante",
      sport: true,
      planning: [
        { t: "08:30", type: "skin", label: "Skincare matin", detail: "Nettoyant · Acide hyaluronique · Hydratant · SPF 50" },
        { t: "08:45", type: "supp", label: "Compléments réveil", detail: "Collagène marin 10g + jus 1/2 citron · Créatine 5g · Oméga 3 (2 caps) · Glutamine 5g" },
        { t: "09:00", type: "pdj", label: "Petit-déjeuner", detail: "Matcha 1 cuil. (2g) + 200ml lait chaud · 2 oeufs brouillés · Flocons d'avoine 50g · 1 banane 120g" },
        { t: "10:15", type: "food", label: "Collation pré-séance", detail: "1 banane 120g + yaourt nature 125g · Eau 400ml — séance la plus intense" },
        { t: "11:00", type: "sport", label: "Séance Fessiers C intensif — 60 min", seance: "fessC", detail: "Hip thrust pyramidal 5 séries (8/10/12/12/15) · Sumo squat haltère 3×15 · Glute bridge pulsé 3×30 · Clamshell élastique 3×20 · Kickback élastique finish 3×20 · Étirements profonds 10 min" },
        { t: "12:15", type: "food", label: "Repas post-entraînement", detail: "Yaourt grec 200g · Riz 60g cuit · 2 oeufs durs" },
        { t: "12:20", type: "supp", label: "Glutamine post-séance", detail: "Glutamine 5g — séance la plus intense de la semaine" },
        { t: "14:30", type: "food", label: "Déjeuner", detail: "Riz 80g cuit · Poulet 150g · Légumes surgelés 200g · Vinaigrette légère" },
        { t: "17:00", type: "food", label: "Collation", detail: "Fromage blanc 0% 150g · Carotte 100g · Tisane" },
        { t: "20:00", type: "food", label: "Dîner", detail: "Riz 70g cuit · Poulet 150g · Légumes 200g · Eau citronnée" },
        { t: "22:00", type: "supp", label: "Magnésium", detail: "Magnésium bisglycinate 350mg" },
        { t: "22:15", type: "skin", label: "Skincare soir", detail: "Démaquillant · Nettoyant · Gommage corps (1x/semaine) · Kit curcuma · Acide hyaluronique · Masque repulpant" },
        { t: "23:00", type: "rest", label: "Coucher", detail: "8-9h — récupération totale demain" }
      ]
    },
    {
      jour: "Dimanche",
      focus: "Repos complet — récupération",
      sport: false,
      planning: [
        { t: "08:30", type: "skin", label: "Skincare matin", detail: "Nettoyant · Acide hyaluronique · Hydratant · SPF si sortie" },
        { t: "08:45", type: "supp", label: "Compléments réveil", detail: "Collagène marin 10g + jus 1/2 citron · Créatine 5g · Oméga 3 (2 caps) · Glutamine 5g" },
        { t: "09:00", type: "pdj", label: "Petit-déjeuner", detail: "Matcha 1 cuil. (2g) + 200ml lait chaud · 2 oeufs brouillés · Flocons d'avoine 40g · 1 banane 120g" },
        { t: "13:00", type: "food", label: "Déjeuner", detail: "Riz 80g cuit · Poulet 150g · Légumes 200g · Vinaigrette légère" },
        { t: "15:30", type: "rest", label: "Marche douce ou yoga", detail: "30 min — circulation sans stress musculaire" },
        { t: "17:00", type: "food", label: "Collation", detail: "Yaourt 0% 125g · 1 fruit · Tisane au gingembre" },
        { t: "20:00", type: "food", label: "Dîner", detail: "Riz 70g cuit · Poulet 150g · Légumes 200g · Eau citronnée" },
        { t: "22:00", type: "supp", label: "Magnésium", detail: "Magnésium bisglycinate 350mg" },
        { t: "22:15", type: "skin", label: "Skincare soir", detail: "Démaquillant · Nettoyant · Kit curcuma · Acide hyaluronique · Masque crème nuit riche" },
        { t: "22:45", type: "rest", label: "Coucher tôt", detail: "Bien récupérée pour lundi fessiers A" }
      ]
    }
  ],
  exercices: {
    fessA: {
      label: "Fessiers A — Glutes · Ischios",
      exercices: [
        { nom: "Hip thrust haltères", sets: "4×12", muscles: ["Fessiers","Ischios"], conseil: "Dos appuyé sur le canapé, haltère sur les hanches. Pousse les hanches vers le haut en contractant FORT les fessiers. Tiens 1-2 sec en haut.", yt: "https://www.youtube.com/results?search_query=hip+thrust+haltere+fessiers+technique" },
        { nom: "Glute bridge unilatéral", sets: "3×15", muscles: ["Fessiers","Stabilisateurs"], conseil: "Allongée sur le dos, une jambe levée tendue. Pousse avec une seule jambe. Élimine les déséquilibres.", yt: "https://www.youtube.com/results?search_query=glute+bridge+unilateral+technique" },
        { nom: "Donkey kicks élastique", sets: "3×20", muscles: ["Fessiers ronds","Haut fessiers"], conseil: "A 4 pattes, élastique aux chevilles. Pousse un pied vers le plafond, genou à 90°. Contracte fort en haut.", yt: "https://www.youtube.com/results?search_query=donkey+kicks+elastique+fessiers" },
        { nom: "Romanian deadlift haltères", sets: "3×12", muscles: ["Ischios","Fessiers bas","Lombaires"], conseil: "Haltères devant les cuisses. Pousse les hanches en arrière. Sens l'étirement dans l'arrière des cuisses.", yt: "https://www.youtube.com/results?search_query=romanian+deadlift+halteres+femme" },
        { nom: "Abduction élastique debout", sets: "3×15", muscles: ["Fessiers latéraux"], conseil: "Élastique aux chevilles. Debout, écarte une jambe sur le côté le plus loin possible. Reviens lentement.", yt: "https://www.youtube.com/results?search_query=abduction+jambe+elastique+debout+fessiers" }
      ]
    },
    hiit: {
      label: "Cardio HIIT — Ventre · Hanches",
      exercices: [
        { nom: "Corde à sauter HIIT", sets: "30 min — 40s effort / 20s repos", muscles: ["Cardio","Mollets"], conseil: "40 secondes de saut rapide puis 20 secondes de repos. Répète 30 min. Si tu rates la corde reprends directement.", yt: "https://www.youtube.com/results?search_query=corde+a+sauter+HIIT+debutant" },
        { nom: "Gainage planche", sets: "3×45s", muscles: ["Abdos profonds","Lombaires"], conseil: "Corps en ligne droite des talons aux épaules. Rentre le nombril. Ne laisse pas les hanches tomber.", yt: "https://www.youtube.com/results?search_query=gainage+planche+technique" },
        { nom: "Mountain climbers", sets: "3×30", muscles: ["Abdos","Cardio"], conseil: "Position de pompe. Ramène alternativement les genoux vers la poitrine le plus vite possible. Hanches basses.", yt: "https://www.youtube.com/results?search_query=mountain+climbers+abdos+technique" },
        { nom: "Crunchs obliques", sets: "3×20", muscles: ["Obliques","Abdos latéraux"], conseil: "Monte en tournant l'épaule vers le genou opposé. Travaille les côtés du ventre.", yt: "https://www.youtube.com/results?search_query=crunchs+obliques+technique" },
        { nom: "Vacuum abdominal", sets: "3×30s", muscles: ["Transverse"], conseil: "Expire tout l'air. Rentre le nombril vers la colonne au maximum. Tiens 30 sec. Meilleur exercice pour aplatir le ventre.", yt: "https://www.youtube.com/results?search_query=vacuum+abdominal+ventre+plat" }
      ]
    },
    full: {
      label: "Full body léger — Récupération active",
      exercices: [
        { nom: "Squat goblet haltère", sets: "3×15", muscles: ["Quadriceps","Fessiers"], conseil: "Haltère léger contre la poitrine. Descends dos droit, genoux dans l'axe. Séance légère.", yt: "https://www.youtube.com/results?search_query=squat+goblet+haltere+technique" },
        { nom: "Fentes arrière alternées", sets: "3×12", muscles: ["Quadriceps","Fessiers"], conseil: "Grand pas en arrière. Genou arrière vers le sol. Plus facile sur les genoux que les fentes avant.", yt: "https://www.youtube.com/results?search_query=fentes+arriere+technique" },
        { nom: "Pompes genoux", sets: "3×12", muscles: ["Poitrine","Triceps"], conseil: "Genoux au sol, corps droit des genoux aux épaules. Descends jusqu'à presque toucher le sol.", yt: "https://www.youtube.com/results?search_query=pompes+genoux+technique+femme" },
        { nom: "Superman tapis", sets: "3×15", muscles: ["Lombaires","Fessiers","Dos"], conseil: "Allongée ventre au sol. Lève bras et jambes simultanément. Tiens 2 sec. Protège le bas du dos.", yt: "https://www.youtube.com/results?search_query=superman+lombaires+tapis" }
      ]
    },
    fessB: {
      label: "Fessiers B — Glutes · Quadri",
      exercices: [
        { nom: "Squat bulgare haltères", sets: "4×10", muscles: ["Quadriceps","Fessiers"], conseil: "Pied arrière sur le canapé. Descends genou avant dans l'axe du pied. Commence sans poids.", yt: "https://www.youtube.com/results?search_query=squat+bulgare+halteres+technique" },
        { nom: "Hip thrust élastique", sets: "4×15", muscles: ["Fessiers","Ischios"], conseil: "Élastique en travers des hanches. Même mouvement que le hip thrust. Contracte FORT en haut.", yt: "https://www.youtube.com/results?search_query=hip+thrust+elastique+fessiers" },
        { nom: "Kickback élastique", sets: "4×15", muscles: ["Fessiers ronds","Haut fessiers"], conseil: "A 4 pattes ou debout, élastique à la cheville. Pousse le pied vers l'arrière. Contracte fort en fin.", yt: "https://www.youtube.com/results?search_query=kickback+fessiers+elastique+technique" },
        { nom: "Fentes marchées haltères", sets: "3×12", muscles: ["Quadriceps","Fessiers"], conseil: "Haltères dans les mains, avance en alternant. Genou arrière près du sol. Buste droit.", yt: "https://www.youtube.com/results?search_query=fentes+marchees+halteres+femme" },
        { nom: "Abduction latérale sol élastique", sets: "3×20", muscles: ["Abducteurs","Fessiers latéraux"], conseil: "Allongée sur le côté, élastique aux genoux. Lève la jambe vers le plafond. Reviens lentement.", yt: "https://www.youtube.com/results?search_query=abduction+laterale+sol+elastique" }
      ]
    },
    cardio: {
      label: "Cardio modéré + Gainage",
      exercices: [
        { nom: "Corde à sauter modérée", sets: "20 min rythme régulier", muscles: ["Cardio","Mollets"], conseil: "Rythme confortable — tu dois pouvoir parler. Brûle la graisse des hanches progressivement.", yt: "https://www.youtube.com/results?search_query=corde+a+sauter+rythme+modere+cardio" },
        { nom: "Gainage latéral", sets: "3×30s", muscles: ["Obliques","Abducteurs"], conseil: "Appui sur l'avant-bras et le pied. Corps en ligne droite. Hanches ne tombent pas. Affine les hanches.", yt: "https://www.youtube.com/results?search_query=gainage+lateral+technique+obliques" },
        { nom: "Leg raise suspendus tour", sets: "3×15", muscles: ["Abdos bas","Hip flexors"], conseil: "Bras dans les accoudoirs rembourrés de la tour. Monte les genoux vers la poitrine. Meilleur que le leg raise au sol.", yt: "https://www.youtube.com/results?search_query=releves+de+jambes+suspendus+tour+technique" },
        { nom: "Russian twist haltère", sets: "3×20", muscles: ["Obliques","Abdos"], conseil: "Assise, pieds levés ou au sol. Haltère léger. Tourne le buste de gauche à droite. Affine la taille.", yt: "https://www.youtube.com/results?search_query=russian+twist+haltere+obliques" },
        { nom: "Vacuum abdominal", sets: "3×30s", muscles: ["Transverse"], conseil: "Expire tout l'air et rentre le nombril au maximum. Tiens 30 sec.", yt: "https://www.youtube.com/results?search_query=vacuum+abdominal+ventre+plat+technique" }
      ]
    },
    fessC: {
      label: "Fessiers C intensif — Séance culminante",
      exercices: [
        { nom: "Hip thrust pyramidal", sets: "5 séries : 8/10/12/12/15", muscles: ["Fessiers","Ischios"], conseil: "Commence avec poids lourd (8 reps) diminue le poids en augmentant les reps. Séance culminante — donne tout.", yt: "https://www.youtube.com/results?search_query=hip+thrust+pyramidal+fessiers" },
        { nom: "Sumo squat haltère", sets: "3×15", muscles: ["Fessiers internes","Adducteurs"], conseil: "Pieds très écartés, orteils à 45°. Haltère entre les jambes. Excellent pour le bas des fessiers.", yt: "https://www.youtube.com/results?search_query=sumo+squat+haltere+fessiers" },
        { nom: "Glute bridge pulsé", sets: "3×30", muscles: ["Fessiers","Ischios"], conseil: "Hanches en haut. Petits mouvements de haut en bas très rapides (5-10 cm). Contraction permanente.", yt: "https://www.youtube.com/results?search_query=glute+bridge+pulse+fessiers" },
        { nom: "Clamshell élastique", sets: "3×20", muscles: ["Abducteurs","Fessiers moyens"], conseil: "Allongée sur le côté, genoux fléchis à 90°, élastique au-dessus des genoux. Ouvre le genou supérieur.", yt: "https://www.youtube.com/results?search_query=clamshell+elastique+abducteurs" },
        { nom: "Kickback élastique finish", sets: "3×20", muscles: ["Fessiers","Haut fessiers"], conseil: "Dernier exercice de la semaine. Donne tout. Contracte le fessier 1 sec en haut à chaque rep.", yt: "https://www.youtube.com/results?search_query=kickback+elastique+fessiers+ronds" }
      ]
    }
  }
};

// JS dayOfWeek (0=Sun … 6=Sat) → semaine index (0=Lundi … 6=Dimanche)
const JS_TO_SEMAINE = [6, 0, 1, 2, 3, 4, 5];

export const andreaProgram = JS_TO_SEMAINE.map((si) => {
  const day = ANDREA.semaine[si];
  if (!day.sport) return "rest";
  const sportSlot = day.planning.find((s) => s.type === "sport");
  return sportSlot?.seance ?? "rest";
});

export const andreaExercises = Object.fromEntries(
  Object.entries(ANDREA.exercices).map(([key, workout]) => [key, {
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

export const andreaMacros = { calories: 1800, protein: 140, carbs: 160, fat: 65 };
