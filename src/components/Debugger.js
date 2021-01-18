import React from 'react';
import styled from 'styled-components';

const StyledDebugger = styled.div`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	background: #14141d;
	top: -120px;
	left: -140px;
	z-index: 90000;
`;

const StyledDebuggerText = styled.p`
	font-size: 12px;
	font-weight: bold;
	color: green;
`;

const StyledDebuggerWrapper = styled.div`
	display: grid;
	place-items: center;
	width: 140px;
	max-height: 80px;
`;

const Debugger = ({ children }) => <StyledDebugger>{children}</StyledDebugger>;

Debugger.Text = StyledDebuggerText;
Debugger.Wrap = StyledDebuggerWrapper;

export default Debugger;
