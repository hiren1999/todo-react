import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TodoDetails from "../components/TodoDetails";

function Home() {
  const { todoList } = useSelector((state) => state.todo);
  const navigate = useNavigate();

  // HANDLE HERE ADD BUTTON
  const handleAddButton = () => {
    navigate("/todo/create");
  };
  return (
    <div className='flex justify-content-center flex-column align-items-center w-6 mx-auto gap-3'>
      <h1 className='text-color-secondary bold'>TODO LIST</h1>
      <div className='flex justify-content-end'>
        <Button label='Add Todo' icon='pi pi-plus' onClick={handleAddButton} />
      </div>
      <div className='surface-300 p-3 border-round flex flex-column gap-3'>
        {todoList?.length === 0 ? (
          <div className='border-round p-1'>No Records Found</div>
        ) : (
          todoList?.map((todo, index) => (
            <TodoDetails key={index} todo={todo} />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
