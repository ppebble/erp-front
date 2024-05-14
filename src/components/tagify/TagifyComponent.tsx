import { position } from '@chakra-ui/react';
import Tags from '@yaireo/tagify/dist/react.tagify';
import { useEffect, useRef } from 'react';
import { useCalendarAction, useCalendarDialogOpen } from '../../store/useCalendar';
// ================= TAGFIELD ==================

// Tagify settings object

export const TagifyComponent = ({ label, name, initialValue = [], suggestions = [] }: any) => {
	const refTags = useRef<any>();
	const isDialogOpen = useCalendarDialogOpen();
	const action = useCalendarAction();

	// const baseTagifySettings = {};
	useEffect(() => {
		// console.log(refTags.current?.tagify.dropdown);
		if (isDialogOpen) {
			refTags.current?.tagify.dropdown.build.call(refTags.current?.tagify);
			refTags.current?.tagify.dropdown.show.call(refTags.current?.tagify);
			refTags.current?.tagify.dropdown.position.call(refTags.current?.tagify);
			refTags.current?.tagify.DOM.scope.parentNode.appendChild(refTags.current?.tagify.DOM.dropdown);
		}
	}, [isDialogOpen]);

	const handleChange = (e: any) => {
		// console.log(
		// 	e.type,
		// 	' ==> ',
		// 	e.detail.tagify.value.map((item: any) => item.value),
		// );
		if (e.type === 'add') {
			if (suggestions) {
				const addVal = e.detail.tagify.value[e.detail.tagify.value.length - 1];
				if (suggestions.filter((a: any) => a.id === addVal.id).length > 0) {
					// console.log(suggestions.filter((a: any) => a.id === addVal.id));
				} else {
					refTags.current.tagify.removeTag(refTags.current.tagify.value[refTags.current.tagify.value.length]);
				}
				console.log(e.detail.tagify.value.map((item: any) => item.value));
				action.setSelectedMembers(e.detail.tagify.value.map((item: any) => item.value));
			}
		}
		if (e.type === 'click') {
			if (suggestions) {
				refTags.current?.tagify.dropdown.select;
			}
		}
		if (e.type === 'remove') {
			action.setSelectedMembers(e.detail.tagify.value.map((item: any) => item.value));
		}
	};

	const settings = {
		whitelist: suggestions,
		// maxTags: Infinity,
		enforceWhitelist: true,
		editTags: {
			keepInvalid: true,
		},
		dropdown: {
			classname: 'text-gray-700 min-w-[200px] max-h-[50px] pt-5',
			enabled: 0,
			position: 'manual',
			maxItems: Infinity,
			closeOnSelect: false,
		},
		callbacks: {
			add: handleChange,
			remove: handleChange,
			blur: handleChange,
			edit: handleChange,
			invalid: handleChange,
			click: handleChange,
			focus: handleChange,
			input: handleChange,
			// 'edit:updated': handleChange,
			// 'edit:start': handleChange,
		},
	};

	return (
		<div className="form-group">
			<label htmlFor={`field-${name}`}>{label}</label>
			<Tags className="customLook" ref={refTags} settings={settings} initialValue={initialValue} />

			{/* <button
				type="button"
				onClick={() => {
					console.log(refTags);
					refTags.current?.tagify.addEmptyTag();
				}}
			>
				+
			</button> */}
		</div>
	);
};
