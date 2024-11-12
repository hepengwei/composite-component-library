import React, { ReactNode } from 'react';
import styles from './index.module.scss';

type SampleBoxProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

const SampleBox = (props: SampleBoxProps) => {
  const { title, children, className } = props;
  return (
    <div className={`${styles.container}${className ? ` ${className}` : ''}`}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default SampleBox;
