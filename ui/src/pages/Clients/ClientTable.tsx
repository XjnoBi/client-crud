import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TablePagination } from '@mui/material';

import ClientRow from './ClientRow';

type Props = {
	clients: IClient[];
	totalClients: number;
};

const DEFAULT_PAGINATION = {
	page: 0,
	rowsPerPage: 5,
};

const ClientTable: React.FC<Props> = ({ clients, totalClients }) => {
	const [pagination, setPagination] = React.useState(DEFAULT_PAGINATION);

	const paginated = React.useMemo(() => {
		const { page, rowsPerPage } = pagination;
		const startIndex = page * rowsPerPage;

		return clients.slice(startIndex, startIndex + rowsPerPage);
	}, [clients, pagination]);

	const padding = pagination.rowsPerPage > paginated.length ? pagination.rowsPerPage - paginated.length : 0;

	return (
		<>
			<Table
				sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, minWidth: 400 }}
				aria-label='simple table'
			>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Phone number</TableCell>
						<TableCell>Email</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{paginated.map((client) => (
						<ClientRow key={client.id} client={client} />
					))}
					{!paginated.length && (
						<TableRow sx={{ padding: 3 }}>
							<TableCell component='th' scope='row'>
								No clients
							</TableCell>
						</TableRow>
					)}
					{padding > 0 && (
						<TableRow
							sx={{
								height: padding * 53.1,
							}}
						>
							<TableCell colSpan={3} />
						</TableRow>
					)}
				</TableBody>
			</Table>
			<TablePagination
				{...pagination}
				component='div'
				count={totalClients}
				rowsPerPageOptions={[5, 10, 50]}
				onPageChange={(_, page) => setPagination({ ...pagination, page })}
				onRowsPerPageChange={(e) =>
					setPagination({ page: DEFAULT_PAGINATION.page, rowsPerPage: +e.target.value })
				}
			/>
		</>
	);
};

export default ClientTable;
