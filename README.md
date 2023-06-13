<<<<<<< HEAD
# hellojfung
=======
# Simple Blog

[Lume](https://lume.land) theme to create a simple blog.

- It supports tags and post authors.
- RSS (Atom and JSON).
- Sitemap and SEO features.
- Instant search engine.

## Install as remote theme

The **fastest and easiest** way to use this theme is by importing it as a remote
module. It allows to create a blog in seconds and update it at any time just
changing the version number in the import url. Just add the following code to
your `_config.ts` file:

```ts
import lume from "lume/mod.ts";
import blog from "https://deno.land/x/lume_theme_simple_blog@v0.5.0/mod.ts";

const site = lume();

site.use(blog());

export default site;
```

You can see an example in the [demo](./demo) folder. To customize it copy the
[`_data.yml`](./src/_data.yml) file in your blog root folder and edit it with
your own data. The posts must be saved in the `posts` folder. For example:
`posts/my-first-posts.md`.

## Use it as base template

To use this theme as a base template for a more customized blog, clone this repo
and edit the [_config.ts](./_config.ts) file. The source files are in the
[src](./src/) folder. And you can remove the `/demo` folder.
>>>>>>> 40448ec (Initial commit)
