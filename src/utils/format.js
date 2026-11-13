import { founder } from "../data/site.js";
export const inr = n => "₹" + n.toLocaleString("en-IN");
export const whatsappLink = text =>
  `https://wa.me/${founder.phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
