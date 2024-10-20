import {useRef} from 'react';
import './code-editor.css';
import './syntax.css';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';

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

        const highlighter = new Highlighter(
            //@ts-ignore
            window.monaco,
            codeShift,
            monacoEditor
        );
        highlighter.highLightOnDidChangeModelContent(
            () => {},
            () => {},
            undefined,
            () => {}
        );
    };

    const onFormatClick = () => {
        console.log(editorRef.current)
        // get current value from editor
        const unformatted = editorRef.current.getModel().getValue();
        // format the value
        const formatted = prettier.format(unformatted, {
            parser: 'babel',
            plugins: [parser],
            useTabs: false,
            semi: true,
            singleQuote: true
        }).replace(/\n$/, '');
        // set the formatted value back in the editor
        editorRef.current.setValue(formatted);
    }

    return (
        <div className='editor-wrapper'>
            <button 
                className="button button-format is-primary is-small" 
                onClick={onFormatClick}>
                    Format
            </button>
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