---
layout: ../../layouts/post.astro
title: "How to Develop Ghost Themes Locally"
pubDate: 2025-09-09
description: "This article shows you how to dynamically render a Youtube channel's most recent Youtube upload to a Ghost Blog home page."
author: "N. B. Hankes"
isPinned: true
excerpt: This article shows you how to dynamically render a Youtube channel's most recent Youtube upload to a Ghost Blog home page.
image:
  src:
  alt:
tags: ["Ghost Blog"]
---

This is one of those articles I write to myself so I can get spun up easily the next time I dive into my client's Ghost theme. I hope you find something useful here.

## Getting Started

Follow the official Ghost [How To Install Ghost Locally](https://docs.ghost.org/install/local) guide to get your local development environment.

Download the theme from Ghost Admin > Site > Theme > Change Theme > Installed > Theme Name You Want to Edit... > Download

## Run the Theme Locally

Extract the theme folder into a local folder and open the folder in an IDE of your choice. Open a terminal and execute the command `ghost start`

This will run a server hosting the local Ghost blog on the localhost URL displayed in the terminal.

In my case, this is `http://localhost:2368/ghost/`

## Create a Partial

Locate your theme in the local folder. This will be in content\themes and can be identified by name. 

This is where you will do your development. 

Add a file in the partials\components folder called `latest-youtube-video.hbs`

Copy the following code into the file, being sure to add your Youtube channel's Id into the CHANNEL_ID var:

``` html
<section class="latest-youtube-section gh-outer" data-latest-youtube id="latest-youtube-root">
  <div class="gh-inner">
    <div class="latest-youtube" aria-label="Latest YouTube video">
      <div class="latest-youtube__embed" style="position:relative;width:100%;max-width:900px;margin:0 auto;">
        <div style="position:relative;padding-top:56.25%;background:#000;border-radius:12px;overflow:hidden; margin-top: 1rem; margin-bottom: 1rem;">
          <iframe
            title="Latest video from Coffee People Podcasts"
            class="js-latest-youtube-iframe"
            src=""
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            style="position:absolute;inset:0;width:100%;height:100%;border:0;"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</section>

<script>
(function () {
  var CHANNEL_ID = 'YOUR_CHANNEL_ID';
  var UPLOADS_PLAYLIST_ID = 'UU' + CHANNEL_ID.slice(2);
  var FEED_URL = 'https://www.youtube.com/feeds/videos.xml?channel_id=' + CHANNEL_ID;

  function init() {
    // Be resilient: support either data-attr or explicit id
    var root = document.querySelector('[data-latest-youtube]') || document.getElementById('latest-youtube-root');
    if (!root) {
      console.warn('Latest YouTube root not found');
      return;
    }
    var iframe = root.querySelector('.js-latest-youtube-iframe');
    if (!iframe) {
      console.warn('Latest YouTube iframe not found');
      return;
    }

    function setVideoSrc(videoId) {
      iframe.src =
        'https://www.youtube.com/embed/' + encodeURIComponent(videoId) +
        '?rel=0&modestbranding=1&color=white';
    }

    function setPlaylistFallback() {
      iframe.src =
        'https://www.youtube.com/embed/videoseries?list=' + encodeURIComponent(UPLOADS_PLAYLIST_ID) +
        '&rel=0&modestbranding=1';
    }

    fetch(FEED_URL, { mode: 'cors' })
      .then(function (res) {
        if (!res.ok) throw new Error('Feed fetch failed: ' + res.status);
        return res.text();
      })
      .then(function (xmlText) {
        var doc = new DOMParser().parseFromString(xmlText, 'application/xml');
        var entry = doc.querySelector('entry');
        var vidEl = entry && entry.querySelector('yt\\:videoId, videoId'); // handle namespace
        var videoId = vidEl && vidEl.textContent && vidEl.textContent.trim();
        if (videoId) setVideoSrc(videoId); else setPlaylistFallback();
      })
      .catch(function () { setPlaylistFallback(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>
```

## Adding the Latest Youtube Video to Your Ghost Blog's Home Page

Insert a reference to the partial in your theme's home.hbs file, like so:

```
{{> "components/latest-youtube-video"}}
```

Navigate to `http://localhost:2368/` to review the updated home page.

## Packaging Theme Edits for Publication

First we will use Ghost's CLI compatibility test to ensure we didn't break anything and the site will function as expected when we upload it to the live website.

In a new terminal install gscan globally if you have not already, using the command `npm install gscan -g`

Now in the same terminal, execute the command `gscan /path/to/ghost/content/themes/casper` using the actual path to the theme folder that you have just added the partial to.

If the scan is successful, zip up the theme folder that you have just added the partial to.

## Publishing Ghost Theme

Go to the Ghost Admin page and navigate to Site > Theme > Change Theme > Upload theme

Select or drag your zip file into the modal and opt to upload the file. If the file has the same name as an existing theme, you'll be asked if you want the new theme folder to replace the existing theme folder. Say yes.

Once the upload is complete, your changes will now be live on your Ghost blog if the newly uploaded theme is the active theme.