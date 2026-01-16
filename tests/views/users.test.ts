import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import UsersView from '../../src/views/UsersView.vue'

vi.mock('../../src/api/modules/user', () => ({
    getUserPage: vi.fn().mockResolvedValue({
        data: { code: 0, msg: '', total: 0, rows: [] }
    }),
    createUser: vi.fn(),
    updateUser: vi.fn(),
    resetUserPassword: vi.fn(),
    getUserInfo: vi.fn(),
    deleteUser: vi.fn()
}))

vi.mock('element-plus', () => ({
    ElMessage: { error: vi.fn(), success: vi.fn() },
    ElMessageBox: { confirm: vi.fn() },
    ElForm: {}
}))

describe('UsersView', () => {
    it('renders Chinese heading', () => {
        const wrapper = mount(UsersView, {
            global: {
                plugins: [createPinia()],
                stubs: {
                    'el-form': { template: '<form><slot /></form>' },
                    'el-form-item': { template: '<div><slot /></div>' },
                    'el-input': { template: '<input />' },
                    'el-input-number': { template: '<input />' },
                    'el-table': { template: '<table><slot /></table>' },
                    'el-table-column': { template: '<col />' },
                    'el-button': { template: '<button><slot /></button>' },
                    'el-pagination': { template: '<div />' },
                    'el-dialog': { template: '<div><slot /></div>' },
                    'el-drawer': { template: '<div><slot /></div>' },
                    'el-descriptions': { template: '<div><slot /></div>' },
                    'el-descriptions-item': { template: '<div><slot /></div>' }
                }
            }
        })

        expect(wrapper.text()).toContain('用户管理')
    })
})
