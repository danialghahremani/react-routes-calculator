import { useState } from "react";
import { debounce } from "lodash";
import axios from "axios";
import { Form, AutoComplete as AntdAutoComplete } from "antd";
import { Rule } from "antd/es/form";
import Image from "next/image";

import {
  ResponseModel,
  GetCitiesResponseModel,
  SearchStatusEnum,
} from "@/models/search.model";

import AutoCompleteSkeleton from "./auto-complete-skeleton";

type Props = {
  [name: string]: any;
  label: string;
  rules?: Rule[];
  hasError?: boolean;
};

const AutoComplete = ({ name, label, rules, hasError }: Props) => {
  // Local States
  const [searchStatus, setSearchStatus] = useState<string>(
    SearchStatusEnum.NOT_SELECTED
  );
  const [citiesList, setCitiesList] = useState<ResponseModel<
    GetCitiesResponseModel[]
  > | null>(null);

  const renderContent = () => {
    switch (searchStatus) {
      case SearchStatusEnum.NOT_SELECTED:
        return <div>Type something!</div>;

      case SearchStatusEnum.SEARCHING:
        return <AutoCompleteSkeleton />;

      case SearchStatusEnum.NOT_FOUND:
        return (
          <div className="not-found-message">
            Oops! Failed to search with this keyword
          </div>
        );

      default:
        return <div>Please search a city</div>;
    }
  };

  const handleClearOptions = () => {
    // setCitiesList(null);
    setSearchStatus(SearchStatusEnum.NOT_SELECTED);
  };

  const handleSearchCity = async (val: string) => {
    if (val.length) {
      setSearchStatus(SearchStatusEnum.SEARCHING);
      searchWithDebounce(val);
    } else {
      handleClearOptions();
    }
  };

  const handleSearchCityRequest = async (val: string) => {
    await axios
      .get(`/api/get-cities`, {
        params: {
          query: val,
        },
      })
      .then((res) => {
        setCitiesList(res.data);
        setSearchStatus(SearchStatusEnum.FOUND);
      })
      .catch(() => {
        setCitiesList(null);
        setSearchStatus(SearchStatusEnum.NOT_FOUND);
      });
  };

  const searchWithDebounce = debounce(handleSearchCityRequest, 3000);

  const fieldHasError = searchStatus === SearchStatusEnum.NOT_FOUND;

  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      status={fieldHasError || hasError ? "error" : ""}
      validateStatus={fieldHasError || hasError ? "error" : ""}
      help={fieldHasError ? "Oops! Failed to search with this keyword" : null}
    >
      <AntdAutoComplete
        allowClear
        test-id="auto-complete-input"
        options={
          citiesList
            ? citiesList?.data?.map((i: any) => ({
                value: i?.name,
              }))
            : []
        }
        clearIcon={
          <Image src="/assets/icons/x.svg" width={24} height={24} alt="" />
        }
        notFoundContent={renderContent()}
        onSelect={handleClearOptions}
        onSearch={(value: string) => {
          handleSearchCity(value);
        }}
      />
    </Form.Item>
  );
};

export default AutoComplete;
