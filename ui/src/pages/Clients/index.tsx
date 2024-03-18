import { memo, useMemo, useState } from 'react';
import { Button, Grid, InputAdornment, OutlinedInput } from '@mui/material';
import Search from '@mui/icons-material/Search';

import Page from 'components/Page';

import { useClientFetch } from 'hooks/use-client-query';

import ClientTable from './ClientTable';
import ClientDialog from './ClientDialog';

function Clients() {
	const { data: clients, refetch } = useClientFetch();

	const [showDialog, setShowDialog] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	const handleCloseDialog = (toggleRefetch?: boolean) => {
		if (toggleRefetch) {
			refetch();
		}

		setShowDialog(false);
	};

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};

	const filteredClients = useMemo(
		() =>
			clients?.filter(
				(i) =>
					i.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
					i.lastName.toLowerCase().includes(searchValue.toLowerCase())
			) || [],
		[clients, searchValue]
	);

	return (
		<Page title='Clients'>
			<Grid container direction='column' gap='1rem'>
				<Grid item>
					<Grid container alignItems='center' justifyContent='space-between'>
						<Grid item>
							<OutlinedInput
								endAdornment={
									<InputAdornment position='end'>
										<Search />
									</InputAdornment>
								}
								placeholder='Search clients...'
								onChange={handleSearch}
								value={searchValue}
							/>
						</Grid>
						<Grid item>
							<Button variant='contained' onClick={() => setShowDialog(true)}>
								Create new client
							</Button>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<ClientTable clients={filteredClients} totalClients={clients?.length || 0} />
				</Grid>
			</Grid>
			{showDialog && <ClientDialog open onClose={handleCloseDialog} />}
		</Page>
	);
}

export default memo(Clients);
