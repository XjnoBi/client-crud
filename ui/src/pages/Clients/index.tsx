import { memo, useContext, useEffect, useState } from 'react';
import { Button, Grid, InputAdornment, OutlinedInput } from '@mui/material';
import Search from '@mui/icons-material/Search';

import Page from 'components/Page';

import { getClients } from '../../services/api';
import { StateContext } from '../../store/DataProvider';
import ClientTable from './ClientTable';
import ClientDialog from './ClientDialog';

function Clients() {
	const { state, dispatch } = useContext(StateContext);
	const { clients } = state;

	const [showDialog, setShowDialog] = useState(false);
	const [refetchCounter, setRefetchCounter] = useState(0);

	const handleCloseDialog = (refetch?: boolean) => {
		if (refetch) {
			setRefetchCounter(refetchCounter + 1);
		}

		setShowDialog(false);
	};

	useEffect(() => {
		getClients().then((clients) => dispatch({ type: 'FETCH_ALL_CLIENTS', data: clients }));
	}, [dispatch, refetchCounter]);

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
					<ClientTable clients={clients} />
				</Grid>
			</Grid>
			{showDialog && <ClientDialog open onClose={handleCloseDialog} />}
		</Page>
	);
}

export default memo(Clients);
