import { useState, useContext, useCallback } from 'react';
import { Button, Menu } from 'antd';
import { AppStateContext } from './state';

const MenuComp = ({setCollapsed}) => {
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

    const setView = useCallback(view => {
        //appState.setView(view);
        console.log("Set view to ", view);
        setCollapsed(true);
    })
    return <Menu
        defaultSelectedKeys={['1']}
        mode="inline"
    >
        {items.map((item, i) => <Menu.Item key={i} onClick={() => setView(item.viewTarget)}>{item.title}</Menu.Item>)}
    </Menu>
}

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
        //appState.setView(view);
        const view = items[+key].viewTarget;
        console.log("Set view to ", view);
        setSelectedKey(String(key));
        setCollapsed(true);
    })

    return <>
    <Button onClick={() => setCollapsed(!collapsed)}>Menu</Button>
        {collapsed ? <></> :
            <Menu
                defaultSelectedKeys={['1']}
                mode="inline"
            >
            {items.map((item, i) => <Menu.Item key={i} onClick={() => setView(i)}>{item.title}</Menu.Item>)}
            </Menu>
        }
    </>
}