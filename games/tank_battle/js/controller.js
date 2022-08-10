export const keys = {}

window.addEventListener('keydown', (e) => {
    const { key } = e;
    keys[key] = true
})

window.addEventListener('keyup', (e) => {
    const { key } = e;
    keys[key] = false
})