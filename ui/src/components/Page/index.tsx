import { Container, Typography } from '@mui/material';
import React from 'react';

type Props = {
	children: React.ReactNode;
	title?: string;
};

const Page: React.FC<Props> = ({ children, title }) => (
	<Container
		maxWidth='md'
		sx={{
			marginTop: '4rem',
		}}
	>
		{title && (
			<Typography variant='h4' sx={{ textAlign: 'start' }}>
				{title}
			</Typography>
		)}
		{children}
	</Container>
);

export default Page;
