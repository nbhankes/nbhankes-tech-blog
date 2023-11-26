/* INSERT MARKDOWN POST AS STRING HERE */
export const post = `
#Uncaught FirebaseError: Firebase: Error (auth/invalid-api-key)

I recently connected a Vue.js 3 app with Google Firebase. New to both Vue.js and Firebase, I cobbled together an environment variables solution following various examples I'd found online. So it's no surprise I encountered the following error:

<figure>
	<img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/p79q8poss2r4o1sh1glp.PNG"  alt="Uncaught FirebaseError: Firebase: Error (auth/invalid-api-key)" style="margin: 0 10%; max-width:80%;">
</figure>

After diving into the issue, I discovered my error and resolved the issue using the approach I share below.

##How I got started

Following the Vue.js [Quick Start](https://vuejs.org/guide/quick-start.html) guide, I created a new Vue.js project using the recommened command \` npm create vue@latest \`

This command installs and creates \` create-vue \` —which is a scaffolding tool used to configure the Vue.js project with a choose-your-own-adventure list of feature options.

Prior to \` create-vue \`, Vue.js projects were generated from Vue CLI (now in maintenance mode) and were based on webpack. The newer \` create-vue \` projects are based on Vite. Vite and webpack are both build tools. These build tools handle environment variables differently. 

The examples I'd found online were out of date. And before I'd wrapped my head around these project differences, a quick Google search for ~"vue js environment variables" sent me to the outdated Vue CLI documentation.

Which brings me back to \` Uncaught FirebaseError: Firebase: Error (auth/invalid-api-key) \`


##How to set up Google Firebase in your Vue project

I'll assume you've already created your Firebase project and have your Firebase configuration keys and values. Hint: They're in the Project settings. And I'll also assume you've added the appropriate [Firebase npm packages](https://firebase.google.com/docs/web/setup) to your project.

And I'll assume you've already created a Vue 3 project using \` npm create vue@latest \`

Okay. With that behind us, let's move on:

Create a \` .env \` file in the root folder of your Vue project. Add your Firebase configuration key values to this file using the key names below: 



~~~ 
VITE_APP_FIREBASE_API_KEY=" <YOUR API KEY> "
VITE_APP_FIREBASE_AUTH_DOMAIN=" <YOUR AUTH DOMAIN> "
VITE_APP_FIREBASE_PROJECT_ID=" <YOUR PROJECT ID> "
VITE_APP_FIREBASE_STORAGE_BUCKET=" <YOUR STORAGE BUCKET> "
VITE_APP_FIREBASE_MESSAGING_SENDER_ID=" <YOUR MESSAGING SENDER ID> "
VITE_APP_FIREBASE_APP_ID=" <YOUR APP ID> "
VITE_APP_FIREBASE_MEASUREMENT_ID=" <YOUR MEASUREMENT ID> "
~~~



Your key names have to start with "VITE" for the [Vite build tool to handle these environment variables](https://vitejs.dev/guide/env-and-mode.html#env-variables) appropriately. Without this, your environment variables simply return \` undefined \`. This is where my error came from. But alas, we live and we grok.

Now that the environment variables are set up according to Vite requirements, we can reference these keys in our firebase configuration file.

To setup your firebase configuration, add a \` firebaseConfig.js \` file to the project's \` src \` folder. The file will look like this:

\`\`\` javascript
//import npm packages
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

//Create our firebase App object
const firebaseConfig = {
	apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize firebase
const app = initializeApp(firebaseConfig);

//Initialize firestore
const db = getFirestore(app);

//initialize firebase auth
const auth = getAuth();

export { app, auth, db }
\`\`\`



You'll notice the environment keys have \` import.meta.env. \` prepended to them. This is another Vite-ism. You might be used to \` process.env. \` as a way to expose your environment variables. Vite uses \` import.meta.env. \` to do this.

Now you can access your Firestore database (db) and Firebase auth instances throughout the project. I interact with Firestore in my API layer. This is a folder called \` api \` inside of the \` src \` folder. I've got a file called \` conversations.api.js \` for chat conversation GET and UPDATE type functions. Here's an example of the file:

~~~ javascript
import { collection, query, where, updateDoc, getDocs } from "firebase/firestore";
import { db } from '../firebaseConfig'

const conversationsRef = collection(db, 'conversations');

async function getUnreadMessageCount(userId) {
	try {
		const unreadMessages = await getDocs(
			query(
				conversationsRef,
				where('participants', 'array-contains', userId),
				where('isRead', '==', false)
			)
		);
		// Get the count of unread messages
		const count = unreadMessages.size;

		return count;
	} catch (error) {
		console.error('Error getting unread messages:', error);
		throw error;
	}
}

export { 
	getUnreadMessageCount
}
~~~

I can then use the \` getUnreadMessageCount \` function throughout my project by importing it into my components, like so:


~~~ javascript
<script setup>
	import { useUserStore } from '../store/user'
	import { getUnreadMessageCount } from '../api/conversations.api'
	import { ref, onMounted } from 'vue'

	const store = useUserStore();
	const unreadMessageCount = ref(0);

	onMounted(async () => {
		try {
			const count = await getUnreadMessageCount(store.user.id);
			unreadMessageCount.value = count;
		} catch (error) {
			console.error('Error fetching unread message count:', error);
		}
	});
</script>

<template>
	<Suspense>
		<v-badge :content="unreadMessageCount" color="error">
			<v-icon>mdi-bell-outline</v-icon>
		</v-badge>
	</Suspense>
</template>
~~~

Alright then. I hope that helps.
`