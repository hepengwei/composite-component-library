import React, { ReactNode } from 'react';
import styles from './index.module.scss';

type SampleBoxProps = {
  title?: string;
  children: ReactNode;
};

const SampleBox = (props: SampleBoxProps) => {
  const { title, children } = props;
  return (
    <div className={styles.container}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default SampleBox;
