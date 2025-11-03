import { Header, HeaderAlerts } from "../components/header/Header";
import { Intro } from "../components/hero/intro";
import { Network } from "../components/hero/network";
import { ClientOnly } from "../components/ui/color-mode";
import { Footer } from "../components/footer/Footer";

export default function HomePage() {
  return (
    <>
      <ClientOnly>
        <Header />
      </ClientOnly>
      <ClientOnly>
        <HeaderAlerts />
      </ClientOnly>
      <main>
        <Intro />
        <Network />
        <ClientOnly>
          <Footer />
        </ClientOnly>
      </main>
    </>
  );
}
