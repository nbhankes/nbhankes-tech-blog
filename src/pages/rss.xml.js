import rss, {pagesGlobToRssItems} from '@astrojs/rss';

export async function GET(context) {
  return rss({
    title: 'nbhankes.dev - blog',
    description: 'N. B. Hankes tech blog',
    site: context.site,
    items: await pagesGlobToRssItems(
      import.meta.glob('./posts/*.{md,mdx}'),
    ),
    stylesheet: './rss/styles.xsl',
    customData: `<language>en-us</language>`,
  });
}