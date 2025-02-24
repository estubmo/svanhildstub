import { listCategories } from '@lib/data/categories';
import { listCollections } from '@lib/data/collections';
import { clx, Text } from '@medusajs/ui';
import LocalizedClientLink from '@modules/common/components/localized-client-link';

import MedusaCTA from '../../components/medusa-cta';

export default async function Footer() {
  const { collections } = await listCollections({
    fields: '*products',
  });

  const productCategories = await listCategories();

  return (
    <footer className="w-full border-t border-ui-border-base">
      <div className="content-container flex w-full flex-col">
        <div className="flex flex-col items-start justify-between gap-y-6 py-40 xsmall:flex-row">
          <div>
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus uppercase text-ui-fg-subtle hover:text-ui-fg-base"
            >
              Svanhild Stub
            </LocalizedClientLink>
          </div>
          <div className="text-small-regular grid grid-cols-2 gap-10 sm:grid-cols-3 md:gap-x-16">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-ui-fg-base txt-small-plus">
                  Categories
                </span>
                <ul className="grid grid-cols-1 gap-2">
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return;
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null;

                    return (
                      <li
                        className="txt-small flex flex-col gap-2 text-ui-fg-subtle"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            'hover:text-ui-fg-base',
                            children && 'txt-small-plus',
                          )}
                          href={`/store/categories/${c.handle}`}
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="ml-3 grid grid-cols-1 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-ui-fg-base"
                                    href={`/store/categories/${child.handle}`}
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-ui-fg-base txt-small-plus">
                  Collections
                </span>
                <ul
                  className={clx(
                    'txt-small grid grid-cols-1 gap-2 text-ui-fg-subtle',
                    {
                      'grid-cols-2': (collections?.length || 0) > 3,
                    },
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-ui-fg-base"
                        href={`/store/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="mb-16 grid w-full grid-cols-2 justify-between gap-2 text-ui-fg-muted">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} Mo Web Dev. All rights reserved.
          </Text>
          <MedusaCTA />
        </div>
      </div>
    </footer>
  );
}
