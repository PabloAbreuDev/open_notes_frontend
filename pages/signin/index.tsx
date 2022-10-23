import { api } from "../../services/api";
import Swal from "sweetalert2";
import { listToError } from "../../utils/string";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { SignUpBackGround, SingUpPanel } from "./styled";
import Link from "next/link";
import jwt_decode from "jwt-decode";
import background from '../../public/background.jpg'
import { useRouter } from "next/router";



function signUp() {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter()


    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup
                .string()
                .email("Use a valid e-mail")
                .required("This field is required"),
            password: yup
                .string()
                .min(6, "Password is too short - should be 6 chars minimum.")
                .max(30, "Password is too long - should be 30 chars maximum.")
                .required("This field is required"),
        }),
        async onSubmit(values, formikHelpers) {
            setLoading(true);
            try {

                const { data } = await api.put<{ token: string }>("/users/login", {
                    email: values.email,
                    password: values.password,
                });

                const decoded: { id: string, verified: boolean } = jwt_decode(data.token)

                if (!decoded.verified) {
                    router.push("confirm_account/")
                }
            } catch (err: any) {
                console.log(err)

                Swal.fire({
                    icon: "warning",
                    title: "Something went wrong",
                    html: err.response.data.message,
                });

            }
            setLoading(false);
        },
    });

    return (
        <SignUpBackGround style={{ backgroundImage: `url(${background.src})` }}>
            <SingUpPanel>
                <div className="right-side content-box">
                    <h2>Get's started.</h2>
                    <p>
                        Dont have an account yet?{" "}
                        <b style={{ color: "#ff725e" }}>
                            <Link href="/signup">Sing Up</Link>
                        </b>
                    </p>
                    <form onSubmit={formik.handleSubmit}>
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
                        <button type="submit">
                            {loading ? "Wait a second..." : "Login"}
                        </button>
                    </form>
                </div>
            </SingUpPanel>
        </SignUpBackGround>
    );
}

export default signUp;
