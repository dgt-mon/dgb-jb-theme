import type { GenericParent } from 'myst-common';
import classNames from 'classnames';
import { MyST } from 'myst-to-react';

/**
 * The stock footer for `site.parts.footer`. No longer rendered by the book
 * theme: `DgbSiteFooter` shows the DGB legal bar on every page and places a
 * book's own `footer` part in the band above it. Kept for reference / parity
 * with upstream.
 */
export function Footer({ content, className }: { content: GenericParent; className?: string }) {
  return (
    // Outer footer, sets up the grid, leaves margin above
    <footer
      className={classNames(
        'article footer article-grid bg-white dark:bg-slate-950 mt-10 shadow-2xl shadow py-10',
        className,
      )}
    >
      {/* Inner div that adds the shadow */}
      <MyST ast={content} />
    </footer>
  );
}
