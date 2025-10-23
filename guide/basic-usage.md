# Basic Usage

This guide will walk you through the basics on how to use Nitrogen.

## App Modules

Nitrogen features two custom modules for [Shopify](https://github.com/rylanharper/nitrogen/blob/master/modules/shopify) and [Klaviyo](https://github.com/rylanharper/nitrogen/blob/master/modules/klaviyo), located in the `/modules` folder. The Shopify module, in particular, lets you connect to both the Storefront API and Admin API at the same time, which is ideal for building complex storefronts that may use Shopify to act a database in some way (think wishlist functionality or unique customer account features).

> Read the official Nuxt Author Module Guide to learn how to create and manage your own modules!

[Author Module Guide](https://nuxt.com/docs/4.x/guide/going-further/modules)

### API Integration

A minimal [GraphQL client](https://github.com/rylanharper/nitrogen/blob/master/modules/shopify/runtime/resources/utils/graphql-client.ts) is provided to seamlessly integrate with both the Shopify Storefront and Admin APIs. It uses two [server-side proxies](https://github.com/rylanharper/nitrogen/blob/master/modules/shopify/runtime/server) to handle API authentication and requests, while offering a typed interface for executing GraphQL operations.

The client `query` function accepts three optional parameters:

- `api` – Choose between the `storefront` (default) or `admin` API.
- `maxRetries` – Number of retry attempts on failure (default: `3`).
- `cacheable` – Enable response caching for common queries (default: `true`).

> By default, the GraphQL client only caches collection, product, and search queries. Avoid caching global queries or frequently updated mutations, as this can lead to hydration errors.

### GraphQL Operations

This project includes pre-built GraphQL [operations](https://github.com/rylanharper/nitrogen/tree/master/modules/shopify/runtime/resources/operations) for common queries and mutations frequently used in headless storefront environments. All operations are powered by the GraphQL client `query`, so you can also pass optional parameters when needed:

```ts
import type { MyQuery, MyQueryVariables } from '@@/types/storefront'
import { MY_QUERY } from '../graphql/custom'
import { query } from '../utils/graphql-client'

// Fetch example with optional params
const fetchExample = async (
  variables: MyQueryVariables,
): Promise<MyQuery['item']> => {
  const response = await query(MY_QUERY, variables, { api: 'admin' })
  return response.data?.item
}
```

Feel free to add or remove operations that fit your project needs!

### `useShopify`

To get GraphQL operations, use the `useShopify` composable:

```ts
const shopify = useShopify()
```

Operations can be referenced using dot notation:

```ts
// Shopify
const shopify = useShopify()

// With dot notation
await shopify.cart.addLines(cart.id, [ ... ])
await shopify.product.get({ handle: 'example-product' })
```

Perfect for reactive data fetching using `useAsyncData`:

```ts
// Shopify
const shopify = useShopify()

// Fetch Shopify data
const productVars = computed<ProductQueryVariables>(() => ({
  handle: handle.value,
  country: shopStore.buyerCountryCode,
  language: shopStore.buyerLanguageCode,
}))

const { data: productData } = await useAsyncData(
  `product-${handle.value}`,
  () => shopify.product.get(productVars.value),
  { watch: [productVars] },
)

// Response data
const product = computed(() => productData.value)
```

Ideal for working with actions in `Pinia`:

```ts
// Shopify
const shopify = useShopify()

// Cart store actions
actions: {
  async createCart(input?: CartInput, optionalParams?: CartOptionalInput) {
    try {
      const response = await shopify.cart.create({
        input: input,
        ...optionalParams,
      })

      if (response?.userErrors?.length) {
        throw new Error(response?.userErrors[0]?.message)
      }

      this.cart = response?.cart
    } catch (error) {
      console.error('Cannot create cart:', error)
      throw error
    }
  },
  // ...
}
```

### `flattenConnection`

A handy `flattenConnection` utility function is provided to make working with GraphQL connection objects much more simple. This utility extracts and flattens nested node arrays, making your node data easier to work with:

```ts
// Access product variant nodes
const variants = computed(() => 
  flattenConnection(product.value?.variants) as ProductVariantFragment[]
)

// Use node data for something...
const currentVariant = computed(() =>
  variants.find((variant) =>
    variant.selectedOptions.every(({ name, value }) =>
      isSizeOption(name) ? value === selectedSize.value : true,
    ),
  ),
)
```
