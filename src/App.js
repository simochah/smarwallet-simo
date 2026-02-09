import React, { useState, useEffect, useRef, useMemo } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  signInWithCustomToken,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  setDoc,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import {
  Mic,
  StopCircle,
  Briefcase,
  User,
  Trash2,
  Plus,
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet,
  CalendarDays,
  Scissors,
  AlertTriangle,
  Pencil,
  ChevronLeft,
  ChevronRight,
  Download,
  Target,
  PieChart,
  Sparkles,
  Camera,
  Loader2,
  BrainCircuit,
  X,
  Settings,
  TrendingUp,
  Tag,
  CheckCircle2,
  Info,
  FileSpreadsheet,
  CalendarRange,
  StickyNote,
  Trophy,
  Quote,
  PiggyBank,
  TrendingDown,
  Percent,
  Coins,
  BarChart2,
  ListFilter,
  AlertOctagon,
  Landmark,
  Wallet2,
  Flame,
  HelpCircle,
  Rocket,
  Heart,
  ShieldCheck,
  Frown,
  Calculator,
  Lightbulb,
  Zap,
  Key,
  ShieldAlert,
} from "lucide-react";
import {
  PieChart as RePie,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
} from "recharts";

// --- CONFIGURATION FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyCE05WaPAz8f2AQ1hiX1eIVmTCFxAPmOgU",
  authDomain: "smartwallet-5b1f1.firebaseapp.com",
  projectId: "smartwallet-5b1f1",
  storageBucket: "smartwallet-5b1f1.firebasestorage.app",
  messagingSenderId: "619536783586",
  appId: "1:619536783586:web:e38523a6b6120c616066bb",
  measurementId: "G-4YLYN3DVVS",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = "smartwallet-app";

// --- CONFIGURATION GEMINI API ---
const DEFAULT_API_KEY = "AIzaSyAM6W3PRRMJnHFiC_lmSlmVoL-5YEgD49I"; // Clé de secours

// --- BIBLIOTHÈQUE MASSIVE DE SAGESSE FINANCIÈRE ---
const WEALTH_QUOTES = [
  {
    text: "Dépensez sans compter pour ce que vous aimez, mais coupez impitoyablement sur ce que vous détestez.",
    author: "Ramit Sethi",
  },
  {
    text: "L'épargne n'est pas une punition. C'est le prix de votre liberté future.",
    author: "Ramit Sethi",
  },
  {
    text: "Arrêtez de poser des questions à 3€ et commencez à poser des questions à 30 000€.",
    author: "Ramit Sethi",
  },
  {
    text: "Il y a une limite à ce que vous pouvez économiser, mais aucune limite à ce que vous pouvez gagner.",
    author: "Ramit Sethi",
  },
  {
    text: "L'automatisation est plus puissante que la volonté. Ne comptez pas sur votre discipline, comptez sur votre système.",
    author: "Ramit Sethi",
  },
  {
    text: "Votre banque ne devrait pas être un lieu de stockage, mais un hub de distribution automatique.",
    author: "Ramit Sethi",
  },
  {
    text: "Être riche, ce n'est pas seulement l'argent. C'est pouvoir aller chercher vos enfants à l'école tous les jours.",
    author: "Ramit Sethi",
  },
  {
    text: "Les pauvres et la classe moyenne travaillent pour l'argent. Les riches font travailler l'argent pour eux.",
    author: "Robert Kiyosaki",
  },
  {
    text: "Un actif met de l'argent dans votre poche. Un passif en sort. Connaissez la différence.",
    author: "Robert Kiyosaki",
  },
  {
    text: "La peur de perdre est ce qui garde les gens pauvres. Le courage d'investir est ce qui rend les gens riches.",
    author: "Robert Kiyosaki",
  },
  {
    text: "Votre plus grand actif est votre esprit. Investissez d'abord là-dedans.",
    author: "Robert Kiyosaki",
  },
  {
    text: "Une partie de tout ce que vous gagnez est à vous, pour la garder. Payez-vous en premier.",
    author: "G.S. Clason",
  },
  {
    text: "L'or fuit l'homme qui le force dans des gains impossibles ou suit les conseils des incompétents.",
    author: "G.S. Clason",
  },
  {
    text: "L'opportunité est une déesse hautaine qui ne perd pas de temps avec ceux qui ne sont pas préparés.",
    author: "G.S. Clason",
  },
  {
    text: "Mieux vaut un petit filet de prudence qu'un grand océan de regrets.",
    author: "G.S. Clason",
  },
  {
    text: "La richesse, c'est ce que vous ne voyez pas. C'est l'argent non dépensé, les voitures non achetées.",
    author: "Morgan Housel",
  },
  {
    text: "Gérer son argent, c'est gérer ses émotions plus que ses mathématiques.",
    author: "Morgan Housel",
  },
  {
    text: "Si vous ne trouvez pas un moyen de gagner de l'argent en dormant, vous travaillerez jusqu'à votre mort.",
    author: "Warren Buffett",
  },
  {
    text: "N'épargnez pas ce qu'il reste après avoir dépensé, mais dépensez ce qu'il reste après avoir épargné.",
    author: "Warren Buffett",
  },
  {
    text: "Le risque vient de ne pas savoir ce que l'on fait.",
    author: "Warren Buffett",
  },
  {
    text: "Soyez craintif quand les autres sont avides. Soyez avide quand les autres sont craintifs.",
    author: "Warren Buffett",
  },
  {
    text: "L'argent est un outil de liberté, pas de statut social.",
    author: "Naval Ravikant",
  },
  {
    text: "Ne jouez pas à des jeux de statut. Jouez à des jeux de richesse.",
    author: "Naval Ravikant",
  },
  {
    text: "La patience est la clé. L'intérêt composé est la huitième merveille du monde.",
    author: "Albert Einstein",
  },
  {
    text: "Le meilleur moment pour planter un arbre était il y a 20 ans. Le deuxième meilleur moment est maintenant.",
    author: "Proverbe Chinois",
  },
  {
    text: "L'inflation est l'impôt silencieux qui détruit l'épargne non investie.",
    author: "Anonyme",
  },
  {
    text: "Ne sacrifiez pas ce que vous voulez le plus pour ce que vous voulez maintenant.",
    author: "Abraham Lincoln",
  },
  {
    text: "La discipline est le pont entre les objectifs et l'accomplissement.",
    author: "Jim Rohn",
  },
  {
    text: "Si vous achetez des choses dont vous n'avez pas besoin, bientôt vous devrez vendre des choses dont vous avez besoin.",
    author: "Warren Buffett",
  },
  {
    text: "Investir en soi-même rapporte toujours le meilleur intérêt.",
    author: "Benjamin Franklin",
  },
];

// --- UTILITAIRES ---
const formatCurrency = (amount) => {
  const safeAmount = Number(amount) || 0;
  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
    maximumFractionDigits: 0,
  }).format(safeAmount);
};

const stringToColor = (str) => {
  if (!str) return "#94a3b8";
  let hash = 0;
  const normalized = str.trim().toLowerCase();
  for (let i = 0; i < normalized.length; i++) {
    hash = normalized.charCodeAt(i) + ((hash << 5) - hash);
  }

  const palette = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
    "#84cc16",
    "#f97316",
    "#6366f1",
    "#14b8a6",
    "#d946ef",
    "#eab308",
    "#a855f7",
    "#f43f5e",
    "#0ea5e9",
    "#22c55e",
    "#64748b",
  ];
  return palette[Math.abs(hash) % palette.length];
};

// Système de Retry
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const fetchWithRetry = async (url, options, retries = 5, backoff = 1000) => {
  try {
    const response = await fetch(url, options);
    if (response.status === 429 || response.status === 503) {
      if (retries > 0) {
        await wait(backoff);
        return fetchWithRetry(url, options, retries - 1, backoff * 2);
      }
      throw new Error("RATE_LIMIT_EXCEEDED");
    }
    if (response.status === 403) {
      console.error("Erreur 403: Clé API invalide ou manquante.");
      throw new Error("API_KEY_INVALID");
    }
    return response;
  } catch (error) {
    if (
      error.message === "RATE_LIMIT_EXCEEDED" ||
      error.message === "API_KEY_INVALID"
    )
      throw error;
    if (retries > 0) {
      await wait(backoff);
      return fetchWithRetry(url, options, retries - 1, backoff * 2);
    }
    throw error;
  }
};

const cleanJSON = (text) => {
  if (!text) return null;
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1) {
    const jsonStr = text.substring(firstBrace, lastBrace + 1);
    try {
      return JSON.parse(jsonStr);
    } catch (e) {
      return null;
    }
  }
  return null;
};

// API Calls
const callGeminiJSON = async (prompt, imageBase64 = null, apiKey) => {
  const keyToUse = apiKey && apiKey.length > 10 ? apiKey : DEFAULT_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${keyToUse}`;
  const parts = [{ text: prompt }];
  if (imageBase64) {
    parts.push({ inlineData: { mimeType: "image/jpeg", data: imageBase64 } });
  }
  const payload = {
    contents: [{ parts: parts }],
    generationConfig: { responseMimeType: "application/json" },
  };
  try {
    const response = await fetchWithRetry(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return cleanJSON(data.candidates?.[0]?.content?.parts?.[0]?.text);
  } catch (error) {
    return null;
  }
};

const callGeminiFlash = async (prompt, apiKey) => {
  const keyToUse = apiKey && apiKey.length > 10 ? apiKey : DEFAULT_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${keyToUse}`;
  const payload = { contents: [{ parts: [{ text: prompt }] }] };
  try {
    const response = await fetchWithRetry(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok)
      return `Indisponible (${response.status} - Vérifiez la clé API).`;
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Pas de réponse.";
  } catch (error) {
    if (error.message === "API_KEY_INVALID")
      return "Erreur 403: Clé API invalide. Ajoutez votre clé dans les paramètres.";
    return "Erreur connexion IA.";
  }
};

