import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
	padding: 12px;
	background: #006600;
	margin-left: 8px;
	border-radius: 20px;
	color: #fefefe;
`;

const Button = ({ children, start }) => (
	<StyledButton onClick={start} type='button'>
		{children}
	</StyledButton>
);

export default Button;
