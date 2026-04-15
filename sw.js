self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));

// 點通知時開啟行事曆
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const c of list) {
        if (c.url.includes('calendar.html') && 'focus' in c) return c.focus();
      }
      return clients.openWindow('./calendar.html');
    })
  );
});
