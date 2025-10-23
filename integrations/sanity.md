# Sanity

Nitrogen features a minimal Sanity studio [template](https://github.com/rylanharper/nitrogen-sanity-studio), which synchronizes content between a Sanity dataset and your Shopify storefront. This allows teams to further enhance product and collection pages with custom modules or curated links — anything, really.

> [Sanity documentation](https://www.sanity.io/docs)

## Sanity Setup

Before connecting your Shopify store to Sanity, you must have a Sanity project and dataset. To do this, downloaded the Nitrogen Sanity Studio template and install the dependencies with `pnpm install`. Next, run `sanity init` to setup a new Sanity project and go through the initial setup process. Alternatively, you can manually create a new project by logging into your user dashboard on [Sanity](https://www.sanity.io/) and creating a new project.

## Sanity Connect

Once you have completed the setup, navigate to your Shopify dashboard and install the [Sanity Connect](https://apps.shopify.com/sanity-connect) app. Go through the initial setup process to connect Sanity to your store. I recommend reading through the official [Sanity and Shopify with Hydrogen](https://www.sanity.io/learn/course/sanity-and-shopify-with-hydrogen) guide to learn the basics of how to connect your Sanity dataset with your Shopify store data.

## API Permissions

Finally, you can add your environment variables to your project:

```ini
NUXT_SANITY_PROJECT_ID=your_project_id
NUXT_SANITY_DATASET=production
NUXT_SANITY_API_VERSION=2024-10-20
NUXT_SANITY_STUDIO_URL=http://your-site-domain.com
NUXT_SANITY_API_READ_TOKEN=your_sanity_api_read_token
```

## API Integration

To use Sanity within your project, download the official `@nuxtjs/sanity` module. This module provides advanced configuration options, live-preview integration for visual-editing, and native Nuxt composables to query your Sanity data with.

> [Sanity Module documentation](https://sanity.nuxtjs.org/)
