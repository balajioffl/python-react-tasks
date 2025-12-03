import React, { memo } from "react";

function UserCard({user}){

    console.log(user.name)

    return(
        <div>
            <h4>{user.name}</h4>
            <p>{user.mail}</p>
        </div>
    )
}

export default React.memo(UserCard)
