// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.6.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyC3qL5dzdOvIv7raaEd3xWOOraCiRks0h0",
    authDomain: "mauri-services.firebaseapp.com",
    projectId: "mauri-services",
    storageBucket: "mauri-services.firebasestorage.app",
    messagingSenderId: "324986363643",
    appId: "1:324986363643:web:803453b8ff2681b51d1a5e"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// معالجة الإشعارات في الخلفية
messaging.onBackgroundMessage((payload) => {
    console.log('📬 Received background message:', payload);
    
    const notificationTitle = payload.notification?.title || 'Mauri Services';
    const notificationOptions = {
        body: payload.notification?.body || 'لديك إشعار جديد',
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%232c5aa0" rx="15"/><text x="50" y="68" font-family="Arial, sans-serif" font-size="45" text-anchor="middle" fill="white" font-weight="bold">MS</text></svg>',
        badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%232c5aa0" rx="15"/><text x="50" y="68" font-family="Arial, sans-serif" font-size="45" text-anchor="middle" fill="white" font-weight="bold">MS</text></svg>',
        tag: 'mauri-services-notification',
        requireInteraction: true,
        actions: [
            {
                action: 'open',
                title: 'فتح التطبيق'
            }
        ]
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// معالجة النقر على الإشعارات
self.addEventListener('notificationclick', (event) => {
    console.log('🔔 Notification click received:', event);
    
    event.notification.close();

    if (event.action === 'open') {
        event.waitUntil(
            clients.matchAll({ type: 'window' }).then((clientList) => {
                for (const client of clientList) {
                    if (client.url.includes('/') && 'focus' in client) {
                        return client.focus();
                    }
                }
                if (clients.openWindow) {
                    return clients.openWindow('/');
                }
            })
        );
    } else {
        // النقر العادي على الإشعار
        event.waitUntil(
            clients.matchAll({ type: 'window' }).then((clientList) => {
                for (const client of clientList) {
                    if (client.url.includes('/') && 'focus' in client) {
                        return client.focus();
                    }
                }
                if (clients.openWindow) {
                    return clients.openWindow('/');
                }
            })
        );
    }
});