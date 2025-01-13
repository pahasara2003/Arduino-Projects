self.addEventListener("push", function (event) {
  const options = {
    body: event.data ? event.data.text() : "No payload",
    icon: "/pwa-192x192.png",
    badge: "/badge.png",
    tag: "pwa-notification",
    data: {
      url: "https://your-website.com",
    },
  };

  event.waitUntil(self.registration.showNotification("New Message!", options));
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  const url = event.notification.data.url || "/";
  event.waitUntil(clients.openWindow(url));
});
