import { Form, InputNumber } from "antd";
import { Rule } from "antd/es/form";
import Image from "next/image";

import styles from "./input.module.scss";

type Props = {
  [name: string]: any;
  label: string;
  role?: string;
  rules?: Rule[];
};

const NumberInput = ({ name, label, role, rules }: Props) => {
  return (
    <Form.Item label={label} name={name} rules={rules}>
      <InputNumber
        min={1}
        role="number-input"
        controls={{
          upIcon: (
            <div role="" className={styles.numberInputIcons}>
              <Image
                src="/assets/icons/number-plus-icon.svg"
                width={8}
                height={8}
                alt=""
              />
            </div>
          ),
          downIcon: (
            <div className={styles.numberInputIcons}>
              <Image
                src="/assets/icons/number-minus-icon.svg"
                width={8}
                height={2}
                alt=""
              />
            </div>
          ),
        }}
      />
    </Form.Item>
  );
};

export default NumberInput;
