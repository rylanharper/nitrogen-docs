# Basic Usage

This guide will walk you through the basics on how to use Nitrogen.

## App Modules

Nitrogen features two custom modules for [Shopify](https://github.com/rylanharper/nitrogen/blob/master/modules/shopify) and [Klaviyo](https://github.com/rylanharper/nitrogen/blob/master/modules/klaviyo), located in the `/modules` folder. The Shopify module, in particular, lets you connect to both the Storefront and Admin APIs at the same time, which is really cool for building more complex storefronts that may use Shopify to act a database in some way (think wishlist functionality or unique customer account features).

> [!TIP]
> Read over the official Nuxt [Author Module Guide](https://nuxt.com/docs/4.x/guide/going-further/modules) to learn more about how to create and manage your own modules.

## API Integration

Nitrogen provides a minimal [GraphQL client](https://github.com/rylanharper/nitrogen/blob/master/data/shopify/utils/graphql-client.ts) that seamlessly integrates with both Shopify's Storefront and Admin APIs (at the same time). It uses two [server-side proxies](https://github.com/rylanharper/nitrogen/blob/master/modules/shopify/runtime/server) to handle API authentication and requests, while offering a typed interface for executing GraphQL operations.

## GraphQL Operations

This project includes pre-built GraphQL [operations](https://github.com/rylanharper/nitrogen/tree/master/data/shopify/operations) for common Storefront and Admin API queries and mutations. Feel free to add or remove operations that fit your project needs.

## Composable

To get GraphQL operations, use the `useShopify` composable:

```ts
const shopify = useShopify()
```

Operations can be referenced using this composable with dot notation:

```ts
// Shopify
const shopify = useShopify()

// With dot notation
await shopify.cart.addLines(cart.id, [ ... ])
await shopify.product.get({ handle: 'example-product' })
```

## With `useAsyncData`

Perfect for reactive data fetching in pages or components:

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

### With `Pinia`

Ideal for working with actions in your Pinia stores:

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
    } catch (error: any) {
      console.error('Cannot create cart:', error.message)
      throw error
    }
  },
  // More cart actions...
}
```
