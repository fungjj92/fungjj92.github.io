import date from "lume/plugins/date.ts";
import postcss from "lume/plugins/postcss.ts";
import terser from "lume/plugins/terser.ts";
import prism, { Options as PrismOptions } from "lume/plugins/prism.ts";
import basePath from "lume/plugins/base_path.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import metas from "lume/plugins/metas.ts";
import pagefind from "lume/plugins/pagefind.ts";
import sitemap from "lume/plugins/sitemap.ts";
import feed from "lume/plugins/feed.ts";
import readingInfo from "https://deno.land/x/lume@v2.2.1/plugins/reading_info.ts";
import toc from "https://deno.land/x/lume_markdown_plugins@v0.7.0/toc.ts";
import image from "https://deno.land/x/lume_markdown_plugins@v0.7.0/image.ts";
import nunjucks from "lume/plugins/nunjucks.ts";
import esbuild from "lume/plugins/esbuild.ts";

import type { Site } from "lume/core.ts";
import type { CustomPage } from "src/types/core.ts";

export interface Options {
  prism?: Partial<PrismOptions>;
}

/** Configure the site */
export default function (options: Options = {}) {

  const createPagesExcerptDetail = (pages: [CustomPage]) => {
    pages.forEach(page =>{
      const attemptedSplit = (page.data.content as string).split(
        /<!--\s*more\s*-->/i,
      );
      const isExcerptTruncated = attemptedSplit.length > 1;
      page.data.excerpt = attemptedSplit[0];
      page.data.isExcerptTruncated = isExcerptTruncated;
    })
  }

  return (site: Site) => {
    site.use(postcss())
      .use(basePath())
      .use(toc())
      .use(prism(options.prism))
      .use(readingInfo())
      .use(date())
      .use(metas())
      .use(nunjucks())
      .use(esbuild())
      .use(image())
      .use(resolveUrls())
      .use(slugifyUrls())
      .use(pagefind())
      .use(terser())
      .use(sitemap())
      .use(feed({
        output: ["/feed.xml", "/feed.json"],
        query: "type=post",
        info: {
          title: "=metas.site",
          description: "=metas.description",
        },
        items: {
          title: "=title",
        },
      }))
      .copy("fonts")
      .copy([".jpg", ".jpeg", ".png", ".svg", ".pdf", ".gif"])
      .preprocess([".md"], createPagesExcerptDetail);

    // Basic CSS Design System
    site.remoteFile(
      "_includes/css/ds.css",
      "https://unpkg.com/@lumeland/ds/ds.css",
    );
  };
}
