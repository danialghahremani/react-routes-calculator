import dayjs from "dayjs";

export interface DestinationFieldModel {
  city: string;
}

export interface GetCitiesResponseModel {
  name: string;
  lat: number;
  long: number;
}

export interface SearchFormValuesModel {
  cityOfOrigin: string;
  destinations: DestinationFieldModel[];
  date: dayjs.Dayjs | undefined;
  passengers: string | (string | null)[] | null;
}

export interface SearchResponseItemModel {
  city: string;
  id: string;
  distanceToNextCity: number;
  isFinalDistance: boolean;
}

export interface ResponseModel<T> {
  message: string;
  data: T;
}

export type SearchMockDataModel = (string | number)[];

export enum SearchStatusEnum {
  NOT_SELECTED = "not-selected",
  NOT_FOUND = "not-found",
  SEARCHING = "searching",
  FOUND = "found",
}

export interface SearchResponseDataModel {
  destinations: SearchResponseItemModel[];
  totalDistances: number;
}
