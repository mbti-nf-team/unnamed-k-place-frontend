'use client';

import Image from 'next/image';
import Link from 'next/link';

import styles from './index.module.scss';

type Props = {
  url: string;
  title: string;
  description: string;
  thumbnail?: string;
};

function ResultCard({
  url, description, title, thumbnail,
}: Props) {
  return (
    <Link href={url} className={styles.resultCardWrapper}>
      <div className={styles.textWrapper}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
      {thumbnail ? (
        <Image alt={title} src={thumbnail} width={84} height={84} />
      ) : (
        <div className={styles.thumbnail} />
      )}
    </Link>
  );
}

export default ResultCard;
