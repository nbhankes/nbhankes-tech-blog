/* INSERT MARKDOWN POST AS STRING HERE */
export const post = `
#Make a Variable Globally Available in Vue 3

I recently ran into a case where I needed to access a static array in multiple Vue components throughout a project. I didn't want to copy and paste the array across various components. A single source of truth makes software more reliable. But putting the array into a database and fetcing it when needed seemed like a performance drain and over engineering something that should be simple.

##Getting Oriented

Here's the layout of the Vue 3 src folder: \n
📂src \n
&nbsp;&nbsp;&nbsp;  ┗ 📂components \n
&nbsp;&nbsp;&nbsp;  ┗ 📂plugins \n
📜Vue.app \n
📜main.js \n

##Setting Up the Variable

Notice the plugins folder above. Plugins are self-contained code that add app-level functionality to Vue. So we're going to leverage the plugin pattern to make our array globally available. So we'll add a file to store our array within the plugins folder, like so: \n
📂src \n
&nbsp;&nbsp;&nbsp;  ┗ 📂plugins \n
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ┗ 📜myArray.js \n

Now we add our array into myArray.js and make it available to our app's global properties:
\`\`\`
const myGlobalArray = [						
	'One fish',
	'Two fish',
	'Red fish',
	'Blue fish'
];

export default {
	install(app) {
		// Adds the array to the app's global properties
		app.config.globalProperties.$myGlobalArray = myGlobalArray;
	},
};
\`\`\`

And now we import this array into main.js and make it available to globally:
\`\`\`
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import myGlobalArray from '../src/plugins/myArray'

const app = createApp(App)

app.use(myGlobalArray)
app.mount('#app')
\`\`\`



##Accessing the Variable

Now that we've created our array and made it available globally, we can access it anywhere in our app without having to import it into our individual component files. Here's how to reference the arry in our component:

\`\`\`
<v-select
class="mt-2"
label="My dropdown list example"
:items="$myGlobalArray"
v-model="dropdownSelectionRef"
></v-select>
\`\`\`

Now our dropdown displays all the strings stored in our array myGlobalArray.

`