import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import "./login.css";

function SetPassword({ props, errors, flash }) {
    const { message, error_message } = props;
    const [validatePassword, setValidatePassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showPasswords, setShowPasswords] = useState(false);

    useEffect(() => {
        const userId = props?.user_id;
        if (userId) {
            Cookies.set("user_id", userId, { expires: 10 / 1440 });
        }
    }, [props.session]);

    let user_id = Cookies.get("user_id") || "timeout";

    const { data, setData, post, processing } = useForm({
        user_id: "",
        password: "",
        confirm_password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.password !== data.confirm_password) {
            setValidatePassword(true);
            return;
        }
        setValidatePassword(false);
        data.user_id = user_id;
        post(route("execute.final.signup"), data);
    };

    useEffect(() => {
        // sync showPasswords checkbox with individual password show states
        if(showPasswords) {
            setShowPassword(true);
            setShowConfirmPassword(true);
        } else {
            setShowPassword(false);
            setShowConfirmPassword(false);
        }
    }, [showPasswords]);

    return (
        <div className="login-container">
            <div className="login-wrapper">
                <div className="login-left">
                    <h2>ফাহাদ'স টিউটোরিয়াল-এ তোমাকে স্বাগতম</h2>
                    <img src="/assets/images/auth.7b116a16.png" alt="Welcome" />
                </div>

                <div className="login-form">
                    <div className="border border-primary p-4 rounded shadow">

                        {/* Flash messages above title */}
                        {(message || error_message) && (
                            <div className="mb-3">
                                {message && (
                                    <div className="alert alert-success text-center">
                                        {message}
                                    </div>
                                )}
                                {error_message && (
                                    <div className="alert alert-danger text-center">
                                        {error_message}
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="text-center mb-4">
                            <h2 className="fw-bold">পাসওয়ার্ড সেট করুন</h2>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 position-relative">
                                <label>নতুন পাসওয়ার্ড<span className="text-danger"> *</span></label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    // className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    placeholder="পাসওয়ার্ড লিখুন"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="btn btn-link position-absolute"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ top: '42px', right: '10px' }}
                                >
                                    {showPassword ? (
                                        <i className="fas fa-eye-slash" style={{ fontSize: '18px' }}></i>
                                    ) : (
                                        <i className="fas fa-eye" style={{ fontSize: '18px' }}></i>
                                    )}
                                </button>
                                {/* Show server password errors here */}
                                {errors.password && (
                                    <div className="invalid-feedback d-block">
                                        {Array.isArray(errors.password)
                                            ? errors.password.map((err, i) => <div key={i}>{err}</div>)
                                            : errors.password
                                        }
                                    </div>
                                )}
                            </div>

                            <div className="mb-3 position-relative">
                                <label>পাসওয়ার্ড নিশ্চিত করুন<span className="text-danger"> *</span></label>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    // className={`form-control ${errors.confirm_password ? 'is-invalid' : ''}`}
                                    placeholder="পুনরায় পাসওয়ার্ড লিখুন"
                                    name="confirm_password"
                                    value={data.confirm_password}
                                    onChange={(e) => setData('confirm_password', e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="btn btn-link position-absolute"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={{ top: '42px', right: '10px' }}
                                >
                                    {showConfirmPassword ? (
                                        <i className="fas fa-eye-slash" style={{ fontSize: '18px' }}></i>
                                    ) : (
                                        <i className="fas fa-eye" style={{ fontSize: '18px' }}></i>
                                    )}
                                </button>

                                {/* Password mismatch error */}
                                {validatePassword && (
                                    <small className="text-danger d-block mt-2">
                                        পাসওয়ার্ড মিলছে না। দুটি পাসওয়ার্ড একই হতে হবে।
                                    </small>
                                )}

                                {/* Show server confirm_password errors here */}
                                {errors.confirm_password && (
                                    <div className="invalid-feedback d-block">
                                        {Array.isArray(errors.confirm_password)
                                            ? errors.confirm_password.map((err, i) => <div key={i}>{err}</div>)
                                            : errors.confirm_password
                                        }
                                    </div>
                                )}
                            </div>

                            <div className="button-container">
                                <button
                                    type="submit"
                                    className="login-btn text-bold"
                                    disabled={processing}
                                >
                                    {processing ? "প্রসেসিং..." : "সাবমিট করুন"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SetPassword;
