import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle({
	// define the part you're going to style
	container: {
		width: '100%',
		height: 'auto',
		padding: '1rem',
		paddingBottom: '2.5rem',
		marginTop: '1rem',
		overflow: 'auto',
	},
	header: {
		paddingBottom: '1rem',
		size: 'xl',
	},
	body: {
		paddingTop: '1rem',
	},
	footer: {
		paddingTop: '1rem',
	},
});

const sizes = {
	md: definePartsStyle({
		container: {
			borderRadius: '10px',
		},
	}),
};

export const cardTheme = defineMultiStyleConfig({ baseStyle, sizes });
