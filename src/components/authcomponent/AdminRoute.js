import { Navigate, Outlet } from "react-router-dom";


const AdminRoute = ()=>{

const userRole = localStorage.getItem('admin')


return userRole === 'true' ? (
    <Outlet/>
):(
    <Navigate to="/home"/>
)

}

export default AdminRoute 