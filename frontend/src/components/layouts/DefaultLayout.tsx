import React, { ReactNode } from "react";
import Footer from "@/components/modules/Footer";
import Header from "@/components/modules/Header";
import Head from "next/head";

interface DefaultLayoutProps {
  children: ReactNode;
  title: string;
  content: string;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ title, content, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
      </Head>
      <Header />
      <div className="container mt-5">{children}</div>
      <Footer />
    </>
  );
};

DefaultLayout.defaultProps = {
  title: "Superforecaster",
  content: "",
};

export default DefaultLayout;
