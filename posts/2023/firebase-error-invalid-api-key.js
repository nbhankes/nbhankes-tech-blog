/* INSERT MARKDOWN POST AS STRING HERE */
export const post = `
#Uncaught FirebaseError: Firebase: Error (auth/invalid-api-key)

I recently connected a Vue.js 3 app with Google Firebase. I cobbled together an environment variables solution following various examples I'd found in online tutorials. It's no surprise I encountered the following error:

<figure>
	<img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/p79q8poss2r4o1sh1glp.PNG"  alt="Uncaught FirebaseError: Firebase: Error (auth/invalid-api-key)" style="margin: 0 10%; max-width:80%;">
</figure>

After diving into the issue, I discovered my error and resolved the issue using the approach I share below.

##How I got started

Following the Vue.js [Quick Start](https://vuejs.org/guide/quick-start.html) guide, I created a new project using the recommened command \`\`\` npm create vue@latest  \`\`\`

This command installs and creates \`\`\` create-vue \`\`\` —which is a scaffolding tool used to configure the Vue.js project with a choose your own adventure list of feature options.

Prior to \`\`\` create-vue \`\`\`, Vue.js projects were generated from Vue CLI (now in maintenance mode) and were based on webpack. The newer \`\`\` create-vue \`\`\` projects are based on Vite. Vite and webpack are both build tools. 

These build tools handle environment variables differently. The examples I'd found online were out of date. And before I'd wrapped my head around the build tool differences, a quick Google search for ~"vue js environment variables" sent me to the outdated Vue CLI documentation.

Which brings me back to \`\`\` Uncaught FirebaseError: Firebase: Error (auth/invalid-api-key) \`\`\`


##How to set up Google Firebase in your Vue project

I'll assume you've already created your Firebase project and have your Firebase configuration keys and values. Hint: They're in the Project settings. And I'll also assume you've added the appropriate [Firebase npm packages](https://firebase.google.com/docs/web/setup) to your project.

I'll assume you've already created a Vue 3 project using \`\`\` npm create vue@latest  \`\`\`

Okay. With that behind us, let's move on:

Create a \`\`\` .env \`\`\` file in the root folder of your Vue project. Add your Firebase configuration key values to this file. 


\`\`\` 
VITE_APP_FIREBASE_API_KEY=" <YOUR API KEY> "
VITE_APP_FIREBASE_AUTH_DOMAIN=" <YOUR AUTH DOMAIN> "
VITE_APP_FIREBASE_PROJECT_ID=" <YOUR PROJECT ID> "
VITE_APP_FIREBASE_STORAGE_BUCKET=" <YOUR STORAGE BUCKET> "
VITE_APP_FIREBASE_MESSAGING_SENDER_ID=" <YOUR MESSAGING SENDER ID> "
VITE_APP_FIREBASE_APP_ID=" <YOUR APP ID> "
VITE_APP_FIREBASE_MEASUREMENT_ID=" <YOUR MEASUREMENT ID> "
\`\`\`

Your key names have to start with "VITE" for the [Vite build tool to handle these environment variables](https://vitejs.dev/guide/env-and-mode.html#env-variables) appropriately. Without this, your environment variables simply return \`\`\` undefined \`\`\`. This is where my error came from. But alas, we live and we grok.

Now that the environment variables are set up according to Vite requirements, we can reference these keys in our firebase configuration file.

Add a \`\`\` firebaseConfig.js \`\`\` file to the project's \`\`\` src \`\`\` folder. The file will look like this:

\`\`\`

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

You'll notice the environment keys have \`\`\` import.meta.env. \`\`\` prepended to them. This is another Vite-ism. You might be used to \`\`\` process.env. \`\`\` as a way to expose your environment variables. Vite uses \`\`\` import.meta.env. \`\`\` to do this.

Now you can access your Firestore database (db) and Firebase auth instances throughout the project like so:

\`\`\`
<script setup>
		import { db } from '../../firebaseConfig';
		import { getDocs, collection, query, where, orderBy } from 'firebase/firestore';

		const conversationsRef = collection(db, 'conversations');

		const getAllMessagesQuery = query(conversationsRef, where('participants', "array-contains", store.user.uid), orderBy('createdAt', "asc"));

		const messagesSnapshot = await getDocs(getAllMessagesQuery);
		...
</script>
\`\`\`

Alright then. I hope that helps.
`