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
        const currentProgress = getProgress()
        const progress = JSON.parse(localStorage.getItem(progressInfo.moduleName) || '{}')
        // Ensure we only set progress if the value needs to be updated
        if (currentProgress[progressInfo.id] !== done) {
            progress[progressInfo.id] = done
            localStorage.setItem(progressInfo.moduleName, JSON.stringify(progress))
        }
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

/**
 * Retrieves all progress data for a given module.
 * @param moduleName Name of the module.
 * @returns An object with component IDs as keys and completion status (boolean) as values.
 */
export function getModuleProgress(moduleName: string) {
    const progress = JSON.parse(localStorage.getItem(moduleName) || '{}')

    const moduleOrder: Record<string, string[]> = {
        module0: [
            'rhythm-tap-along-quarter-notes',
            'rhythm-tap-along-half-notes',
            'rhythm-tap-along-eighth-notes',
            'rhythm-tap-along-mixed-1',
            'rhythm-tap-along-mixed-2',
        ],
        module1: [],
        // Add more modules as needed
    }

    const orderedComponents = moduleOrder[moduleName] || Object.keys(progress)

    return Object.fromEntries(
        orderedComponents.map((component) => [component, component in progress ? progress[component] : false])
    )
}

/**
 * Resets all progress data for a given module.
 * @param moduleName Name of the module.
 */
export function resetModuleProgress(moduleName: string) {
    localStorage.removeItem(moduleName)
}
