export async function registerServiceWorker() {
    if (
        typeof window !== 'undefined' &&
        'serviceWorker' in navigator &&
        process.env.NODE_ENV === 'production'
    ) {
        try {
            // Wait for the page to be fully loaded
            if (document.readyState === 'complete') {
                await register();
            } else {
                window.addEventListener('load', register);
            }
        } catch (error) {
            console.error('Service worker registration failed:', error);
        }
    }
}

async function register() {
    try {
        const registration = await navigator.serviceWorker.register('/service-worker.js', {
            scope: '/',
        });

        console.log('Service Worker registered successfully:', registration);

        // Handle updates
        registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // New service worker available, show update notification
                        console.log('New service worker available');
                    }
                });
            }
        });
    } catch (error) {
        console.error('Service worker registration failed:', error);
    }
}

export async function unregisterServiceWorker() {
    if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
            await registration.unregister();
        }
    }
}
