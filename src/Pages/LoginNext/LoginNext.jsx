import React from "react";
import styles from "./LoginNext.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userLogin } from "../../store/actions/login";
import MailSend from "./preview.jpg";
import LoginMessage from "../LoginMessage/LoginMessage";

const schema = z.object({
  email: z.string().email(),
});

const LoginNext = () => {
  const [loginMessage, setLoginMessage] = React.useState(false);
  const baseUrl = window.location.origin;
  const {
    register,
    handleSubmit,
    pattern,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = ({ email }) => {
    userLogin({ email, baseUrl });
    setLoginMessage(true);
  };

  return (
    <>
      {loginMessage ? (
        <LoginMessage />
      ) : (
        <div className={styles.LoginWrapper}>
          <img className={styles.LogoMail} src={MailSend} alt="" />
          <div className={styles.text}>
            Please enter a working email address here, so we can send you a
            verification link.
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.FormSection}
          >
            <div>
              <input
                {...register("email")}
                className={styles.input}
                placeholder="example@gmail.com"
              />
            </div>
            {errors.email && <span>Yanlış Ad</span>}
            <button className={styles.buttonSend}>Send link</button>
          </form>
        </div>
      )}
    </>
  );
};

export default LoginNext;
