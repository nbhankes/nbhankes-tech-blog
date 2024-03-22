/* INSERT MARKDOWN POST AS STRING HERE */
export const post = `
#How to Submit a Form Without a Backend

Static websites are easy enough to throw together for family and friends with a small business. We can host them for free on services like Netlify. But adding something as simple as a contact form, which is bare minimum functionality for most business websites, brings with it considerable complexity. You'll need to consider how to pass along the form inputs. You'll need to consider where these form submissions are stored. And you'll need some email service to pass along the form submission details to the business owner.

Whether you're a beginner developer and this amounts to a technological roadblock or you're an experienced developer trying to keep it simple, the best solution I've found is [Netlify's serverless form handling](https://docs.netlify.com/forms/setup/).

###What you Need to Get Started
- A Netlify Account
- Your static website in a GitHub repository

[Hosting a website on Netlify](https://docs.netlify.com/welcome/add-new-site/) is straight forward. I'll let you sort that out on your own. Once you link your GitHub repository to Netlify, you have the option to automatically build and deploy the site everytime the connected branch is updated with a fresh commit.

Once you've added your site to Netlify, you'll need to enable form handling before the following code will work. To do this, go to Forms section within your site UI and select Enable from detection.

Once you're all set up, handling your form submissions is as easy as adding the \`netlify\` attribute in the form tag:

\`\`\`html
<form name="application-submittal" method="POST" netlify>
  <p>
    <label>Your Name: <input type="text" name="name" /></label>
  </p>
  <p>
    <label>Your Email: <input type="email" name="email" /></label>
  </p>
  <p>
    <label>Message: <textarea name="message"></textarea></label>
  </p>
  <p>
    <button type="submit">Apply Now</button>
  </p>
</form>
\`\`\`

The next time your website is rebuilt and deployed, Netlify's built-in form detection feature will register the netlify attribute and begin handling form submissions. 

You can review the form submissions within Netlify by the form name:

<img width="100%" src="https://drive.google.com/uc?id=1PI_v8a2jPWfPpKvmD_uL6xKKRbZcb7rG" alt="Submitting forms with Netlify is easy"/>

And if you'd prefer to forward the form submission to an email address or as an HTTP POST request, you can set this up within your site UI Form page.

There are limitations to how many submissions can be processed on the free tier. As of this writing, it's limited to one hundred submissions and 10MB of file transfer per month. Plans scale up from there.

Okay. I hope that helps.
`