import { Form, AutoComplete as AntdAutoComplete } from "antd";
import { Rule } from "antd/es/form";

import {
  ResponseModel,
  GetCitiesResponseModel,
  SearchStatusEnum,
} from "@/models/search.model";

type Props = {
  [name: string]: any;
  label: string;
  rules?: Rule[];
  cities: ResponseModel<GetCitiesResponseModel[]> | null;
  searchStatus: string;
  onClear?: () => void;
  onSelect: () => void;
  onSearch: (value: string) => void;
};

const AutoComplete = ({
  name,
  label,
  rules,
  cities,
  searchStatus,
  onClear,
  onSelect,
  onSearch,
}: Props) => {
  const renderContent = () => {
    switch (searchStatus) {
      case SearchStatusEnum.NOT_SELECTED:
        return <div>Please search your city</div>;

      case SearchStatusEnum.SEARCHING:
        return <div>Searching...</div>;

      case SearchStatusEnum.NOT_FOUND:
        return <div>Nothing found!</div>;

      default:
        return <div>Please search your city</div>;
    }
  };

  return (
    <Form.Item label={label} name={name} rules={rules}>
      <AntdAutoComplete
        allowClear
        options={
          cities
            ? cities?.data?.map((i: any) => ({
                value: i?.name,
              }))
            : []
        }
        style={{ width: 200 }}
        notFoundContent={renderContent()}
        onClear={onClear}
        onSelect={onSelect}
        onSearch={(value: string) => onSearch(value)}
      />
    </Form.Item>
  );
};

export default AutoComplete;
