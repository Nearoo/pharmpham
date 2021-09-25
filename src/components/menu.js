import { useState, useContext, useCallback } from 'react';
import { Button, Menu } from 'antd';
import { AppStateContext } from './state';

export const MainMenu = () => {
    const [collapsed, setCollapsed] = useState(true);
    const [selectedKey, setSelectedKey] = useState('1');
    const appState = useContext(AppStateContext);
    const items = [
        {
            viewTarget: "profile",
            title: "Profile"
        }, {
            viewTarget: "product",
            title: "Product"
        }
    ]

    const setView = useCallback(key => {
        const view = items[+key].viewTarget;
        appState.setView(view);
        setSelectedKey(String(key));
        setCollapsed(true);
    })
    return <>
    <Button onClick={() => setCollapsed(!collapsed)}>Menu</Button>
        {collapsed ? <></> :
            <Menu
                defaultSelectedKeys={[selectedKey]}
                mode="inline"
            >
            {items.map((item, i) => <Menu.Item key={i} onClick={() => setView(i)}>{item.title}</Menu.Item>)}
            </Menu>
        }
    </>
}