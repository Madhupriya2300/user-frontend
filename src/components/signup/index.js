import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AlphabetsValidation, InputTrimFunction, MobileNumberFirstNumberValidation, MobileNumberValidation, handleEmailValidation, passwordValidation } from "../../utils/validations";
import { FiEye, FiEyeOff } from "react-icons/fi";
import ButtonLoader from "../../common/buttonLoader";
import authActions from "../../redux/auth/actions";

export default function Index() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { buttonLoader } = useSelector(state => state.commonReducer);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [passState, setPassState] = useState(false);
    const [passState2, setPassState2] = useState(false);

    const onSubmit = (data) => {
        delete data?.confirmpassword;
        dispatch({
            type: authActions.USER_SIGNUP,
            payload: { navigate: navigate, data: data },
        });
    };

    return (
        <Container fluid className="d-flex justify-content-center align-items-center my-4">
            <div className="signupform col-11 col-sm-8 col-md-6 col-lg-6"
                style={{
                    borderRadius: "24px",
                    padding: "24px 34px 24px 34px",
                    gap: "28px",
                }}>
                <form>
                    <div
                        style={{ fontSize: "24px" }}
                        className="login-head mb-2"
                    >
                        Sign Up
                    </div>
                    <Row>
                        <div className="col-lg-6 col-md-12 pb-2">
                            <label htmlFor="fname" className="py-1">
                                First name <span className="text-danger">*</span>
                            </label>
                            <input
                                {...register("firstname", {
                                    required: "First name is required",
                                })}
                                onInput={AlphabetsValidation}
                                maxLength={50}
                                id="firstname"
                                type="text"
                                placeholder="Enter first name"
                                className="form-control"
                            />
                            {errors.firstname && (
                                <small className="text-danger">{errors.firstname.message}</small>
                            )}
                        </div>
                        <div className="col-lg-6 col-md-12 pb-2">
                            <label htmlFor="lname" className="py-1">
                                Last name <span className="text-danger">*</span>
                            </label>
                            <input
                                {...register("lastname", {
                                    required: "Last name is required",
                                })}
                                onInput={AlphabetsValidation}
                                maxLength={50}
                                id="lastname"
                                type="text"
                                placeholder="Enter last name"
                                className="form-control"
                            />
                            {errors.lastname && (
                                <small className="text-danger">{errors.lastname.message}</small>
                            )}
                        </div>
                        <div className="col-lg-6 col-md-12 pb-2">
                            <label htmlFor="email" className="py-1">
                                Email id <span className="text-danger">*</span>
                            </label>
                            <input
                                {...register("emailid", {
                                    required: "Email id is required",
                                    validate: handleEmailValidation,
                                })}
                                onInput={InputTrimFunction}
                                maxLength={50}
                                id="emailid"
                                type="email"
                                placeholder="Enter email id"
                                className="form-control"
                            />
                            {errors.emailid && (
                                <small className="text-danger">{errors.emailid.message}</small>
                            )}
                        </div>
                        <div className="col-lg-6 col-md-12 pb-2">
                            <label htmlFor="mobileno" className="py-1">
                                Mobile no <span className="text-danger">*</span>
                            </label>
                            <input
                                {...register("mobileno", {
                                    required: "Mobile number is required",
                                    minLength: {
                                        value: 10,
                                        message: "Enter valid mobile number",
                                    },
                                    validate: MobileNumberFirstNumberValidation
                                })}
                                onInput={MobileNumberValidation}
                                maxLength={10}
                                id="mobileno"
                                type="tel"
                                placeholder="Enter mobile number"
                                className="form-control"
                            />
                            {errors.mobileno && (
                                <small className="text-danger">{errors.mobileno.message}</small>
                            )}
                        </div>
                        <div className="col-lg-6 col-md-12 pb-2">
                            <label htmlFor="password" className="py-1">
                                Password <span className="text-danger">*</span>
                            </label>
                            <div className="form-password-input">
                                <input
                                    {...register("password", {
                                        required: "password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must have at least 8 characters",
                                        },
                                        validate: passwordValidation
                                    })}
                                    onInput={InputTrimFunction}
                                    maxLength={16}
                                    id="password"
                                    type={passState ? "text" : "password"}
                                    placeholder="Enter password"
                                    className="form-control"
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
                                <small className="text-danger">{errors.password.message}</small>
                            )}
                        </div>
                        <div className="col-lg-6 col-md-12  pb-2">
                            <label htmlFor="confirmpassword" className="py-1">
                                Confirm Password <span className="text-danger">*</span>
                            </label>
                            <div className="form-password-input">
                                <input
                                    {...register("confirmpassword", {
                                        required: "Confirm password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must have at least 8 characters",
                                        },
                                        validate: (val) => {
                                            if (watch('password') !== val) {
                                                return "Passwords does not match";
                                            }
                                        },
                                    })}
                                    onInput={InputTrimFunction}
                                    maxLength={16}
                                    id="confirmpassword"
                                    type={passState2 ? "text" : "password"}
                                    placeholder="Enter password"
                                    className="form-control"
                                />
                                <a
                                    href="#password"
                                    onClick={(ev) => {
                                        ev.preventDefault();
                                        setPassState2(!passState2);
                                    }}
                                    className={`form-icon lg form-icon-right passcode-switch ${passState2 ? "is-hidden" : "is-shown"}`}
                                >
                                    {!passState2 ?
                                        <FiEye className="password-eye-icon" /> :
                                        <FiEyeOff className="password-eye-icon" />
                                    }
                                </a>
                            </div>
                            {errors.confirmpassword && (
                                <small className="text-danger">{errors.confirmpassword.message}</small>
                            )}
                        </div>
                        <div className="col-lg-6 col-md-12 pb-2">
                            <label htmlFor="dob" className="py-1">
                                Role <span className="text-danger">*</span>
                            </label>
                            <select
                                className="form-select"
                                {...register('role', {
                                    required: "Role is required"
                                })}
                                defaultValue={""}
                            >
                                <option value={""} disabled>--Select--</option>
                                <option value={"User"}>User</option>
                                <option value={"Admin"}>Admin</option>
                                <option value={"Guest"}>Guest</option>
                            </select>
                            {errors.role && (
                                <small className="text-danger">{errors.role.message}</small>
                            )}
                        </div>
                    </Row>
                    <div className=" py-4 d-flex justify-content-center round-circle">
                        <button
                            className="btn"
                            style={{
                                backgroundColor: "#203272",
                                height: "48px",
                                width: "115px",
                                borderRadius: "43px",
                                color: "white",
                            }}
                            type="submit"
                            onClick={handleSubmit(onSubmit)}
                        >
                            {buttonLoader ? <ButtonLoader /> : "Signup"}
                        </button>
                    </div>
                    <div className="signup py-2 d-flex justify-content-center">
                        <span>Already have an account ? </span>
                        <Link
                            to="/login"
                            className="fw-bold"
                            style={{ color: "darkblue", textDecoration: "none" }}
                        >
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </Container>
    );
}
