import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';


import styles from './styles.module.css';
export default function PaginatorNavLink(props) {
  const { permalink, title, subLabel, isNext } = props;
  return (
    <div
      className={clsx(
        'pagination-nav__link',
        isNext ? 'pagination-nav__link--next' : 'pagination-nav__link--prev',
        'border-none padding--none flex flex-col gap-3',
        isNext ? 'items-end' : 'items-start',
        styles.Link,
      )}
    >
      {subLabel && <Link to={permalink} className={clsx(
        'pagination-nav__sublabel',
        'inline-flex gap-1 justify-center items-center overflow-hidden text-sm font-medium transition rounded-full bg-zinc-100 py-1 px-3 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:ring-1 dark:ring-inset dark:ring-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-300'
      )}>
        {isNext ? null : <img src="/pagination/arrow-left.svg" className='w-3 h-3' />}
        <span>{subLabel}</span>
        {isNext ? <img src="/pagination/arrow-right.svg" className='w-3 h-3' /> : null}
      </Link>}
      <Link to={permalink} className="pagination-nav__label text-base font-semibold text-zinc-900 transition hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300">{title}</Link>
    </div>
  );
}
