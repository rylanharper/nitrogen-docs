# Basic Usage

This guide will walk you through the basics on how to use Nitrogen.

## API Integration

Nitrogen provides a minimal [GraphQL client](https://github.com/rylanharper/nitrogen/blob/master/server/utils/graphql-client.ts) that seamlessly integrates with Shopify's Storefront API. It uses a [server-side proxy](https://github.com/rylanharper/nitrogen/blob/master/server/api/shopify.ts) to handle API authentication and requests, while offering a typed interface for executing GraphQL operations.

## Operations

This project includes pre-built [operations](https://github.com/rylanharper/nitrogen/tree/master/server/operations/shopify) for common Storefront API queries and mutations. Feel free to add or remove operations that fit your project needs.

## Composable

To get operations, use the `useShopify` composable:

```ts
const shopify = useShopify();
```

Operations can be referenced using this composable with dot notation:

```ts
// Shopify
const shopify = useShopify();

// With dot notation
await shopify.cart.addLines(cart.id, [ ... ])
await shopify.product.get({ handle: 'example-product' })
```

## With `useAsyncData`

Perfect for reactive data fetching in pages or components:

```ts
// Shopify
const shopify = useShopify();

// Fetch data
const productVars = computed<ProductQueryVariables>(() => ({
  handle: handle.value,
  country: shopStore.buyerCountryCode,
  language: shopStore.buyerLanguageCode
}))

const { data: productData } = await useAsyncData(
  `product-${handle.value}`,
  () => shopify.product.get(productVars.value),
  { watch: [productVars] }
);

// Computed data
const product = computed(() => productData.value)
```

## With `Pinia`

Ideal for working with actions in your Pinia stores:

```ts
// Shopify
const shopify = useShopify();

// Cart actions
actions: {
  async createCart(input?: CartInput, optionalParams?: CartOptionalInput) {
    try {
      const response = await shopify.cart.create({
        input: input,
        ...optionalParams
      });

      if (response?.userErrors?.length) {
        throw new Error(response?.userErrors[0]?.message);
      }

      this.cart = response?.cart;
    } catch (error: any) {
      console.error('Cannot create cart:', error.message);
      throw error;
    }
  },
  // More actions...
}
```
