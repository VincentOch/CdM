import { useState, useEffect, useRef, useCallback } from "react";

const CARDS_DATA = [
  {
    id: "rpa_001",
    categories: ["cohésion", "chiffres"],
    question: "Quel est l'écart de PIB/habitant entre la région la plus riche et la plus pauvre de France ?",
    answer: "69 288 €/hab en Île-de-France vs 32 652 €/hab en Bourgogne-Franche-Comté (2023). Écart de 1 à 2.",
    source: "RPA 2026"
  },
  {
    id: "rpa_002",
    categories: ["cohésion", "chiffres"],
    question: "Combien de départements ont perdu de la population entre 2015 et 2021 ?",
    answer: "23 départements ont perdu de la population entre 2015 et 2021.",
    source: "RPA 2026"
  },
  {
    id: "rpa_003",
    categories: ["santé", "hôpital"],
    question: "Quel est le déficit des hôpitaux publics en 2023 ?",
    answer: "2,4 milliards d'euros de déficit en 2023. La France compte 2 380 sites hospitaliers et 44 spécialités médicales.",
    source: "RPA 2026"
  },
  {
    id: "rpa_004",
    categories: ["santé", "hôpital"],
    question: "Combien de GHT ont une direction commune sur les 135 existants ?",
    answer: "Seulement 26 GHT sur 135 ont une direction commune. Les Groupements Hospitaliers de Territoire, censés mutualiser les ressources, restent très peu intégrés.",
    source: "RPA 2026"
  },
  {
    id: "rpa_005",
    categories: ["logement", "social"],
    question: "Combien de demandes HLM sont en attente et combien d'attributions sont faites chaque année ?",
    answer: "2,8 millions de demandes en attente pour moins de 400 000 attributions/an — soit 1 attribution pour 7 demandes. Le parc compte 4,8 millions de logements sociaux.",
    source: "RPA 2026"
  },
  {
    id: "rpa_006",
    categories: ["numérique", "services publics"],
    question: "Quel pourcentage de Français rencontrent des difficultés avec les démarches en ligne ?",
    answer: "44 % des Français sont en difficulté. 32 % ont déjà renoncé à une démarche, 8 % ont renoncé définitivement. Pourtant 1,3 milliard de démarches sont faites en ligne chaque année.",
    source: "RPA 2026"
  },
  {
    id: "rpa_007",
    categories: ["mobilité", "transport"],
    question: "Quel pourcentage des ruraux n'ont pas d'alternative à la voiture ?",
    answer: "Plus de 70 % des habitants ruraux n'ont pas d'alternative à la voiture. Le besoin de financement supplémentaire est estimé à 3,7 à 6,7 Md€/an.",
    source: "RPA 2026"
  },
  {
    id: "rpa_008",
    categories: ["mobilité", "transport"],
    question: "Que signifie le +7,7 % de km de transports collectifs entre 2019 et 2023 ?",
    answer: "Hausse du nombre total de kilomètres parcourus par les TER, cars, métros et bus sur le territoire. Cette hausse concerne surtout les zones denses — les zones rurales en bénéficient très peu.",
    source: "RPA 2026"
  },
  {
    id: "rpa_009",
    categories: ["industrie", "réindustrialisation"],
    question: "Quelle est la part de l'industrie dans le PIB français ? Combien de soutiens publics annuels ?",
    answer: "11 % du PIB (contre 17 % en Allemagne) et 12 % de l'emploi salarié. Soutiens publics : 26,8 Md€/an entre 2020 et 2022. Délai moyen pour obtenir les autorisations : 17 mois.",
    source: "RPA 2026"
  },
  {
    id: "rpa_010",
    categories: ["emploi", "chiffres"],
    question: "Quel est l'écart de taux de chômage entre les départements les plus et les moins touchés ?",
    answer: "6 départements ont plus de 11,9 % de chômage vs 25 départements sous 6,4 %. Le taux national est de 7,5 % (T2 2025). Taux d'emploi français : 69 % vs 70,8 % pour la moyenne UE.",
    source: "RPA 2026"
  },
  {
    id: "rpa_011",
    categories: ["sécurité", "budget"],
    question: "Le budget sécurité a augmenté de 33 % depuis 2016. Quel est le paradoxe ?",
    answer: "Malgré +33 % de budget (24,4 Md€) et +10 000 postes, la délinquance a augmenté de +6,5 % depuis 2016 (surtout depuis 2021). La répartition des effectifs ne correspond pas aux besoins réels.",
    source: "RPA 2026"
  },
  {
    id: "rpa_012",
    categories: ["politique ville", "QPV"],
    question: "Combien de QPV existent en France et quel est le paradoxe des crédits spécifiques ?",
    answer: "1 609 QPV (8,7 % de la population). Taux de pauvreté ×3 vs moyenne nationale. Les 524 M€ de crédits spécifiques se substituent souvent au droit commun au lieu de le compléter.",
    source: "RPA 2026"
  },
  {
    id: "rpa_013",
    categories: ["gouvernance", "collectivités"],
    question: "Qu'est-ce qu'un CPER et combien y en a-t-il ?",
    answer: "Contrat de Plan État-Région : document pluriannuel co-signé par l'État et une région fixant les priorités d'investissement (routes, universités, transition écologique…). Il y en a 12 + 849 CRTE signés depuis 2021. Ils représentent 19,5 Md€ de soutiens en 2024.",
    source: "RPA 2026"
  },
  {
    id: "rpa_014",
    categories: ["finances locales", "péréquation"],
    question: "Qu'est-ce que la péréquation et quel est son montant total en France ?",
    answer: "Mécanisme de redistribution entre collectivités riches et pauvres. Total : 14,4 Md€ en 2024. Péréquation verticale (État→collectivités via DGF) : 10,2 Md€. Péréquation horizontale (riches→pauvres) : 4,2 Md€. Écart résiduel après péréquation : 1 à 1,9.",
    source: "RPA 2026"
  },
  {
    id: "rpa_015",
    categories: ["éducation", "collèges"],
    question: "Quelle est la baisse prévue du nombre de collégiens d'ici 2036 ?",
    answer: "-12 % de collégiens en moyenne nationale d'ici 2036. 20 départements perdront plus de 20 % de leurs collégiens. 1 550 collèges sont très peu mixtes socialement. 75 % des collèges favorisés sont privés sous contrat.",
    source: "RPA 2026"
  },
  {
    id: "rpa_016",
    categories: ["numérique", "couverture"],
    question: "Quel est le taux de couverture fibre en France en 2025 ?",
    answer: "92 % des locaux sont raccordables à la fibre en mars 2025 (22 Md€ investis depuis 2010). Mais 215 800 personnes restent en zone blanche mobile. La fin du réseau cuivre est prévue d'ici 2030.",
    source: "RPA 2026"
  },
  {
    id: "rpa_017",
    categories: ["outre-mer", "santé"],
    question: "Quel est le taux de pauvreté en outre-mer et la densité médicale ?",
    answer: "34,6 % de pauvreté (vs 15,4 % en métropole). Densité médicale : 39 à 174 praticiens pour 100 000 hab (vs 146 en métropole). Attente cardio : 42 jours vs 26 en métropole. Diabète jusqu'à 25 % de la population.",
    source: "RPA 2026"
  },
  {
    id: "mp_001",
    categories: ["énergie", "chiffres"],
    question: "Quelle est la facture énergétique de la France en 2024 et quel était le pic ?",
    answer: "57,8 Md€ en 2024 (environ 850 €/hab). Pic en 2022 : 116 Md€ (+158 % vs 2021) à cause de la guerre en Ukraine et de la crise du parc nucléaire. Pétrole = 43,7 Md€ sur les 57,8.",
    source: "Matières premières"
  },
  {
    id: "mp_002",
    categories: ["énergie", "pétrole"],
    question: "Quel est le taux d'importation du pétrole français et d'où vient-il ?",
    answer: "98,3 % du pétrole est importé. Principales origines 2023 : Afrique subsaharienne 21 %, Afrique du Nord 18 %, Amérique du Nord 17 %, Moyen-Orient 17 %. La Russie a été éliminée (9 % en 2021 → 0 % en 2024).",
    source: "Matières premières"
  },
  {
    id: "mp_003",
    categories: ["énergie", "gaz"],
    question: "D'où vient le gaz naturel importé par la France en 2024 ?",
    answer: "481 TWh importés en 2024. Norvège 40 %, États-Unis 21 % (GNL, en forte hausse), Russie 18 % (en recul), Algérie 11 %. Le GNL américain a remplacé une partie du gaz russe mais est plus cher.",
    source: "Matières premières"
  },
  {
    id: "mp_004",
    categories: ["énergie", "nucléaire"],
    question: "Quel est le paradoxe de l'indépendance énergétique française liée au nucléaire ?",
    answer: "Taux d'indépendance = 61 % en 2024 (record depuis 1970). Mais l'uranium est 100 % importé (Kazakhstan 30 %, Namibie 29 %, Niger 26 %). Sans uranium, l'indépendance chuterait à 16 %. Stocks stratégiques : 2 à 3 ans.",
    source: "Matières premières"
  },
  {
    id: "mp_005",
    categories: ["métaux critiques", "lithium"],
    question: "Qui contrôle l'extraction et le raffinage du lithium dans le monde ?",
    answer: "Extraction : Australie 58 %, Chili 20 %, Chine 11 %. Raffinage : Chine >60 %. La demande mondiale pourrait être multipliée par 6 à 13 d'ici 2035. Les batteries VE en auront besoin de ×18 en 2030 et ×60 en 2050.",
    source: "Matières premières"
  },
  {
    id: "mp_006",
    categories: ["métaux critiques", "cobalt"],
    question: "Quelle est la dépendance mondiale au cobalt et son risque ?",
    answer: "RDC : 68–70 % de l'extraction mondiale. Chine : 65 % du raffinage. Un seul pays instable fournit 70 % du cobalt mondial. La RDC a suspendu ses exportations 4 mois en 2025. Les entreprises chinoises contrôlent 40 % des actifs miniers en RDC.",
    source: "Matières premières"
  },
  {
    id: "mp_007",
    categories: ["métaux critiques", "terres rares"],
    question: "Quelle est la dépendance aux terres rares et à quoi servent-elles ?",
    answer: "Chine : 70 % extraction, >90 % raffinage. Usages : aimants permanents (éoliennes, moteurs VE), écrans, lasers militaires, IRM. 1 éolienne offshore = 600 kg de terres rares. La demande de néodyme pourrait ×10 d'ici 2050. En 2010, la Chine avait réduit ses quotas, faisant exploser les prix de 300 à 900 %.",
    source: "Matières premières"
  },
  {
    id: "mp_008",
    categories: ["métaux critiques", "cuivre"],
    question: "Pourquoi le cuivre est-il stratégique pour l'IA et la transition énergétique ?",
    answer: "Un data center IA consomme 30 tonnes de cuivre par mégawatt. La puce Nvidia GB200 contient 3,2 km de câbles cuivre. Demande data centers : 400 000 t en 2025 → 600 000 t en 2028. Déficit anticipé : 6 Mt/an d'ici 2035. Prix record : 12 222 $/t fin 2025 (+42 % sur l'année).",
    source: "Matières premières"
  },
  {
    id: "mp_009",
    categories: ["métaux critiques", "gallium"],
    question: "Quelle est la dépendance au gallium et quel signal d'alarme en 2024 ?",
    answer: "Chine : 98 % de la production mondiale. Utilisé dans les semi-conducteurs GaN (5G, radars, data centers). En décembre 2024, la Chine a interdit l'exportation de gallium, germanium et antimoine vers les États-Unis. L'IA pourrait consommer >10 % de la production mondiale de gallium d'ici 2030.",
    source: "Matières premières"
  },
  {
    id: "mp_010",
    categories: ["politique", "CRMA"],
    question: "Qu'est-ce que le Critical Raw Materials Act (CRMA) et quels sont ses objectifs ?",
    answer: "Loi européenne entrée en vigueur en mai 2024. Objectifs 2030 : extraire 10 % des besoins en UE (vs 0 % aujourd'hui), raffiner 40 %, recycler 25 %. Aucun pays tiers ne doit fournir plus de 65 % d'une matière. Délai d'autorisation : 24 mois max pour une mine, 12 mois pour le recyclage.",
    source: "Matières premières"
  },
  {
    id: "mp_011",
    categories: ["politique", "France 2030"],
    question: "Quel est le rôle de France 2030 dans les matières premières ?",
    answer: "Plan de 54 Md€ sur 5 ans. Les matières premières sont l'un des 6 leviers stratégiques. Financement : Gigafactory Verkor (Dunkerque), STMicroelectronics (semi-conducteurs), recyclage batteries (Orano), mines lithium (Imerys/Allier). Ne crée pas de mines mais finance l'aval et la R&D.",
    source: "Matières premières"
  },
  {
    id: "mp_012",
    categories: ["IA", "semi-conducteurs"],
    question: "Quelle est la dépendance de la France aux semi-conducteurs et qui domine ?",
    answer: "La France ne fabrique pas de puces avancées. TSMC (Taïwan) = 50 % de la production mondiale. Le gallium nécessaire vient de Chine à 98 %. L'European Chips Act (2023) mobilise 43 Md€ pour atteindre 20 % de la production mondiale d'ici 2030 (contre 8 % aujourd'hui).",
    source: "Matières premières"
  },
  {
    id: "mp_013",
    categories: ["IA", "numérique"],
    question: "Quelle est l'empreinte en matières premières du numérique français ?",
    answer: "Le numérique représente 2,5 % de l'empreinte carbone française (2020) et 10 % de la consommation électrique. ~50 métaux différents dans nos équipements numériques, quasi aucun produit en France. Avec l'IA, la demande explose.",
    source: "Matières premières"
  },
  {
    id: "mp_014",
    categories: ["chiffres", "global"],
    question: "Combien de matières premières la France importe-t-elle et quelle est sa consommation totale ?",
    answer: "813 Mt consommées en 2023 (11,9 t/hab, sous la moyenne UE de 13,5 t/hab). Importations : 309 Mt dont pétrole 98 Mt, minerais 98 Mt, biomasse 62 Mt. Productivité matières : 3,1 €/kg (+18 % depuis 2010).",
    source: "Matières premières"
  },
  {
    id: "ue_001",
    categories: ["UE", "budget", "chiffres"],
    question: "Quelle est la contribution de la France au budget de l'UE et son solde net ?",
    answer: "Contribution : ~23 Md€ en 2024 (≈17 % du total). Retours : 25,3 Md€ (dont 8,9 Md€ NextGenEU). Solde net 2024 : +3 Md€ (exceptionnel). Hors NextGenEU : −9,3 Md€ (contributrice nette). La France est le 2e contributeur et 2e bénéficiaire en volume.",
    source: "France & UE"
  },
  {
    id: "ue_002",
    categories: ["UE", "PAC", "agriculture"],
    question: "Quelle est la position de la France dans la PAC européenne ?",
    answer: "1er bénéficiaire de la PAC en volume (17,5 % des aides, ~10 Md€/an). Mais sous pression : verdissement obligatoire (éco-schémas), baisse budgétaire post-2027, tensions avec les pays de l'Est. La PAC représente 54 Md€/an sur le budget UE total.",
    source: "France & UE"
  },
  {
    id: "ue_003",
    categories: ["UE", "NextGenerationEU"],
    question: "Combien la France reçoit-elle de NextGenerationEU et pour quoi ?",
    answer: "40 Md€ alloués 2021-2026, 34,2 Md€ reçus à mai 2025 (85 %). Priorités : transition verte (1er), numérique, cohésion sociale, santé. Exemples : rénovation thermique, décarbonation industrie, numérisation PME, métro de Toulouse.",
    source: "France & UE"
  },
  {
    id: "ue_004",
    categories: ["UE", "spatial", "industrie"],
    question: "Quelle est la place de la France dans le programme spatial européen ?",
    answer: "1er bénéficiaire : 39 % des fonds spatiaux (818 M€). Acteurs : CNES, Airbus D&S, Ariane. Galileo, Copernicus, EGNOS. Kourou (Guyane) = port spatial de l'UE. La France est moteur de l'autonomie stratégique européenne dans le spatial.",
    source: "France & UE"
  },
  {
    id: "ue_005",
    categories: ["UE", "institutions"],
    question: "Quelles sont les 3 grandes institutions financières de l'UE et leurs rôles ?",
    answer: "BCE (Francfort) : politique monétaire zone euro, supervision bancaire. BEI (Luxembourg) : prêts long terme pour les projets d'infrastructure et de transition. Commission DG Budget : exécution du budget et contrôle. La Banque de France est membre du SEBC.",
    source: "France & UE"
  },
  {
    id: "ue_006",
    categories: ["UE", "cohésion", "fonds"],
    question: "Combien la France reçoit-elle des fonds structurels UE (FEDER/FSE+) ?",
    answer: "18 Md€ sur 2021-2027. Gérés par les Régions (autorités de gestion). Ciblés sur les DOM (zones 'moins développées'), zones rurales et bassins en reconversion. La France reçoit moins que la Pologne (75 Md€) car calculé sur le PIB/habitant régional.",
    source: "France & UE"
  },
  {
    id: "ue_007",
    categories: ["UE", "CRMA", "matières premières"],
    question: "Quels sont les 8 projets stratégiques français labellisés par l'UE en mars 2025 ?",
    answer: "Mine de lithium Imerys (Allier), mine de lithium Eramet (Alsace), MAGFACTORY aimants recyclés (Isère), HYDROMETALLURGY recyclage batteries Orano (Nord), SANDGRAPHITE graphite pour batteries (Pas-de-Calais), projet nickel Nouvelle-Calédonie (Eramet). Labels CRMA = accès financements prioritaires.",
    source: "France & UE"
  },
  {
    id: "ue_008",
    categories: ["UE", "recherche", "Horizon"],
    question: "Quelle est la place de la France dans Horizon Europe ?",
    answer: "1,23 Md€ reçus en 2024. Les bénéficiaires sont CNRS, INRIA, INSERM, CEA. Horizon Europe représente 12,9 Md€/an au niveau européen. Le Conseil Européen de l'Innovation (CEI) finance les chercheurs de pointe. 470 M€ réservés spécifiquement pour les matières premières critiques.",
    source: "France & UE"
  }
];

