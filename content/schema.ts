/**
 * Tipos del content layer.
 *
 * Regla dura: en `content/` no entra JSX. El prototipo del copywriter metia
 * `<Hotel className="..." />` dentro de los arrays de datos, lo que obliga a que
 * el fichero sea un Client Component y arrastra toda la pagina al cliente. Aqui
 * los iconos son cadenas (`icon: "hotel"`) que resuelve components/ui/icon.tsx.
 *
 * Todo el copy vive aqui y solo aqui. Esa separacion es lo que hace que una
 * futura version en ingles sea mecanica y que el diff contra el copy aprobado
 * se pueda revisar sin leer una sola linea de presentacion.
 */

export type IconName =
  | "activity"
  | "arrow-right"
  | "award"
  | "book-open"
  | "building"
  | "calendar-range"
  | "check"
  | "check-circle"
  | "clock"
  | "cloud"
  | "compass"
  | "cpu"
  | "database"
  | "dollar-sign"
  | "download"
  | "external-link"
  | "file-text"
  | "globe"
  | "graduation-cap"
  | "headphones"
  | "heart"
  | "help-circle"
  | "history"
  | "hotel"
  | "info"
  | "layers"
  | "mail"
  | "map"
  | "map-pin"
  | "megaphone"
  | "menu"
  | "message-square"
  | "phone"
  | "phone-call"
  | "radio"
  | "refresh-cw"
  | "search"
  | "server-crash"
  | "settings"
  | "shield-check"
  | "shopping-bag"
  | "shopping-cart"
  | "smartphone"
  | "sparkles"
  | "split"
  | "stethoscope"
  | "store"
  | "tv"
  | "user"
  | "users"
  | "utensils"
  | "wifi"
  | "workflow"
  | "x"
  | "zap";

export type Cta = {
  label: string;
  href: string;
  variant?: "navy" | "cyan" | "white" | "outline" | "ghost";
};

export type Metric = {
  value: string;
  label: string;
  description?: string;
  icon?: IconName;
  /** Para el contador animado: valor numerico y sufijo, si aplica. */
  countTo?: number;
  suffix?: string;
  prefix?: string;
};

export type PainPoint = {
  title: string;
  description: string;
  icon?: IconName;
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type ValueItem = {
  number?: string;
  title: string;
  description: string;
  badge?: string;
  icon?: IconName;
};

export type SolutionAudience = "hoteles" | "empresas" | "avanzada";

export type Solution = {
  slug: string;
  title: string;
  /** Claim corto: el que se usa en la rejilla resumida de la home. */
  short: string;
  /** Descripcion larga: solo en la pagina de Soluciones. */
  long?: string;
  target?: string;
  solves?: string[];
  benefits?: string[];
  icon: IconName;
  audiences: SolutionAudience[];
};

export type Profile = {
  id: "hoteles" | "business" | "partners";
  title: string;
  subtitle: string;
  tag: string;
  pain: string;
  solution: string;
  cta: Cta;
  icon: IconName;
};

export type Pack = {
  id: string;
  title: string;
  badge: string;
  target: string;
  description: string;
  includes: string[];
  optional?: string[];
  featured?: boolean;
};

export type Sector = {
  id: string;
  label: string;
  keyMessage: string;
  architecture: string[];
  icon: IconName;
};

export type Commitment = {
  title: string;
  description: string;
  icon?: IconName;
};

export type ComparisonRow = {
  feature: string;
  traditional: string;
  comunica: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type TimelineEntry = {
  year: string;
  title: string;
  description: string;
  icon?: IconName;
};

export type Promise_ = {
  number: string;
  title: string;
  description: string;
};

export type NavLink = {
  label: string;
  href: string;
};
