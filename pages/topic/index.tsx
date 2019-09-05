import React from 'react';
import { NextPage } from 'next';

import styles from './index.scss';

const Topic: NextPage<{ data: any[] }> = ({ data }) => {
  return (
    <>
      <span className={styles.abc}>123123</span>
      <span className={'abc'}>abcabc</span>
    </>
  );
};

// 需要 SSR 的网络请求放这里
Topic.getInitialProps = async () => {
  return { data: [] };
};

export default Topic;