const ALL_CATEGORIES = [...new Set(CARDS_DATA.flatMap(c => c.categories))].sort();

const CATEGORY_COLORS = {
  "cohésion": "#185FA5",
  "chiffres": "#854F0B",
  "santé": "#0F6E56",
  "hôpital": "#0F6E56",
  "logement": "#534AB7",
  "social": "#534AB7",
  "numérique": "#185FA5",
  "services publics": "#185FA5",
  "mobilité": "#3B6D11",
  "transport": "#3B6D11",
  "industrie": "#854F0B",
  "réindustrialisation": "#854F0B",
  "emploi": "#A32D2D",
  "sécurité": "#A32D2D",
  "politique ville": "#534AB7",
  "QPV": "#534AB7",
  "gouvernance": "#5F5E5A",
  "collectivités": "#5F5E5A",
  "finances locales": "#854F0B",
  "péréquation": "#854F0B",
  "éducation": "#185FA5",
  "collèges": "#185FA5",
  "outre-mer": "#D85A30",
  "couverture": "#0F6E56",
  "énergie": "#D85A30",
  "pétrole": "#A32D2D",
  "gaz": "#854F0B",
  "nucléaire": "#534AB7",
  "métaux critiques": "#A32D2D",
  "lithium": "#185FA5",
  "cobalt": "#A32D2D",
  "terres rares": "#854F0B",
  "cuivre": "#D85A30",
  "gallium": "#534AB7",
  "politique": "#0F6E56",
  "CRMA": "#0F6E56",
  "France 2030": "#3B6D11",
  "IA": "#534AB7",
  "semi-conducteurs": "#534AB7",
  "UE": "#185FA5",
  "budget": "#854F0B",
  "agriculture": "#3B6D11",
  "PAC": "#3B6D11",
  "NextGenerationEU": "#0F6E56",
  "spatial": "#534AB7",
  "institutions": "#5F5E5A",
  "cohésion": "#185FA5",
  "fonds": "#185FA5",
  "recherche": "#534AB7",
  "Horizon": "#534AB7",
  "global": "#5F5E5A",
};

