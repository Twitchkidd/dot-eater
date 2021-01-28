import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
	padding: 10px;
	background: #006600;
	border-radius: 20px;
	color: #fefefe;
	&:focus {
		box-shadow: 3px 3px #5e9ed6, -3px -3px #5e9ed6;
		border: 2px solid transparent;
		color: #5e9ed6;
	}
`;

const Button = ({ children, start }) => (
	<StyledButton onClick={start} type='button' tabindex='0'>
		{children}
	</StyledButton>
);

export default Button;
