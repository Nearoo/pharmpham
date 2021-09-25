import { Checkbox, Descriptions, Divider, Space, Typography } from "antd"
import { useContext, useState } from "react"
import ReactMarkdown from "react-markdown"
import { AppStateContext } from "../state"



export const ProductInstanceView = ({markdown, expiry, title="Betadine", id}) => {
    const appState = useContext(AppStateContext);
    const [pinned, setPinned] = useState(true);
    return <>
    <Space direction="vertical">
        <Space direction="horizontal" align="center">
        <Typography.Title level={2}>{title}</Typography.Title>
                <Checkbox checked={pinned} style={{ paddingLeft: "20px" }} onChange={e => setPinned(e.target.checked)}>Pin</Checkbox>
        </Space>
        
        
        <Divider orientation="left">Info</Divider>
        <Descriptions bordered>
            <Descriptions.Item label="Expiry Date">{expiry ?? "loading"}</Descriptions.Item>
        </Descriptions>
        <Divider orientation="left">Manual</Divider>
            <ReactMarkdown>{String(markdown) ?? "_loading..._"}</ReactMarkdown>
        </Space>
    </>
}