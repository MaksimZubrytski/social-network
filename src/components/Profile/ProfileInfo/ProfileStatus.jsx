import { useEffect, useState } from 'react';

const ProfileStatus = (props) => {
    const [editMode, setEditMode] = useState(false);

    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        console.log("update status")
        setStatus(props.status)
    }, [props.status])

    const deactivateEditMode = () => {
        console.log(editMode);
        setEditMode(false);
        props.updateStatus(status);
        console.log(editMode);
    }

    const onStatusChange = (e) => {
        setStatus(e.target.value)
    }
    return (
        <>
            {!editMode &&
                <div>
                    <span onClick={() => {setEditMode(true)}}>{props.status || "No status"}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />
                </div>
            }
        </>
    )
}

export default ProfileStatus;