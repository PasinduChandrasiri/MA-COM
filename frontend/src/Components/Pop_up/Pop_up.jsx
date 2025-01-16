import React, { useImperativeHandle, forwardRef, useState } from "react";
import "./Pop_up.css";

const Pop_up = forwardRef((props, ref) => {
    const [toasts, setToasts] = useState([]);

    const messages = {
        success: '<i class="fa-solid fa-circle-check"></i> Successfully Logged in',
        error: '<i class="fa-solid fa-circle-xmark"></i> Please fix the error',
        invalid: '<i class="fa-solid fa-circle-exclamation"></i> Invalid input, check again',
    };

    const showToast = (type) => {
        const msg = messages[type];
        if (!msg) return;

        const toast = { id: Date.now(), message: msg, type };
        setToasts((prevToasts) => [...prevToasts, toast]);

        setTimeout(() => {
            setToasts((prevToasts) =>
                prevToasts.map((t) =>
                    t.id === toast.id ? { ...t, isRemoving: true } : t
                )
            );

            setTimeout(() => {
                setToasts((prevToasts) => prevToasts.filter((t) => t.id !== toast.id));
            }, 500); 
        }, 4000);
    };

    useImperativeHandle(ref, () => ({
        showToast,
    }));

    return (
        <div id="toastBox">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`toast ${toast.type} ${toast.isRemoving ? "moveRight" : ""
                        }`}
                    dangerouslySetInnerHTML={{ __html: toast.message }}
                ></div>
            ))}
        </div>
    );
});

export default Pop_up;
