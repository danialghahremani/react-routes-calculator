import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "antd";
import Head from "next/head";
import axios from "axios";
import queryString from "query-string";
import cn from "clsx";
import dayjs from "dayjs";

import { ResponseModel, SearchResponseDataModel } from "@/models/search.model";
import { Spinner } from "@/components";

import styles from "./search.module.scss";

const SearchPage = () => {
  const router = useRouter();
  const query = queryString.parse(router.asPath.split("?")[1]);

  const [fetching, setFetching] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<boolean>(false);
  const [data, setData] =
    useState<ResponseModel<SearchResponseDataModel> | null>(null);

  const fetchData = () => {
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
          setData(res.data);
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

  const renderHead = () => (
    <Head>
      <title>Search | Mozio</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );

  if (fetching) {
    return (
      <div className={styles.main}>
        {renderHead()}

        <div className={styles.container}>
          <Spinner />
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className={styles.main}>
        {renderHead()}

        <div className={styles.errorMessageContainer}>
          <div className={styles.errorMessage}>Oops! Something went wrong!</div>

          <Button
            type="primary"
            className={styles.backButton}
            onClick={() => router.push("/")}
          >
            Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      {renderHead()}

      <div className={styles.container}>
        <div className={styles.destinationsList}>
          <div className={styles.destinationsListLeft}>
            {data?.data.destinations.map(
              (item) =>
                !item.isFinalDistance && (
                  <div key={item.id} className={styles.destinationDistance}>
                    {item.distanceToNextCity.toFixed(2)} km
                  </div>
                )
            )}
          </div>

          <div className={styles.destinationsListRight}>
            {data?.data.destinations.map((item) => (
              <div
                key={item.id}
                className={cn(styles.destinationItem, {
                  [styles.destinationLastItem]: item.isFinalDistance,
                })}
              >
                {item.city}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.detailsItem}>
            <span>{data?.data?.totalDistances.toFixed(2)} km</span>
            is total distance
          </div>
          <div className={styles.detailsItem}>
            <span>{query.passengers}</span>
            passengers
          </div>
          <div className={styles.detailsItem}>
            <span>{dayjs(query.date as string).format("MMM DD, YYYY")}</span>
          </div>
        </div>

        <Button
          type="primary"
          className={styles.backButton}
          onClick={() => router.push("/")}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default SearchPage;
