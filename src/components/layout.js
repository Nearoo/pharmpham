
import { useContext } from "react";
import { Card, Layout, Typography, Divider, Button} from "antd"
import { MdFile } from "./md/md"
import { AppStateContext } from "./state";

const Header = () => {
    return <>
        <Typography.Title level={1}>Pharmpham</Typography.Title>
        <Typography.Title level={4}>Betadine</Typography.Title>
    </>
}


const Content = () => {
    return <Card>
        <MdFile path="/md_example.md" />
    </Card>
}

const Footer = () => {
    return <Typography.Title level={5}>Footer</Typography.Title>
}

export const Main = () => {
    const appState = useContext(AppStateContext);
    return <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
        <div style={{padding: "10px"}}><Header /></div>
        <Divider />
        <div style={{ flexGrow: 1, padding: "10px", overflowY: "scroll", overflowX: "hidden" }}><Content /></div>
        <Divider />
        <div style={{ padding: "10px" }}><Footer /></div>
        <Button onClick={() =>appState.setX()}>Hello There</Button>
    </div>
}