// --- MOTEUR LOCAL DE SECOURS (AMÉLIORÉ - LOGIQUE DE CONTEXTE V51) ---
const parseLocal = (text, rate) => {
  // 1. Extraction Montant
  const cleanNumberText = text.replace(/(\d)\s+(\d)/g, "$1$2");
  const amountMatch = cleanNumberText.match(/(\d+[.,]?\d*)/);
  const amount = amountMatch ? parseFloat(amountMatch[0].replace(",", ".")) : 0;

  const isEuro = /euro|balle|eur|€/i.test(text);
  const finalAmount = isEuro ? (amount * rate).toFixed(2) : amount;

  // 2. Extraction Date
  let dateObj = new Date();
  const lower = text.toLowerCase();

  const monthsMap = {
    janvier: 0,
    janv: 0,
    février: 1,
    fevrier: 1,
    fev: 1,
    mars: 2,
    mar: 2,
    avril: 3,
    avr: 3,
    mai: 4,
    juin: 5,
    juillet: 6,
    juil: 6,
    août: 7,
    aout: 7,
    septembre: 8,
    sept: 8,
    octobre: 9,
    oct: 9,
    novembre: 10,
    nov: 10,
    décembre: 11,
    decembre: 11,
    dec: 11,
  };

  if (lower.includes("avant-hier")) dateObj.setDate(dateObj.getDate() - 2);
  else if (lower.includes("hier")) dateObj.setDate(dateObj.getDate() - 1);
  else {
    const fullDateMatch = lower.match(
      /\b(\d{1,2})\s+(janvier|février|fevrier|mars|avril|mai|juin|juillet|août|aout|septembre|octobre|novembre|décembre|decembre|janv|fev|avr|juil|sept|oct|nov|dec)\b/
    );

    if (fullDateMatch) {
      const day = parseInt(fullDateMatch[1]);
      const monthStr = fullDateMatch[2];
      if (monthsMap[monthStr] !== undefined && day > 0 && day <= 31) {
        const currentYear = dateObj.getFullYear();
        const month = monthsMap[monthStr];
        let proposedDate = new Date(currentYear, month, day, 12, 0, 0);
        if (proposedDate > new Date()) {
          proposedDate.setFullYear(currentYear - 1);
        }
        dateObj = proposedDate;
      }
    } else {
      const simpleDateMatch = lower.match(/(?:le|au)\s+(\d{1,2})/);
      if (simpleDateMatch) {
        const day = parseInt(simpleDateMatch[1]);
        if (day > 0 && day <= 31) {
          dateObj.setDate(day);
          if (day > new Date().getDate() + 5) {
            dateObj.setMonth(dateObj.getMonth() - 1);
          }
        }
      }
    }
  }
  const date = dateObj.toISOString().split("T")[0];

  // 3. Détection Type (Revenu/Dépense)
  let type = "expense";
  const isIncome =
    /encaiss|reçu|gagné|rentr|vent|recette|paiement client|virement reçu/i.test(
      lower
    );
  if (isIncome) type = "income";

  // --- 4. NOUVELLE LOGIQUE DE CONTEXTE (PRIORITÉ AUX RÈGLES SPÉCIFIQUES) ---
  let label = "";
  let subCategory = "Divers";
  let category = "perso";
  let matchFound = false;

  // RÈGLE 1 : ÉQUIPE & EXPERTISE (Noms Propres PRO)
  const proTeamRegex = /(rooia|charbel|monika|prestataire|assistant)/i;
  const proTeamMatch = lower.match(proTeamRegex);
  if (proTeamMatch) {
    const name =
      proTeamMatch[1].charAt(0).toUpperCase() + proTeamMatch[1].slice(1);
    label = `Salaire ${name}`;
    if (name.toLowerCase() === "charbel") label = "Commission Charbel";
    if (name.toLowerCase() === "prestataire") label = "Prestation Service";
    subCategory = "ÉQUIPE & EXPERTISE";
    category = "pro";
    matchFound = true;
  }

  // RÈGLE 2 : CADEAU / REMBOURSEMENT PERSO (Noms Propres PERSO)
  if (!matchFound) {
    const persoNamesRegex = /(sarah|soukeïna|idriss|ami)/i;
    const persoContextRegex = /(cadeau|anniversaire|rembourse|dette|prêt)/i;
    const nameMatch = lower.match(persoNamesRegex);

    if (nameMatch && persoContextRegex.test(lower)) {
      const name = nameMatch[1].charAt(0).toUpperCase() + nameMatch[1].slice(1);
      if (/cadeau|anniversaire/i.test(lower)) {
        label = `Cadeau ${name}`;
        subCategory = "STYLE DE VIE & ÉPANOUISSEMENT";
      } else {
        label = `Remboursement ${name}`;
        subCategory = "SÉCURITÉ & FUTUR";
      }
      category = "perso";
      matchFound = true;
    }
  }

  // RÈGLE 3 : FLUX PRO (Remboursement Client)
  if (!matchFound && /remboursement/i.test(lower) && /client/i.test(lower)) {
    label = "Remboursement Client";
    subCategory = "FLUX & OPÉRATIONS";
    category = "pro";
    matchFound = true;
  }

  // RÈGLE 4 : ALIMENTATION - DISTINCTION BESOIN / PLAISIR
  if (!matchFound) {
    // 4A. PLAISIR (Prioritaire car plus spécifique)
    const foodPleasureRegex =
      /restaurant|café|déjeuner|dîner|glovo|dessert|pâtisserie|mcdo|pizza|tacos/i;
    const pleasureMatch = lower.match(foodPleasureRegex);
    if (pleasureMatch) {
      // Capitalize first letter properly
      label =
        pleasureMatch[0].charAt(0).toUpperCase() + pleasureMatch[0].slice(1);
      if (/petit/i.test(lower) && /déjeuner/i.test(lower))
        label = "Petit Déjeuner";
      subCategory = "ALIMENTATION (Plaisir & Social - Sorties)";
      category = "perso";
      matchFound = true;
    }
  }

  if (!matchFound) {
    // 4B. BESOINS VITAUX
    const foodNeedRegex =
      /courses|supérette|marjane|carrefour|marché|bim|épicerie|lait|oeuf/i;
    if (foodNeedRegex.test(lower)) {
      label = "Courses Alimentaires";
      subCategory = "ALIMENTATION (Besoins Vitaux - Courses)";
      category = "perso";
      matchFound = true;
    }
  }

  // RÈGLE 5 : SPORT & COACHING
  if (!matchFound && /(coaching|sport|coach)/i.test(lower)) {
    label = "Séance Sport";
    subCategory = "STYLE DE VIE & ÉPANOUISSEMENT";
    category = "perso";
    matchFound = true;
  }

  // RÈGLE 6 : LOGISTIQUE (Règles strictes)
  if (!matchFound) {
    const logistiqueRegex =
      /loyer|ménage|femme de ménage|facture|\beau\b|électricité|taxi|careem|uber|essence/i;
    const logMatch = lower.match(logistiqueRegex);
    if (logMatch) {
      label = logMatch[0].charAt(0).toUpperCase() + logMatch[0].slice(1);
      if (/ménage/i.test(label)) label = "Ménage";
      subCategory = "LOGISTIQUE & HABITAT";
      category = "perso";
      matchFound = true;
    }
  }

  // 5. Nettoyage du Libellé (Amélioré : Extraction plutôt que troncature)
  if (!matchFound) {
    // Si pas de règle trouvée, on nettoie proprement
    let cleanRaw = text
      .replace(
        /je viens de payer|j'ai payé|jai payé|je viens d'acheter|j'ai acheté|achat de|achat|pour|le|la|les|un|une|des|à/gi,
        " "
      )
      .replace(/je viens d'envoyer|j'ai envoyé|envoyé/gi, "Envoi")
      .replace(/(\d+[.,]?\d*)/g, "") // Enlève montants
      .replace(/euro|dirham|dhs|mad|€/gi, "") // Enlève devises
      .replace(/aujourd'hui|hier|avant-hier/gi, "") // Enlève dates
      .replace(/\s+/g, " ") // Réduit espaces
      .trim();

    if (cleanRaw.length > 2) {
      label = cleanRaw.charAt(0).toUpperCase() + cleanRaw.slice(1);
    } else {
      label = type === "income" ? "Encaissement divers" : "Dépense diverse";
    }
  }

  return {
    amount: finalAmount,
    label: label,
    category: category,
    subCategory: subCategory,
    type: type,
    date: date,
  };
};

// --- COMPOSANT ROW ---
const TransactionRow = ({ t, onEdit, onDelete }) => {
  const isIncome = t.type === "income";
  const isPro = t.category === "pro";

  let k = t.subCategory || t.category || "Divers";
  k = k.trim();
  const categoryColor = stringToColor(k);

  const getFeelingIcon = (f) => {
    if (f === "love")
      return <Heart size={12} className="text-pink-500 fill-pink-500" />;
    if (f === "waste") return <Frown size={12} className="text-orange-500" />;
    return <ShieldCheck size={12} className="text-slate-400" />;
  };

  return (
    <div
      className="flex items-center justify-between p-4 bg-white border-l-4 rounded-xl mb-3 shadow-sm hover:shadow-md transition-all"
      style={{
        borderLeftColor: categoryColor,
        borderTop: "1px solid #f1f5f9",
        borderRight: "1px solid #f1f5f9",
        borderBottom: "1px solid #f1f5f9",
      }}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <div
          className={`p-2 rounded-full flex-shrink-0 ${
            isIncome
              ? "bg-emerald-100 text-emerald-600"
              : "bg-red-50 text-red-500"
          }`}
        >
          {isIncome ? (
            <ArrowUpCircle size={20} />
          ) : (
            <ArrowDownCircle size={20} />
          )}
        </div>
        <div className="min-w-0">
          <h4 className="font-semibold text-slate-800 truncate">
            {t.label || "Transaction"}
          </h4>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span
              className={`px-1.5 py-0.5 rounded ${
                isPro
                  ? "bg-blue-100 text-blue-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {isPro ? "PRO" : "PERSO"}
            </span>
            {t.subCategory && t.subCategory !== "Divers" && (
              <span
                className="px-1.5 py-0.5 rounded flex items-center gap-1 truncate max-w-[150px]"
                style={{
                  backgroundColor: `${categoryColor}20`,
                  color: categoryColor,
                  border: `1px solid ${categoryColor}40`,
                }}
              >
                <Tag size={10} /> {t.subCategory}
              </span>
            )}
            {!isIncome && t.feeling && (
              <span className="bg-slate-100 px-1.5 py-0.5 rounded flex items-center gap-1">
                {getFeelingIcon(t.feeling)}
              </span>
            )}
            <span className="whitespace-nowrap">
              •{" "}
              {t.date.toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "short",
              })}
            </span>
          </div>
          {t.note && (
            <p className="text-[10px] text-slate-400 mt-1 italic truncate flex items-center gap-1">
              <StickyNote size={10} /> "{t.note}"
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end gap-1 ml-2">
        <span
          className={`font-bold text-sm whitespace-nowrap ${
            isIncome ? "text-emerald-600" : "text-slate-700"
          }`}
        >
          {isIncome ? "+" : "-"} {formatCurrency(t.amount)}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(t)}
            className="text-slate-300 hover:text-blue-500 p-1"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => onDelete(t.id)}
            className="text-slate-300 hover:text-red-500 p-1"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- APP PRINCIPALE ---
export default function App() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [currentDate, setCurrentDate] = useState(new Date());

  // États Actions
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAiRefining, setIsAiRefining] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");

  // États "Dopamine"
  const [showSuccess, setShowSuccess] = useState(false);
  const [successQuote, setSuccessQuote] = useState(null);
  const [successContext, setSuccessContext] = useState(null);

  // États IA & Settings
  const [aiInsight, setAiInsight] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showInsightModal, setShowInsightModal] = useState(false);
  const [monthlyBudget, setMonthlyBudget] = useState(20000);
  const [monthlyProBudget, setMonthlyProBudget] = useState(15000);
  const [exchangeRate, setExchangeRate] = useState(10.8);
  const [proTaxRate, setProTaxRate] = useState(20);
  const [userApiKey, setUserApiKey] = useState("");
  const [showBudgetEdit, setShowBudgetEdit] = useState(false);
  const [tempBudget, setTempBudget] = useState("");
  const [tempProBudget, setTempProBudget] = useState("");
  const [tempTaxRate, setTempTaxRate] = useState("");
  const [tempApiKey, setTempApiKey] = useState("");

  // États Détails & Export & Info
  const [detailModal, setDetailModal] = useState(null);
  const [infoModal, setInfoModal] = useState(null);
  const [multiSelectModal, setMultiSelectModal] = useState(null);
  const [selectedCats, setSelectedCats] = useState([]);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportType, setExportType] = useState("month");
  const [exportYear, setExportYear] = useState(new Date().getFullYear());
  const [exportMonth, setExportMonth] = useState(new Date().getMonth());
  const [exportQuarter, setExportQuarter] = useState(
    Math.floor(new Date().getMonth() / 3)
  );

  // États Visualisation
  const [pieViewType, setPieViewType] = useState("category");

  // Champs Formulaire
  const [formState, setFormState] = useState({
    amount: "",
    label: "",
    category: "perso",
    subCategory: "",
    type: "expense",
    date: new Date().toISOString().split("T")[0],
    note: "",
    feeling: "need",
  });

  // --- HOOKS ---
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (
          typeof __initial_auth_token !== "undefined" &&
          __initial_auth_token
        ) {
          try {
            await signInWithCustomToken(auth, __initial_auth_token);
          } catch (tokenError) {
            console.warn("Token invalide, fallback anonyme", tokenError);
            await signInAnonymously(auth);
          }
        } else {
          await signInAnonymously(auth);
        }
      } catch (e) {
        console.error("Auth global error:", e);
        try {
          await signInAnonymously(auth);
        } catch (e2) {
          setLoading(false);
          setAuthError("Erreur Auth Critique");
        }
      }
    };
    initAuth();
    return onAuthStateChanged(
      auth,
      (u) => {
        setUser(u);
        setLoading(false);
        if (u) setAuthError(null);
      },
      (error) => {
        console.error("Auth Error", error);
        setAuthError(error.message);
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    if (!user) return;
    const q = collection(
      db,
      "artifacts",
      appId,
      "users",
      user.uid,
      "transactions"
    );
    const unsubTrans = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().transactionDate?.toDate() || new Date(),
        }));
        data.sort((a, b) => b.date - a.date);
        setTransactions(data);
      },
      (error) => {
        console.error("Firestore Snapshot Error:", error);
        if (error.code === "permission-denied") {
          setAuthError(
            "🔒 ACCÈS BLOQUÉ : Vos règles de sécurité Firestore ont expiré."
          );
        }
      }
    );

    const settingsRef = doc(
      db,
      "artifacts",
      appId,
      "users",
      user.uid,
      "settings",
      "general"
    );
    const unsubSettings = onSnapshot(settingsRef, (docSnap) => {
      if (docSnap.exists()) {
        const d = docSnap.data();
        if (d.budget) setMonthlyBudget(d.budget);
        if (d.proBudget) setMonthlyProBudget(d.proBudget);
        if (d.exchangeRate) setExchangeRate(d.exchangeRate);
        if (d.proTaxRate) setProTaxRate(d.proTaxRate);
        if (d.geminiApiKey) setUserApiKey(d.geminiApiKey);
      }
    });
    return () => {
      unsubTrans();
      unsubSettings();
    };
  }, [user]);

  // Calculs Mémorisés
  const currentMonthTransactions = useMemo(() => {
    return transactions.filter(
      (t) =>
        t.date.getMonth() === currentDate.getMonth() &&
        t.date.getFullYear() === currentDate.getFullYear()
    );
  }, [transactions, currentDate]);

  // --- STATS DÉTAILLÉES ---
  const stats = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const currentQuarter = Math.floor(currentMonth / 3);

    let monthNet = 0;
    let quarterNet = 0;
    let yearNet = 0;
    let monthPersoExp = 0;
    let monthProExp = 0;
    let monthProInc = 0;
    let monthPersoInc = 0;
    let monthSavings = 0;

    transactions.forEach((t) => {
      const val = Number(t.amount);
      const signedVal = t.type === "income" ? val : -val;
      const tDate = t.date;

      if (tDate.getFullYear() === currentYear) {
        yearNet += signedVal;
        if (Math.floor(tDate.getMonth() / 3) === currentQuarter)
          quarterNet += signedVal;
        if (tDate.getMonth() === currentMonth) {
          monthNet += signedVal;

          if (t.type === "expense") {
            const subCat = (t.subCategory || "").toLowerCase();
            if (
              subCat.includes("epargne") ||
              subCat.includes("épargne") ||
              subCat.includes("invest") ||
              subCat.includes("économie") ||
              subCat.includes("sécurité")
            ) {
              monthSavings += val;
            }

            if (t.category === "perso") monthPersoExp += val;
            if (t.category === "pro") monthProExp += val;
          } else {
            if (t.category === "perso") monthPersoInc += val;
            if (t.category === "pro") monthProInc += val;
          }
        }
      }
    });

    const viewedInc = currentMonthTransactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + Number(t.amount), 0);
    const viewedExp = currentMonthTransactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + Number(t.amount), 0);

    const remainingBudget = monthlyBudget - monthPersoExp;
    const proBalance = monthProInc - monthProExp;
    const estimatedTaxes = monthProInc * (proTaxRate / 100);
    const superNet = proBalance - estimatedTaxes;
    const proBurnRate = monthProExp / new Date().getDate();
    const savingsRate =
      monthPersoInc > 0 ? (monthSavings / monthPersoInc) * 100 : 0;
    const proMargin = monthProInc > 0 ? (proBalance / monthProInc) * 100 : 0;
    const dailyPersoAvg = monthPersoExp / new Date().getDate();

    const dayOfMonth = new Date().getDate();
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const timeProgress = (dayOfMonth / daysInMonth) * 100;
    const budgetProgress = (monthPersoExp / monthlyBudget) * 100;
    const proBudgetProgress = (monthProExp / monthlyProBudget) * 100;
    const isBudgetDanger = budgetProgress > timeProgress + 10;

    const monthlyGlobalSavings =
      monthProInc + monthPersoInc - (monthProExp + monthPersoExp);
    const projection24 = monthlyGlobalSavings * 24;

    return {
      monthNet,
      quarterNet,
      yearNet,
      monthPersoExp,
      monthPersoInc,
      remainingBudget,
      savingsRate,
      dailyPersoAvg,
      monthSavings,
      monthProExp,
      monthProInc,
      proBalance,
      proMargin,
      estimatedTaxes,
      superNet,
      proBurnRate,
      viewedInc,
      viewedExp,
      budgetProgress,
      proBudgetProgress,
      isBudgetDanger,
      timeProgress,
      projection24,
      monthlyGlobalSavings,
    };
  }, [
    transactions,
    currentMonthTransactions,
    monthlyBudget,
    monthlyProBudget,
    proTaxRate,
  ]);

  const pieData = useMemo(() => {
    const map = {};
    const targetTrans =
      activeTab === "dashboard"
        ? currentMonthTransactions
        : currentMonthTransactions.filter((t) => t.category === activeTab);

    targetTrans
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        let k = "Divers";
        if (pieViewType === "category" || activeTab !== "dashboard") {
          k = t.subCategory || t.category || "Divers";
          k = k.trim();
        } else {
          k = t.category === "pro" ? "Professionnel" : "Personnel";
        }
        map[k] = (map[k] || 0) + Number(t.amount);
      });

    let data = Object.keys(map)
      .map((k) => ({ name: k, value: map[k] }))
      .sort((a, b) => b.value - a.value);
    if (
      (pieViewType === "category" || activeTab !== "dashboard") &&
      data.length > 8
    ) {
      const top = data.slice(0, 7);
      const othersValue = data
        .slice(7)
        .reduce((acc, curr) => acc + curr.value, 0);
      return [...top, { name: "Autres", value: othersValue }];
    }
    return data;
  }, [currentMonthTransactions, activeTab, pieViewType]);

  const barData = useMemo(() => {
    const targetTrans =
      activeTab === "dashboard"
        ? currentMonthTransactions
        : currentMonthTransactions.filter((t) => t.category === activeTab);
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const dailyData = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dayTrans = targetTrans.filter((t) => t.date.getDate() === i);
      const income = dayTrans
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
      const expense = dayTrans
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);
      if (income > 0 || expense > 0)
        dailyData.push({ day: i, income, expense });
    }
    return dailyData;
  }, [currentMonthTransactions, activeTab, currentDate]);

  // --- ACTIONS HANDLERS ---
  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
    setAiInsight(null);
  };

  const handleSaveBudget = async () => {
    if (!user) return;
    await setDoc(
      doc(db, "artifacts", appId, "users", user.uid, "settings", "general"),
      {
        budget: parseFloat(tempBudget) || monthlyBudget,
        proBudget: parseFloat(tempProBudget) || monthlyProBudget,
        proTaxRate: parseFloat(tempTaxRate) || proTaxRate,
        geminiApiKey: tempApiKey || userApiKey,
      },
      { merge: true }
    );
    setShowBudgetEdit(false);
  };

  const handleExport = () => {
    let filteredData = [];
    let filename = `SmartWallet_Export_${exportYear}`;
    if (exportType === "month") {
      filteredData = transactions.filter(
        (t) =>
          t.date.getFullYear() === exportYear &&
          t.date.getMonth() === exportMonth
      );
      filename += `_${exportMonth + 1}`;
    } else {
      filteredData = transactions.filter(
        (t) =>
          t.date.getFullYear() === exportYear &&
          Math.floor(t.date.getMonth() / 3) === exportQuarter
      );
      filename += `_Q${exportQuarter + 1}`;
    }
    if (filteredData.length === 0) return;

    const headers = [
      "Date",
      "Type",
      "Catégorie",
      "Sous-Catégorie",
      "Libellé",
      "Montant (MAD)",
      "Note",
      "Sentiment",
    ];
    const csvRows = [
      headers.join(","),
      ...filteredData.map((t) =>
        [
          t.date.toISOString().split("T")[0],
          t.type,
          t.category,
          t.subCategory || "",
          `"${t.label.replace(/"/g, '""')}"`,
          t.amount,
          `"${(t.note || "").replace(/"/g, '""')}"`,
          t.feeling || "",
        ].join(",")
      ),
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," + encodeURIComponent(csvRows.join("\n"));
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowExportModal(false);
  };

  // --- CORE AI LOGIC (OPTIMISÉE V51) ---
  const processAIInput = async (input, type) => {
    if (type === "voice" && (!input || input.trim() === "")) return;
    setIsProcessing(true);
    setShowForm(true);
    setEditId(null);

    // 1. Appel Local (Fallback)
    const localData = type === "voice" ? parseLocal(input, exchangeRate) : null;

    // Initialisation du form avec local data pour la réactivité immédiate
    if (localData) {
      setFormState({
        amount: localData.amount,
        label: localData.label,
        category: localData.category,
        subCategory: localData.subCategory,
        type: localData.type,
        date: localData.date,
        note: input,
        feeling: "need",
      });
    }

    // 2. Construction du Prompt "Ultra-détaillé & Contextuel"
    const prompt = `
      Tu es un assistant financier expert. Date: ${
        new Date().toISOString().split("T")[0]
      }.
      Taux: 1 EUR = ${exchangeRate} MAD.
      
      STRUCTURE DES CATÉGORIES OBLIGATOIRE :
      
      PRO (Professionnel) :
      - ÉQUIPE & EXPERTISE (Mots-clés: Charbel, Rooia, Monika, Prestataire) -> Label: 'Salaire [Nom]' ou 'Commission [Nom]'
      - CROISSANCE & LEVIER (Pub, Ads)
      - FLUX & OPÉRATIONS (Remboursement client) -> Label: 'Remboursement Client'

      PERSO (Personnel) :
      - ALIMENTATION (Besoins Vitaux - Courses) (Mots-clés: Courses, Supérette, Marjane, Carrefour, Marché, Bim)
      - ALIMENTATION (Plaisir & Social - Sorties) (Mots-clés: Restaurant, Café, Marly, Glovo, Dessert, Petit-déjeuner, Dîner)
      - STYLE DE VIE & ÉPANOUISSEMENT (Cadeau, Sarah, Soukeïna, Coaching, Sport) -> Label: 'Cadeau [Nom]' ou 'Séance Sport'
      - SÉCURITÉ & FUTUR (Dette Idriss, Remboursement ami, Épargne) -> Label: 'Remboursement Dette' ou 'Épargne'
      - LOGISTIQUE & HABITAT (Loyer, Ménage, Facture Eau)

      RÈGLES D'OR DE CLASSIFICATION (CONTEXTE) :
      1. Noms propres: Si "Rooia", "Charbel" -> PRO > ÉQUIPE & EXPERTISE.
      2. Si "Sarah", "Soukeïna" + "Cadeau" -> PERSO > STYLE DE VIE.
      3. Si "Idriss" ou "Remboursement dette" -> PERSO > SÉCURITÉ & FUTUR.
      4. Alimentation : Si "Petit déjeuner", "Café", "Resto" -> ALIMENTATION (Plaisir & Social). Si "Courses", "Marjane" -> ALIMENTATION (Besoins Vitaux).
      5. Coaching/Sport -> PERSO > STYLE DE VIE & ÉPANOUISSEMENT.
      
      NETTOYAGE LIBELLÉ :
      Ne tronque jamais les mots. Simplifie l'action.
      Ex: "J'ai payé le petit déjeuner" -> "Petit Déjeuner".
      Ex: "Dessert le 28" -> "Dessert".
      
      Analyse: "${input}".
      
      Retourne UNIQUEMENT un JSON valide : { 
        "amount": number (en MAD), 
        "label": string (propre), 
        "type": "income"|"expense", 
        "category": "pro"|"perso", 
        "subCategory": string (EXACTEMENT une des sous-catégories listées plus haut), 
        "date": "YYYY-MM-DD" 
      }
    `;

    // 3. Appel IA
    const aiData = await callGeminiJSON(
      prompt,
      type === "image" ? input : null,
      userApiKey
    );

    // 4. Logique de Priorité : L'IA écrase le local, sauf si elle échoue
    if (aiData && aiData.amount) {
      setFormState((prev) => ({
        ...prev,
        amount: parseFloat(aiData.amount), // Force number type
        label: aiData.label,
        category: aiData.category || "perso",
        subCategory: aiData.subCategory || "Divers",
        type: aiData.type || "expense",
        date: aiData.date || prev.date,
        note: input,
      }));
    } else if (localData) {
      // Fallback local déjà en place
    }

    setIsProcessing(false);
  };

  const handleMicClick = () => {
    if (isRecording) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsRecording(false);
      if (transcript) processAIInput(transcript, "voice");
    } else {
      const Recognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!Recognition) return alert("Pas de micro");
      const r = new Recognition();
      r.lang = "fr-FR";
      r.continuous = true;
      r.interimResults = true;
      r.onstart = () => {
        setIsRecording(true);
        setTranscript("");
      };
      r.onresult = (e) =>
        setTranscript(
          Array.from(e.results)
            .map((res) => res[0].transcript)
            .join("")
        );
      r.onerror = () => setIsRecording(false);
      r.onend = () => setIsRecording(false);
      recognitionRef.current = r;
      r.start();
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      await processAIInput(reader.result.split(",")[1], "image");
    };
  };

  const triggerSuccess = (amount = 0, type = "expense") => {
    const randomQuote =
      WEALTH_QUOTES[Math.floor(Math.random() * WEALTH_QUOTES.length)];
    setSuccessQuote(randomQuote);
    setSuccessContext({ amount, type });
    setShowSuccess(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !formState.amount) return;
    setIsSubmitting(true);
    try {
      const dParts = formState.date.split("-");
      const tDate = new Date(dParts[0], dParts[1] - 1, dParts[2], 12, 0, 0);
      const payload = {
        ...formState,
        amount: parseFloat(formState.amount),
        currency: "MAD",
        transactionDate: Timestamp.fromDate(tDate),
        updatedAt: serverTimestamp(),
      };
      if (editId) {
        await updateDoc(
          doc(
            db,
            "artifacts",
            appId,
            "users",
            user.uid,
            "transactions",
            editId
          ),
          payload
        );
      } else {
        await addDoc(
          collection(db, "artifacts", appId, "users", user.uid, "transactions"),
          {
            ...payload,
            createdAt: serverTimestamp(),
          }
        );
        triggerSuccess(parseFloat(formState.amount), formState.type);
      }
      setShowForm(false);
      setFormState({
        ...formState,
        amount: "",
        label: "",
        subCategory: "",
        note: "",
        feeling: "need",
      });
    } catch (err) {
      alert("Erreur");
    }
    setIsSubmitting(false);
  };

  const startEdit = (t) => {
    setEditId(t.id);
    setFormState({
      amount: t.amount,
      label: t.label,
      category: t.category,
      subCategory: t.subCategory || "",
      type: t.type,
      date: t.date.toISOString().split("T")[0],
      note: t.note || "",
      feeling: t.feeling || "need",
    });
    setShowForm(true);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      await deleteDoc(
        doc(db, "artifacts", appId, "users", user.uid, "transactions", deleteId)
      );
      setDeleteId(null);
    }
  };

  const generateAiInsight = async () => {
    if (currentMonthTransactions.length === 0) return;
    setIsAnalyzing(true);
    setShowInsightModal(true);
    const summary = currentMonthTransactions
      .map((t) => `${t.label}: ${Math.round(t.amount)} Dhs`)
      .join(", ");
    const prompt = `Tu es SETI, expert finance. Analyse dépenses (MAD): ${summary}. Réponds en 2 parties: ### 🛡️ Stratégie (Analyse chiffres) ### 🧠 Comportement (Psycho/Conseil). Tutoie-moi.`;
    const result = await callGeminiFlash(prompt, userApiKey);
    setAiInsight(result);
    setIsAnalyzing(false);
  };

  // NOUVEAU : Ouverture du calculateur multi-selection
  const handleOpenMultiSelect = (type) => {
    // type: 'perso', 'pro', ou 'all'
    let targetTrans = [];
    if (type === "all") {
      targetTrans = currentMonthTransactions.filter(
        (t) => t.type === "expense"
      );
    } else {
      targetTrans = currentMonthTransactions.filter(
        (t) => t.type === "expense" && t.category === type
      );
    }

    const map = {};
    targetTrans.forEach((t) => {
      let k = t.subCategory || t.category || "Divers";
      // Pas de transformation de casse pour garder la précision de la taxonomie
      k = k.trim();
      map[k] = (map[k] || 0) + Number(t.amount);
    });

    const categories = Object.keys(map)
      .map((k) => ({
        name: k,
        value: map[k],
        color: stringToColor(k),
        selected: false,
      }))
      .sort((a, b) => b.value - a.value);

    let title = "Calculateur Global";
    if (type === "perso") title = "Calculateur Perso";
    if (type === "pro") title = "Calculateur Pro";

    setMultiSelectModal({
      title: title,
      totalMonth: targetTrans.reduce((s, t) => s + Number(t.amount), 0),
      categories: categories,
    });
  };

  // --- 2. RENDU ---
  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-slate-500">
        <Loader2 className="animate-spin mr-2" /> Chargement...
      </div>
    );

  if (authError) {
    return (
      <div className="flex flex-col h-screen items-center justify-center text-slate-500 p-6 text-center bg-slate-50">
        <div className="bg-red-100 p-4 rounded-full mb-4 animate-pulse">
          <ShieldAlert size={48} className="text-red-500" />
        </div>
        <h3 className="font-black text-2xl text-slate-800 mb-2">
          Accès Refusé
        </h3>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed border-l-4 border-red-500 pl-4 py-2 bg-white rounded shadow-sm">
          {authError}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all"
        >
          Réessayer
        </button>
      </div>
    );
  }

  const budgetProgress = Math.min(
    (stats.monthPersoExp / monthlyBudget) * 100,
    100
  );
  const isExpense = formState.type === "expense";
  const bgColor = isExpense ? "bg-red-50" : "bg-emerald-50";
  const borderColor = isExpense ? "border-red-200" : "border-emerald-200";
  const textColor = isExpense ? "text-red-600" : "text-emerald-600";
  const btnColor = isExpense ? "bg-red-600" : "bg-emerald-600";
  const monthName = currentDate.toLocaleString("fr-FR", { month: "long" });
  const dateRangeLabel = `1er ${currentDate.toLocaleString("fr-FR", {
    month: "long",
  })} - Aujourd'hui`;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-24 relative">
      {/* SUCCESS MODAL */}
      {showSuccess && successQuote && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 w-full max-w-sm rounded-3xl p-8 text-center shadow-2xl animate-in zoom-in duration-300 border-4 border-white/30 transform hover:scale-105 transition-transform relative">
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute top-4 right-4 bg-white/20 p-2 rounded-full hover:bg-white/30 text-white transition-colors"
            >
              <X size={20} />
            </button>

            {successContext && successContext.type === "income" && (
              <div className="bg-red-600 rounded-2xl p-4 mb-6 text-white border-2 border-white/20 shadow-lg animate-in slide-in-from-top-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Zap
                    size={24}
                    className="text-yellow-300 fill-yellow-300 animate-pulse"
                  />
                  <h3 className="font-black text-lg uppercase tracking-wider">
                    ACTION REQUISE
                  </h3>
                </div>
                <p className="font-medium text-sm text-red-100 mb-2">
                  Félicitations pour cet encaissement de{" "}
                  <span className="font-bold text-white">
                    {formatCurrency(successContext.amount)}
                  </span>{" "}
                  !
                </p>
                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                  <p className="text-xs uppercase font-bold text-red-200 mb-1">
                    Automatisation (20%)
                  </p>
                  <p className="text-2xl font-black text-white">
                    {formatCurrency(successContext.amount * 0.2)}
                  </p>
                  <p className="text-xs italic text-white/80 mt-1">
                    "Vire cette somme vers ton épargne MAINTENANT."
                  </p>
                </div>
              </div>
            )}

            <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 backdrop-blur-md shadow-inner">
              <Trophy size={40} className="text-white drop-shadow-md" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2 drop-shadow-sm">
              EXCELLENT !
            </h2>
            <p className="text-white/90 font-medium mb-6 uppercase tracking-wider text-xs">
              Habitude Validée
            </p>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20 relative">
              <Quote
                size={24}
                className="text-white/40 absolute -top-3 -left-2"
              />
              <p className="text-white font-medium italic text-lg leading-relaxed mb-3">
                "{successQuote.text}"
              </p>
              <p className="text-white/80 text-xs font-bold uppercase tracking-widest">
                — {successQuote.author}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="bg-white px-6 py-4 shadow-sm border-b border-slate-100 sticky top-0 z-20 flex justify-between items-center">
        <h1 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
          <Wallet className="text-blue-600" /> SmartWallet{" "}
          <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">
            V51.Context
          </span>
        </h1>
        <div className="flex gap-2">
          <label className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200 cursor-pointer transition-colors shadow-sm">
            <Camera size={20} />
            <input
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
          <button
            onClick={() => setShowExportModal(true)}
            className="bg-slate-100 text-slate-600 p-2 rounded-full hover:bg-slate-200"
          >
            <FileSpreadsheet size={20} />
          </button>
          <button
            onClick={() => {
              setEditId(null);
              setFormState({
                ...formState,
                amount: "",
                label: "",
                note: "",
                feeling: "need",
              });
              setShowForm(true);
            }}
            className="bg-slate-900 text-white p-2 rounded-full shadow-lg hover:bg-slate-800"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* COCKPIT GLOBAL */}
        {activeTab === "dashboard" && (
          <>
            {/* CARTE PROJECTION WEALTH */}
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Rocket size={20} className="text-yellow-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      Projection 24 Mois
                      <button
                        onClick={() =>
                          setInfoModal({
                            type: "projection",
                            title: "🚀 Projection 24 Mois",
                            content: (
                              <div className="space-y-3">
                                <p className="text-sm text-slate-600">
                                  Calcul basé sur votre{" "}
                                  <strong>Rythme d'Épargne Actuel</strong>.
                                </p>
                                <div className="bg-slate-50 p-3 rounded-lg text-sm font-mono text-slate-700">
                                  (Revenus du mois - Dépenses du mois) x 24
                                </div>
                                <div className="border-t pt-2 mt-2">
                                  <p className="text-xs font-bold text-blue-600 uppercase mb-1 flex items-center gap-1">
                                    <Lightbulb size={12} /> Conseil de Ramit
                                    Sethi :
                                  </p>
                                  <p className="text-xs text-slate-500 italic">
                                    "L'automatisation est la clé. Si vous devez
                                    décider d'épargner chaque mois, vous
                                    échouerez. Mettez en place un virement
                                    automatique le 1er du mois."
                                  </p>
                                </div>
                              </div>
                            ),
                          })
                        }
                        className="text-white/50 hover:text-white transition-colors"
                      >
                        <Info size={16} />
                      </button>
                    </h3>
                    <p className="text-blue-200 text-xs">Basé sur ce mois</p>
                  </div>
                </div>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black">
                  {formatCurrency(stats.projection24)}
                </span>
              </div>
              <p className="text-xs text-blue-100 mt-2 opacity-80">
                Si tu maintiens une épargne de{" "}
                {formatCurrency(stats.monthlyGlobalSavings)}/mois.
              </p>
            </div>

            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <p className="text-slate-400 text-sm font-medium flex items-center gap-2">
                  <Target size={16} /> Soldes Nets (MAD)
                </p>
                <button
                  onClick={() => {
                    setTempBudget(monthlyBudget);
                    setTempProBudget(monthlyProBudget);
                    setTempTaxRate(proTaxRate);
                    setTempApiKey(userApiKey);
                    setShowBudgetEdit(true);
                  }}
                  className="bg-white/10 p-1.5 rounded-lg hover:bg-white/20"
                >
                  <Settings size={16} className="text-slate-300" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center mb-6">
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/5">
                  <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">
                    Mois
                  </p>
                  <p
                    className={`font-bold text-sm ${
                      stats.monthNet >= 0 ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {formatCurrency(stats.monthNet)}
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/5">
                  <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">
                    Trimestre
                  </p>
                  <p
                    className={`font-bold text-sm ${
                      stats.quarterNet >= 0
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {formatCurrency(stats.quarterNet)}
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/5">
                  <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">
                    Année
                  </p>
                  <p
                    className={`font-bold text-sm ${
                      stats.yearNet >= 0 ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {formatCurrency(stats.yearNet)}
                  </p>
                </div>
              </div>
              <div className="bg-white/5 rounded-2xl p-3 backdrop-blur-sm border border-white/10">
                <div className="flex items-center justify-between mb-3 text-slate-300">
                  <button onClick={() => changeMonth(-1)}>
                    <ChevronLeft />
                  </button>
                  <span className="font-bold text-white capitalize">
                    {currentDate.toLocaleString("fr-FR", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <button onClick={() => changeMonth(1)}>
                    <ChevronRight />
                  </button>
                </div>
                <div className="flex gap-2 text-center">
                  <div className="flex-1 bg-emerald-500/20 rounded-lg p-2">
                    <span className="text-xs text-emerald-300 block">
                      Entrées
                    </span>
                    <span className="font-bold text-emerald-400">
                      {formatCurrency(stats.viewedInc)}
                    </span>
                  </div>
                  <div className="flex-1 bg-red-500/20 rounded-lg p-2">
                    <span className="text-xs text-red-300 block">Sorties</span>
                    <span className="font-bold text-red-400">
                      {formatCurrency(stats.viewedExp)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={generateAiInsight}
                className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 rounded-xl text-sm font-bold shadow-lg border border-white/20"
              >
                <Sparkles size={16} className="text-yellow-300" /> Analyse SETI
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`p-5 rounded-3xl shadow-sm border transition-colors ${
                  stats.isBudgetDanger
                    ? "bg-red-50 border-red-200"
                    : "bg-white border-slate-100"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3
                    className={`font-bold text-sm ${
                      stats.isBudgetDanger ? "text-red-800" : "text-slate-800"
                    }`}
                  >
                    Budget Perso ({monthName})
                  </h3>
                  <span
                    className={`text-xs font-bold ${
                      stats.isBudgetDanger ? "text-red-600" : "text-slate-500"
                    }`}
                  >
                    {Math.round(stats.budgetProgress)}%
                  </span>
                </div>
                <div className="h-3 bg-white rounded-full overflow-hidden mb-2 border border-slate-100">
                  <div
                    className={`h-full transition-all duration-1000 ${
                      stats.budgetProgress > 100
                        ? "bg-red-600"
                        : stats.isBudgetDanger
                        ? "bg-orange-500"
                        : "bg-emerald-500"
                    }`}
                    style={{ width: `${Math.min(stats.budgetProgress, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span>{formatCurrency(stats.monthPersoExp)}</span>
                  <span>{formatCurrency(monthlyBudget)}</span>
                </div>
                {stats.isBudgetDanger && (
                  <p className="text-xs text-red-600 font-bold mt-2 flex items-center gap-1">
                    <AlertOctagon size={12} /> Attention : Reste que{" "}
                    {formatCurrency(stats.remainingBudget)} !
                  </p>
                )}
              </div>
              <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-slate-800 text-sm">
                    Budget Pro (Opérationnel)
                  </h3>
                  <span className="text-xs font-bold text-slate-500">
                    {Math.round(stats.proBudgetProgress)}%
                  </span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-blue-500 transition-all duration-1000"
                    style={{
                      width: `${Math.min(stats.proBudgetProgress, 100)}%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-blue-700">
                    {formatCurrency(stats.monthProExp)}
                  </span>
                  <span className="text-slate-400">
                    sur {formatCurrency(monthlyProBudget)}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* VOICE RECORDER */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-center relative overflow-hidden">
          <p className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-2">
            Assistant Vocal
          </p>
          <button
            onClick={handleMicClick}
            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-all ${
              isRecording
                ? "bg-red-500 animate-pulse scale-110"
                : "bg-blue-600 shadow-blue-200 shadow-xl"
            }`}
          >
            {isRecording ? (
              <StopCircle className="text-white" />
            ) : (
              <Mic className="text-white" />
            )}
          </button>
          <p
            className={`mt-4 text-sm italic h-6 ${
              isRecording ? "text-blue-600 font-bold" : "text-slate-500"
            }`}
          >
            {isRecording
              ? transcript || "Je vous écoute..."
              : "Dites : '350 Dhs Dîner le 2'"}
          </p>
        </div>

        {/* TABS */}
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-100 sticky top-20 z-10">
          {["dashboard", "perso", "pro"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize transition-all ${
                activeTab === tab
                  ? "bg-slate-100 text-slate-900 shadow-sm"
                  : "text-slate-400"
              }`}
            >
              {tab === "dashboard"
                ? "Vue d'ensemble"
                : tab === "perso"
                ? "Gestion Perso"
                : "Gestion Pro"}
            </button>
          ))}
        </div>

        {/* CONTENU SPECIFIQUE PAR ONGLET */}
        <div className="space-y-4">
          {activeTab === "perso" && (
            <div className="space-y-4">
              <p className="text-xs text-center text-slate-400 font-bold uppercase tracking-widest mb-2">
                📅 Période : {dateRangeLabel}
              </p>
              <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-3xl shadow-sm border border-purple-100">
                <h3 className="text-lg font-bold text-purple-900 mb-4 flex items-center gap-2">
                  <PiggyBank size={20} className="text-purple-600" /> Santé
                  Financière
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-purple-50">
                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">
                      Reste à Vivre
                    </p>
                    <p
                      className={`text-xl font-black ${
                        stats.remainingBudget >= 0
                          ? "text-emerald-600"
                          : "text-red-500"
                      }`}
                    >
                      {formatCurrency(stats.remainingBudget)}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-purple-50">
                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">
                      Épargne Réelle
                    </p>
                    <p className="text-xl font-black text-purple-600">
                      {formatCurrency(stats.monthSavings)}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between bg-white p-3 rounded-xl border border-purple-50">
                  <span className="text-sm text-slate-500 font-medium">
                    Dépense Moyenne / Jour
                  </span>
                  <span className="font-bold text-slate-800">
                    {formatCurrency(stats.dailyPersoAvg)}
                  </span>
                </div>
              </div>
              {/* GRAPHIQUE PERSO CLICKABLE */}
              <div
                className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 min-h-[300px] flex flex-col cursor-pointer hover:border-purple-200 transition-colors"
                onClick={() => handleOpenMultiSelect("perso")}
              >
                <h3 className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                  <Calculator size={14} /> Répartition Perso (Cliquer pour
                  Détail)
                </h3>
                <div className="flex-1 w-full h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePie>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((e, i) => (
                          <Cell key={i} fill={stringToColor(e.name)} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v) => formatCurrency(v)} />
                      <Legend
                        iconType="circle"
                        layout="horizontal"
                        verticalAlign="bottom"
                        wrapperStyle={{ fontSize: "10px" }}
                      />
                    </RePie>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === "pro" && (
            <div className="space-y-4">
              <p className="text-xs text-center text-slate-400 font-bold uppercase tracking-widest mb-2">
                📅 Période : {dateRangeLabel}
              </p>
              <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-3xl shadow-sm border border-blue-100">
                <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <Briefcase size={20} className="text-blue-600" /> Performance
                  Business
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-blue-50">
                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">
                      Chiffre d'Affaires
                    </p>
                    <p className="text-xl font-black text-blue-600">
                      {formatCurrency(stats.monthProInc)}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-blue-50">
                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">
                      Bénéfice Net
                    </p>
                    <p
                      className={`text-xl font-black ${
                        stats.proBalance >= 0
                          ? "text-emerald-600"
                          : "text-red-500"
                      }`}
                    >
                      {formatCurrency(stats.proBalance)}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between bg-white p-3 rounded-xl border border-blue-50">
                  <span className="text-sm text-slate-500 font-medium flex items-center gap-1">
                    <Percent size={14} /> Marge Nette
                  </span>
                  <span
                    className={`font-bold ${
                      stats.proMargin > 20
                        ? "text-emerald-500"
                        : "text-orange-500"
                    }`}
                  >
                    {stats.proMargin.toFixed(1)}%
                  </span>
                </div>
                <div
                  onClick={() =>
                    setInfoModal({
                      type: "superNet",
                      title: "💰 Salaire Disponible",
                      content: (
                        <div className="space-y-3">
                          <p className="text-sm text-slate-600">
                            Calcul prudent pour ne pas mettre ta boîte en danger
                            :
                          </p>
                          <div className="bg-slate-50 p-3 rounded-lg text-sm space-y-1">
                            <div className="flex justify-between">
                              <span>Bénéfice Brut:</span>{" "}
                              <span className="font-bold text-slate-800">
                                {formatCurrency(stats.proBalance)}
                              </span>
                            </div>
                            <div className="flex justify-between text-red-500">
                              <span>- Taxes ({proTaxRate}%):</span>{" "}
                              <span>
                                {formatCurrency(stats.estimatedTaxes)}
                              </span>
                            </div>
                            <div className="border-t pt-1 flex justify-between font-black text-emerald-600">
                              <span>= Super Net:</span>{" "}
                              <span>{formatCurrency(stats.superNet)}</span>
                            </div>
                          </div>
                          <p className="text-xs text-slate-400 italic">
                            C'est ce que tu peux te verser "proprement".
                          </p>
                        </div>
                      ),
                    })
                  }
                  className="bg-slate-900 text-white p-4 rounded-2xl shadow-lg relative overflow-hidden mt-4 cursor-pointer hover:scale-[1.02] transition-transform"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Coins size={64} />
                  </div>
                  <p className="text-xs text-slate-400 uppercase font-bold mb-2 flex items-center gap-1">
                    <Wallet2 size={12} /> Salaire Disponible (Super Net){" "}
                    <HelpCircle size={10} />
                  </p>
                  <div className="flex items-end justify-between">
                    <span className="text-2xl font-black text-emerald-400">
                      {formatCurrency(stats.superNet)}
                    </span>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400">
                        Après {proTaxRate}% taxes
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() =>
                    setInfoModal({
                      type: "burnRate",
                      title: "🔥 Burn Rate Journalier",
                      content: (
                        <div className="space-y-3">
                          <p className="text-sm text-slate-600">
                            Combien te coûte ton entreprise chaque matin au
                            réveil ?
                          </p>
                          <div className="bg-slate-50 p-3 rounded-lg text-sm space-y-1">
                            <div className="flex justify-between">
                              <span>Dépenses Pro du mois:</span>{" "}
                              <span className="font-bold text-slate-800">
                                {formatCurrency(stats.monthProExp)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>/ Jours écoulés:</span>{" "}
                              <span>{new Date().getDate()} jours</span>
                            </div>
                            <div className="border-t pt-1 flex justify-between font-black text-orange-600">
                              <span>= Coût / Jour:</span>{" "}
                              <span>{formatCurrency(stats.proBurnRate)}</span>
                            </div>
                          </div>
                          <p className="text-xs text-slate-400 italic">
                            Plus c'est bas, moins tu as de pression !
                          </p>
                        </div>
                      ),
                    })
                  }
                  className="mt-4 bg-orange-50 p-4 rounded-2xl border border-orange-100 cursor-pointer hover:bg-orange-100 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-orange-400 uppercase font-bold flex items-center gap-1">
                        <Flame size={12} /> Burn Rate
                      </p>
                      <p className="text-xl font-black text-orange-600">
                        {formatCurrency(stats.proBurnRate)}{" "}
                        <span className="text-xs font-medium text-orange-400">
                          /jour
                        </span>
                      </p>
                    </div>
                    <HelpCircle size={16} className="text-orange-300" />
                  </div>
                </div>
              </div>
              {/* Graphique Pro Spécifique CLICKABLE */}
              <div
                className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 min-h-[300px] flex flex-col cursor-pointer hover:border-blue-200 transition-colors"
                onClick={() => handleOpenMultiSelect("pro")}
              >
                <h3 className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                  <Calculator size={14} /> Répartition Charges Pro (Cliquer pour
                  Détail)
                </h3>
                <div className="flex-1 w-full h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePie>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((e, i) => (
                          <Cell key={i} fill={stringToColor(e.name)} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v) => formatCurrency(v)} />
                      <Legend
                        iconType="circle"
                        layout="horizontal"
                        verticalAlign="bottom"
                        wrapperStyle={{ fontSize: "10px" }}
                      />
                    </RePie>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* GRAPHIQUES INTERACTIFS (DASHBOARD UNIQUEMENT) */}
          {activeTab === "dashboard" && pieData.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* PIE CHART AMÉLIORÉ */}
              <div
                className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 min-h-[300px] flex flex-col cursor-pointer hover:border-blue-300 transition-colors"
                onClick={() => handleOpenMultiSelect("all")} // Clic sur le cadre ouvre le calculateur global
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                    <Calculator size={14} /> Répartition Globale
                  </h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setPieViewType((prev) =>
                        prev === "category" ? "pro_perso" : "category"
                      );
                    }}
                    className="text-[10px] bg-slate-100 px-2 py-1 rounded-lg font-bold text-blue-600 hover:bg-blue-100 transition-colors"
                  >
                    {pieViewType === "category"
                      ? "Voir Pro/Perso"
                      : "Voir Catégories"}
                  </button>
                </div>
                <div className="flex-1 w-full h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePie>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((e, i) => (
                          <Cell
                            key={i}
                            fill={stringToColor(e.name)}
                            stroke="#fff"
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v) => formatCurrency(v)} />
                      <Legend
                        iconType="circle"
                        layout="horizontal"
                        verticalAlign="bottom"
                        wrapperStyle={{ fontSize: "10px" }}
                      />
                    </RePie>
                  </ResponsiveContainer>
                </div>
                <p className="text-[10px] text-center text-slate-400 italic mt-2">
                  Cliquez pour ouvrir le calculateur détaillé
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 min-h-[300px]">
                <h3 className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                  <BarChart2 size={14} /> Évolution Journalière
                </h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#f1f5f9"
                      />
                      <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10 }}
                      />
                      <Tooltip
                        cursor={{ fill: "#f8fafc" }}
                        formatter={(value, name) => [
                          formatCurrency(value),
                          name === "income" ? "Entrées" : "Sorties",
                        ]}
                      />
                      <Bar
                        dataKey="income"
                        fill="#10b981"
                        radius={[4, 4, 0, 0]}
                        stackId="a"
                      />
                      <Bar
                        dataKey="expense"
                        fill="#ef4444"
                        radius={[4, 4, 0, 0]}
                        stackId="a"
                        onClick={(data) => {
                          const dayTrans = currentMonthTransactions.filter(
                            (t) => t.date.getDate() === parseInt(data.day)
                          );
                          setDetailModal({
                            type: "day",
                            title: `Le ${data.day} ${monthName}`,
                            total: data.income - data.expense,
                            top3: dayTrans,
                          });
                        }}
                        cursor="pointer"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          <div className="pb-safe">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider pl-1 mb-2 mt-6">
              {activeTab === "dashboard"
                ? "Toutes les opérations"
                : `Opérations ${
                    activeTab === "perso" ? "Personnelles" : "Professionnelles"
                  }`}
            </h3>
            {activeTab === "dashboard"
              ? currentMonthTransactions.map((t) => (
                  <TransactionRow
                    key={t.id}
                    t={t}
                    onEdit={startEdit}
                    onDelete={setDeleteId}
                  />
                ))
              : transactions
                  .filter((t) => t.category === activeTab)
                  .map((t) => (
                    <TransactionRow
                      key={t.id}
                      t={t}
                      onEdit={startEdit}
                      onDelete={setDeleteId}
                    />
                  ))}
          </div>
        </div>
      </div>

      {/* MODAL MULTI-SELECT CALCULATEUR */}
      {multiSelectModal && (
        <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-10 max-h-[85vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <Calculator className="text-blue-500" />{" "}
                {multiSelectModal.title}
              </h3>
              <button
                onClick={() => setMultiSelectModal(null)}
                className="bg-slate-100 p-2 rounded-full text-slate-500 hover:bg-slate-200"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 mb-4">
              {multiSelectModal.categories.map((cat, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    const newCats = [...multiSelectModal.categories];
                    newCats[idx].selected = !newCats[idx].selected;
                    setMultiSelectModal({
                      ...multiSelectModal,
                      categories: newCats,
                    });
                  }}
                  className={`flex justify-between items-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    cat.selected
                      ? "border-blue-500 bg-blue-50"
                      : "border-transparent bg-slate-50 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        cat.selected ? "bg-blue-500" : "bg-slate-300"
                      }`}
                      style={{
                        backgroundColor: cat.selected ? "#3b82f6" : cat.color,
                      }}
                    ></div>
                    <span
                      className={`font-bold ${
                        cat.selected ? "text-blue-900" : "text-slate-600"
                      }`}
                    >
                      {cat.name}
                    </span>
                  </div>
                  <span className="font-medium text-slate-500">
                    {formatCurrency(cat.value)}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-slate-900 text-white p-4 rounded-2xl">
              <div className="flex justify-between items-end mb-1">
                <span className="text-slate-400 text-sm font-medium">
                  Total Sélectionné
                </span>
                <span className="text-2xl font-black text-emerald-400">
                  {formatCurrency(
                    multiSelectModal.categories
                      .filter((c) => c.selected)
                      .reduce((acc, curr) => acc + curr.value, 0)
                  )}
                </span>
              </div>
              <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{
                    width: `${
                      (multiSelectModal.categories
                        .filter((c) => c.selected)
                        .reduce((acc, curr) => acc + curr.value, 0) /
                        multiSelectModal.totalMonth) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
              <p className="text-right text-xs text-emerald-200 mt-1 font-bold">
                {(
                  (multiSelectModal.categories
                    .filter((c) => c.selected)
                    .reduce((acc, curr) => acc + curr.value, 0) /
                    multiSelectModal.totalMonth) *
                  100
                ).toFixed(1)}
                % du total
              </p>
            </div>
          </div>
        </div>
      )}

      {/* INFO MODAL */}
      {infoModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xs rounded-3xl p-6 shadow-2xl animate-in zoom-in duration-300 relative">
            <button
              onClick={() => setInfoModal(null)}
              className="absolute top-4 right-4 bg-slate-100 p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
            >
              <X size={16} />
            </button>
            <h3 className="text-xl font-bold text-slate-800 mb-4">
              {infoModal.title}
            </h3>
            {infoModal.content}
          </div>
        </div>
      )}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <FileSpreadsheet className="text-green-600" /> Exporter Données
              </h3>
              <button onClick={() => setShowExportModal(false)}>
                <X className="text-slate-400" />
              </button>
            </div>
            <div className="flex gap-2 mb-4 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setExportType("month")}
                className={`flex-1 py-2 rounded-lg text-sm font-bold ${
                  exportType === "month"
                    ? "bg-white shadow text-slate-900"
                    : "text-slate-400"
                }`}
              >
                Par Mois
              </button>
              <button
                onClick={() => setExportType("quarter")}
                className={`flex-1 py-2 rounded-lg text-sm font-bold ${
                  exportType === "quarter"
                    ? "bg-white shadow text-slate-900"
                    : "text-slate-400"
                }`}
              >
                Par Trimestre
              </button>
            </div>
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">
                  Année
                </label>
                <select
                  value={exportYear}
                  onChange={(e) => setExportYear(parseInt(e.target.value))}
                  className="w-full bg-slate-50 border-b-2 border-slate-200 py-2 font-bold outline-none"
                >
                  {[2023, 2024, 2025, 2026].map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
              {exportType === "month" ? (
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">
                    Mois
                  </label>
                  <select
                    value={exportMonth}
                    onChange={(e) => setExportMonth(parseInt(e.target.value))}
                    className="w-full bg-slate-50 border-b-2 border-slate-200 py-2 font-bold outline-none"
                  >
                    {[
                      "Janvier",
                      "Février",
                      "Mars",
                      "Avril",
                      "Mai",
                      "Juin",
                      "Juillet",
                      "Août",
                      "Septembre",
                      "Octobre",
                      "Novembre",
                      "Décembre",
                    ].map((m, i) => (
                      <option key={i} value={i}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">
                    Trimestre
                  </label>
                  <select
                    value={exportQuarter}
                    onChange={(e) => setExportQuarter(parseInt(e.target.value))}
                    className="w-full bg-slate-50 border-b-2 border-slate-200 py-2 font-bold outline-none"
                  >
                    <option value={0}>T1 (Jan - Mar)</option>
                    <option value={1}>T2 (Avr - Juin)</option>
                    <option value={2}>T3 (Juil - Sep)</option>
                    <option value={3}>T4 (Oct - Déc)</option>
                  </select>
                </div>
              )}
            </div>
            <button
              onClick={handleExport}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-200"
            >
              Télécharger CSV
            </button>
            <button
              onClick={() => setShowExportModal(false)}
              className="w-full mt-2 py-3 text-slate-400 text-sm font-bold"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
      {detailModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-black text-slate-800">
                  {detailModal.title}
                </h3>
                <p className="text-emerald-600 font-bold text-xl mt-1">
                  {formatCurrency(detailModal.total)}
                </p>
              </div>
              <button
                onClick={() => setDetailModal(null)}
                className="bg-slate-100 p-2 rounded-full text-slate-500 hover:bg-slate-200"
              >
                <X />
              </button>
            </div>
            {detailModal.type === "category" && (
              <div className="flex gap-3 mb-6">
                <div className="flex-1 bg-blue-50 p-3 rounded-2xl text-center border border-blue-100">
                  <span className="text-xs text-blue-400 font-bold uppercase tracking-wider">
                    Pro
                  </span>
                  <p className="text-blue-700 font-black text-lg">
                    {formatCurrency(detailModal.pro)}
                  </p>
                </div>
                <div className="flex-1 bg-purple-50 p-3 rounded-2xl text-center border border-purple-100">
                  <span className="text-xs text-purple-400 font-bold uppercase tracking-wider">
                    Perso
                  </span>
                  <p className="text-purple-700 font-black text-lg">
                    {formatCurrency(detailModal.perso)}
                  </p>
                </div>
              </div>
            )}
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-wider">
              Détail des Opérations
            </h4>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {detailModal.top3 && detailModal.top3.length > 0 ? (
                detailModal.top3.map((t, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-sm p-3 bg-slate-50 rounded-xl border border-slate-100"
                  >
                    <div className="flex flex-col overflow-hidden mr-2">
                      <span className="font-bold text-slate-700 truncate">
                        {t.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            t.type === "income"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {t.type === "income" ? "ENTRÉE" : "SORTIE"}
                        </span>
                        {t.subCategory && (
                          <span
                            className="px-1.5 py-0.5 rounded flex items-center gap-1 truncate max-w-[100px]"
                            style={{
                              backgroundColor: `${stringToColor(
                                t.subCategory
                              )}20`,
                              color: stringToColor(t.subCategory),
                              border: `1px solid ${stringToColor(
                                t.subCategory
                              )}40`,
                            }}
                          >
                            <Tag size={10} /> {t.subCategory}
                          </span>
                        )}
                      </div>
                    </div>
                    <span
                      className={`font-bold whitespace-nowrap ${
                        t.type === "income"
                          ? "text-emerald-600"
                          : "text-slate-900"
                      }`}
                    >
                      {t.type === "income" ? "+" : "-"}{" "}
                      {formatCurrency(t.amount)}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400 italic text-center py-4">
                  Aucune donnée détaillée.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div
            className={`bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl pb-safe border-t-8 ${
              isExpense ? "border-red-500" : "border-emerald-500"
            } max-h-[90vh] overflow-y-auto`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3
                className={`text-lg font-bold flex items-center gap-2 ${textColor}`}
              >
                {editId ? <Pencil size={20} /> : <Target size={20} />}{" "}
                {editId ? "Modifier" : "Nouvelle Opération"}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="bg-slate-100 p-2 rounded-full text-slate-500 hover:bg-slate-200"
              >
                <X size={20} />
              </button>
            </div>
            {isProcessing ? (
              <div className="py-12 text-center">
                <Loader2
                  size={40}
                  className={`animate-spin mx-auto mb-4 ${textColor}`}
                />
                <p className="text-slate-500 font-medium">
                  Analyse intelligente en cours...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  {["expense", "income"].map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setFormState({ ...formState, type })}
                      className={`flex-1 py-3 rounded-lg text-sm font-bold capitalize transition-all ${
                        formState.type === type
                          ? type === "expense"
                            ? "bg-white shadow-sm text-red-600"
                            : "bg-white shadow-sm text-emerald-600"
                          : "text-slate-400"
                      }`}
                    >
                      {type === "expense"
                        ? "Sortie (Dépense)"
                        : "Entrée (Recette)"}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 items-center">
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      step="0.01"
                      value={formState.amount}
                      onChange={(e) =>
                        setFormState({ ...formState, amount: e.target.value })
                      }
                      className={`w-full ${bgColor} border ${borderColor} rounded-xl p-4 text-3xl font-bold outline-none focus:ring-2 focus:ring-opacity-50 ${
                        isExpense
                          ? "focus:ring-red-500 text-red-900"
                          : "focus:ring-emerald-500 text-emerald-900"
                      }`}
                      placeholder="0.00"
                    />
                  </div>
                  <div
                    className={`px-4 py-4 rounded-xl font-bold ${bgColor} ${textColor}`}
                  >
                    MAD
                  </div>
                </div>
                <input
                  type="date"
                  value={formState.date}
                  onChange={(e) =>
                    setFormState({ ...formState, date: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-700 outline-none focus:border-blue-500"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Libellé"
                    value={formState.label}
                    onChange={(e) =>
                      setFormState({ ...formState, label: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Sous-catégorie"
                    value={formState.subCategory}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        subCategory: e.target.value,
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-blue-500"
                  />
                </div>
                <textarea
                  placeholder="Note / Transcription vocale..."
                  value={formState.note}
                  onChange={(e) =>
                    setFormState({ ...formState, note: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-blue-500 h-20 text-sm"
                />
                <div className="flex gap-3">
                  {["perso", "pro"].map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() =>
                        setFormState({ ...formState, category: cat })
                      }
                      className={`flex-1 py-3 rounded-xl border-2 font-bold uppercase text-sm flex items-center justify-center gap-2 transition-all ${
                        formState.category === cat
                          ? cat === "pro"
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-slate-800 bg-slate-800 text-white"
                          : "border-slate-100 text-slate-400"
                      }`}
                    >
                      {cat === "pro" ? (
                        <Briefcase size={16} />
                      ) : (
                        <User size={16} />
                      )}{" "}
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mb-4">
                  {["need", "love", "waste"].map((f) => (
                    <button
                      type="button"
                      key={f}
                      onClick={() => setFormState({ ...formState, feeling: f })}
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all ${
                        formState.feeling === f
                          ? "border-blue-500 bg-blue-50"
                          : "border-transparent hover:bg-slate-50"
                      }`}
                    >
                      {f === "need" && (
                        <ShieldCheck
                          size={24}
                          className={
                            formState.feeling === f
                              ? "text-blue-500"
                              : "text-slate-300"
                          }
                        />
                      )}
                      {f === "love" && (
                        <Heart
                          size={24}
                          className={
                            formState.feeling === f
                              ? "text-pink-500"
                              : "text-slate-300"
                          }
                        />
                      )}
                      {f === "waste" && (
                        <Frown
                          size={24}
                          className={
                            formState.feeling === f
                              ? "text-orange-500"
                              : "text-slate-300"
                          }
                        />
                      )}
                      <span className="text-[10px] font-bold text-slate-500 uppercase">
                        {f === "need"
                          ? "Besoin"
                          : f === "love"
                          ? "Kiff"
                          : "Regret"}
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full text-white py-4 rounded-xl font-bold shadow-xl hover:opacity-90 disabled:opacity-50 transition-all ${btnColor}`}
                >
                  {isSubmitting ? "Enregistrement..." : "Valider"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
      {showBudgetEdit && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-800 mb-6">
              Paramètres
            </h3>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
              Budget Mensuel Perso (MAD)
            </label>
            <input
              type="number"
              value={tempBudget}
              onChange={(e) => setTempBudget(e.target.value)}
              className="w-full border-b-2 border-slate-200 text-xl font-bold py-2 mb-4 outline-none focus:border-blue-500"
              placeholder="20000"
            />
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
              Budget Mensuel Pro (MAD)
            </label>
            <input
              type="number"
              value={tempProBudget}
              onChange={(e) => setTempProBudget(e.target.value)}
              className="w-full border-b-2 border-slate-200 text-xl font-bold py-2 mb-4 outline-none focus:border-blue-500"
              placeholder="15000"
            />
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
              Taux Taxes Pro (%)
            </label>
            <input
              type="number"
              value={tempTaxRate}
              onChange={(e) => setTempTaxRate(e.target.value)}
              className="w-full border-b-2 border-slate-200 text-xl font-bold py-2 mb-4 outline-none focus:border-blue-500"
              placeholder="20"
            />
            <div className="border-t border-slate-100 my-4 pt-4">
              <label className="block text-xs font-bold text-blue-500 uppercase mb-1 flex items-center gap-1">
                <Key size={12} /> Clé API Gemini (Optionnel)
              </label>
              <input
                type="text"
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                className="w-full border-b-2 border-blue-100 text-sm py-2 mb-1 outline-none focus:border-blue-500 text-slate-600"
                placeholder="Collez votre clé API ici pour activer l'IA"
              />
              <p className="text-[10px] text-slate-400">
                Si l'IA ne marche pas, créez une clé gratuite sur{" "}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-500"
                >
                  Google AI Studio
                </a>
                .
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowBudgetEdit(false)}
                className="flex-1 py-3 rounded-xl bg-slate-100 font-bold text-slate-500"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveBudget}
                className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-200"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-xs rounded-2xl p-6 text-center shadow-2xl">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="text-red-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Supprimer ?</h3>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2 bg-slate-100 rounded-lg font-bold text-slate-600"
              >
                Non
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2 bg-red-500 text-white rounded-lg font-bold shadow-lg shadow-red-200"
              >
                Oui
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
