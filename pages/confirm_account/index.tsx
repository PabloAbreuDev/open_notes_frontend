import { api } from "../../services/api";
import Swal from "sweetalert2";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import background from '../../public/background.jpg'
import { useRouter } from "next/router";
import { ConfirmAccountBackGround, ConfirmAccountPanel } from "./styled";
import { protectEmail } from "../../utils/string";



function ConfirmAccount() {
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
    <ConfirmAccountBackGround style={{ backgroundImage: `url(${background.src})` }}>
      <ConfirmAccountPanel>
        <div className="right-side content-box">
          <h2>Confirm your account</h2>
          <p>
            We sent you an email with the account confirmation link, open it to access our app.
          </p>

          <p>
            Check your email inbox in <b>{protectEmail("email@email.com")}</b></p>

          <p>If you can't find it in your inbox, check your spam or click in re-send to get an new verification e-mail</p>

          <button type="submit">
            {loading ? "Wait a second..." : "Resend"}
          </button>
        </div>
      </ConfirmAccountPanel>
    </ConfirmAccountBackGround >
  );
}

export default ConfirmAccount;
