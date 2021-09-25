import { Descriptions, Space, Typography } from "antd"
import ReactMarkdown from "react-markdown"



export const ProductInstanceView = ({markdown, expiry, title="ExampleProduct"}) => {
    return <>
    <Space direction="vertical">
        <Typography.Title level={4}>Info</Typography.Title>
        <Descriptions bordered>
            <Descriptions.Item label="Expiry Date">{expiry ?? "loading"}</Descriptions.Item>
        </Descriptions>
        <Typography.Title level={4}>Manual</Typography.Title>
            <ReactMarkdown>{markdown ?? "_loading..._"}</ReactMarkdown>
        </Space>
    </>
}