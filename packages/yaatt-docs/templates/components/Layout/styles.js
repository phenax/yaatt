
import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	width: 100%;
`;

export const Main = styled.div`
	width: 100%;
`;

export const Sidebar = styled.div`
	width: 30%;
	min-width: 400px;
	overflowY: auto;
	overflowX: hidden;
	border: 1px solid #000;
`;

Sidebar.Item = styled.div`
	display: block;
	width: 100%;
`;

Sidebar.Link = styled.a`
	display: block;
	text-decoration: none;
	color: inherit;

	&:hover {
		background-color: #f6f6f6;
	}
`;
