import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h1`
	color: #fefefe;
	text-align: center;
	text-decoration: underline;
`;

const Title = ({ children }) => <StyledTitle>{children}</StyledTitle>;

export default Title;
