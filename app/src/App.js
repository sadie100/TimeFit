import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Main';
import Login from './Login';
import Join from './Join';

const App = () => {
	return (
		<div className='App'>

				<Routes>
					<Route path="/" element={<Main />}></Route>
          <Route path="/join" element={<Join />}></Route>

					<Route path="/login" element={<Login />}></Route>

				</Routes>

		</div>
	);
};

export default App;
