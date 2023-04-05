import type { NextApiRequest, NextApiResponse } from "next";

import {
  SearchResponseItemModel,
  SearchMockDataModel,
} from "@/models/search.model";
import { haversineCalculator } from "@/helpers";
import { useUuid } from "@/hooks";

import { citiesList } from "./mock-data";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = req?.query;
  const queryDestinations = (query?.destination as string).split(",");
  const cityOfOrigin = query?.cityOfOrigin;
  let destinations: SearchMockDataModel[] = [];

  // This handler finds City from mock data
  const handleFindCity = (city: string): SearchMockDataModel => {
    const findCity = citiesList.find((i) => i[0] === city);
    return findCity ? findCity : [];
  };

  queryDestinations.map((i, index) => {
    const city = handleFindCity(queryDestinations[index]);
    destinations.push(city);
  });

  // This variable includes: City of origin + all Destinations
  // with the model of mock data: SearchMockDataModel
  const allDestinationsList = [
    handleFindCity(cityOfOrigin as string),
    ...destinations,
  ];

  let destinationsList: SearchResponseItemModel[] = [];

  const handleConvertToLanLong = (lat: number, lon: number) => {
    return { Latitude: lat, Longitude: lon };
  };

  const handleCalculateDistances = (
    fromLat: number,
    fromLong: number,
    toLat: number,
    toLong: number
  ) => {
    const distanceOne = handleConvertToLanLong(fromLat, fromLong);
    const distanceTwo = handleConvertToLanLong(toLat, toLong);

    const calculateDistance = haversineCalculator(distanceOne, distanceTwo);
    return calculateDistance;
  };

  let totalDistance: number[] = [];

  allDestinationsList.forEach((curr: any, index: number) => {
    let prev = index > 0 ? allDestinationsList[index - 1] : null;
    let next =
      index + 1 < allDestinationsList.length
        ? allDestinationsList[index + 1]
        : null;

    const city = curr[0] as string;

    const pushNewData = () => {
      const id = useUuid();

      const calculateDistance = () => {
        const result = handleCalculateDistances(
          curr[1],
          curr[2],
          next ? (next[1] as number) : 0,
          next ? (next[2] as number) : 0
        );

        totalDistance.push(result);

        return result;
      };

      destinationsList.push({
        id: id,
        city,
        distanceToNextCity: calculateDistance(),
        isFinalDistance: false,
      });
    };

    if (prev === null || next === null) {
      if (next === null) {
        const id = useUuid();

        destinationsList.push({
          id,
          city,
          distanceToNextCity: 0,
          isFinalDistance: true,
        });
      } else {
        pushNewData();
      }
    } else {
      pushNewData();
    }
  });

  const calculateTotalDistance = totalDistance.reduce((a, b) => a + b);

  const responseData = {
    destinations: destinationsList,
    totalDistances: calculateTotalDistance,
  };

  if (
    !query.passengers ||
    !query.destination ||
    !query.date ||
    !query.cityOfOrigin ||
    !destinationsList.length
  ) {
    return res.status(404).json({ message: "Error!", data: [] });
  }

  return res.status(200).json({
    message: "Success!",
    data: responseData,
  });
}
