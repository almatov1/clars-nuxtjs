export default function getImageSize(src: string) {
    return new Promise<{ w: number; h: number }>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            resolve({ w: img.width, h: img.height });
        };
    });
};