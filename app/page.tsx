import { Header } from "../components/header/Header";
import { Intro } from "../components/hero/intro";
import { Network } from "../components/hero/network";

export default function HomePage() {
  return (
    <main>
      <Header />
      <Intro />
      <Network />
    </main>
  );
}
