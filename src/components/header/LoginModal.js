import React from 'react';
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material';

const LoginModal = ({ toggleModal, modalState }) => {
	const handleClick = (event) => {
		// Grab username and password from the login inputs
		const newUser = {
			username: event.target[0].value,
			password: event.target[2].value,
		};

		fetch('/user/login', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newUser),
		})
			.then((response) => {
				if (!response.ok) throw new Error(`http error: ${response.status}`);
        toggleModal('loginModal');
				return response.json();
			})
			.catch((error) => console.error('Invalid login', error));
	};

	return (
		<Dialog
			open={modalState.loginModal}
			onClose={() => toggleModal('loginModal')}
			sx={{ textAlign: 'center' }}
		>
			<DialogTitle>Login to Account</DialogTitle>

			<DialogContent className="dialog-content" sx={{ fontWeight: 'bold' }}>
				Login Here
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleClick(e);
					}}
					className="create-user-form"
				>
					<TextField
						id="username"
						label="Username"
						variant="outlined"
						required
					></TextField>
					<TextField
						id="password"
						label="Password"
						variant="outlined"
						required
					></TextField>
					<Button
						variant="contained"
						type="submit"
					>
						Submit
					</Button>
				</form>
				<Button
					variant="contained"
					className="dialogtext"
					sx={{ marginTop: '10px' }}
					onClick={()=>{
						toggleModal();
					}}
				>
					Close
				</Button>
			</DialogContent>
		</Dialog>
	);
};
export default LoginModal;
