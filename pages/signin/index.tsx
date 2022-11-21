import Swal from "sweetalert2";
import * as yup from "yup";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { SignInBackGround, SingInPanel } from "./styled";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/AuthContext";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { getApiClient } from "../../services/axios";



function SignIn() {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter()

    const { signIn } = useContext(AuthContext)


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
                await signIn({ email: values.email, password: values.password })

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
        <SignInBackGround>
            <SingInPanel>
                <div className="right-side content-box">
                    <h2>Acess the app</h2>
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
            </SingInPanel>
        </SignInBackGround>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const apiClient = getApiClient(ctx)
    const { '@opennotes:token': token } = parseCookies(ctx,)
    if (token) {
        return {
            redirect: {
                destination: '/home',
                permanent: true
            }
        }
    }
    return {
        props: {}
    }
}

export default SignIn;