function getCategoryColor(cat) {
  return CATEGORY_COLORS[cat] || "#5F5E5A";
}

function initStorage(cards) {
  const stored = {};
  cards.forEach(c => {
    stored[c.id] = { seen: 0, known: 0, unknown: 0, lastSeen: 0, score: 0 };
  });
  return stored;
}

function loadStorage() {
  try {
    const raw = window.localStorage ? localStorage.getItem("flashcards_v1") : null;
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveStorage(data) {
  try {
    if (window.localStorage) localStorage.setItem("flashcards_v1", JSON.stringify(data));
  } catch {}
}

function getScore(stats) {
  if (!stats || stats.seen === 0) return 0;
  return stats.known / stats.seen;
}

function buildDeck(cards, statsMap, filterCats) {
  let pool = cards;
  if (filterCats.length > 0) {
    pool = cards.filter(c => c.categories.some(cat => filterCats.includes(cat)));
  }
  if (pool.length === 0) return [];

  const scored = pool.map(c => {
    const s = statsMap[c.id] || { seen: 0, known: 0, unknown: 0, score: 0, lastSeen: 0 };
    const score = getScore(s);
    const freshness = Date.now() - (s.lastSeen || 0);
    const priority = (1 - score) * 3 + (freshness > 3600000 ? 1 : 0) + (s.seen === 0 ? 2 : 0);
    return { ...c, _priority: priority };
  });

  scored.sort((a, b) => b._priority - a._priority);

  const deck = [];
  const n = Math.min(scored.length, 20);
  for (let i = 0; i < n; i++) deck.push(scored[i]);

  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

export default function App() {
  const [stats, setStats] = useState(() => {
    const stored = loadStorage();
    if (stored) {
      const base = initStorage(CARDS_DATA);
      return { ...base, ...stored };
    }
    return initStorage(CARDS_DATA);
  });

  const [filterCats, setFilterCats] = useState([]);
  const [deck, setDeck] = useState([]);
  const [deckIdx, setDeckIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [screen, setScreen] = useState("home"); // home | study | stats | categories
  const [swipeAnim, setSwipeAnim] = useState(null); // null | "left" | "right"
  const [touchStart, setTouchStart] = useState(null);
  const [touchDelta, setTouchDelta] = useState(0);
  const [deckDone, setDeckDone] = useState(false);

  useEffect(() => { saveStorage(stats); }, [stats]);

  const startStudy = useCallback(() => {
    const d = buildDeck(CARDS_DATA, stats, filterCats);
    setDeck(d);
    setDeckIdx(0);
    setFlipped(false);
    setDeckDone(false);
    setScreen("study");
  }, [stats, filterCats]);

  const currentCard = deck[deckIdx];

  function handleSwipe(direction) {
    if (!currentCard || swipeAnim) return;
    setSwipeAnim(direction);
    setTimeout(() => {
      const newStats = { ...stats };
      const s = { ...(newStats[currentCard.id] || { seen: 0, known: 0, unknown: 0, lastSeen: 0 }) };
      s.seen++;
      s.lastSeen = Date.now();
      if (direction === "right") s.known++;
      else s.unknown++;
      newStats[currentCard.id] = s;
      setStats(newStats);
      setSwipeAnim(null);
      setFlipped(false);
      setTouchDelta(0);
      if (deckIdx + 1 >= deck.length) {
        setDeckDone(true);
      } else {
        setDeckIdx(i => i + 1);
      }
    }, 300);
  }

  function handleTouchStart(e) {
    setTouchStart(e.touches[0].clientX);
  }
  function handleTouchMove(e) {
    if (touchStart === null) return;
    setTouchDelta(e.touches[0].clientX - touchStart);
  }
  function handleTouchEnd() {
    if (Math.abs(touchDelta) > 60) {
      handleSwipe(touchDelta > 0 ? "right" : "left");
    }
    setTouchStart(null);
    setTouchDelta(0);
  }

  const totalSeen = Object.values(stats).filter(s => s.seen > 0).length;
  const totalKnown = Object.values(stats).filter(s => s.seen > 0 && getScore(s) >= 0.7).length;

  const cardStyle = {
    transform: swipeAnim === "right"
      ? "translateX(120%) rotate(15deg)"
      : swipeAnim === "left"
        ? "translateX(-120%) rotate(-15deg)"
        : `translateX(${touchDelta}px) rotate(${touchDelta * 0.05}deg)`,
    transition: swipeAnim ? "transform 0.3s ease" : touchDelta !== 0 ? "none" : "transform 0.15s ease",
    opacity: swipeAnim ? 0 : Math.max(0.6, 1 - Math.abs(touchDelta) / 300),
  };

  const swipeIndicatorLeft = touchDelta < -30 || swipeAnim === "left";
  const swipeIndicatorRight = touchDelta > 30 || swipeAnim === "right";

  if (screen === "home") {
    const filtered = filterCats.length > 0
      ? CARDS_DATA.filter(c => c.categories.some(cat => filterCats.includes(cat)))
      : CARDS_DATA;

    return (
      <div style={{ maxWidth: 420, margin: "0 auto", padding: "1.5rem 1rem 4rem", fontFamily: "var(--font-sans)", minHeight: "100vh" }}>
        <h2 style={{ fontSize: 22, fontWeight: 500, color: "var(--color-text-primary)", margin: "0 0 4px" }}>Révision</h2>
        <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: "0 0 1.5rem" }}>Corps des Mines — Fiches de révision</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: "1.5rem" }}>
          {[
            { label: "Fiches", value: CARDS_DATA.length },
            { label: "Vues", value: totalSeen },
            { label: "Maîtrisées", value: totalKnown },
          ].map(m => (
            <div key={m.label} style={{ background: "var(--color-background-secondary)", borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ fontSize: 22, fontWeight: 500, color: "var(--color-text-primary)" }}>{m.value}</div>
              <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 2 }}>{m.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 12, padding: "1rem", marginBottom: "1rem" }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: 10 }}>Catégories</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
            {ALL_CATEGORIES.map(cat => {
              const active = filterCats.includes(cat);
              const color = getCategoryColor(cat);
              return (
                <button
                  key={cat}
                  onClick={() => setFilterCats(prev =>
                    prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
                  )}
                  style={{
                    fontSize: 12, padding: "4px 10px", borderRadius: 20, border: "none", cursor: "pointer",
                    background: active ? color : "var(--color-background-secondary)",
                    color: active ? "#fff" : "var(--color-text-secondary)",
                    fontFamily: "var(--font-sans)", transition: "all 0.15s",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          {filterCats.length > 0 && (
            <button onClick={() => setFilterCats([])} style={{ fontSize: 12, color: "var(--color-text-secondary)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              Tout effacer
            </button>
          )}
        </div>

        <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: "1rem" }}>
          {filtered.length} fiche{filtered.length > 1 ? "s" : ""} sélectionnée{filtered.length > 1 ? "s" : ""}
        </div>

        <button
          onClick={startStudy}
          style={{
            width: "100%", padding: "14px", borderRadius: 12, border: "none",
            background: "#185FA5", color: "#fff", fontSize: 15, fontWeight: 500,
            cursor: "pointer", fontFamily: "var(--font-sans)", marginBottom: 10,
          }}
        >
          Commencer la session
        </button>

        <button
          onClick={() => setScreen("stats")}
          style={{
            width: "100%", padding: "12px", borderRadius: 12,
            border: "0.5px solid var(--color-border-tertiary)", background: "var(--color-background-primary)",
            color: "var(--color-text-secondary)", fontSize: 14, cursor: "pointer", fontFamily: "var(--font-sans)",
          }}
        >
          Voir mes statistiques
        </button>
      </div>
    );
  }

  if (screen === "stats") {
    const rows = CARDS_DATA.map(c => ({ card: c, s: stats[c.id] || { seen: 0, known: 0, unknown: 0 } }))
      .sort((a, b) => getScore(b.s) - getScore(a.s));

    return (
      <div style={{ maxWidth: 420, margin: "0 auto", padding: "1.5rem 1rem 4rem", fontFamily: "var(--font-sans)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
          <button onClick={() => setScreen("home")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "var(--color-text-secondary)", padding: 0 }}>←</button>
          <h2 style={{ fontSize: 18, fontWeight: 500, color: "var(--color-text-primary)", margin: 0 }}>Statistiques</h2>
        </div>
        {rows.map(({ card, s }) => {
          const score = s.seen > 0 ? Math.round(getScore(s) * 100) : null;
          const barColor = score === null ? "#D3D1C7" : score >= 70 ? "#3B6D11" : score >= 40 ? "#854F0B" : "#A32D2D";
          return (
            <div key={card.id} style={{ borderBottom: "0.5px solid var(--color-border-tertiary)", padding: "10px 0" }}>
              <div style={{ fontSize: 13, color: "var(--color-text-primary)", marginBottom: 4, lineHeight: 1.4 }}>{card.question.substring(0, 70)}…</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ flex: 1, height: 4, background: "var(--color-background-secondary)", borderRadius: 2 }}>
                  {score !== null && <div style={{ height: 4, borderRadius: 2, background: barColor, width: `${score}%`, transition: "width 0.3s" }} />}
                </div>
                <span style={{ fontSize: 12, color: "var(--color-text-secondary)", minWidth: 60, textAlign: "right" }}>
                  {score !== null ? `${score}% (${s.seen}×)` : "non vu"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (screen === "study") {
    if (deckDone || deck.length === 0) {
      return (
        <div style={{ maxWidth: 420, margin: "0 auto", padding: "3rem 1rem", fontFamily: "var(--font-sans)", textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: "1rem" }}>✓</div>
          <h2 style={{ fontSize: 22, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: 8 }}>Session terminée</h2>
          <p style={{ color: "var(--color-text-secondary)", fontSize: 14, marginBottom: "2rem" }}>{deck.length} fiches parcourues</p>
          <button onClick={startStudy} style={{ width: "100%", padding: "14px", borderRadius: 12, border: "none", background: "#185FA5", color: "#fff", fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "var(--font-sans)", marginBottom: 10 }}>
            Nouvelle session
          </button>
          <button onClick={() => setScreen("home")} style={{ width: "100%", padding: "12px", borderRadius: 12, border: "0.5px solid var(--color-border-tertiary)", background: "var(--color-background-primary)", color: "var(--color-text-secondary)", fontSize: 14, cursor: "pointer", fontFamily: "var(--font-sans)" }}>
            Retour à l'accueil
          </button>
        </div>
      );
    }

    return (
      <div style={{ maxWidth: 420, margin: "0 auto", padding: "1rem", fontFamily: "var(--font-sans)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <button onClick={() => setScreen("home")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "var(--color-text-secondary)", padding: 0 }}>←</button>
          <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>{deckIdx + 1} / {deck.length}</span>
          <div style={{ width: 28 }} />
        </div>

        <div style={{ height: 3, background: "var(--color-background-secondary)", borderRadius: 2, marginBottom: "1.5rem" }}>
          <div style={{ height: 3, borderRadius: 2, background: "#185FA5", width: `${((deckIdx + 1) / deck.length) * 100}%`, transition: "width 0.3s" }} />
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div
            style={{ position: "relative", ...cardStyle, userSelect: "none" }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={() => setFlipped(f => !f)}
          >
            {swipeIndicatorRight && (
              <div style={{ position: "absolute", top: 16, left: 16, zIndex: 10, background: "#3B6D11", color: "#fff", padding: "4px 12px", borderRadius: 6, fontSize: 13, fontWeight: 500 }}>
                Je sais ✓
              </div>
            )}
            {swipeIndicatorLeft && (
              <div style={{ position: "absolute", top: 16, right: 16, zIndex: 10, background: "#A32D2D", color: "#fff", padding: "4px 12px", borderRadius: 6, fontSize: 13, fontWeight: 500 }}>
                À revoir ✗
              </div>
            )}

            <div style={{
              background: "var(--color-background-primary)",
              border: "0.5px solid var(--color-border-tertiary)",
              borderRadius: 16,
              padding: "1.5rem",
              minHeight: 280,
              display: "flex",
              flexDirection: "column",
            }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: "1rem" }}>
                {currentCard.categories.map(cat => (
                  <span key={cat} style={{
                    fontSize: 11, padding: "2px 8px", borderRadius: 12,
                    background: "var(--color-background-secondary)",
                    color: "var(--color-text-secondary)",
                    border: `1px solid ${getCategoryColor(cat)}30`,
                  }}>{cat}</span>
                ))}
                <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--color-text-secondary)" }}>
                  {currentCard.source}
                </span>
              </div>

              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                {!flipped ? (
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 500, color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>Question</div>
                    <p style={{ fontSize: 16, color: "var(--color-text-primary)", lineHeight: 1.6, margin: 0 }}>{currentCard.question}</p>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 500, color: "#185FA5", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>Réponse</div>
                    <p style={{ fontSize: 14, color: "var(--color-text-primary)", lineHeight: 1.7, margin: 0 }}>{currentCard.answer}</p>
                  </div>
                )}
              </div>

              {!flipped && (
                <div style={{ textAlign: "center", marginTop: "1rem" }}>
                  <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>Appuie pour voir la réponse</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {flipped && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: "1.5rem", paddingBottom: "1rem" }}>
            <button
              onClick={() => handleSwipe("left")}
              style={{
                padding: "14px", borderRadius: 12, border: "none",
                background: "#FCEBEB", color: "#A32D2D",
                fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "var(--font-sans)",
              }}
            >
              À revoir ✗
            </button>
            <button
              onClick={() => handleSwipe("right")}
              style={{
                padding: "14px", borderRadius: 12, border: "none",
                background: "#EAF3DE", color: "#3B6D11",
                fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "var(--font-sans)",
              }}
            >
              Je sais ✓
            </button>
          </div>
        )}

        {!flipped && (
          <div style={{ display: "flex", justifyContent: "space-around", marginTop: "1.5rem", paddingBottom: "1rem" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, color: "#D3D1C7" }}>←</div>
              <div style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>À revoir</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, color: "#D3D1C7" }}>→</div>
              <div style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>Je sais</div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}
