import { Tabs, Tab, TabPanel, TabList } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import request from "../../server";

import { IMG } from "../../const";
import editUserSchema from "../../schemas/editUser";
import { AuthContext } from "../../context/AuthContext";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import passwordSchema from "../../schemas/password";
const AccountEdit = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState();
  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  const { user, getUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(editUserSchema) });

  const {
    register: rgs,
    handleSubmit: hlsm,
    formState: { errors: err },
  } = useForm({ resolver: yupResolver(passwordSchema) });

  useEffect(() => {
    const getEdit = async () => {
      await request.get(`auth/me`);
      const newUser = { ...user, ["birthday"]: user?.birthday?.split("T")[0] };
      reset({ ...newUser });
    };
    getEdit();
  }, [user, getUser, reset]);

  const getPassword = async (password) => {
    try {
      if (password.newPassword === password.confirmPassword) {
        await request.put(`auth/password`, password);
        console.log(password);
        toast.success("Yorvordiz");
        navigate(`/account`);
      } else {
        toast.error("Unaqa bolmaydida");
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const postData = async (data) => {
    await request.put(`auth/details`, data);
    getUser();
    navigate(`/account`);
    toast.success("Chotki");
  };

  

  return (
    <div className=" container editAccount">
      <Tabs>
        <TabList className="tablist">
          <Tab>Data Edit</Tab>
          <Tab>Password Edit</Tab>
        </TabList>

        <TabPanel>
          <div className="editUser">
            <form
              autoComplete="off"
              onSubmit={handleSubmit(postData)}
              className=""
            >
              <div className="user-inputs">
                <div className="imgedit">
                  <img
                    className="editUserImg"
                    src={file ? file : `${IMG}${user?.photo}`}
                  />
                  <input
                    className="editUserInput"
                    type="file"
                    onChange={handleChange}
                  />
                </div>
                <div className="user-acc-inputs">
                  <div>
                    <label htmlFor="">First Name</label>
                    <input
                      {...register("first_name")}
                      type="text"
                      name="first_name"
                      placeholder="First name"
                      className="login-input"
                    />
                    {errors.first_name ? (
                      <p className="text-danger">{errors.first_name.message}</p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="">Last Name</label>

                    <input
                      {...register("last_name")}
                      type="text"
                      name="last_name"
                      placeholder="Last name"
                      className="login-input"
                    />
                    {errors.last_name ? (
                      <p className="text-danger">{errors.last_name.message}</p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="">Username</label>
                    <input
                      {...register("username")}
                      required
                      name="username"
                      type="text"
                      placeholder="Username"
                      className="login-input"
                    />
                    {errors.username ? (
                      <p className="text-danger">{errors.username.message}</p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="">Info</label>
                    <input
                      {...register("info")}
                      required
                      name="info"
                      type="text"
                      placeholder="Information"
                      className="login-input"
                    />
                    {errors.info ? (
                      <p className="text-danger">{errors.info.message}</p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="">Phone Number</label>
                    <input
                      {...register("phoneNumber")}
                      required
                      name="phoneNumber"
                      type="text"
                      placeholder="Phone Number"
                      className="login-input"
                    />
                    {errors.phoneNumber ? (
                      <p className="text-danger">
                        {errors.phoneNumber.message}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="">Birthday</label>
                    <input
                      {...register("birthday")}
                      required
                      name="birthday"
                      type="date"
                      placeholder="Birthday"
                      className="login-input"
                    />
                    {errors.birthday ? (
                      <p className="text-danger">{errors.birthday.message}</p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="">Address</label>
                    <input
                      {...register("address")}
                      required
                      name="address"
                      type="text"
                      placeholder="Address"
                      className="login-input"
                    />
                    {errors.address ? (
                      <p className="text-danger">{errors.address.message}</p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="">Email</label>

                    <input
                      {...register("email")}
                      required
                      name="email"
                      type="text"
                      placeholder="Email"
                      className="login-input"
                    />
                    {errors.email ? (
                      <p className="text-danger">{errors.email.message}</p>
                    ) : null}
                  </div>
                </div>
              </div>

              <input
                className="login-btn"
                type="submit"
                value="Save"
                onClick={() => {}}
              />
            </form>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="editUser">
            <form autoComplete="off" onSubmit={hlsm(getPassword)} className="">
              <div className="user-input">
                <div className="user-acc-input">
                  <div>
                    <label htmlFor="">Password</label>
                    <input
                      {...rgs("currentPassword")}
                      type="text"
                      name="currentPassword"
                      placeholder="current password"
                      className="login-input"
                    />
                    {err.currentPassword ? (
                      <p className="text-danger">
                        {err.currentPassword.message}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="">New Password</label>

                    <input
                      {...rgs("newPassword")}
                      type="text"
                      name="newPassword"
                      placeholder="New Password"
                      className="login-input"
                    />
                    {err.newPassword ? (
                      <p className="text-danger">{err.newPassword.message}</p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="">Confirm Password</label>
                    <input
                      {...rgs("confirmPassword")}
                      required
                      name="confirmPassword"
                      type="text"
                      placeholder="Confirm Password"
                      className="login-input"
                    />
                    {err.confirmPassword ? (
                      <p className="text-danger">
                        {err.confirmPassword.message}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>

              <input
                className="login-btn"
                type="submit"
                value="Save"
                onClick={() => {}}
              />
            </form>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default AccountEdit;
