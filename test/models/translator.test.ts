// Set up mocks
import Translator from '../../src/models/translator'
vi.mock('../../src/models/languages', () => ({
    languages: {
        home: {
            title: {
                EN: 'Mocked Home Title',
            },
        },
    },
}))

describe('Translator Tests', () => {
    test('Should retrieve text when a valid language is provided and the path is correct', () => {
        const translator = new Translator('EN')
        expect(translator.get('home', 'title')).toBe('Mocked Home Title')
    })

    test('Should retrieve text in EN when an invalid language is provided but the path is correct', () => {
        const translator = new Translator('FR')
        expect(translator.get('home', 'title')).toBe('Mocked Home Title')
    })

    test('Should return undefined when the path is incorrect regardless of language', () => {
        const translator = new Translator('EN')
        expect(translator.get('some', 'path')).toBeUndefined()
        translator.setLanguage('FR')
        expect(translator.get('some', 'path')).toBeUndefined()
    })
})
