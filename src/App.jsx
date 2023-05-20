import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import store from "./redux/store";
import NavbarTop from "./components/NavbarTop";
import Login from "./components/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home";
import AddEditTodo from "./pages/AddEditTodo";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavbarTop />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route
            exact
            path='/'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path='/todo/:id'
            element={
              <ProtectedRoute>
                <AddEditTodo />
              </ProtectedRoute>
            }
          />
          <Route
            path='/todo/create'
            element={
              <ProtectedRoute>
                <AddEditTodo />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
