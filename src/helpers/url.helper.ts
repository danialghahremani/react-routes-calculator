import { Router } from "next/router";
import { identity, pickBy } from "lodash";
import dayjs from "dayjs";
import queryString from "query-string";

import { SearchFormValuesModel } from "@/models/search.model";

export const createUrl = (router: any, query?: any) => ({
  ...router,
  ...(query && {
    search: queryString.stringify({
      ...query,
    }),
  }),
});

export const generateQueryParam = (values?: SearchFormValuesModel) => {
  let newUrl = "";

  if (values) {
    const searchQuery = {
      cityOfOrigin: values.cityOfOrigin ? values.cityOfOrigin : null,
      destination: values?.destinations
        ? values?.destinations?.map((item) => item?.city).join(",")
        : null,
      date: values.date ? dayjs(values.date).format("YYYY/MM/DD") : null,
      passengers: values.passengers ? values.passengers : null,
    };

    newUrl = createUrl(
      Router,
      pickBy(
        {
          ...searchQuery,
        },
        identity
      )
    ).search;
  }

  return newUrl;
};

export default {
  createUrl,
  generateQueryParam,
};
