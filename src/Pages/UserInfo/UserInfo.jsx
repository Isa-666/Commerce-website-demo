import React, { useState, useEffect } from "react";
import styles from "./UserInfo.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { commerce } from "../../API/commerce";
import { updateUser } from "../../store/actions/login";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const schema = z.object({
  firstname: z.string().min(3),
  lastname: z.string().min(4),
  email: z.string().email(),
  phone: z.string().min(8)
});
const UserInfo = () => {
  const {
    register,
    handleSubmit,
    pattern,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const [user, setUser] = useState({});
  const navigate=useNavigate();
  const notifyMe = () => {
    toast.success("Information has changed");
  };
  useEffect(() => {
    commerce.customer.about().then((customer) => setUser(customer));
  }, []);
  const onSubmit = (data) => {
    updateUser(data, user.id);
    notifyMe()
  };
  const logOut = () => {
    commerce.customer.logout();
    navigate("/");
    window.location.reload()
  };
  return (
    <div className={styles.ProfileWrapper}>
      <div>
        <h2>Profile Info</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="infos">
          <div className={styles.inputGroup}>
            <label htmlFor="firstname">Name</label>
            <input
              defaultValue={user.firstname}
              type="text"
              {...register("firstname")}
              placeholder="Isa"
              className={styles.InputStyle}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="lastname">Surname</label>
            <input
              className={styles.InputStyle}
              defaultValue={user.lastname}
              type="text"
              {...register("lastname")}
              placeholder="Quliyev"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">E-mail</label>
            <input
              className={styles.InputStyle}
              defaultValue={user.email}
              type="text"
              {...register("email")}
              placeholder="example@gmail.com"
            />
            {errors.email && <span>Yanlış email</span>}
          </div>
          <div className={styles.inputGroup}>
            <label>Phone number</label>
            <input
              className={styles.InputStyle}
              type="text"
              // {...register("phone")}
              placeholder="055-55-55-55"
              defaultValue={user.phone}
              {...register("phone")}
            />
          </div>
           
        </div>
       <button className={styles.ChangeInfoBtn}>Change info</button>
      </form>
      <button onClick={logOut} className={styles.logoutBtn}>Log Out</button>
      <ToastContainer />
    </div>
  );
};

export default UserInfo;
