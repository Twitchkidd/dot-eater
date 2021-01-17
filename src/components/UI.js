import React from 'react';
import styled from 'styled-components';

const StyledUI = styled.div`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	top: 360px;
	left: 240px;
	height: 80px;
	width: 240px;
	z-index: 8000;
`;

const UI = ({ children }) => <StyledUI>{children}</StyledUI>;

export default UI;
