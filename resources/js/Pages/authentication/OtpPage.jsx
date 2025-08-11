import { useForm } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { route } from "ziggy-js";
import "./login.css";
import { router } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

function OtpPage({ props, flash, errors }) {
    // destruct props
    const { message, error_message } = props;

    // save user_id into cookie
    useEffect(() => {
        const userId = props?.user_id;
        if (userId) {
            Cookies.set("user_id", userId, { expires: 1 / 288 });
        }
    }, [props.session]);

    // Retrieve user_id from the cookie
    let user_id = Cookies.get("user_id") || "timeout";

    const [otp, setOtp] = useState(["", "", "", ""]);
    const { data, setData, post, processing } = useForm({
        otp: "",
        user_id: "",
    });

    const handleChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const otpCode = otp.join("");
        data.user_id = user_id;
        data.otp = otpCode;
        post(route("verify.otp"), data);
    };

    useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
        if (errors) Object.values(errors).forEach((error) => toast.error(error));
    }, [flash, errors]);

    return (
        <div className="login-container">
            <ToastContainer />

            <div className="login-wrapper">
                <div className="login-left">
                    <h2>ফাহাদ'স টিউটোরিয়াল-এ তোমাকে স্বাগতম</h2>
                    <img src="/assets/images/auth.7b116a16.png" alt="Welcome" />
                </div>

                <div className="login-form">
                    <div className="border border-primary p-4 rounded shadow">
                        <div className="text-center mb-4">
                            <h2 className="fw-bold">ওটিপি ভেরিফিকেশন</h2>
                        </div>

                        {message && (
                            <div
                                className="alert alert-success text-start mb-4"
                                dangerouslySetInnerHTML={{ __html: message }}
                            />
                        )}
                        {error_message && (
                            <div className="alert alert-danger text-center mb-4">
                                {error_message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="mb-4">
                            <div className="d-flex justify-content-center gap-3 mb-4">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`otp-input-${index}`}
                                        type="text"  // Changed back to text input
                                        className="form-control text-center otp-input"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(e.target.value, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                    />
                                ))}
                            </div>

                            <div className="button-container">
                                <button
                                    type="submit"
                                    className="login-btn text-bold"
                                    disabled={processing}
                                >
                                    {processing ? "প্রসেসিং..." : "যাচাই করো"}
                                </button>
                            </div>
                        </form>

                        {/* <hr className="my-4" />

                        <div className="text-center">
                            <p className="mb-1 fw-bold">কোন OTP পাওনি?</p>
                            <Link
                                href={route('auth.forgot.password')}
                                className="text-primary fw-bold"
                            >
                                আবার কোড পাঠাও
                            </Link>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OtpPage;
