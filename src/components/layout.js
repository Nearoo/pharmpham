
import { Divider, Typography } from "antd";
import { useContext, useEffect } from "react";
import { MainMenu } from "./menu";
import { AppStateContext } from "./state";
import { ProfileView } from "./views/profile";

import { ProductView } from './views/product';


const { Text } = Typography;


const Content = () => {
    const appState = useContext(AppStateContext);
    return {
        "product": <>
            <ProductView />
            </>,
        "profile": <ProfileView />
    }[appState.view ?? "profile"];
}

export const Main = () => {
    
    return <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
        <Text style={{paddingLeft: "10px"}}>Drugbud</Text>
        <MainMenu />
        <div style={{ flexGrow: 1, padding: "15px", overflowY: "scroll", overflowX: "hidden" }}><Content /></div>
    </div>
}