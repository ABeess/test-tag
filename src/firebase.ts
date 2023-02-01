import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
	apiKey: 'AIzaSyBHGNTaD1_ZcMEP9mNS87nRx0GH_VoFj-0',
	authDomain: 'notification-f19f8.firebaseapp.com',
	projectId: 'notification-f19f8',
	storageBucket: 'notification-f19f8.appspot.com',
	messagingSenderId: '533004631107',
	appId: '1:533004631107:web:573a8181e0322cf06c68f6',
	measurementId: 'G-GDZD7BYTXG',
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound: any) => {
	return getToken(messaging, {
		vapidKey:
			'BMrKj151LenJC2zW21tl3mWAT7tBWpuy5M_cOfYCI93I07xJOAwZZOFXuT-UVR9jJGRhvm-e7RgE1bM3eNrbS_U',
	})
		.then((currentToken: any) => {
			if (currentToken) {
				console.log('current token for client: ', currentToken);
				setTokenFound(true);
				// Track the token -> client mapping, by sending to backend server
				// show on the UI that permission is secured
			} else {
				console.log(
					'No registration token available. Request permission to generate one.'
				);
				setTokenFound(false);
				// shows on the UI that permission is required
			}
		})
		.catch((err: any) => {
			console.log('An error occurred while retrieving token. ', err);
			// catch error while creating client token
		});
};

export const onMessageListener = () =>
	new Promise((resolve) => {
		onMessage(messaging, (payload) => {
			resolve(payload);
		});
	});

