# Klaviyo

Nitrogen features a custom [Klaviyo](https://www.klaviyo.com/) module for email marketing. This is a great way to send product updates, special offers, and back-in-stock notifications to customers.

> [Klaviyo documentation](https://developers.klaviyo.com/en/reference/api_overview)

## Klaviyo Setup

Within your Shopify dashboard, install the [Klaviyo: Email Marketing & SMS](https://apps.shopify.com/klaviyo-email-marketing) app and go through the initial setup to connect Klaviyo to your storefront. After you complete this, login to your Klaviyo dashboard and navigate to `Settings` → `Account` → `API Keys`. Here you can find your public API key and also generate your private API Key.

## API Permissions

Once your Klaviyo app is set up, add your API Keys to your environment variables:

```ini
# Klaviyo
NUXT_KLAVIYO_PUBLIC_API_KEY=your_public_api_key
NUXT_KLAVIYO_PRIVATE_API_KEY=your_private_api_key
NUXT_KLAVIYO_API_VERSION=2025-01-15
```

## List IDs

To ensure client subscriptions are directed to the appropriate email list (e.g., your newsletter), you need to assign the newsletter List ID to the `listId` variable in the [klaviyo-newsletter](https://github.com/rylanharper/Nitrogen/blob/master/app/components/klaviyo/klaviyo-newsletter.vue) component. You can locate your newsletter list ID by logging into your Klaviyo dashboard and navigating to `Audience` → `Lists & Segments`. Select "Newsletter", then click on "Settings" to view the List ID.

## Composable

To get operations, use the `useKlaviyo` composable:

```ts
const klaviyo = useKlaviyo()
```

Operations can be referenced using this composable with dot notation:

```ts
// Klaviyo
const klaviyo = useKlaviyo()

// With dot notation
await klaviyo.subscribe.newsletter(email.value, listId)
```
