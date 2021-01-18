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

const StyledUIText = styled.p`
	font-size: ${props => (props.report ? '18px' : '36px')};
	${props =>
		props.report
			? `
		line-height: 0;
	`
			: null}
	color: #fefefe;
	margin-right: 8px;
	${props => props.titleText && 'text-decoration: underline;'}
`;

const StyledUIWrapper = styled.div`
	display: grid;
	place-items: center;
	max-width: 120px;
	max-height: 80px;
`;

const UI = ({ children }) => <StyledUI>{children}</StyledUI>;

UI.Text = StyledUIText;
UI.Wrap = StyledUIWrapper;

export default UI;
