const adminInventory = (state = "", action) => {

    switch(action.type){
        case 'get_adminInventory':
            return action.payload;
        default: 
            return state;
    }
}

export default adminInventory;