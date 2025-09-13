import { Link, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRoute } from "ziggy-js";
import "./login.css";
import { router } from "@inertiajs/react";

function ForgotPassword({ flash, errors }) {
    const route = useRoute();
    const { data, setData, post, processing } = useForm({
        mobile: "",
        email: "",
    });

    const [method, setMethod] = useState("mobile");
    const [mobileError, setMobileError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isMobileValid, setIsMobileValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);


    const validateMobile = (mobile) => {
        const regex = /^01[0-9]{9}$/;
        if (!mobile) {
            setMobileError("মোবাইল নাম্বার প্রয়োজন");
            setIsMobileValid(false);
            return false;
        } else if (!regex.test(mobile)) {
            setMobileError("মোবাইল নাম্বার অবশ্যই '01' দিয়ে শুরু হতে হবে এবং ১১ ডিজিট হতে হবে");
            setIsMobileValid(false);
            return false;
        }
        setMobileError("");
        setIsMobileValid(true);
        return true;
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError("ইমেইল প্রয়োজন");
            setIsEmailValid(false);
            return false;
        } else if (!regex.test(email)) {
            setEmailError("বৈধ ইমেইল দিন");
            setIsEmailValid(false);
            return false;
        }
        setEmailError("");
        setIsEmailValid(true);
        return true;
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
        if (name === "mobile") {
            validateMobile(value);
        }
        if (name === "email") {
            validateEmail(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = method === "mobile"
            ? validateMobile(data.mobile)
            : validateEmail(data.email);

        if (isValid) {
            const payload = method === "mobile"
                ? { mobile: data.mobile }
                : { email: data.email };

            console.log('payload', payload);

            post(route("execute.forgot.password"), {
                data: payload,
            });
        }
    };


    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
            flash.success = null;
        }

        if (flash.error) {
            toast.error(flash.error);
            flash.error = null;
        }

        if (errors) {
            Object.values(errors).forEach((error) => {
                toast.error(error);
            });
            errors = null;
        }
    }, [flash, errors]);

    return (
        <div className="login-container">
            <ToastContainer />

            <div className="login-wrapper">
                <div className="login-left">
                    <h2>ফাহাদ'স টিউটোরিয়াল-এ তোমাকে স্বাগতম</h2>
                    <img src="/assets/images/auth.7b116a16.png" alt="Welcome" />
                </div>

                <div className="login-form" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <div className="border border-primary p-4 rounded shadow" style={{
                        maxWidth: '450px',
                        width: '100%',
                        margin: '0 auto'
                    }}>
                        <form onSubmit={handleSubmit}>
                            <h2 className="fw-bold text-center">রিসেট পাসওয়ার্ড</h2>

                            <div className="mb-4 mt-5">
                                <h5 className="mb-2 fw-bold">পাসওয়ার্ড রিকভার করো</h5>
                                <p>তোমার ফোন নম্বর বা ইমেইল দাও। পাসওয়ার্ড রিসেট করার জন্যে তোমার দেওয়া মাধ্যমে একটি OTP পাঠানো হবে।</p>
                            </div>

                            {/* Tab Buttons */}
                            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                                <button
                                    type="button"
                                    onClick={() => setMethod("mobile")}
                                    className={`login-btn text-bold ${method === "mobile" ? "active" : ""}`}
                                    style={{
                                        flex: 1,
                                        backgroundColor: method === "mobile" ? "#0d6efd" : "#f8f9fa",
                                        color: method === "mobile" ? "#fff" : "#495057",
                                        border: '1px solid #ced4da'
                                    }}
                                >
                                    মোবাইল
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setMethod("email")}
                                    className={`login-btn text-bold ${method === "email" ? "active" : ""}`}
                                    style={{
                                        flex: 1,
                                        backgroundColor: method === "email" ? "#0d6efd" : "#f8f9fa",
                                        color: method === "email" ? "#fff" : "#495057",
                                        border: '1px solid #ced4da'
                                    }}
                                >
                                    ইমেইল
                                </button>
                            </div>

                            {/* Mobile Input */}
                            {method === "mobile" && (
                                <>
                                    <label>মোবাইল নাম্বার<span className="text-danger"> *</span></label>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        placeholder="01712345678"
                                        value={data.mobile}
                                        onChange={handleChange}
                                    />
                                    {mobileError && (
                                        <small className="text-danger">{mobileError}</small>
                                    )}
                                </>
                            )}

                            {/* Email Input */}
                            {method === "email" && (
                                <>
                                    <label>ইমেইল<span className="text-danger"> *</span></label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="example@email.com"
                                        value={data.email}
                                        onChange={handleChange}
                                    />
                                    {emailError && (
                                        <small className="text-danger">{emailError}</small>
                                    )}
                                </>
                            )}

                            <div className="button-container" style={{
                                display: 'flex',
                                gap: '10px',
                                marginTop: '20px',
                                flexDirection: window.innerWidth <= 768 ? 'column-reverse' : 'row'
                            }}>
                                <button
                                    type="button"
                                    className="login-btn text-bold"
                                    onClick={() => router.get(route('auth.login'))}
                                    style={{
                                        backgroundColor: '#f8f9fa',
                                        color: '#495057',
                                        border: '1px solid #ced4da',
                                        flex: 1
                                    }}
                                >
                                    বাতিল করো
                                </button>
                                <button
                                    type="submit"
                                    className={`login-btn text-bold ${(
                                        processing ||
                                        (method === "mobile" && !isMobileValid) ||
                                        (method === "email" && !isEmailValid)
                                    ) ? "btn-disabled" : ""}`}
                                    disabled={
                                        processing ||
                                        (method === "mobile" && !isMobileValid) ||
                                        (method === "email" && !isEmailValid)
                                    }
                                    style={{ flex: 1 }}
                                >
                                    {processing ? "প্রসেসিং..." : "এগিয়ে যাও"}
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
