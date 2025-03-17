/**
 * Call the function with "<moduleName>" and "<desiredComponentName>"
 * and it will return functions to get and update progress boolean locally.
 * ex: const { saveProgress, getProgress, isComponentDone } = progress('Rhythms', 'tapAlongQuarterNotes')
 *
 * @param moduleName name of the module the component is in
 * @param id desired name of the component
 * @returns saveProgress, getProgress, isComponentDone
 */

export interface ProgressInfo {
    moduleName: string
    id: string
}

export function progress(progressInfo: ProgressInfo) {
    const saveProgress = (done: boolean) => {
        const progress = JSON.parse(localStorage.getItem(progressInfo.moduleName) || '{}')
        progress[progressInfo.id] = done
        localStorage.setItem(progressInfo.moduleName, JSON.stringify(progress))
    }

    const getProgress = () => {
        return JSON.parse(localStorage.getItem(progressInfo.moduleName) || '{}')
    }

    const isComponentDone = () => {
        const progress = getProgress()
        return progress[progressInfo.id] || false
    }

    return { saveProgress, getProgress, isComponentDone }
}
