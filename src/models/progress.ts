/**
 * Call the function with "<moduleName>" and "<desiredComponentName>"
 * and it will return functions to get and update that boolean locally.
 * ex: const { saveProgress, getProgress, isComponentDone } = progress('Rhythms', 'tapAlongQuarterNotes')
 *
 * @param moduleName name of the module the component is in
 * @param component desired name of the component
 * @returns
 */

export function progress(moduleName: string, component: string) {
    const saveProgress = (done: boolean) => {
        const progress = JSON.parse(localStorage.getItem(moduleName) || '{}')
        progress[component] = done
        localStorage.setItem(moduleName, JSON.stringify(progress))
    }

    const getProgress = () => {
        return JSON.parse(localStorage.getItem(moduleName) || '{}')
    }

    const isComponentDone = () => {
        const progress = getProgress()
        return progress[component] || false
    }

    return { saveProgress, getProgress, isComponentDone }
}
