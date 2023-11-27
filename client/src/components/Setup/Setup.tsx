
import { useContext } from "react";
import { TokenContext } from "@/provider/TokenProvider/TokenProvider";

const Setup = () => {
    const { Pocketbase } = useContext(TokenContext);
    
    return (
        <>
        <h1>this is the setup page</h1>
        <button onClick={() => Pocketbase.logout()}>Logout</button>
        </>
    );
}

export { Setup };