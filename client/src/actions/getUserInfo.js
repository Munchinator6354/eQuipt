export const userInfo = (userInfo) => {
    return {
        type: 'get_userInfo',
        payload: userInfo
    }
}