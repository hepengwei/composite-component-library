import React from "react";
import styles from "./index.module.scss";

interface OptionType {
  value: string | number;
  label?: React.ReactNode;
  [key: string]: any;
}

interface SegmentedProps {
  value: string | number;
  options?: OptionType[];
  onChange?: (value: string | number, item: OptionType) => void;
}

const Segmented: React.FC<SegmentedProps> = ({
  value,
  options = [],
  onChange = () => {},
}) => {
  return (
    <div className={styles.segmented}>
      {options.map((item) => (
        <div
          key={item.value}
          className={value === item?.value ? styles.active : ""}
          onClick={() => {
            if (value === item.value) return;
            onChange?.(item.value, item);
          }}
        >
          {item?.label || ""}
        </div>
      ))}
    </div>
  );
};

export default Segmented;
