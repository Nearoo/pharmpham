import { useState, useEffect, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import { AppStateContext } from '../state';

export const MdFile = ({path}) => {
    const [content, setContent] = useState(null);
    const appState = useContext(AppStateContext);
    useEffect(() => {
        fetch(path).then(r => r.text()).then(text => setContent(text));
    })

    console.log("Hey")
    useEffect(() => console.log(appState.x), [appState.x]);

    return <ReactMarkdown>{content ?? "_loading..._"}</ReactMarkdown>
}