self.addEventListener('push', event => {
    const data = event.data.json();

    const options = {
        body: data.body,
        icon: 'android-chrome-512x512.png',
        badge: 'android-chrome-192x192.png',
        ...data
        // Другие опции уведомления
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', event => {
    const clickedNotification = event.notification;
    clickedNotification.close();

    // Используйте данные из уведомления
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then(function (windowClients) {
                // Проверить, нет ли уже открытой вкладки с этим URL
                for (let i = 0; i < windowClients.length; i++) {
                    const client = windowClients[i];
                    if (client.url === clickedNotification?.data?.url && 'focus' in client) {
                        return client.focus(); // Если найдена, переключиться на неё
                    }
                }
                // Если вкладка с URL не найдена, открыть новую
                if (clients.openWindow) {
                    return clients.openWindow(clickedNotification?.data?.url);
                }
            })
    );


});