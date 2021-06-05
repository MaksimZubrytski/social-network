import { useEffect, useState } from 'react';

const ProfileStatus = (props) => {
    const [editMode, setEditMode] = useState(false);

    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status])

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
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