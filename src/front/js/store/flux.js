const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
		login: async (email, password) => {
			const opts = {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: email,
					password: password
				})
			};
			try{
			const resp = await fetch("https://3001-4geeksacade-reactflaskh-1l7wqax7i1e.ws-us106.gitpod.io/api/token", opts) 
			if (resp.status !== 200){
				alert("USER NOT IN DATABASE");
				return false;
			}
			const data = await resp.json();
			sessionStorage.setItem("token", data.token);
			setStore({token: data.token})
			console.log('Response:', data);
			return true;
			}
			catch(error){
			console.error('error')
			}},
			logout: () => {
				const token = sessionStorage.removeItem("token")
				if (token && token!= "" && token != undefined) setStore({token: null})
			},

			synctoken: () =>{
				const token = sessionStorage.getItem("token")
				if (token && token!= "" && token != undefined) setStore({token: token})
			},
			getPrivateMessage: async () => {
				const store = getStore()
				const token = store.token;
				const opts = {
				  method: 'GET',
				  headers: {
					'Authorization': 'Bearer ' + token
				  }
				};
			fetch("https://3001-4geeksacade-reactflaskh-1l7wqax7i1e.ws-us106.gitpod.io/api/private", opts)
				.then(resp => resp.json())
				.then(data => setStore({message: data.message}))
				.catch(error => console.log('not loading the private'))
			},
			getMessage: async () => {
				try{
					const store = getStore()
					const opts = {
						"Authorization": "Bearer" + store.token
					}
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
