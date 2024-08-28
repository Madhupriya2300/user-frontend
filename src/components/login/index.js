import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authActions from "../../redux/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import { InputTrimFunction, handleEmailValidation, passwordValidation } from "../../utils/validations";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Container, Row } from "react-bootstrap";
import ButtonLoader from "../../common/buttonLoader";

export default function Index() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { buttonLoader } = useSelector(state => state.commonReducer);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [passState, setPassState] = useState(false);

    const onSubmit = (data) => {
        dispatch({
            type: authActions.USER_LOGIN,
            payload: { navigate: navigate, data: data },
        });
    };

    return (
        <Container fluid className="d-flex justify-content-center align-items-center mt-5 pt-5">
            <div
                className="loginform col-11 col-sm-8 col-md-6 col-lg-6"
                style={{
                    borderRadius: "24px",
                    padding: "24px 34px 24px 34px",
                    gap: "28px",
                }}
            >
                <form>
                    <div className="email-password">
                        <div
                            style={{ fontSize: "24px" }}
                            className="login-head "
                        >
                            Login
                        </div>
                        <Row >
                            <div className="col-lg-6 col-md-12 my-4">
                                <label htmlFor="emailid">
                                    Email id<span className="text-danger mx-2">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    id="emailid"
                                    maxLength={50}
                                    type="email"
                                    placeholder="Enter email id"
                                    {...register("emailid", {
                                        required: "Email id is required",
                                        validate: handleEmailValidation,
                                    })}
                                />
                                {errors.emailid && (
                                    <small className="text-danger">
                                        {errors.emailid.message}
                                    </small>
                                )}
                            </div>
                            <div className="col-lg-6 col-md-12 my-4">
                                <label htmlFor="password">
                                    Password<span className="text-danger mx-2">*</span>
                                </label>
                                <div className="form-password-input">
                                    <input
                                        type={passState ? "text" : "password"}
                                        maxLength={20}
                                        id="password"
                                        placeholder="Enter password"
                                        className="form-control"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 8,
                                                message: "Password must have at least 8 characters",
                                            },
                                            validate: passwordValidation
                                        })}
                                        onInput={InputTrimFunction}
                                    />
                                    <a
                                        href="#password"
                                        onClick={(ev) => {
                                            ev.preventDefault();
                                            setPassState(!passState);
                                        }}
                                        className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                                    >
                                        {!passState ?
                                            <FiEye className="password-eye-icon" /> :
                                            <FiEyeOff className="password-eye-icon" />
                                        }
                                    </a>
                                </div>
                                {errors.password && (
                                    <small className="text-danger">
                                        {errors.password.message}
                                    </small>
                                )}
                            </div>
                        </Row>
                    </div>
                    <div className="login d-flex justify-content-center mt-2">
                        <button
                            className="btn"
                            style={{
                                backgroundColor: "#203272",
                                height: "38px",
                                width: "90px",
                                borderRadius: "43px",
                                color: "white",
                            }}
                            type="submit"
                            onClick={handleSubmit(onSubmit)}
                        >
                            {buttonLoader ? <ButtonLoader /> : "Login"}
                        </button>
                    </div>
                </form>
                <div className="signup py-3 d-flex flex-md-row align-items-center justify-content-center">
                    <span className="text-nowrap mx-1 ">Don't have an account ? </span>
                    <Link
                        to={"/"}
                        className="fw-bold text-nowrap"
                        style={{ color: "darkblue", textDecoration: "none" }}
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </Container>
    );
}
