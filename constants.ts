import { Service } from './types';

export const AVAILABLE_SERVICES: Service[] = [
  // Inspections & Diagnostics
  {
    id: 'inspection-toiture-simple',
    name: 'Inspection Visuelle Simple',
    description: "Examen visuel de l'état général de la toiture et des gouttières.",
    unitPrice: 150,
  },
  {
    id: 'inspection-toiture-drone',
    name: 'Inspection par Drone',
    description: "Inspection détaillée avec photos et vidéos haute résolution par drone.",
    unitPrice: 350,
  },
  {
    id: 'recherche-fuite',
    name: 'Recherche de Fuite Infiltrante',
    description: "Diagnostic approfondi pour localiser précisément l'origine d'une fuite.",
    unitPrice: 400,
  },

  // Réparations
  {
    id: 'reparation-tuiles-ardoises',
    name: 'Remplacement de Tuiles/Ardoises',
    description: "Remplacement des tuiles ou ardoises cassées ou manquantes (forfait jusqu'à 10 unités).",
    unitPrice: 300,
  },
  {
    id: 'reparation-faîtage',
    name: 'Réparation du Faîtage/Arêtier',
    description: 'Réfection du scellement ou remplacement des éléments du faîtage.',
    unitPrice: 600,
  },
  {
    id: 'reparation-solin',
    name: 'Réfection de Solin (Cheminée, Mur)',
    description: "Remplacement ou réparation du joint d'étanchéité autour des cheminées et murs.",
    unitPrice: 450,
  },
   {
    id: 'reparation-urgence-bâchage',
    name: "Bâchage d'Urgence",
    description: 'Mise en sécurité de la toiture avec une bâche professionnelle après sinistre.',
    unitPrice: 500,
  },

  // Remplacement Complet
  {
    id: 'remplacement-toiture-tuiles',
    name: 'Remplacement Toiture en Tuiles (par m²)',
    description: "Dépose de l'ancienne toiture, pose d'un nouvel écran sous-toiture et de tuiles neuves.",
    unitPrice: 190,
  },
  {
    id: 'remplacement-toiture-ardoise',
    name: 'Remplacement Toiture en Ardoise (par m²)',
    description: "Dépose, fourniture et pose d'ardoises naturelles sur liteaux neufs.",
    unitPrice: 220,
  },
  {
    id: 'remplacement-toiture-zinc',
    name: 'Remplacement Toiture en Zinc (par m²)',
    description: 'Travaux de zinguerie pour une toiture à tasseaux ou à joint debout.',
    unitPrice: 250,
  },

  // Entretien
  {
    id: 'nettoyage-demoussage',
    name: 'Nettoyage et Démoussage Complet',
    description: "Traitement anti-mousse, nettoyage haute pression et application d'un hydrofuge.",
    unitPrice: 950,
  },
   {
    id: 'nettoyage-gouttieres',
    name: 'Nettoyage des Gouttières',
    description: 'Vidage et nettoyage du système de gouttières et descentes.',
    unitPrice: 200,
  },

  // Zinguerie & Evacuation
  {
    id: 'installation-gouttieres',
    name: 'Pose de Gouttières (par mètre linéaire)',
    description: 'Fourniture et pose de gouttières neuves en zinc, PVC ou aluminium.',
    unitPrice: 45,
  },
  {
    id: 'installation-velux',
    name: 'Installation Fenêtre de Toit (Velux)',
    description: "Création d'une ouverture et pose d'une fenêtre de toit standard (fourniture incluse).",
    unitPrice: 1200,
  },

  // Isolation
  {
    id: 'isolation-combles-perdus',
    name: 'Isolation des Combles Perdus (par m²)',
    description: "Isolation par soufflage de laine de roche ou ouate de cellulose.",
    unitPrice: 25,
  },
  {
    id: 'isolation-sarking',
    name: "Isolation par l'Extérieur (Sarking, par m²)",
    description: "Pose d'isolant rigide sur la charpente avant la couverture (hors couverture).",
    unitPrice: 80,
  },
  
  // Main d'Oeuvre
  {
    id: 'main-d-oeuvre',
    name: "Main d'Oeuvre (Taux Horaire)",
    description: "Coût horaire de la main d'oeuvre qualifiée pour les travaux non forfaitisés.",
    unitPrice: 55,
  },
];

export const TAX_RATE = 0.2; // 20%