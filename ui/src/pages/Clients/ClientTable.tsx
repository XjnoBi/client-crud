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

	const data = React.useMemo(() => {
		const { page, rowsPerPage } = pagination;
		return clients.slice(page, page * rowsPerPage + rowsPerPage);
	}, [clients, pagination]);

	return (
		<>
			<Table sx={{ minWidth: 400 }} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Phone number</TableCell>
						<TableCell>Email</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((client) => (
						<ClientRow key={client.id} client={client} />
					))}
					{!clients ||
						(!clients && (
							<TableRow sx={{ padding: 3 }}>
								<TableCell component='th' scope='row'>
									No clients
								</TableCell>
							</TableRow>
						))}
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
