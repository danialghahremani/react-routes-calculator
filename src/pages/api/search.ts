import type { NextApiRequest, NextApiResponse } from "next";

import {
  SearchResultDataModel,
  SearchMockDataModel,
} from "@/models/search.model";

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

  let destinationsList: SearchResultDataModel[] = [];

  const toRad = (v: number) => {
    return (v * Math.PI) / 180;
  };

  const haversine = (l1: any, l2: any) => {
    const R = 6371; // km
    const x1 = l2.Latitude - l1.Latitude;
    const dLat = toRad(x1);
    const x2 = l2.Longitude - l1.Longitude;
    const dLon = toRad(x2);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(l1.Latitude)) *
        Math.cos(toRad(l2.Latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const handleCalculateDistances = (
    fromLat: number,
    fromLong: number,
    toLat: number,
    toLong: number
  ) => {
    function LatLong(lat: number, lon: number) {
      return { Latitude: lat, Longitude: lon };
    }

    const distanceOne = LatLong(fromLat, fromLong);
    const distanceTwo = LatLong(toLat, toLong);

    const calculateDistance = haversine(distanceOne, distanceTwo);
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
        city,
        distanceToNextCity: calculateDistance(),
        isFinalDistance: false,
      });
    };

    if (prev === null || next === null) {
      if (next === null) {
        destinationsList.push({
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

  return res.status(200).json({
    message: "Success!",
    data: responseData,
  });
}
