import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, {useEffect} from 'react';

import {MainPage} from "./Main Page/MainPage";
import {Header} from "./Components/Header";
import {ResultPage} from "./Result Page/ResultPage";
import {LoadingPage} from "./Components/LoadingPage";
import {InitialPage} from "./Initial Page/InitialPage";

const pageName = "Route Tracer";

const Layout = () => {
	return (
		<div>
			<Header />
			<LoadingPage />
		</div>
	);
};

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout/>,
		children: [
			{
				path: "/",
				element: <InitialPage/>,
			},
			{
				path: "/inputs",
				element: <MainPage/>,
			},
			{
				path: "/final",
				element: <ResultPage/>,
			},
		]
	}
])

function App() {

	useEffect(() => {

		document.title = pageName;
	
	}, [])

	return (
		<div>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
