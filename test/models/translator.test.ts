// Set up mocks
import Translator from '../../src/models/translator'
vi.mock('../../src/models/languages', () => ({
    languages: {
        home: {
            title: {
                ENG: 'Mocked Home Title',
            },
        },
    },
}))

describe('Translator Tests', () => {
    test('Should retrieve text when a valid language is provided and the path is correct', () => {
        const translator = new Translator('ENG')
        expect(translator.get('home', 'title')).toBe('Mocked Home Title')
    })

    test('Should retrieve text in ENG when an invalid language is provided but the path is correct', () => {
        const translator = new Translator('FRA')
        expect(translator.get('home', 'title')).toBe('Mocked Home Title')
    })

    test('Should return undefined when the path is incorrect regardless of language', () => {
        const translator = new Translator('ENG')
        expect(translator.get('some', 'path')).toBe('')
        translator.setLanguage('FRA')
        expect(translator.get('some', 'path')).toBe('')
    })
})
