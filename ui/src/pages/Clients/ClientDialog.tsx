import React from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	Step,
	StepLabel,
	Stepper,
} from '@mui/material';
import { Formik } from 'formik';
import { ArrowBack } from '@mui/icons-material';

import TextInput from 'components/TextInput';

import { createClient } from '../../services/api';

type Props = {
	client?: IClient;
	open?: boolean;
	onClose: (refetch?: boolean) => void;
};

const EMPTY_FORM: IClient = {
	id: '',
	email: '',
	firstName: '',
	lastName: '',
	phoneNumber: '',
};

const STEPS = ['Personal details', 'Contact details'];

const ClientDialog: React.FC<Props> = ({ client, open = false, onClose }) => {
	const [activeStep, setActiveStep] = React.useState(0);
	const onSubmit = async (values: IClient) => {
		if (client?.id) {
			//TODO: handle update procedure here...
			return;
		}

		await createClient(values);
		onClose(true);
	};

	return (
		<Formik initialValues={client || EMPTY_FORM} onSubmit={onSubmit}>
			{({ handleBlur, handleChange, handleSubmit, submitForm, values }) => {
				const fieldProps = (name: keyof IClient) => ({
					fullWidth: true,
					name,
					onBlur: handleBlur,
					onChange: handleChange,
					required: true,
					value: values[name],
				});
				const getFormFields = () => {
					switch (activeStep) {
						case 0:
							return (
								<React.Fragment>
									<Grid item>
										<TextInput {...fieldProps('firstName')} label='First name' />
									</Grid>
									<Grid item>
										<TextInput {...fieldProps('lastName')} label='Last name' />
									</Grid>
								</React.Fragment>
							);
						case 1:
							return (
								<React.Fragment>
									<Grid item>
										<TextInput {...fieldProps('email')} label='Email' />
									</Grid>
									<Grid item>
										<TextInput {...fieldProps('phoneNumber')} label='Phone number' />
									</Grid>
								</React.Fragment>
							);
					}
				};
				const getActions = () => {
					switch (activeStep) {
						case 0:
							return (
								<Button variant='contained' onClick={() => setActiveStep(1)}>
									Continue
								</Button>
							);
						case 1:
							return (
								<Grid container justifyContent='space-between'>
									<Grid item>
										<Button
											variant='text'
											onClick={() => setActiveStep(0)}
											startIcon={<ArrowBack />}
										>
											Back
										</Button>
									</Grid>
									<Grid item>
										<Button variant='contained' onClick={() => submitForm()}>
											Create client
										</Button>
									</Grid>
								</Grid>
							);
					}
				};

				return (
					<Dialog open={open} onClose={() => onClose()} fullWidth={true} maxWidth='sm'>
						<form onSubmit={handleSubmit}>
							<DialogTitle>{client ? 'Update client' : 'Create new client'}</DialogTitle>
							<DialogContent>
								<Grid container direction='column' spacing={4}>
									<Grid item>
										<Stepper activeStep={activeStep}>
											{STEPS.map((label, index) => (
												<Step key={index}>
													<StepLabel>{label}</StepLabel>
												</Step>
											))}
										</Stepper>
									</Grid>
									<Grid item>
										<Grid container alignItems='stretch' direction='column' spacing={2}>
											{getFormFields()}
										</Grid>
									</Grid>
								</Grid>
							</DialogContent>
							<DialogActions>{getActions()}</DialogActions>
						</form>
					</Dialog>
				);
			}}
		</Formik>
	);
};

export default ClientDialog;
