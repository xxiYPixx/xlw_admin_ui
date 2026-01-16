import { describe, expect, it } from 'vitest'
import { toFormData } from '../../src/utils/form'

describe('toFormData', () => {
    it('filters null/undefined and serializes values', () => {
        const params = toFormData({
            name: 'Alice',
            age: 20,
            active: true,
            empty: undefined,
            none: null
        })
        expect(params.toString()).toBe('name=Alice&age=20&active=true')
    })
})
