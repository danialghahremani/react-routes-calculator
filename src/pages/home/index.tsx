import Head from "next/head";

import { SearchForm } from "@/components";

import styles from "./home.module.scss";

export default function Home() {
  return (
    <div className={styles.main}>
      <Head>
        <title>Home | Mozio Routes</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <SearchForm />
      </div>
    </div>
  );
}
