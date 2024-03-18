import { TableCell, TableRow } from '@mui/material';
import { colors } from 'utils/colors';

export interface IProps {
	client: IClient;
}

export default function ClientListItem({ client }: IProps) {
	const { id, firstName, lastName, email, phoneNumber } = client;

	return (
		<TableRow
			key={id}
			sx={{
				cursor: 'pointer',
				'&:hover': {
					backgroundColor: colors.gray3,
				},
			}}
		>
			<TableCell className='highlight' component='th' scope='row'>
				{firstName} {lastName}
			</TableCell>
			<TableCell>{phoneNumber}</TableCell>
			<TableCell>{email}</TableCell>
		</TableRow>
	);
}
