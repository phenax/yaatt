
import styled from 'styled-components';

export const ApiCard = {};

ApiCard.small = styled.div`
	padding: .5em;
`;

ApiCard.small.Title = styled.div`
	font-size: 1.2em;
`;

ApiCard.small.Subtitle = styled.div`
	font-size: .8em;
	color: #888;
`;

ApiCard.small.Method = styled.span`
	font-weight: bold;
	color: #333;
	text-transform: uppercase; 
`;

ApiCard.small.Url = styled.span`
	color: #555;
`;
