import type { NextApiRequest, NextApiResponse } from "next";

import { citiesList } from "./mock-data";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const findCities = citiesList.filter(
    (i) =>
      (i[0] as string)
        .toLowerCase()
        .indexOf((req?.query["query"] as string)?.toLowerCase()) > -1
  );

  const result = findCities?.map((city) => ({
    name: city[0],
    lat: city[1],
    long: city[2],
  }));

  if (result.length > 0) {
    res.status(200).json({
      message: "City found!",
      data: result,
    });
  } else {
    res.status(404).json({ message: "Unable to find city!", data: [] });
  }
}
