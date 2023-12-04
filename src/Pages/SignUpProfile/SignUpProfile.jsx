import React, { useState} from "react";
import styles from "./SignUpProfile.module.css";
import PhoneInput from "react-phone-number-input";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { z } from "zod";
import './phone.css'
import "react-phone-number-input/style.css";
import { userRegister } from "../../store/actions/login";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const schema=z.object({
  firstname:z.string().min(3),
  lastname: z.string().min(4),
  email: z.string().email(),
phone:z.string().min(7)
})
const SignUpProfile = () => {
  const {register,handleSubmit,formState: { errors },} = useForm({ resolver: zodResolver(schema),});
  const [value, setValue] = useState();

  const navigate=useNavigate()
  
  const onSubmit = ({ firstname, lastname, email,phone }) => {
navigate("/login")
    userRegister({
      firstname,
      lastname,
      email,
      phone
    });
  };

  return (
    <div className={styles.signupFundament}>
      <div className={styles.signupWrapper}>
        <div className={styles.textReg}>
          <h2>Registration page</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.fromSection}>
          <input {...register("firstname")} placeholder="Name" className={styles.input} />
          {errors.firstname && <span className={styles.FakeEmail}>Fake Name</span>}
          <input {...register("lastname")} placeholder="Surname" className={styles.input} />
          {errors.lastname && <span className={styles.FakeEmail}>Fake lastname</span>}
          <input {...register("email")} placeholder="example@gmail.com" className={styles.input} />
          {errors.email && <span className={styles.FakeEmail}>Fake email</span>}
            <PhoneInput
            name={"Mobil nömrə"}
            value={value}
            onChange={setValue}
            {...register("phone")}
            placeholder='000 - 00 - 00'
            defaultCountry="AZ"
            className="PhoneInputInput"
          />
          {errors.phone && <span className={styles.FakeEmail}>Fake Number</span>}
        <button className={styles.SignUpBtn}>Sign Up</button>
        </form>
        <div className={styles.LoginText}><Link to={"/login"} className={styles.LinkStyle}>If you have account, login?</Link></div>
      </div>
    </div>
  );
};

export default SignUpProfile;
