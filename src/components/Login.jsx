import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, resetAuth } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const {
    isError,
    errors: serverError,
    isAuthenticated,
  } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useRef(null);

  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = async (data) => {
    dispatch(LoginUser(data));
    reset();
  };

  const getFormErrorMessage = (name) => {
    return errors[name] ? (
      <small className='p-error'>{errors[name].message}</small>
    ) : (
      <small className='p-error'>&nbsp;</small>
    );
  };

  useEffect(() => {
    if (isError && serverError) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: serverError,
        life: 3000,
      });
      dispatch(resetAuth());
    }
  }, [isError, serverError]);

  useEffect(() => {
    if (isAuthenticated) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Login Successfully",
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [isAuthenticated]);
  return (
    <div className='flex align-items-center justify-content-center mt-5'>
      <div className='surface-card p-4 shadow-2 border-round w-full lg:w-5'>
        <div className='text-center mb-5'>
          <div className='text-900 text-3xl font-medium mb-3'>Welcome Back</div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-column gap-2'
        >
          <Toast ref={toast} />
          <Controller
            name='email'
            control={control}
            rules={{
              required: "Email is required.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid Email Address.",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <label
                  htmlFor={field.name}
                  className={classNames({ "p-error": errors.value })}
                >
                  Email
                </label>
                <InputText
                  id={field.name}
                  value={field.value}
                  className={classNames({ "p-invalid": fieldState.error })}
                  onChange={(e) => field.onChange(e.target.value)}
                />
                {getFormErrorMessage(field.name)}
              </>
            )}
          />
          <Controller
            name='password'
            control={control}
            rules={{ required: "Password is required." }}
            render={({ field, fieldState }) => (
              <>
                <label
                  htmlFor={field.name}
                  className={classNames({ "p-error": errors.value })}
                >
                  Password
                </label>
                <Password
                  id={field.name}
                  {...field}
                  inputRef={field.ref}
                  className={classNames({ "p-invalid": fieldState.error })}
                  feedback={false}
                  toggleMask
                />
                {getFormErrorMessage(field.name)}
              </>
            )}
          />
          <Button label='Submit' type='submit' icon='pi pi-check' />
        </form>
      </div>
    </div>
  );
}
