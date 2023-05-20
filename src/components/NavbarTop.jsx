import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const NavbarTop = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogoutButton = () => {
    dispatch(LogoutUser());
  };
  const start = (
    <div className='flex align-items-center'>
      <img
        alt='logo'
        src='https://primefaces.org/cdn/primereact/images/logo.png'
        height='40'
        className='mr-2'
        onClick={() => navigate("/")}
      ></img>
    </div>
  );
  const end = (
    <div className='flex'>
      {isAuthenticated && (
        <Button
          icon='pi pi-sign-out'
          label='Logout'
          severity='danger'
          text
          size='sm'
          onClick={handleLogoutButton}
        />
      )}
    </div>
  );

  return (
    <div className='card'>
      <Menubar start={start} end={end} />
    </div>
  );
};

export default NavbarTop;
