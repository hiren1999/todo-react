import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { InputTextarea } from "primereact/inputtextarea";
import { v4 as uuidv4 } from "uuid";
import moment from "moment/moment";
import { addTodo, updateTodo } from "../redux/todoSlice";

function AddEditTodo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isAdd = pathname?.split("/")?.includes("create");
  const toast = useRef(null);
  const { todo } = useSelector((state) => state.todo);

  const defaultValues = {
    title: todo?.title ?? "",
    desc: todo?.desc ?? "",
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const getFormErrorMessage = (name) => {
    return errors[name] ? (
      <small className='p-error'>{errors[name].message}</small>
    ) : (
      <small className='p-error'>&nbsp;</small>
    );
  };
  const onSubmit = (data) => {
    const requestBody = {
      ...data,
      id: isAdd ? uuidv4() : todo?.id,
      createdDateTime: moment(new Date()).format("YYYY/MM/DD HH:MM:SS"),
    };
    if (isAdd) {
      dispatch(addTodo(requestBody));
    } else {
      dispatch(updateTodo(requestBody));
    }
    // toast.current.show({
    //   severity: "success",
    //   summary: "Success",
    //   detail: isAdd ? "Todo Created Successfully" : "Todo Updated Successfully",
    //   life: 2000,
    // });
    reset();
    navigate("/");
  };

  return (
    <div className='flex justify-content-center flex-column align-items-center w-6 mx-auto gap-3'>
      <h1 className='text-color-secondary bold'>
        {isAdd ? "ADD TODO" : "EDIT TODO"}
      </h1>
      <div className='surface-300 p-3 border-round flex flex-column gap-3 w-full'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-column gap-2'
        >
          <Toast ref={toast} />
          <Controller
            name='title'
            control={control}
            rules={{
              required: "Title is required.",
              maxLength: {
                value: 32,
                message: "Title is too long",
              },
              minLength: {
                value: 2,
                message: "Title is too short",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <label
                  htmlFor={field.name}
                  className={classNames({ "p-error": errors.value })}
                >
                  Title
                </label>
                <InputText
                  id={field.name}
                  value={field.value}
                  className={classNames({ "p-invalid": fieldState.error })}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder='Please Enter Title'
                />
                {getFormErrorMessage(field.name)}
              </>
            )}
          />
          <Controller
            name='desc'
            control={control}
            rules={{
              required: "Description is required.",
              maxLength: {
                value: 32,
                message: "Description is too long",
              },
              minLength: {
                value: 2,
                message: "Description is too short",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <label
                  htmlFor={field.name}
                  className={classNames({ "p-error": errors.value })}
                >
                  Description
                </label>
                <InputTextarea
                  id={field.name}
                  {...field}
                  rows={4}
                  cols={30}
                  autoResize
                  placeholder='Please Enter Description'
                  className={classNames({ "p-invalid": fieldState.error })}
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

export default AddEditTodo;
