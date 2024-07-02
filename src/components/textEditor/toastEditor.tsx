import React, { useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import fontSize from 'tui-editor-plugin-font-size';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '../../css/tui-color-picker.css';
import '../../css/toastui_editor.css';

type EditorProps = {
	onChange: (id: string, value: any) => void;
	defaultValue: string;
};

const ToastEditor = ({ onChange, defaultValue }: EditorProps) => {
	const editorRef = useRef<Editor>(null);

	const toolbarItems = [
		['heading', 'bold', 'italic', 'strike'],
		['hr', 'quote'],
		['ul', 'ol', 'task'],
		['table', 'image', 'link'],
		['code', 'codeblock'],
		['scrollSync'],
	];

	return (
		<div className="edit_wrap mb-4">
			<Editor
				previewStyle="vertical"
				height="600px"
				initialEditType="wysiwyg"
				useCommandShortcut={false}
				ref={editorRef}
				toolbarItems={toolbarItems}
				initialValue={defaultValue}
				onChange={(e) => onChange('body', editorRef.current?.getInstance().getHTML())}
				plugins={[
					fontSize,
					[
						colorSyntax,
						// 기본 색상 preset 적용
						{
							preset: ['#000000', '#FF0000', '#0000FF', '#00ff00', '#FFFF00', '#808080', '#FFC0CB', '#FFFFFF'],
						},
					],
				]}
			/>
		</div>
	);
};

export default ToastEditor;
