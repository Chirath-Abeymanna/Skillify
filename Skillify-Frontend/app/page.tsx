"use client";
import Banner from "../components/Banner/index";
import Aboutus from "../components/Services/index";
import Dedicated from "../components/Dedicated/index";
import Digital from "../components/Digital/index";
import Beliefs from "../components/Beliefs/index";
import Wework from "../components/Team/index";
import Ourteam from "../components/Ourteam/index";
import FAQ from "../components/FAQ/index";
import Testimonials from "../components/Testimonials/index";
import Articles from "../components/Articles/index";
import Joinus from "../components/Joinus/index";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <main>
      <SessionProvider>
        <Banner />
        <Aboutus />
        <Dedicated />
        <Digital />
        <Beliefs />
        <Wework />
        <Ourteam />
        <FAQ />
        <Testimonials />
        <Articles />
        <Joinus />
      </SessionProvider>
    </main>
  );
}
