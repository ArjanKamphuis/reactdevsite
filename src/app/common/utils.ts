import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export function getImageUrl(imageId: string, size: string = 's'): string {
    return `https://i.imgur.com/${imageId}${size}.jpg`;
}

export type NotificationTheme = 'dark' | 'light';

export function showNotification(message: string, theme: NotificationTheme): void {
    Toastify({
        text: message,
        duration: 2000,
        gravity: 'top',
        position: 'center',
        style: {
            background: theme === 'dark' ? 'black' : 'white',
            color: theme === 'dark' ? 'white' : 'black'
        }
    }).showToast();
}
