import { Descriptions } from "antd"
import ReactMarkdown from "react-markdown"



export const ProductInstanceView = ({markdown, expiry, title="ExampleProduct"}) => {
    return <>
    <Descriptions title="Info">
        <Descriptions.Item label="Expirty Date">{expiry ?? "loading"}</Descriptions.Item>
    </Descriptions>
        <ReactMarkdown>{markdown ?? "_loading..._"}</ReactMarkdown>
    </>
}