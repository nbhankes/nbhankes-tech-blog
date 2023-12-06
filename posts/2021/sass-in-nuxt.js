/* INSERT MARKDOWN POST AS STRING HERE */
export const post = `
#Using Sass In Nuxt.js

Nuxt.js is an open source framework for creating Vue.js applications. Its goal is to help Vue developers take advantage of top-notch technologies and make web development simple and powerful. If you've used React.js before, you'll feel familiar going into a new project. Sass is a CSS preprocessor, which adds special features such as nested rules and mixins into regular CSS. The syntax used in Sass is called SCSS.

In this article I'll share how to add Sass to your Nuxt.js app, using the assumption that you don't know anything about Sass and only have a basic understanding of Nuxt/Vue. Here's what you'll learn:

- How to create Nuxt.js app
- How to add SASS into your Nuxt.js app
- How to build your folder/file structure
- How to build a component from scratch and incorporate SCSS (Sass syntax) to style it (we'll use the mixin functionality to make sure it works :) ) 


## Create A Nuxt.js app

Go into your terminal and navigate to whichever location you'd like the project live. There's no need to add a new folder, the installation command will create a folder with your project name for you. 

Assuming you already have npm installed on your system, enter the following code into the terminal:

\`\`\`
npm init nuxt-app <project-name>
\`\`\`

You'll be prompted to make a few architectural decisions like preferred programming language, package manager, UI framework, among other things before the app builds onto your local system. For the sake of this tutorial, ensure the preferred UI Framework is set as None and the preferred programming language is set to JavaScript.

Once the initial creation process is completed, open the project in an IDE of your choice.  Right now we'll go back into the terminal and install Sass.

## Add Sass into your Nuxt project.
Within the terminal, navigate to your newly created Nuxt project. Copy the below command into the terminal and hit enter:

\`\`\`
npm install --save-dev node-sass sass-loader@10 fibers @nuxtjs/style-resources
\`\`\`

* node-sass installs sass functionality. This is what I've used in my most recent project and I know. But while researching this on npm, I've discovered the maintainers recommend switching to Dart Sass in its place. So if you're just starting a new project, consider learning Dart Sass instead. 

* sass-loader@10 loads each Sass/SCSS file and compiles them to CSS. We specify the @10 version because its compatible with the webpack version used in Nuxt. Use this module only  to import variables, mixins, functions (et cetera) as they won't exist in the actual build. Importing actual styles will include them in every component and will also make your build/HMR magnitudes slower. Do not do this!"

* fibers automatically enables the synchronous compilation with sass (2x speed increase)

* @nuxtjs/style-loaders ensures your variables and mixins are available in all of your components without the need to >import them in every file.

The \`\`\`--save-dev\`\`\` flag ensures these packages don't end up in the final build, keeping our project size as small as possible. Since SCSS/Sass is compiled into standard CSS at build time, these aren't needed.

## Setting Up Our Project Folders
Let's add the following folders and files into our root directory:

 📂Assets \n
 &nbsp;&nbsp;&nbsp; ┗ 📂SCSS \n
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   ┗ 📜mixins.scss \n
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   ┗ 📜variables.scss \n
 &nbsp;&nbsp;&nbsp; ┗ 📂CSS \n
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   ┗ 📜main.css \n

We'll get back to these when we start adding styles to our components. But right now, we need to add these to our Nuxt configuration file so that Nuxt knows they exist.

## Prepare Your Nuxt Configuration File
Open the nuxt.config.js file within the root directory.

Now add the following code into your <code>nuxt.config.js</code> file:

\`\`\`

css: [ 
	'~assets/css/main.css' 
],


buildModules: [ 
	'@nuxtjs/style-resources' 
], 

    
styleResources: { 
	scss: [ 
		'~assets/scss/mixins.scss', 
		'~assets/scss/variables.scss' 
	] 
  },

\`\`\`

We've extended the framework's core functionality by adding @nuxtjs/style-resources as a module for use at build time.

And we're also telling Nuxt where our SCSS and CSS files are located. All SCSS variables and mixins are now globally available to our components through the resources-module, so there's no need to import them into our components when declaring them. Our main.css file is also globally available throughout the project.

## The Anatomy of A Nuxt Component
Here's the basic structure of a Nuxt Component:

\`\`\`html
<template>
	<div class="my-parent">
		<p class="my-child">Hello World!</p>
	</div>
</template>

<style lang="scss">
	.my-parent {
		background: black;
	}

	.my-child {
		font-size: 1.25rem;
	}
</style>
\`\`\`

Our component is built within the \`\`\`<template>\`\`\` tags. And there can only be one top level tag within the template tag. As long as the rest of the html is nested within that top level tag, \`\`\`<div class="my-parent">\`\`\` in the example above, the component will render properly.

## Creating Our First Component
In this tutorial, we'll build a button. So let's create a button component file:

📂components \n
&nbsp;&nbsp;&nbsp;  ┗ 📜Btn.scss


\`\`\`
<template>
	<button class="button">
		<slot/>
	</button>
</template>

<style lang="scss>

</style>
\`\`\`

The [slot](https://vuejs.org/v2/guide/components-slots.html) tag acts like a placeholder for text that will display inside of our button component. So for example, when we use our "btn" component though out our project, the we will do it like this:

\`\`\`
<btn>Submit</btn>
\`\`\`

The text nested inside of the \`\`\`<btn>\`\`\` tag is accounted for by the initial \`\`\`<slot/>\`\`\` tag in the \`\`\`<btn>\`\`\` component. "Submit" will render in its place.

## Creating a Mixin
Before we style our button, let's create a mixin that we can use. A mixin is essentially a CSS snippet that can be used multiple times throughout the project. Here is the basic syntax you need to know:

Within the "mixins.scss" file:

\`\`\`
@mixin my-mixin-name {
	border: solid 2x black;
	border-radius: 10px;
}
\`\`\`

And then, when declaring this mixin inside of your usual component styling, the @include statement adds the mixin snippet to the CSS: 

\`\`\`
<style lang="scss">
	.my-class {
		margin: 2rem 5%;
		background: black;
		@include my-mixin-name
		padding: 1rem;
	}
</style>
\`\`\`

For this tutorial, we'll create a mixin that makes text all caps and bold.

Add this to the mixins.scss file:

\`\`\`
@mixins bold-text {
	text-transform: uppercase;
	font-weight: 900;
}
\`\`\`

Now we can use this mixin throughout our project.


## Styling Our Component With a Mixin

So back in our "btn" component, we'll add some style. We'll add our mixin using the @include SCSS syntax:

\`\`\`
<template>
	<button class="my-btn">
		<slot/>
	</button>
</template>

<style lang="scss">
	.my-btn {
		width: 10rem;
		height: 3rem;
		border-radius: 10px;
		background: black;
		color: white;
		@include bold-text;
		padding: 1rem;
		margin: 1rem auto; 
	}
</style>
\`\`\`

# Rendering Our Button On the Browser.

Now go to the "pages" folder in the root directory, and open the "index.vue" file. Remove the boilerplate nested inside of the template tag and add the "btn" component, like so:

\`\`\`
<template>
	<btn>Hello World</btn>
</template>

<script>
	export default {};
</script>
\`\`\`

Now go to the terminal and enter the following command:

\`\`\`
npm run dev
\`\`\`

Copy the following URL into your browser to see your button:

\`\`\`
http://localhost:3000/
\`\`\`

Congratulations, you just built your first Nuxt project using Sass!

`