import { Skeleton } from "antd";

import styles from "../input.module.scss";

const AutoCompleteSkeleton = () => (
  <div
    className={styles.dropdownSkeletonContainer}
    role="auto-complete-skeleton"
  >
    <Skeleton.Input className={styles.dropdownSkeleton} active size="default" />
    <Skeleton.Input className={styles.dropdownSkeleton} active size="default" />
    <Skeleton.Input className={styles.dropdownSkeleton} active size="default" />
    <Skeleton.Input className={styles.dropdownSkeleton} active size="default" />
    <Skeleton.Input className={styles.dropdownSkeleton} active size="default" />
    <Skeleton.Input className={styles.dropdownSkeleton} active size="default" />
    <Skeleton.Input className={styles.dropdownSkeleton} active size="default" />
  </div>
);

export default AutoCompleteSkeleton;
