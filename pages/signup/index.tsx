import { api } from "../../services/api";
import { SignUpBackGround, SingUpPanel } from "./styled";
import Swal from "sweetalert2";
import { listToError } from "../../utils/string";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import background from '../../public/background.jpg'
import Link from "next/link";

function signUp() {
    const [loading, setLoading] = useState<boolean>(false)

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            confirmEmail: "",
            password: "",
        },
        validationSchema: yup.object({
            firstName: yup.string().required("This field is required"),
            lastName: yup.string().required("This field is required"),
            email: yup
                .string()
                .email("Use a valid e-mail")
                .required("This field is required"),
            confirmEmail: yup
                .string()
                .email("Use a valid e-mail")
                .oneOf([yup.ref("email"), null], "Email must match")
                .required("This field is required"),
            password: yup
                .string()
                .min(6, "Password is too short - should be 6 chars minimum.")
                .max(30, "Password is too long - should be 30 chars maximum.")
                .required("This field is required"),
        }),
        async onSubmit(values, formikHelpers) {
            setLoading(true)
            try {
                const { data } = await api.post<{ token: string }>("/users", {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password,
                });

            } catch (err: any) {
                Swal.fire({
                    icon: "warning",
                    title: "Something went wrong",
                    html: listToError(err.response.data.additionalInfo),
                });
            }
            setLoading(false)
            return;
        },
    });

    return (
        <SignUpBackGround style={{ backgroundImage: `url(${background.src})` }}>
            <SingUpPanel>

                <div className="right-side content-box">
                    <h2>Get's started.</h2>
                    <p>
                        Already have an account? <b style={{ color: "#ff725e" }}><Link href="/signin">Log In</Link></b>
                    </p>
                    <form onSubmit={formik.handleSubmit}>
                        <div
                            className="form-group first-last-name"

                        >
                            <label>
                                <div>First Name</div>
                                <input
                                    type="text"
                                    name="firstName"
                                    onChange={formik.handleChange}
                                    value={formik.values.firstName}
                                />
                                <div className="error-message">
                                    {formik.touched.firstName && formik.errors.firstName ? (
                                        <div>{formik.errors.firstName}</div>
                                    ) : null}
                                </div>

                            </label>
                            <label>
                                <div>Last Name</div>
                                <input
                                    type="text"
                                    name="lastName"
                                    onChange={formik.handleChange}
                                    value={formik.values.lastName}
                                />
                                <div className="error-message">
                                    {formik.touched.lastName && formik.errors.lastName ? (
                                        <div>{formik.errors.lastName}</div>
                                    ) : null}</div>
                            </label>
                        </div>
                        <div className="form-group" style={{ marginBottom: "10px" }}>
                            <label style={{ marginBottom: "5px" }}>
                                <div>E-mail </div>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                                <div className="error-message">
                                    {formik.touched.email && formik.errors.email ? (
                                        <div>{formik.errors.email}</div>
                                    ) : null}
                                </div>
                            </label>
                            <label style={{ marginBottom: "5px" }}>
                                <div>Confirm your e-mail</div>
                                <input
                                    type="email"
                                    name="confirmEmail"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.confirmEmail}
                                />
                                <div className="error-message">
                                    {formik.touched.confirmEmail && formik.errors.confirmEmail ? (
                                        <div>{formik.errors.confirmEmail}</div>
                                    ) : null}
                                </div>
                            </label>
                            <label>
                                <div>Password</div>
                                <input
                                    type="password"
                                    name="password"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                                <div className="error-message">
                                    {formik.touched.password && formik.errors.password ? (
                                        <div>{formik.errors.password}</div>
                                    ) : null}
                                </div>
                            </label>
                        </div>
                        <button type="submit">{loading ? "Wait a second..." : "Register"}</button>
                    </form>
                </div>
            </SingUpPanel>
        </SignUpBackGround>
    );
}

export default signUp;
