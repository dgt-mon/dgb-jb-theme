import type { GenericParent } from 'myst-common';
import { MyST } from 'myst-to-react';

/**
 * The De Gruyter Brill site footer.
 *
 * Like {@link DgbHeader} this is a theme *default*: the Berlin-blue legal bar
 * renders on every book with no `myst.yml` config. It replaces the earlier
 * approach of shipping the footer as raw HTML in `site.parts.footer` (via the
 * shared `dgb-branding.yml`), which required every book to opt in — and which
 * MyST's merge rules made impossible to combine with a book's own footer, since
 * non-list fields from an extended config cannot be overridden.
 *
 * A book that *does* define `site.parts.footer` still gets it: that content is
 * rendered in its own light band above the legal bar, so book content stays
 * readable and the DGB bar stays identical everywhere.
 */
const LEGAL_LINKS = [
  { title: 'Privacy Policy', url: 'https://www.degruyterbrill.com/publishing/our-privacy-policy' },
  { title: 'Accessibility', url: 'https://www.degruyterbrill.com/publishing/accessibility' },
  { title: 'Legal Notice', url: 'https://www.degruyterbrill.com/publishing/legal-notice' },
];

export function DgbSiteFooter({ content }: { content?: GenericParent }) {
  // Rendered on the server and the client in the same calendar year, so this is
  // safe for hydration.
  const year = new Date().getFullYear();
  return (
    <footer className="dgb-footer">
      {content && (
        <div className="dgb-book-footer article article-grid">
          <MyST ast={content} />
        </div>
      )}
      <div className="dgb-site-footer">
        <div className="dgb-site-footer-inner">
          <span className="dgb-site-footer-copy">© {year} De Gruyter Brill</span>
          <nav className="dgb-site-footer-links" aria-label="Legal">
            {LEGAL_LINKS.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                {link.title}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
