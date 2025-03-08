# Getting Started

This guide will walk you through the steps on getting started with Nitrogen.

## What Is Nitrogen?

Nitrogen is a [Nuxt](https://nuxt.com/) template inspired by Shopify's [Hydrogen](https://github.com/Shopify/hydrogen) framework for headless commerce. This template is designed to empower Nuxt developers to build fast, scalable, and customizable storefronts that incorporate key features from Hydrogen's starter theme.

## Who Is Nitrogen For?

This template is primarily built for Vue developers who have prior experience building headless storefronts using the [Storefront API](https://shopify.dev/docs/api/storefront). However, it can also serve as an excellent starting point for developers who are new to this space.

## Project Structure

This template is structured into two main parts:

1. `/server`: This is where the API endpoints, GraphQL data, and operations live.
2. `/app`: Contains the pages, components, and scripts responsible for rendering the frontend application.

## Project Goals

When building this template, I focused on several key goals, which include the following:

- **Full Control** – You have complete control over all Shopify data with no reliance on third-party plugins or modules. The API endpoint, GraphQL client, queries, mutations, and operations are fully extendable within the codebase, ensuring stability and flexibility without depending on external updates.
- **Robust Feature Set** – All core Storefront API features found in the Hydrogen starter theme are included in this template. Along with standard collection, product, and cart functionality, it also supports more complex features like filtering products, localization, full customer account functionality, and much more.
- **Built for Speed** – Each page and component is designed for speed, avoiding any expensive functions that could slow down rendering time. The minimal GraphQL client caches all collection, search, and product pages to reduce redundant API calls and allows for instant navigation between previously visited pages.
