import { UseCard } from "../components/partials/UseCard";
import { capitalize } from "../features/capitalize";
import { useSelector, useDispatch } from "react-redux";
import { logout, deleteUser, reset, uploadImage } from "../features/auth/authSlice";
import { useState, useRef } from "react";
import Avatar from 'react-avatar';

const deleteStyle = {
    boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.5)",
    zIndex: 10,
};

export const UserData = () => {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const [imageFile, setImageFile] = useState(null);

    const onDelete = () => {
        dispatch(deleteUser(user._id));
        dispatch(logout());
        dispatch(reset());
    };

    const onConfirmDelete = () => {
        onDelete();
        setConfirmDelete(false);
        setRedirect(true);
        timer();
    };

    const timer = () => {
        setTimeout(() => {
            setCountdown(2);
        }, 1000);
        setTimeout(() => {
            setCountdown(1);
        }, 2000);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files && event.target.files[0];
        if (file && file.type.startsWith("image/")) {
          setImageFile(file);
        }
      };
          
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (imageFile) {
          const formData = new FormData();
          formData.append("image", imageFile);
          await dispatch(uploadImage(formData));
          console.log('successful upload');
        }
      };

    return redirect ? (
        <UseCard
            bgcolor="success"
            opacity="10"
            header="User Deleted"
            onLoad={setTimeout(() => {
                setRedirect(false);
                window.location.href = "/";
            }, 3000)}
            body={
                <>
                    <p>
                        Your account has been deleted. You will be redirected to
                        the Home page in <strong>{countdown}</strong> seconds.
                    </p>
                </>
            }
        />
    ) : (
        <>
            <UseCard
                bgcolor="success"
                opacity="10"
                header="User Data"
                body={
                    <>
                        <p>Name: {capitalize(user.name)}</p>
                        <p>Email: {user.email}</p>
                        <p>Account Number: {user.account}</p>
                        <h5>Balance: ${user.balance ? user.balance.toLocaleString() : ''}</h5>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="fileInput">
                             <Avatar
                                src={imageFile ? URL.createObjectURL(imageFile) : user.image}
                                size={100}
                                round
                                onClick={handleFileUpload}
                             />
                            </label>
                            <input
                                type="file"
                                id="fileInput"
                                accept="image/*"
                                style={{ display: "none" }}
                                ref={fileInputRef}
                                onChange={(event) => handleFileUpload(event)}
                                />
                            </form>
            <br></br>
                        <button
                            type="submit"
                            className="btn btn-outline-success"
                            onLoad={console.log(user._id)}
                            onClick={() => setConfirmDelete(true)}
                       >
                            Delete User
                        </button>
                    </>
                }
            />
            {confirmDelete ? (
                <div className="text-center">
                    <p>
                        <span className="fw-bolder">CONFIRM DELETE</span>
                        <br />
                        Deleting a user is permanent!
                    </p>
                    <button
                        className="btn mt-2 mx-5 btn-outline-warning"
                        onClick={() => setConfirmDelete(false)}
                        id="createButton"
                        style={deleteStyle}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn mt-2 mx-5 btn-outline-danger"
                        id="transactionButton"
                        style={deleteStyle}
                        onClick={onConfirmDelete}
                    >
                        Confirm
                    </button>
                </div>
            ) : null}
            
        </>
    );
};

export default UserData;
