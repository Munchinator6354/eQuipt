const username = (state = "", action) => {

    switch(action.type){
        case 'get_Username':
            return action.payload;
        default: 
            return state;
    }
}

export default username;