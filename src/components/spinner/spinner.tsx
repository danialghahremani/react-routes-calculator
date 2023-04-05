import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import styles from "./spinner.module.scss";

const Spinner = () => {
  return (
    <div className={styles.spinContainer}>
      <Spin
        indicator={
          <LoadingOutlined style={{ fontSize: 24, color: "#7786D2" }} spin />
        }
      />
    </div>
  );
};

export default Spinner;
