export const getAdminInventory = (adminInventory) => {
    return {
        type: 'get_adminInventory',
        payload: adminInventory
    }
}