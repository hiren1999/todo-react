/* eslint-disable react/prop-types */
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { classNames } from "primereact/utils";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTodo, todoDetails } from "../redux/todoSlice";
import { Toast } from "primereact/toast";

function TodoDetails({ todo }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const toast = useRef(null);
  const handleEdit = () => {
    navigate(`/todo/${todo?.id}`);
    dispatch(todoDetails(todo));
  };
  const handleDelete = () => {
    dispatch(deleteTodo(todo?.id));
  };
  return (
    <div className='bg-white border-round p-2 w-30rem flex justify-content-start align-items-center gap-3'>
      <Toast ref={toast} />
      <Checkbox
        onChange={(e) => setChecked(e.checked)}
        checked={checked}
      ></Checkbox>
      <div className='max-w-16rem'>
        <h6
          className={classNames(`m-0 text-base ${checked && "line-through"}`)}
        >
          {todo?.title}
        </h6>
        <p className={classNames(`m-0 text-sm  ${checked && "line-through"}`)}>
          {todo?.desc}
        </p>
        <span className='text-xs text-400'>{todo?.createdDateTime}</span>
      </div>
      <div className='flex gap-2 ml-auto'>
        {!checked && (
          <Button
            icon='pi pi-pencil'
            rounded
            severity='primary'
            aria-label='Edit'
            size='small'
            onClick={handleEdit}
          />
        )}
        <Button
          icon='pi pi-times'
          rounded
          severity='danger'
          aria-label='Delete'
          size='small'
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}

export default TodoDetails;
