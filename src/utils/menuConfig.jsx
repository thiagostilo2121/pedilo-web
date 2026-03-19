import {
  Settings,
  ShoppingBag,
  Pizza,
  Tags,
  Cherry,
  CirclePercent,
  LayoutDashboard,
  CreditCard,
  BrainCircuit,
  Lock
} from "lucide-react";

export const getMenuSections = (user) => {
  const sections = [
    {
      title: "Principal",
      items: [
        { name: "Inicio", path: "/dashboard/inicio", icon: <LayoutDashboard size={20} />, end: true },
        { name: "Pedidos", path: "/dashboard/pedidos", icon: <ShoppingBag size={20} /> },
        { name: "Configuración", path: "/dashboard/configuracion", icon: <Settings size={20} /> },
      ]
    },
    {
      title: "Catálogo",
      items: [
        { name: "Productos", path: "/dashboard/productos", icon: <Pizza size={20} /> },
        { name: "Categorías", path: "/dashboard/categorias", icon: <Tags size={20} /> },
        { name: "Toppings", path: "/dashboard/toppings", icon: <Cherry size={20} /> },
      ]
    },
    {
      title: "Crecimiento",
      items: [
        { name: "Autopilot", path: "/dashboard/autopilot", icon: <BrainCircuit size={20} />, activeViolet: true, inactiveViolet: true, badge: "NUEVO" },
        { name: "Marketing", path: "/dashboard/marketing", icon: <CirclePercent size={20} /> },
      ]
    },
    {
      title: "Cuenta",
      items: [
        { name: "Mi Suscripción", path: "/dashboard/mi-suscripcion", icon: <CreditCard size={20} /> },
      ]
    }
  ];

  if (user?.es_admin) {
    sections.push({
      title: "Administración",
      items: [
        {
          name: "Admin Panel",
          path: "/dashboard/admin",
          icon: <Lock size={20} className="text-purple-500" />
        }
      ]
    });
  }

  return sections;
};

export const activeClass = "bg-orange-600 text-white shadow-md shadow-orange-200 dark:shadow-orange-900/30";
export const activeVioletClass = "bg-violet-600 text-white shadow-md shadow-violet-200 dark:shadow-violet-900/30";
export const inactiveVioletClass = "text-violet-600 hover:bg-violet-50 hover:text-violet-700 dark:text-violet-400 dark:bg-violet-900/10 dark:hover:bg-violet-900/20 dark:hover:text-violet-300";
export const inactiveClass = "text-gray-500 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-white/5 dark:bg-zinc-800/50 hover:text-gray-900 dark:hover:text-zinc-100 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-zinc-200";
