
export default ({ children }) => `
<!doctype html>
<html>
	<head>
		<title>Yo boy</title>
	</head>
	<body>${children}</body>
</html>
`.replace(/\s+/gi, ' ');
