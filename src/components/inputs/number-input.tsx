import { Form, InputNumber } from "antd";
import { Rule } from "antd/es/form";

import MinusIcon from "public/assets/icons/number-minus-icon.svg";
import PlusIcon from "public/assets/icons/number-plus-icon.svg";

import styles from "./input.module.scss";

type Props = {
  [name: string]: any;
  label: string;
  rules?: Rule[];
};

const NumberInput = ({ name, label, rules }: Props) => {
  return (
    <Form.Item label={label} name={name} rules={rules}>
      <InputNumber
        min={1}
        controls={{
          upIcon: (
            <div className={styles.numberInputIcons}>
              <PlusIcon />
            </div>
          ),
          downIcon: (
            <div className={styles.numberInputIcons}>
              <MinusIcon />
            </div>
          ),
        }}
      />
    </Form.Item>
  );
};

export default NumberInput;
