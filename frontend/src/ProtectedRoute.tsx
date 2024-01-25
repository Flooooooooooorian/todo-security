import {Navigate, Outlet} from "react-router-dom";

type ProtectRouteProps = {
    user: string | undefined
}

export default function ProtectedRoute(props: ProtectRouteProps) {
    const isAuthenticated = props.user != undefined && props.user != "anonymousUser"

    return (
        isAuthenticated ? <Outlet /> : <Navigate to={"/todos"} />
    )
}
