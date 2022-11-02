import { useContext, useState } from "react";
import background from '../../public/background.jpg'
import { useRouter } from "next/router";
import { ConfirmAccountBackGround, ConfirmAccountPanel } from "./styled";
import { protectEmail } from "../../utils/string";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../../services/api";
import { getLogger } from "nodemailer/lib/shared";
import Swal from "sweetalert2";



function ConfirmAccount() {
  const [loading, setLoading] = useState<boolean>(false);
  const { user, signOut } = useContext(AuthContext)
  const router = useRouter()

  function sendToLoginAgain() {
    signOut()
    router.push("/signin")
  }

  async function resendVerify() {
    try {
      await api.put("/users/resend")

      Swal.fire({
        icon: "success",
        title: "Verify email was sent sucefully",
        text: "Verify your inbox"
      });

    } catch (err) {
      Swal.fire({
        icon: "warning",
        title: "Something went wrong",

      });
    }
  }

  return (
    <ConfirmAccountBackGround>
      <ConfirmAccountPanel>
        <div className="right-side content-box">
          <h2>Confirm your account</h2>
          <p>
            We sent you an email with the account confirmation link, open it to access our app.
          </p>

          <p>
            Check your email inbox in <b>{protectEmail(user?.email)}</b></p>

          <p>If you can't find it in your inbox, check your spam or click in re-send to get an new verification e-mail</p>

          <div className="action-buttons">
            <button type="submit" onClick={() => resendVerify()}>
              {loading ? "Wait a second..." : "Resend"}
            </button>
            <button type="submit" onClick={() => sendToLoginAgain()}>
              {loading ? "Wait a second..." : "Login"}
            </button>
          </div>


        </div>
      </ConfirmAccountPanel>
    </ConfirmAccountBackGround >
  );
}

export default ConfirmAccount;
