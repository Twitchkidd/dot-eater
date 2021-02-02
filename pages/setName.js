import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Container from '../components/Container';

const Form = styled.form`
	width: 720px;
	height: 720px;
	grid-column-start: 2;
	border: double thick var(--light);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: var(--lightest);
	gap: 16px;
`;

const Input = styled.input`
	margin-left: 1rem;
	border-radius: 4px;
`;

const Button = styled.button`
	height: 36px;
	border-radius: 12px;
	margin-top: 24px;
	padding: 8px;
	&:focus {
		border: 2px solid #2fa6ff;
	}
`;

const AccessDenied = styled.h1`
	color: red;
`;

export default function SetName() {
	const [session, loading] = useSession();
	const router = useRouter();
	const { error } = router.query;
	// const [content, setContent] = useState();
	// Fetch content from protected route
	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		const res = await fetch('/api/examples/protected');
	// 		const json = await res.json();
	// 		if (json.content) {
	// 			setContent(json.content);
	// 		}
	// 	};
	// 	fetchData();
	// }, [session]);

	// When rendering client side don't display anything until loading is complete
	if (typeof window !== 'undefined' && loading) return null;

	// If no session exists, display access denied message
	if (!session) {
		return (
			<Container>
				<AccessDenied>This route is for authenticated users!</AccessDenied>
			</Container>
		);
	}

	// If session exists, display content
	return (
		<Container>
			<Form method='post' action='/api/db/updateName'>
				<div>
					{error
						? "Try setting your name again, something errored server-side and the database didn't update!"
						: "Welcome! Set your name (so we aren't putting your email on the leaderboards!)"}
				</div>
				<label>
					Name:
					<Input type='text' id='name' name='name' />
				</label>
				<input type='submit' value='Enter name!' />
			</Form>
		</Container>
	);
}

// <Form method='post' action='/api/auth/signin/email'>
// 	<input name='csrfToken' type='hidden' defaultValue={csrfToken} />
// 	<h1>`dot-eater` Sign In!</h1>
// 	<label>
// 		Email address:
// 		<Input type='text' id='email' name='email' />
// 	</label>
// 	<Button type='submit'>Sign in with email!</Button>
// </Form>;
