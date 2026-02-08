import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductSequence from '@/components/ProductSequence';
import GemstoneRarityGraph from '@/components/GemstoneRarityGraph';
import InvestmentTiers from '@/components/InvestmentTiers';
import BrandManifesto from '@/components/BrandManifesto';
import StoreLocator from '@/components/StoreLocator';
import Footer from '@/components/Footer';
import { AuraOrb } from '@/components/VapiAssistant';

export default function Home() {
  return (
    <main className="bg-azure-black min-h-screen selection:bg-azure-gold selection:text-black">
      <Navbar />
      <Hero />
      <ProductSequence />
      <GemstoneRarityGraph />
      <InvestmentTiers />
      <StoreLocator />
      <BrandManifesto />
      <Footer />
      <AuraOrb />
    </main>
  );
}
