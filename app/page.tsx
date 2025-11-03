import { Header } from "../components/header/Header";
import { Intro } from "../components/hero/intro";
import { Network } from "../components/hero/network";
import { ClientOnly } from "../components/ui/color-mode";
import { Footer } from "../components/footer/Footer";

export default function HomePage() {
  return (
    <main>
      <Header />
      <Intro />
      <Network />
      <ClientOnly>
        <Footer />
      </ClientOnly>
    </main>
  );
}
