export function reduceLength(text, len) {
    !len 
    return !len ? text : text.length <= len ? text : text.slice(0, len) + "..."
}