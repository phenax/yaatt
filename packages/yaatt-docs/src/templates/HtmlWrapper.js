
import React from 'react';

const HtmlWrapper = ({ children }) => (
	<html>
		<head>
			<title>MyPage</title>
			<style dangerouslySetInnerHTML={{ __html: `
				html, body {
					padding: 0;
					margin: 0;
					font-family: Roboto, Helvetica, sans-serif;
				}
				html, body, html *, body * {
					box-sizing: border-box;
				}
			` }} />
		</head>
		<body>
			{children}
		</body>
	</html>
);

export default HtmlWrapper;
