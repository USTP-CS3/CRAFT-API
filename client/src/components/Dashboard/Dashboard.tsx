
import { useContext } from "react";
import { TokenContext } from "@/provider/TokenProvider/TokenProvider";

const Dashboard = () => {
    const { Pocketbase } = useContext(TokenContext);
    
    return (
        <>
        <h1>this is the dashboard page</h1>
        <button onClick={() => Pocketbase.logout()}>Logout</button>
        </>
    );
}

export { Dashboard };