import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import queryString from "query-string";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";

import styles from "./search.module.scss";

const SearchPage = () => {
  const router = useRouter();

  const [fetching, setFetching] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<boolean>(false);

  const fetchData = () => {
    const query = queryString.parse(router.asPath.split("?")[1]);

    setTimeout(() => {
      axios
        .get(`/api/search`, {
          params: {
            cityOfOrigin: query.cityOfOrigin,
            date: query.date,
            destination: query.destination,
            passengers: query.passengers,
          },
        })
        .then((res) => {
          console.log("res :>> ", res);
        })
        .catch(() => {
          setFetchError(true);
        })
        .finally(() => {
          setFetching(false);
        });
    }, 3000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (fetching) {
    return (
      <div className={styles.main}>
        <Head>
          <title>Search | Mozio Routes</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={styles.container}>
          <div className={styles.spinContainer}>
            <Spin
              indicator={
                <LoadingOutlined
                  style={{ fontSize: 24, color: "#7786D2" }}
                  spin
                />
              }
            />
          </div>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className={styles.main}>
        <Head>
          <title>Search | Mozio Routes</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={styles.errorMessageContainer}>
          <div className={styles.errorMessage}>Oops! Something went wrong!</div>

          <Button className={styles.backButton}>Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <Head>
        <title>Search | Mozio Routes</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        {router.query.cityOfOrigin}

        <Button className={styles.backButton}>Back</Button>
      </div>
    </div>
  );
};

export default SearchPage;
