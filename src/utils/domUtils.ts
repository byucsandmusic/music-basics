export default function onDocReady(callback: () => any) {
    document.addEventListener('DOMContentLoaded', function () {
        callback()
    })
}
