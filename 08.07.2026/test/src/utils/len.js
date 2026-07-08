export function reduceLength(text, len) {
    return !len ? text : text.length <= len ? text : text.slice(0, len) + "..."
}