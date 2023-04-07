import { useEffect, useState } from "react";
import Head from "next/head";

import { SearchForm, Spinner } from "@/components";

import styles from "./home.module.scss";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const renderHead = () => (
    <Head>
      <title>Home | Mozio</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );

  if (loading) {
    return (
      <div className={styles.main}>
        {renderHead()}

        <div className={styles.container}>
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      {renderHead()}

      <div className={styles.container}>
        <SearchForm />
      </div>
    </div>
  );
}
