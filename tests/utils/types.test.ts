import { describe, expect, it } from 'vitest'
import { isSuccess } from '../../src/api/types'

describe('isSuccess', () => {
    it('accepts code 0 and 200', () => {
        expect(isSuccess(0)).toBe(true)
        expect(isSuccess(200)).toBe(true)
    })

    it('rejects other codes', () => {
        expect(isSuccess(1)).toBe(false)
        expect(isSuccess(undefined)).toBe(false)
    })
})
