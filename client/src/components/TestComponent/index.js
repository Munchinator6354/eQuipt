import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment } from '../../actions/incrementAction';
import { login } from '../../actions/logIn';
import { logout } from '../../actions/logout';

export default function TestComponent() {
    const counter = useSelector(state => state.counter);
    const isLogged = useSelector(state => state.isLogged);
    const dispatch = useDispatch();
    
    return (
        <div>
            <h1>Counter {counter}</h1>
            {isLogged ? <h3>Valuable Information</h3>: ''}
            <button onClick={()=> dispatch(increment())}>ADD</button>
            <button onClick={()=> dispatch(login())}>Sign In</button>
            <button onClick={()=> dispatch(logout())}>Sign Out</button>
    
        </div>
    )
}
