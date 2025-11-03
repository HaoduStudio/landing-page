import { Header, HeaderAlerts } from "../components/header/Header";
import { Intro } from "../components/hero/intro";
import { Network } from "../components/hero/network";
import { Download } from "../components/hero/download";
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
        <Download />
        <ClientOnly>
          <Footer />
        </ClientOnly>
      </main>
    </>
  );
}
