import React from 'react';
import { 
  CreditCard, 
  MapPin, 
  Banknote, 
  Smartphone, 
  Landmark, 
  DollarSign, 
  Store, 
  Bike, 
  Package,
  CheckCircle2
} from "lucide-react";

export const getIconConfig = (text, type) => {
    const t = text.toLowerCase();
    if (type === 'pago') {
      if (t.includes('efectivo')) return { icon: <Banknote size={32} strokeWidth={1.5} />, colorClass: "text-emerald-500" };
      if (t.includes('mercado')) return { icon: <Smartphone size={32} strokeWidth={1.5} />, colorClass: "text-[#009EE3]" };
      if (t.includes('tarjeta') || t.includes('débito') || t.includes('crédito')) return { icon: <CreditCard size={32} strokeWidth={1.5} />, colorClass: "text-indigo-500" };
      if (t.includes('transferencia')) return { icon: <Landmark size={32} strokeWidth={1.5} />, colorClass: "text-violet-500" };
      return { icon: <DollarSign size={32} strokeWidth={1.5} />, colorClass: "text-gray-700" };
    }
    if (type === 'entrega') {
      if (t.includes('local') || t.includes('retiro')) return { icon: <Store size={32} strokeWidth={1.5} />, colorClass: "text-blue-600" };
      if (t.includes('delivery') || t.includes('envío') || t.includes('moto')) return { icon: <Bike size={32} strokeWidth={1.5} />, colorClass: "text-red-500" };
      return { icon: <Package size={32} strokeWidth={1.5} />, colorClass: "text-gray-700" };
    }
    return { icon: <CheckCircle2 size={32} strokeWidth={1.5} />, colorClass: "text-gray-700" };
  };
