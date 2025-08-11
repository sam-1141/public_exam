import React, { useEffect, useState } from "react";
import { Link, useForm, router } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";
import { useRoute } from "ziggy-js";
import "./login.css";

function Registration({ flash, errors }) {
    const route = useRoute();

    const { data, setData, post, processing, reset } = useForm({
        firstName: "",
        lastName: "",
        mobile: "",
        facebook: "",
    });

    const [mobileError, setMobileError] = useState("");
    const [facebookError, setFacebookError] = useState("");

    const validateMobile = (value) => {
        const digitsOnly = value.replace(/\D/g, "").slice(0, 11);
        const isValid = /^01\d{9}$/.test(digitsOnly);
        setMobileError(
            isValid ? "" : "মোবাইল নাম্বার অবশ্যই '01' দিয়ে শুরু হতে হবে এবং ১১ ডিজিট হতে হবে"
        );
        return digitsOnly;
    };

    const validateFacebookUrl = (url) => {
        const fbUrlRegex = /^(https?:\/\/)?(www\.|m\.|web\.|fb\.)?(facebook\.com|fb\.com)\/(profile\.php\?id=\d+|[A-Za-z0-9.\-_]+)(\/)?$/;
        return fbUrlRegex.test(url);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "mobile") {
            const formatted = validateMobile(value);
            setData(name, formatted);
        } else if (name === "facebook") {
            setData(name, value);
            // setFacebookError(
            //     validateFacebookUrl(value)
            //         ? ""
            //         : "ফেসবুক প্রোফাইল লিঙ্ক সঠিক নয়। পূর্ণ ইউআরএল দিন।"
            // );
        } else {
            setData(name, value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (mobileError || facebookError) return;

        const formattedMobile = data.mobile.startsWith("01") ? `88${data.mobile}` : data.mobile;

        router.post(
            route("execute.auth.registration"),
            {
                name: `${data.firstName} ${data.lastName}`.trim(),
                mobile: formattedMobile,
                fb_id: data.facebook,
            },
            {
                onSuccess: () => reset(),
                onError: (errors) => console.error(errors),
            }
        );
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
                        <form onSubmit={handleSubmit}>
                            <h2>সাইন আপ করো</h2>

                            <div className="name-fields">
                                <div>
                                    <label>
                                        নামের প্রথম অংশ <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="নামের প্রথম অংশ"
                                        value={data.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>
                                        নামের শেষ অংশ <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="নামের শেষ অংশ"
                                        value={data.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <label>
                                মোবাইল নাম্বার <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                                <span className="input-group-text h-100 border-end-0 d-flex align-items-center bg-white">
                                    +88
                                </span>
                                <input
                                    type="tel"
                                    name="mobile"
                                    className="form-control h-100 border-start-0"
                                    placeholder="01XXXXXXXXX"
                                    value={data.mobile}
                                    onChange={handleChange}
                                    maxLength={11}
                                    required
                                />
                            </div>
                            {mobileError && (
                                <small className="text-danger">{mobileError}</small>
                            )}

                            <div className="mb-3 text-md text-muted">
                                *তোমার ফোন নম্বরে একটি OTP পাঠানো হবে
                            </div>

                            <label>
                                ফেসবুক প্রোফাইল লিঙ্ক <span className="text-danger">*</span>
                            </label>
                            <input
                                type="url"
                                name="facebook"
                                placeholder="https://www.facebook.com/your.profile"
                                value={data.facebook}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                            {facebookError && (
                                <small className="text-danger">{facebookError}</small>
                            )}

                            <button
                                type="submit"
                                className="login-btn text-bold mt-3"
                                disabled={processing || mobileError || facebookError}
                            >
                                {processing ? "প্রসেসিং..." : "সাইন আপ"}
                            </button>

                            <hr />
                            <div>
                                সাইন আপ করার মাধ্যমে তুমি ফাহাদ'স টিউটোরিয়াল-এর{" "}
                                <Link>শর্তাদি</Link> এবং <Link>প্রাইভেসি পলিসিতে</Link> সম্মতি দিচ্ছো
                            </div>

                            <div className="signup-link">
                                <span>ফাহাদ'স টিউটোরিয়াল-এ অ্যাকাউন্ট আছে?</span>
                                <Link href={route("auth.login")} className="fw-bold">
                                    লগইন করো
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registration;
