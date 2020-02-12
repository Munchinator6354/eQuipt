export const getUserInfo = (userInfo) => {
    return {
        type: 'get_userInfo',
        payload: userInfo
    }
}