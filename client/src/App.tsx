import React, { useState, FC } from "react";
import ReactDOM from 'react-dom';
import './index.css'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import { AddDataPage } from "./pages/addingDataPage";
import { Table } from "./pages/tablePage";
import store from "./store";

interface AppState { }

export const App: FC<AppState> = () => {
	return (
		<>
			<Provider store={store}>
				<Router>
					<Routes>
						<Route path="/" element={<Table />} />
						{/* <Route path="/addData" element={<AddDataPage />} /> */}
					</Routes>
				</Router>
			</Provider>
		</>
	);
};

ReactDOM
	.render(<App />, document.getElementById('root'));