const CACHE_NAME = 'mauri-services-v2.0.0'; // غير الرقم إلى إصدار جديد

// الملفات التي تريد تخزينها في الكاش
const urlsToCache = [
  '/',
  '/index.html',
  '/services.html',
  '/agents.html', 
  '/agent-tasks.html',
  '/contact.html',
  '/me.html'
];

// حدث التثبيت - يحذف الكاش القديم أولاً
self.addEventListener('install', (event) => {
  console.log('🔄 Service Worker installing...');
  self.skipWaiting(); // مهم للتحديث الفوري
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      // حذف جميع الكاشات القديمة
      return Promise.all(
        cacheNames.map((cacheName) => {
          console.log('🗑️ Deleting old cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      // إنشاء كاش جديد
      return caches.open(CACHE_NAME);
    }).then((cache) => {
      console.log('✅ New cache created:', CACHE_NAME);
      return cache.addAll(urlsToCache);
    })
  );
});

// حدث التفعيل - يؤكد الحذف
self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker activated');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🧹 Removing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('🎉 All old caches removed!');
      return self.clients.claim(); // يجعل التحديث فوري
    })
  );
});

// حدث الجلب - يعطي الأولوية للشبكة
self.addEventListener('fetch', (event) => {
  // تجاهل طلبات غير GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // إذا نجح الاتصال، تحديث الكاش
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseClone);
            });
        }
        return networkResponse;
      })
      .catch(() => {
        // إذا فشل الاتصال، استخدم الكاش
        return caches.match(event.request)
          .then((cachedResponse) => {
            return cachedResponse || caches.match('/index.html');
          });
      })
  );
});