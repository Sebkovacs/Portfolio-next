---
title: 'Alternative Development 2'
date: '2019-11-15'
type: 'Mixed Use Multi-Res'
status: 'Speculative'
summary: 'This project aimed to test ideas around sustainability, affordability and public good, on urban-infill site in the heart of Newcastle.'
thumb: '\images\projects\alternative-development-2-430x270.jpg'
---

Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.

- **Static Generation** is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then _reused_ on each request.
- **Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**.

Importantly, Next.js lets you **choose** which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.