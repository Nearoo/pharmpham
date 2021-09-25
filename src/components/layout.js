
import { Divider, Typography } from "antd";
import { useContext } from "react";
import { MainMenu } from "./menu";
import { AppStateContext } from "./state";
import { ProductInstanceView } from "./views/productInst";

const Header = () => {
    return <>
        <Typography.Title level={1}>Pharmpham</Typography.Title>
    </>
}


const Content = () => {
    const appState = useContext(AppStateContext);
    return {
        "product": <ProductInstanceView
            markdown={appState.markdown}
            expiry={appState.productexpiry}
            title={appState.productTitle}
            />,
        "profile": <p>Hello theres</p>
    }[appState.view ?? "product"]
}

const Footer = () => {
    return <Typography.Title level={5}>Footer</Typography.Title>
}

export const Main = () => {
    
    return <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
        <MainMenu />
        <div style={{padding: "10px"}}><Header /></div>
        <Divider />
        <div style={{ flexGrow: 1, padding: "10px", overflowY: "scroll", overflowX: "hidden" }}><Content /></div>
        <Divider />
        <div style={{ padding: "10px" }}><Footer /></div>
    </div>
}