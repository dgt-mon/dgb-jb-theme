import classNames from 'classnames';
import { Bars3Icon as MenuIcon } from '@heroicons/react/24/solid';
import { ActionMenu, ExternalOrInternalLink, LoadingBar, NavItems, Search } from '@myst-theme/site';
import { useBaseurl, useNavOpen, useSiteManifest, withBaseurl } from '@myst-theme/providers';

/**
 * The De Gruyter Brill header.
 *
 * This is a *default* of the book theme: every book gets the Berlin-blue brand
 * bar without declaring anything in its `myst.yml`. That is the whole point of
 * shipping it as a component — the previous approach (CSS skinning the stock
 * `<TopNav/>` plus a shared `dgb-branding.yml` pulled in via `extends`) needed
 * per-book config (`logo`, `logo_text`, `parts.footer`) that either did not
 * resolve across books or could not be overridden under the MyST merge rules.
 *
 * It keeps every affordance of the stock top nav — sidebar toggle, site nav
 * items, search, the `navbar_end` part and page actions — and drops the
 * light/dark toggle, since the theme is pinned to light mode in `root.tsx`.
 *
 * Layout note: the bar is `sticky` and 60px tall to match `DEFAULT_NAV_HEIGHT`
 * from `@myst-theme/site`. The fixed sidebar and the sticky document outline are
 * both offset by that value (`useThemeTop`), so changing the height here without
 * changing `top` in `root.tsx` would leave them misaligned.
 */
export const DGB_HEADER_HEIGHT = 60;

const DGB_URL = 'https://www.degruyterbrill.com/';

/**
 * The DGB logo lockup, shipped with the theme (`public/dgb-logo.png`) rather than
 * configured per book — a book's own `logo` path cannot resolve across books.
 */
const DGB_LOGO = '/dgb-logo.png';

/**
 * DGB-wide navigation, matching the degruyterbrill.com header. These sit ahead
 * of the book's own `site.nav` items, which follow them on the same row.
 */
const DGB_NAV = [
  { title: 'Our Subjects', url: 'https://www.degruyterbrill.com/publishing/subjects' },
  {
    title: 'About Us',
    url: 'https://www.degruyterbrill.com/publishing/about-us/about-de-gruyter-brill',
  },
];

export function DgbHeader({
  hideToc,
  hideSearch,
}: {
  hideToc?: boolean;
  hideSearch?: boolean;
}) {
  const [open, setOpen] = useNavOpen();
  const baseurl = useBaseurl();
  const config = useSiteManifest();
  const { nav, actions } = config ?? {};
  return (
    <div
      className="dgb-header myst-top-nav sticky top-0 z-30 w-full min-h-[60px] p-3 md:px-8"
      style={{ minHeight: DGB_HEADER_HEIGHT }}
    >
      <nav
        aria-label="Site"
        className="dgb-header-bar myst-top-nav-bar flex items-center justify-between flex-nowrap gap-2 max-w-[1440px] mx-auto"
      >
        <div className="flex items-center min-w-0 shrink">
          {/* Sidebar toggle: shown until the sidebar becomes permanent (xl), or
              until `lg` when the site nav replaces the table of contents. */}
          <div
            className={classNames('block', {
              'lg:hidden': nav && hideToc,
              'xl:hidden': !(nav && hideToc),
            })}
          >
            <button
              className="dgb-header-menu-button myst-top-nav-menu-button flex items-center justify-center w-10 h-10"
              onClick={() => setOpen(!open)}
            >
              <MenuIcon width="1.5rem" height="1.5rem" />
              <span className="sr-only">Open Menu</span>
            </button>
          </div>
          <a
            className="dgb-header-brand flex items-center shrink-0 ml-2 md:ml-4"
            href={DGB_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="dgb-header-logo h-7 w-auto"
              src={withBaseurl(DGB_LOGO, baseurl) ?? DGB_LOGO}
              alt="De Gruyter Brill"
              width="1160"
              height="128"
            />
          </a>
          {/* The brand slot is the DGB lockup only, as on degruyterbrill.com — a
              book's own `logo`/`title` is not shown here (the sidebar heads the
              page with the book title, and a second lockup wrapped the bar onto
              two rows, which pushed the sidebar out of alignment). */}
        </div>
        <div className="flex items-center flex-grow w-auto min-w-0">
          {/* DGB-wide links, then the book's own nav. Both are desktop-only, as
              in the stock theme; the sidebar drawer covers small viewports. */}
          <div className="dgb-header-nav hidden lg:flex items-center shrink-0">
            {DGB_NAV.map((item) => (
              <a
                key={item.url}
                className="dgb-header-nav-link mx-2 px-2 py-1 text-md whitespace-nowrap"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.title}
              </a>
            ))}
          </div>
          <NavItems nav={nav} />
          <div className="flex-grow block"></div>
          {!hideSearch && <Search />}
          {/* Page actions: a pop-up menu on mobile, pills from `sm` up. */}
          <div className="block sm:hidden">
            <ActionMenu actions={actions} />
          </div>
          <div className="hidden sm:block">
            {actions?.map((action, index) => (
              <ExternalOrInternalLink
                key={action.url || index}
                className="dgb-header-action inline-block px-4 py-2 mx-1 mt-0 leading-none text-md"
                to={action.url}
              >
                {action.title}
              </ExternalOrInternalLink>
            ))}
          </div>
        </div>
      </nav>
      <LoadingBar />
    </div>
  );
}
