import React, { useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import fontSize from 'tui-editor-plugin-font-size';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '../../css/tui-color-picker.css';
import '../../css/toastui_editor.css';

const ToastEditor = () => {
	const editorRef = useRef<Editor>(null);

	const onChange = () => {
		const data = editorRef.current?.getInstance().getHTML();
		console.log(data);
	};

	const toolbarItems = [
		['heading', 'bold', 'italic', 'strike'],
		['hr', 'quote'],
		['ul', 'ol', 'task'],
		['table', 'image', 'link'],
		['code', 'codeblock'],
		['scrollSync'],
	];

	return (
		<div className="edit_wrap">
			<Editor
				// initialValue="hello react editor world!"
				previewStyle="vertical"
				height="600px"
				initialEditType="wysiwyg"
				useCommandShortcut={false}
				ref={editorRef}
				toolbarItems={toolbarItems}
				onChange={onChange}
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
