---
layout: ../../layouts/post.astro
title: "How to Prompt LLMs for Skin Care Product Photos"
pubDate: 2025-09-23
description: "This is what I learned while designing content for a web client opening a skin care line."
author: "N. B. Hankes"
isPinned: true
excerpt: Good product photos drive sales. But scrappy startups don't always have the budget for professional photography. While designing a Shopify store for a web client opening a skin care line, I offered to create product photos using LLM photo gen capabilities. It was not as easy as I imagined. 
image:
  src:
  alt:
tags: ["Prompt Engineering"]
---

Good product photos drive sales. But scrappy startups don't always have the budget for professional photography. While designing a Shopify store for a web client opening a skin care line, I offered to create product photos using LLM photo gen capabilities. It was not as easy as I imagined. 

The LLM re-arranged label text had no context for relative scale for bottle sizing. 

But after some trial and error, I found a process that worked for my needs.

## How I Started and Failed

I initially uploaded the product label and the bottle manufacturer's product image to the LLM, in my case I used OpenAI's ChatGPT 5 Thinking Mode.

Initially, I uploaded the following photos of the product bottle and the product label:

<div class="flex flex-wrap md:flex-nowrap justify-center items-start gap-4">
  <figure class="flex justify-center md:basis-1/2">
    <img
      class="block max-w-full h-auto"
      src="/images/prompt-bottle.png"
      alt="LLM prompt input image of bottle">
  </figure>

  <figure class="flex justify-center md:basis-1/2">
    <img
      class="block max-w-full h-auto"
      src="/images/prompt-label-bad.png"
      alt="LLM prompt input image of product label">
  </figure>
</div>

And I gave the LLM the following instructions:

``` html
I require 4:3 ratio, portrait orientation product images for my cosmetics website. I've attached the product bottle and the label. I need these to be combined with a beach background. The product should take up roughly 65% of the area of the image. The beach background should be of the rugged beaches found in Humboldt County, California. It should be slightly out of focus.
```

After some thought, the LLM produced the following product image (which is remarkable as I re-read that prompt):

<figure class="flex justify-center">
	<img src="/images/prompt-output-bad.png"  alt="LLM prompt response image failed" style="height: 500px;">
</figure>

As you can see, the background and bottle are perfect. However, the LLM rearranged the label to get as much of the label text into the perspective as possible. This was not not desired.

Further prompts to remove unwanted label components proved futile.

## The Solution

After stepping away for a walk, I came up with a LLM-friendly approach I hoped would work.

Initially, I uploaded the following photo of the bottle and the cropped product label:

<div class="flex flex-wrap md:flex-nowrap justify-center items-start gap-4">
  <figure class="flex justify-center md:basis-1/2">
    <img
      class="block max-w-full h-auto"
      src="/images/prompt-bottle.png"
      alt="LLM prompt input image of bottle">
  </figure>

  <figure class="flex justify-center md:basis-1/2">
    <img
      class="block max-w-full h-auto"
      src="/images/prompt-label-good.png"
      alt="LLM prompt input for product label">
  </figure>
</div>

As you can see in the image below, the output was much more satisfactory. Not perfect, but satisfactory:

<figure class="flex justify-center">
	<img src="/images/prompt-output-good.png"  alt="LLM prompt input image of product label" style="height: 500px;">
</figure>

By removing the unseen portion of the product label, the LLM was no longer confused by the request.

## Creating a Product Variant Group Photo

I created three product photos for three product variants using the method described above. Next, I wanted to create an image of the products grouped together. The LLM has no knowledge of the relative scale of the three product variants, so my prompt had to include scale information.

In addition to supplying the three product images, I created the following prompt:

``` html
Create an image of the three attached product bottles arranged enticingly on a white background. The smallest 2 ounce bottle should be in the center in front of the other two bottles which are touching. The first bottle is a 2 oz dropper bottle 4.67 inches tall and 1.53 inches wide. The second is a 4 oz pump bottle 6 inches tall and 1.78 inches wide. The third is an 8 oz pump bottle 7 inches tall and 1.78 inches wide. Render them at true relative scale so viewers can see the difference in size. Do not include any measurements in the image.
```

<figure class="flex justify-center">
	<img src="/images/prompt-group-output-bad.png"  alt="LLM prompt input image of product label" style="height: 500px;">
</figure>

As you can see, the relative scale is off. The 8 ounce variant on the right is too close to the size of the 4 ounce variant on the right.

In my experience, follow up prompts to edit the photo were never reliable, but I tried the following prompt anyways\:

``` html
Make the 8 ounce bottle 8% wider and 15% taller.
```

<figure class="flex justify-center">
	<img src="/images/prompt-group-output-good.png"  alt="LLM prompt input image of product label" style="height: 500px;">
</figure>

And this result was perfect for my needs.

Alright, I hope this helps.