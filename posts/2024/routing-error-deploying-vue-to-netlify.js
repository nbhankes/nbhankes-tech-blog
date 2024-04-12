/* INSERT MARKDOWN POST AS STRING HERE */
export const post = `
#Routing Error When Deploying Vue 3 Apps to Netlify: "Failed to load resource: the server responded with a status of 404 ()"

When deploying a Vue single-page application (SPA) to Netlify, you may encounter an issue where your index.html file renders perfectly fine, but any pages routed through vue-router fail to load properly. On the intended route, you'll see a Page Not Found card. And in the console, you will see this error:

\`\`\`
Failed to load resource: the server responded with a status of 404 ()
\`\`\`

This happens because a SPA web app loads a single web document. Every route is actually rendered from that single web document. It's only the body content that updates. In our case, the single web document is the index.html file. Which is why the home route works as expected. 

However, when our vue-router routes to a new url path, we encounter our error. There is no HTML document that corresponds to the route for the browser to render. It only sees the index.html file that traditionally corresponds to the "/" route.

## How To Resolve the Error

I've tried two approaches, and both have worked. You'll only need to implement one of these solutions. 

In the first approach, you'll need to create the file \`\`\`_redirects\`\`\` in the public folder (no extension needed). Inside this file write and save \`\`\` /* /index.html 200 \`\`\`

Now when you deploy the app, all routes resolve to the index.html file resulting in the HTTP 200 code. This tells the browser that everything is okay and allows vue-router to function as intended without the browser throwing the HTTP 404 code.

The second approach to resolve this issue is in leveraging the \`\`\`netlify.toml\`\`\` file functionality. This file should be added to the directory root. Inside the file, add the following code:

\`\`\`
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
\`\`\`

This functionally tells the browser the same thing as the \`\`\`_redirects\`\`\` file. All routes will now resolve to the index.html document. 

A drawback here is that every route will resolve with the HTTP 200 status code

Okay, then. I hope that helps.
`