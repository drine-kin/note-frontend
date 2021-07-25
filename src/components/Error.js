import React from 'react'

const Error = (props) => {
    return (
        <div className={props.message && 'errormsg_error'} >
            {props.message}
        </div>
    )
}

export default Error
