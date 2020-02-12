const userInfo = (state = "", action) => {

    switch(action.type){
        case 'get_userInfo':
            return action.payload;
        default: 
            return state;
    }
}

export default userInfo;