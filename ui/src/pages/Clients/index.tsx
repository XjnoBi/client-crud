import { memo, useContext, useEffect, useState } from 'react';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { StateContext } from '../../store/DataProvider';
import Page from '../../components/Page';
import ClientTable from './ClientTable';
import { getClients } from '../../services/api';
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
		<Page>
			<Typography variant='h4' sx={{ textAlign: 'start' }}>
				Clients
			</Typography>
			<Grid container alignItems='center' justifyContent='space-between'>
				<Grid item>
					<TextField placeholder='Search client...' />
				</Grid>
				<Grid item>
					<Button variant='contained' onClick={() => setShowDialog(true)}>
						Create new client
					</Button>
				</Grid>
			</Grid>
			<Paper sx={{ margin: 'auto', marginTop: 3 }}>
				<ClientTable clients={clients} />
			</Paper>
			{showDialog && <ClientDialog open onClose={handleCloseDialog} />}
		</Page>
	);
}

export default memo(Clients);
