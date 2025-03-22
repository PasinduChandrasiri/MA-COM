import React, { useImperativeHandle, forwardRef, useState } from "react";
import "./Pop_up.css";

const Pop_up = forwardRef((props, ref) => {
    const [toasts, setToasts] = useState([]);

    const messages = {
        success: '<i class="fa-solid fa-circle-check"></i> Successfully Logged in',
        exit: '<i class="fa-solid fa-circle-check"></i> Successfully Logged out',
        accountCreate: '<i class="fa-solid fa-circle-check"></i> Account created Successfully',
        Recovered: '<i class="fa-solid fa-circle-check"></i> Password recovered successfully',
        addNotice: '<i class="fa-solid fa-circle-check"></i> Notice added successfully',
        addNon: '<i class="fa-solid fa-circle-check"></i> Non academic member added successfully',
        addCourse: '<i class="fa-solid fa-circle-check"></i> Course added successfully',
        addLecturer: '<i class="fa-solid fa-circle-check"></i> Lecturer added successfully',
        update: '<i class="fa-solid fa-circle-check"></i> Updated successfully',
        delete: '<i class="fa-solid fa-circle-check"></i> Deleted successfully',
        addComment: '<i class="fa-solid fa-circle-check"></i> Comment added successfully',
        OTPsent: '<i class="fa-solid fa-circle-check"></i> OTP sent to your email successfully ',
        
        error: '<i class="fa-solid fa-circle-xmark"></i> Password is incorrect',
        errorPasswordCompair: '<i class="fa-solid fa-circle-xmark"></i> Password and confirm password are different',
        NotAccount: '<i class="fa-solid fa-circle-xmark"></i> Account is not available. Please sign up!',
        GoingWrong: '<i class="fa-solid fa-circle-xmark"></i> Something went wrong!',
        OTPsentFailed: '<i class="fa-solid fa-circle-xmark"></i> OTP sent failed',
        
        invalid: '<i class="fa-solid fa-circle-exclamation"></i> Invalid input, check again',
        AlreadyRecovered: '<i class="fa-solid fa-circle-exclamation"></i> Already submitted a request',
        signUpInvalid: '<i class="fa-solid fa-circle-exclamation"></i> Some field(s) are empty, check again',
        haveAccount: '<i class="fa-solid fa-circle-exclamation"></i> Already have account using this email',
        validation: '<i class="fa-solid fa-circle-exclamation"></i> Password length should be at least 8 characters, lowercase, uppercase and symbols',
        emailValidation: '<i class="fa-solid fa-circle-exclamation"></i> Email should be 20XXeXXX@eng.jfn.ac.lk type',
        invalidOTP: '<i class="fa-solid fa-circle-exclamation"></i> Invalid OTP. Please try again',
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
