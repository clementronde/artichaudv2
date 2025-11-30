import Services from "@/components/home/Services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos Services | Artichaud",
  description: "Découvrez nos expertises en stratégie de marque, design et web.",
};

export default function ServicesPage() {
  return (
    <main className="w-full bg-white">
      {/* Le composant Services est en h-screen sticky, 
        il prendra toute la place nécessaire.
      */}
      <Services />
    </main>
  );
}