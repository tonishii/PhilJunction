
export function makeServerURL(url: URL | string) {
    return new URL(url, import.meta.env.VITE_SERVER_URL)
}