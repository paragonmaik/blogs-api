/* 
  createUser mocks
*/

export const validData = {
	displayName: "Rubinho Barrichello",
	email: "rubinho@gmail.com",
	password: "654321",
	image:
		"https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg",
};

export const emptyFieldsData = [
	{
		displayName: "",
		email: "rubinho@gmail.com",
		password: "654321",
		image:
			"https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg",
	},
	{
		displayName: "Rubinho Barrichello",
		email: "",
		password: "654321",
		image:
			"https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg",
	},
	{
		displayName: "Rubinho Barrichello",
		email: "rubinho@gmail.com",
		password: "",
		image:
			"https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg",
	},
	{
		displayName: "Rubinho Barrichello",
		email: "rubinho@gmail.com",
		password: "654321",
		image: "",
	},
];

export const incorrectDisplayNameLength = {
	displayName: "Rubin",
	email: "rubinho@gmail.com",
	password: "654321",
	image:
		"https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg",
};

export const incorrectPasswordLength = {
	displayName: "Rubinho Barrichello",
	email: "rubinho@gmail.com",
	password: "65432",
	image:
		"https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg",
};

export const invalidEmail = {
	displayName: "Rubinho Barrichello",
	email: "rubinho",
	password: "654321",
	image:
		"https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg",
};

export const alreadyRegisteredUser = {
	displayName: "Lewis Hamilton",
	email: "lewishamilton@gmail.com",
	password: "$2b$05$40Wnx.FdnHDuNqma7ft/XeptgYLe9pN5WUPJ7OWsm4HLLxyjgWFsK",
	image:
		"https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg",
};

/* 
  getUsers mocks
*/

export const usersList = [
	{
		displayName: "Lewis Hamilton",
		email: "lewishamilton@gmail.com",
		image:
			"https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg",
	},
	{
		displayName: "Michael Schumacher",
		email: "michaelschumacher@gmail.com",
		image:
			"https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg",
	},
];
