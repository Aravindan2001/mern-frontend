import {BrowserRouter,Routes,Route} from "react-router-dom";
import AddTaskPage from "./pages/AddTaskPage";
import TaskListPage from "./pages/TaskListPage";
import EditTaskpage from "./pages/EditTaskPage";

export default function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route>
        <Route path="/" element={<TaskListPage/>}/>
        <Route path="/add" element={<AddTaskPage/>}/>
        <Route path="/edit/:id" element={<EditTaskpage/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  );
};