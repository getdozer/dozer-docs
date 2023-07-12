import React from 'react';
import clsx from 'clsx';
import {
  useCurrentSidebarCategory,
  filterDocCardListItems,
} from '@docusaurus/theme-common';
import DocCard from '@theme/DocCard';
function DocCardListForCurrentSidebarCategory({className}) {
  const category = useCurrentSidebarCategory();
  return <DocCardList items={category.items} className={className} />;
}
export default function DocCardList(props) {
  const {items, className} = props;
  if (!items) {
    return <DocCardListForCurrentSidebarCategory {...props} />;
  }
  const filteredItems = filterDocCardListItems(items);
  return (
    <section className={clsx('row', className)}>
      {filteredItems.map((item, index) => {
        if (item.type === 'html') {
          const id = item.customProps?.id;
          return (
            <h2 key={index} className="col col--12 margin-bottom--lg" style={{ 
              '--ifm-h2-font-size': '2rem',
              scrollMarginTop: 'calc(var(--ifm-navbar-height) + 0.5rem)'
            }} id={id}>
              <span dangerouslySetInnerHTML={{__html: item.value}} />
              {id ? <a href={'#' + id} class="hash-link" aria-label="Direct link to Node Types" title="Direct link to Node Types">​</a> : null}
            </h2>
          )
        }
        return (
          <article key={index} className="col col--6 margin-bottom--lg">
            <DocCard item={item} />
          </article>
        );
      })}
    </section>
  );
}
