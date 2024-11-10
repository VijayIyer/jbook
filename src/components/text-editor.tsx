import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState, useRef } from 'react';

const TextEditor: React.FC = () => {
    const ref = useRef<HTMLDivElement | null>();
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if(ref.current && event.target && ref.current.contains(event.target as Node)) {
                console.log('element clicked on is inside editpr')
            }
            setEditing(false);
        };
        document.addEventListener('click', listener, {capture: true});
        return () => {
            document.removeEventListener('click', listener, {capture: true});
        }
    }, []);

    if(editing) {
        return <div>
            <MDEditor />
        </div>
    }
    return (
        <div onClick={() => setEditing(true)}>
            <MDEditor.Markdown source={'# Header'} />
        </div>
    );
};

export default TextEditor;