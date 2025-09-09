import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Dashboard from "./pages/dashboard";
import { ThemeProvider } from "./lib/theme-context";

function App() {
	return (
		<div className="fixed w-screen h-screen">
			<ThemeProvider>
				<Router>
					<Routes>
						<Route path="/" element={<Navigate to="/signin" replace />} />
						<Route path="/signin" element={<SignIn />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/dashboard" element={<Dashboard />} />
					</Routes>
				</Router>
			</ThemeProvider>
		</div>
	);
}

export default App;
