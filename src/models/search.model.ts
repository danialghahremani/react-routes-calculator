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
  date: string;
  destinations: DestinationFieldModel[];
  passengers: number;
}

export interface SearchResultDataModel {
  city: string;
  distanceToNextCity: number;
  isFinalDistance: boolean;
}

export interface ResponseModel<T> {
  message: string;
  data: T | [];
}

export type SearchMockDataModel = (string | number)[];

export type SearchMockDataModel2 = [string, number, number];

export enum SearchStatusEnum {
  NOT_SELECTED = "not-selected",
  NOT_FOUND = "not-found",
  SEARCHING = "searching",
  FOUND = "found",
}
