import React from "react";

const UserImg = (props) => {
    return (
        <>
            <div className={`user-img ${props.lg ===true && 'lg'}`}>
                <span className="rounded-circle">
                    <img src={props.img} />
                </span>
            </div>
        </>
    )
}


export default UserImg;

