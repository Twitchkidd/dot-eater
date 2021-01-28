import React from 'react';
import Container from '../components/Container';
import { csrfToken } from 'next-auth/client';

export default function SignIn({ csrfToken }) {
	return (
		<Container>
			<form method='post' action='/api/auth/signin/email'>
				<input name='csrfToken' type='hidden' defaultValue={csrfToken} />
				<label>
					Email address
					<input type='text' id='email' name='email' />
				</label>
				<button type='submit'>Sign in with Email</button>
			</form>
		</Container>
	);
}

SignIn.getInitialProps = async context => {
	return {
		csrfToken: await csrfToken(context),
	};
};
