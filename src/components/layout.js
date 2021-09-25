
import { Divider, Typography } from "antd";
import { useContext, useEffect } from "react";
import { MainMenu } from "./menu";
import { AppStateContext } from "./state";
import { ProductInstanceView } from "./views/productInst";
import { ProfileView } from "./views/profile";

const Header = () => {
    return <Divider>Pharmapham</Divider>
}


const Content = () => {
    const appState = useContext(AppStateContext);
    return {
        "product": <ProductInstanceView
            markdown={appState.manual}
            expiry={appState.expiry}
            title={appState.title}
            />,
        "profile": <ProfileView />
    }[appState.view ?? "profile"];
}

const Footer = () => {
    return <Typography.Title level={5}>Footer</Typography.Title>
}

export const Main = () => {
    
    return <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
        <MainMenu />
        <div style={{ flexGrow: 1, padding: "15px", overflowY: "scroll", overflowX: "hidden" }}><Content /></div>
        <div style={{ padding: "10px", boxShadow: "0px 0px 3px grey"}}><Footer /></div>
    </div>
}