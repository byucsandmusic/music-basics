export function progress(moduleName: string, page: string) {
    const saveProgress = (done: boolean) => {
        const progress = JSON.parse(localStorage.getItem(moduleName) || '{}')
        progress[page] = done
        localStorage.setItem(moduleName, JSON.stringify(progress))
    }

    const getProgress = () => {
        return JSON.parse(localStorage.getItem(moduleName) || '{}')
    }

    const isPageDone = () => {
        const progress = getProgress()
        return progress[page] || false
    }

    return { saveProgress, getProgress, isPageDone }
}
