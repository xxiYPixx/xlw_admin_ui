import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createPinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import LoginView from '../../src/views/LoginView.vue'

describe('LoginView', () => {
    it('renders Chinese title and button', async () => {
        const router = createRouter({
            history: createMemoryHistory(),
            routes: [{ path: '/login', component: LoginView }]
        })
        await router.push('/login')
        await router.isReady()

        const wrapper = mount(LoginView, {
            global: {
                plugins: [createPinia(), router],
                stubs: {
                    'el-form': { template: '<form><slot /></form>' },
                    'el-form-item': { template: '<div><slot /></div>' },
                    'el-input': { template: '<input />' },
                    'el-button': { template: '<button><slot /></button>' }
                }
            }
        })

        expect(wrapper.text()).toContain('迅邻屋管理端')
        expect(wrapper.text()).toContain('登录')
    })
})
