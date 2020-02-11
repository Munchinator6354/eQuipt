import React from 'react'
import { useSelector } from 'react-redux'

export default function welcome() {
    const username = useSelector(state => state.username);

    return (
        <div>
            <h1> Welcome {username}</h1>
        </div>
    )
}
