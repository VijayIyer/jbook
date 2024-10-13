import {useRef} from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

interface CodeEditorProps {
    initialValue: string;
    onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
    const editorRef = useRef<any>();

    const onEditorMount: EditorDidMount = (getValue, monacoEditor) => {
        editorRef.current = monacoEditor;
        monacoEditor.onDidChangeModelContent(() => {
            onChange(getValue());
        });

        monacoEditor.getModel()?.updateOptions({ tabSize: 2});
    };

    const onFormatClick = () => {
        console.log(editorRef.current)
        // get current value from editor
        
        // format the value

        // set the formatted value back in the editor
    }

    return (
        <div>
            <button onClick={onFormatClick}>Format</button>
            <MonacoEditor
                editorDidMount={onEditorMount}
                value={initialValue}
                theme='dark' 
                height="500px" 
                language='javascript'    
                options={{
                    wordWrap: 'on',
                    minimap: { enabled: false },
                    showUnused: false,
                    folding: false,
                    lineNumbersMinChars: 3,
                    fontSize: 16,
                    scrollBeyondLastLine: false,

                }} 
            />
        </div>
        
    )
};

export default CodeEditor;