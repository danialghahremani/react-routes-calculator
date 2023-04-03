import { useEffect, useState } from "react";
import { Button, Form, DatePicker, InputNumber } from "antd";
import { useRouter } from "next/router";
import { debounce } from "lodash";
import axios from "axios";
import queryString from "query-string";

import { AutoComplete } from "@/components";
import { generateQueryParam } from "@/helpers";
import {
  GetCitiesResponseModel,
  ResponseModel,
  SearchFormValuesModel,
  SearchStatusEnum,
} from "@/models/search.model";
import dayjs from "dayjs";

const SearchForm = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const [citiesList, setCitiesList] = useState<ResponseModel<
    GetCitiesResponseModel[]
  > | null>(null);
  const [searchStatus, setSearchStatus] = useState<string>(
    SearchStatusEnum.NOT_SELECTED
  );

  useEffect(() => {
    const query = queryString.parse(router.asPath.split("?")[1]);
    const queryDestination = query.destination as string;
    let destinations = [];

    if (query.destination?.includes(",")) {
      destinations.push(...queryDestination.split(","));
    } else {
      if (queryDestination) {
        destinations.push(queryDestination);
      } else {
        destinations = [];
      }
    }

    form.setFieldsValue({
      cityOfOrigin: query.cityOfOrigin,
      destinations: destinations.length
        ? destinations.map((i) => ({
            city: i,
          }))
        : null,
      date: dayjs(String(query.date), "YYYY/MM/DD"),
      passengers: query.passengers,
    });
  }, []);

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

  const handleClearOptions = () => {
    setCitiesList(null);
    setSearchStatus(SearchStatusEnum.NOT_SELECTED);
  };

  const handeSubmitForm = (formValues: SearchFormValuesModel) => {
    const newUrl = generateQueryParam(formValues);
    router.push(`/search?${newUrl}`);
  };

  const onValuesChange = (_: unknown, allValues: SearchFormValuesModel) => {
    const newUrl = generateQueryParam(allValues);
    router.push(`?${newUrl}`, undefined, { shallow: true });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="searchForm"
      onValuesChange={onValuesChange}
      onFinish={handeSubmitForm}
    >
      <AutoComplete
        label="City of origin"
        name="cityOfOrigin"
        rules={[
          { required: true, message: "You must choose the city of origin" },
        ]}
        cities={citiesList}
        searchStatus={searchStatus}
        onSearch={handleSearchCity}
        onSelect={handleClearOptions}
      />

      <Form.List name="destinations">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name }) => (
              <div key={key}>
                <AutoComplete
                  label="City of destination"
                  name={[name, "city"]}
                  rules={[
                    {
                      required: true,
                      message: "You must choose the city of destination",
                    },
                  ]}
                  cities={citiesList}
                  searchStatus={searchStatus}
                  onSearch={handleSearchCity}
                  onSelect={handleClearOptions}
                />
                <div onClick={() => remove(name)}>Remove</div>
              </div>
            ))}

            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                // icon={<div>+</div>}
              >
                Add destination
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item
        label="Passengers"
        name="passengers"
        rules={[{ required: true, message: "Select passengers" }]}
      >
        <InputNumber min={1} />
      </Form.Item>

      <Form.Item
        label="Date"
        name="date"
        rules={[{ required: true, message: "Please input date" }]}
      >
        <DatePicker format="YYYY/MM/DD" allowClear />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SearchForm;
