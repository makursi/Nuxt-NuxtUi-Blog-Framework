import { defineNuxtPlugin } from '#app'
import { useUserStore } from '~/stores/user'

/**
 * 用户数据管理插件
 * @description 客户端插件，用于初始化和提供用户数据
 */
export default defineNuxtPlugin(() => {
  const userStore = useUserStore()

  /**
   * 初始化用户数据
   * @description 从localStorage加载用户数据到store
   */
  const initializeUserData = (): void => {
    try {
      const userData = localStorage.getItem('userdata')
      if (userData) {
        const parsedUserData = JSON.parse(userData)
        userStore.setUser(parsedUserData?.user)
        userStore.setToken(parsedUserData?.token)
      }
    } catch (error) {
      console.error('Error initializing user data:', error)
    }
  }

  /**
   * 获取用户数据
   * @returns {Object} 用户数据对象，包含user和token属性
   */
  const getUserData = (): { user?: any; token?: string } => {
    return {
      user: userStore.user,
      token: userStore.token
    }
  }

  /**
   * 保存用户数据
   * @param {Object} userData - 用户数据
   */
  const saveUserData = (userData: { user: any; token: string }): void => {
    try {
      localStorage.setItem('userdata', JSON.stringify(userData))
      userStore.setUser(userData.user)
      userStore.setToken(userData.token)
    } catch (error) {
      console.error('Error saving user data:', error)
    }
  }

  /**
   * 清除用户数据
   */
  const clearUserData = (): void => {
    try {
      localStorage.removeItem('userdata')
      userStore.clearUser()
    } catch (error) {
      console.error('Error clearing user data:', error)
    }
  }

  // 初始化用户数据
  initializeUserData()

  return {
    provide: {
      getUserData,
      saveUserData,
      clearUserData
    }
  }
})
