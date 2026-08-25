import {
  Activity,
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  CalendarRange,
  Check,
  CheckCircle,
  Clock,
  Cloud,
  Compass,
  Cpu,
  Database,
  DollarSign,
  Download,
  ExternalLink,
  FileText,
  Globe,
  GraduationCap,
  Headphones,
  Heart,
  HelpCircle,
  History,
  Hotel,
  Info,
  Layers,
  Mail,
  Map,
  MapPin,
  Megaphone,
  Menu,
  MessageSquare,
  Phone,
  PhoneCall,
  Radio,
  RefreshCw,
  Search,
  ServerCrash,
  Settings,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Split,
  Stethoscope,
  Store,
  Tv,
  User,
  Users,
  Utensils,
  Wifi,
  Workflow,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";

import type { IconName } from "@/content/schema";

/**
 * Registro de iconos.
 *
 * Existe para que `content/` pueda referirse a un icono con una cadena
 * (`icon: "hotel"`) en lugar de importar JSX. Eso mantiene los ficheros de copy
 * como datos serializables y evita arrastrar las paginas al cliente.
 *
 * Solo se importan los iconos realmente usados, asi que con
 * `optimizePackageImports` el arbol de lucide no entra en el bundle.
 */
const REGISTRY: Record<IconName, LucideIcon> = {
  activity: Activity,
  "arrow-right": ArrowRight,
  award: Award,
  "book-open": BookOpen,
  building: Building2,
  "calendar-range": CalendarRange,
  check: Check,
  "check-circle": CheckCircle,
  clock: Clock,
  cloud: Cloud,
  compass: Compass,
  cpu: Cpu,
  database: Database,
  "dollar-sign": DollarSign,
  download: Download,
  "external-link": ExternalLink,
  "file-text": FileText,
  globe: Globe,
  "graduation-cap": GraduationCap,
  headphones: Headphones,
  heart: Heart,
  "help-circle": HelpCircle,
  history: History,
  hotel: Hotel,
  info: Info,
  layers: Layers,
  mail: Mail,
  map: Map,
  "map-pin": MapPin,
  megaphone: Megaphone,
  menu: Menu,
  "message-square": MessageSquare,
  phone: Phone,
  "phone-call": PhoneCall,
  radio: Radio,
  "refresh-cw": RefreshCw,
  search: Search,
  "server-crash": ServerCrash,
  settings: Settings,
  "shield-check": ShieldCheck,
  "shopping-bag": ShoppingBag,
  "shopping-cart": ShoppingCart,
  smartphone: Smartphone,
  sparkles: Sparkles,
  split: Split,
  stethoscope: Stethoscope,
  store: Store,
  tv: Tv,
  user: User,
  users: Users,
  utensils: Utensils,
  wifi: Wifi,
  workflow: Workflow,
  x: X,
  zap: Zap,
};

export function Icon({
  name,
  size = 20,
  className,
  strokeWidth = 1.6,
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = REGISTRY[name];
  if (!Cmp) return null;
  return (
    <Cmp
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden="true"
      focusable="false"
    />
  );
}
