export function getEncouragement(profile, entries) {
  if (entries.length === 0) return "Premier enregistrement à venir — commence le suivi cette semaine.";
  if (entries.length === 1) return "Première mesure enregistrée. Reviens dans une semaine pour voir ta progression.";

  const current = entries[entries.length - 1];
  const previous = entries[entries.length - 2];
  const weightDiff = current.weight && previous.weight ? current.weight - previous.weight : null;
  const waistDiff = current.waist && previous.waist ? current.waist - previous.waist : null;

  if (profile === "adam") {
    if (weightDiff !== null && weightDiff >= 0.5) return "La masse progresse — continue sur cette lancée.";
    if (weightDiff !== null && weightDiff >= 0.1) return "Légère progression du poids — les résultats s'installent.";
    if (weightDiff !== null && weightDiff > -0.3) return "Poids stable — concentre-toi sur la progression des charges.";
    if (weightDiff !== null && weightDiff < -0.3) return "Recul temporaire — vérifie l'apport calorique et reste constant.";
    return "Continue avec régularité — les résultats arrivent sur la durée.";
  }

  if (profile === "andrea") {
    if (weightDiff !== null && weightDiff <= -0.5 && waistDiff !== null && waistDiff < 0) {
      return "Poids et tour de taille en baisse — l'affinage progresse parfaitement.";
    }
    if (weightDiff !== null && weightDiff <= -0.3) return "Le poids descend — tu es sur la bonne trajectoire.";
    if (waistDiff !== null && waistDiff < 0) return "Tour de taille réduit — le travail sur les fessiers est visible.";
    if (weightDiff !== null && weightDiff > 0.5) return "Variation normale — pas de panique. La régularité prime sur les chiffres.";
    if (weightDiff !== null && weightDiff > 0.1) return "Légère hausse — vérifie l'hydratation et la récupération.";
    return "La transformation prend du temps. Chaque semaine d'entraînement compte.";
  }

  return "Continue — la régularité crée les résultats.";
}
