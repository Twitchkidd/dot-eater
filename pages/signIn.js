import React from 'react';
import styled from 'styled-components';
import Container from '../components/Container';
import { csrfToken } from 'next-auth/client';

const Form = styled.form`
	width: 720px;
	height: 720px;
	grid-column-start: 2;
	border: double thick var(--light);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Input = styled.input`
	margin-left: 1rem;
	border-radius: 4px;
`;

const Button = styled.button`
	height: 36px;
	border-radius: 12px;
	margin-top: 24px;
	&:focus {
		border: 2px solid #2fa6ff;
	}
`;

export default function SignIn({ csrfToken }) {
	return (
		<Container>
			<Form method='post' action='/api/auth/signin/email'>
				<input name='csrfToken' type='hidden' defaultValue={csrfToken} />
				<h1>`dot-eater` Sign In!</h1>
				<label>
					Email address:
					<Input type='text' id='email' name='email' />
				</label>
				<Button type='submit'>Sign in with email!</Button>
			</Form>
		</Container>
	);
}

SignIn.getInitialProps = async context => {
	return {
		csrfToken: await csrfToken(context),
	};
};
