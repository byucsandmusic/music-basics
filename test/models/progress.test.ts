import { describe, it, expect, beforeEach, vi } from 'vitest'
import { progress } from '../../src/models//progress'

describe('progress function', () => {
    const moduleName = 'Rhythms'
    const id = 'tapAlongQuarterNotes'
    let progressFunctions: ReturnType<typeof progress>
    let mockStorage: Record<string, string> = {}

    beforeEach(() => {
        // Mock localStorage
        vi.stubGlobal('localStorage', {
            getItem: vi.fn((key) => mockStorage[key] || null),
            setItem: vi.fn((key, value) => {
                mockStorage[key] = value
            }),
            clear: vi.fn(() => {
                Object.keys(mockStorage).forEach((key) => delete mockStorage[key])
            }),
        })

        mockStorage = {}
        progressFunctions = progress({ moduleName, id })
    })

    it('should save progress correctly', () => {
        progressFunctions.saveProgress(true)
        expect(localStorage.setItem).toHaveBeenCalledWith(moduleName, JSON.stringify({ [id]: true }))
    })

    it('should retrieve progress correctly', () => {
        mockStorage[moduleName] = JSON.stringify({ [id]: true })
        const result = progressFunctions.getProgress()
        expect(localStorage.getItem).toHaveBeenCalledWith(moduleName)
        expect(result).toEqual({ [id]: true })
    })

    it('should check if component is done correctly', () => {
        mockStorage[moduleName] = JSON.stringify({ [id]: true })
        expect(progressFunctions.isComponentDone()).toBe(true)
        expect(localStorage.getItem).toHaveBeenCalledWith(moduleName)
    })

    it('should return false if component progress is not set', () => {
        expect(progressFunctions.isComponentDone()).toBe(false)
        expect(localStorage.getItem).toHaveBeenCalledWith(moduleName)
    })
})
