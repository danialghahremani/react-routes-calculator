import { DatePicker, Form } from "antd";
import { Rule } from "antd/es/form";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";

type Props = {
  [name: string]: any;
  label: string;
  rules?: Rule[];
};

const DateInput = ({ name, label, rules }: Props) => {
  // Can not select days before today
  const handleDisabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < dayjs().startOf("day");
  };

  return (
    <Form.Item label={label} name={name} rules={rules}>
      <DatePicker
        disabledDate={handleDisabledDate}
        suffixIcon
        format="YYYY/MM/DD"
        allowClear
      />
    </Form.Item>
  );
};

export default DateInput;
