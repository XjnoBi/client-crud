import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import {
	FormControl,
	FormControlProps,
	FormHelperText,
	InputBase,
	InputBaseProps,
	InputLabel,
	InputLabelProps,
} from '@mui/material';
import { colors } from 'utils/colors';

type Props = InputBaseProps &
	InputLabelProps &
	FormControlProps & {
		label?: string;
		helperText?: string;
	};

const BaseInput = styled(InputBase)(({ theme }) => ({
	'label + &': {
		marginTop: theme.spacing(3),
	},
	'& .MuiInputBase-input': {
		borderRadius: '4px',
		position: 'relative',
		backgroundColor: colors.white,
		border: '1px solid',
		borderColor: colors.gray,
		fontSize: '16px',
		width: '100%',
		padding: '14px',
		transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
		'&:focus': {
			boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
			borderColor: theme.palette.primary.main,
		},
	},
}));

const TextInput: React.FC<Props> = ({ helperText, label, margin, ...props }) => (
	<FormControl variant='standard' {...props}>
		<InputLabel shrink htmlFor={props.id}>
			{label}
		</InputLabel>
		<BaseInput {...props} />
		{helperText && <FormHelperText>{helperText}</FormHelperText>}
	</FormControl>
);

export default TextInput;
