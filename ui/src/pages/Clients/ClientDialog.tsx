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
import { ArrowBack } from '@mui/icons-material';
import { Formik } from 'formik';
import * as Yup from 'yup';

import TextInput from 'components/TextInput';

import { useClientMutate } from 'hooks/use-client-query';

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

const VALIDATION_SCHEMA = Yup.object({
	email: Yup.string().email('Invalid email').ensure().required('Email is required'),
	firstName: Yup.string().ensure().required('First name is required'),
	lastName: Yup.string().ensure().required('Last name is required'),
	phoneNumber: Yup.string().ensure().required('Phone number is required'),
});

const STEPS = ['Personal details', 'Contact details'];

const ClientDialog: React.FC<Props> = ({ client, open = false, onClose }) => {
	const { create } = useClientMutate();

	const [activeStep, setActiveStep] = React.useState(0);
	const onSubmit = async (values: IClient) => {
		if (client?.id) {
			//TODO: handle update procedure here...
			return;
		}

		await create.mutateAsync(values);
		onClose(true);
	};

	return (
		<Formik initialValues={client || EMPTY_FORM} onSubmit={onSubmit} validationSchema={VALIDATION_SCHEMA}>
			{({
				dirty,
				errors,
				handleBlur,
				handleChange,
				handleSubmit,
				setFieldError,
				setFieldTouched,
				submitForm,
				touched,
				validateForm,
				values,
			}) => {
				const hasError = (name: keyof IClient) => Boolean(errors[name] && touched[name]);
				const fieldProps = (name: keyof IClient) => ({
					error: hasError(name),
					helperText: hasError(name) ? errors[name] : undefined,
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
								<Button
									disabled={Boolean(errors['firstName'] || errors['lastName'])}
									variant='contained'
									onClick={handleClickContinue}
								>
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
										<Button disabled={!dirty} variant='contained' onClick={() => submitForm()}>
											Create client
										</Button>
									</Grid>
								</Grid>
							);
					}
				};

				const handleClickContinue = async () => {
					const validationError = await validateForm(values);
					if (!validationError.firstName && !validationError.lastName) {
						setActiveStep(1);
						return;
					}

					if (validationError.firstName) {
						setFieldError('firstName', validationError.firstName);
						setFieldTouched('firstName');
					}

					if (validationError.lastName) {
						setFieldError('lastName', validationError.lastName);
						setFieldTouched('lastName');
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
