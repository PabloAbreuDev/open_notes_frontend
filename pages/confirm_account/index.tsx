import { useState } from "react";
import background from '../../public/background.jpg'
import { useRouter } from "next/router";
import { ConfirmAccountBackGround, ConfirmAccountPanel } from "./styled";
import { protectEmail } from "../../utils/string";



function ConfirmAccount() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter()

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

          <div className="action-buttons">
            <button type="submit">
              {loading ? "Wait a second..." : "Resend"}
            </button>
            <button type="submit">
              {loading ? "Wait a second..." : "Login"}
            </button>
          </div>


        </div>
      </ConfirmAccountPanel>
    </ConfirmAccountBackGround >
  );
}

export default ConfirmAccount;
