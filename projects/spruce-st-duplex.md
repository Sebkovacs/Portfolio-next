---
title: 'Spruce Street Duplex'
shortTitle: 'spruce'
pano: no
panoLink: "#"

date: '2018-08-22'
type: 'Residential Duplex'
status: 'Development Application'
summary: 'Duplex designed for builder for development purposes.'

thumb: '/1.jpg'
thumbAlt: 'image alt text.jpg'

image1: '/1.jpg'
imageAlt1: 'image alt text.jpg'

image2: '/2.jpg'
imageAlt2: 'image alt text.jpg'

image3: '/3.jpg'
imageAlt3: 'image alt text.jpg'

image4: '/4.jpg'
imageAlt4: 'image alt text.jpg'

image5: '/5.jpg'
imageAlt5: 'image alt text.jpg'

image6: '/6.jpg'
imageAlt6: 'image alt text.jpg'

---

We recommend using **Static Generation** (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.

You can use Static Generation for many types of pages, including:

- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation

You should ask yourself: "Can I pre-render this page **ahead** of a user's request?" If the answer is yes, then you should choose Static Generation.

On the other hand, Static Generation is **not** a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

In that case, you can use **Server-Side Rendering**. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate data.