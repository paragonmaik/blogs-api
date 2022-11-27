import app from "./app";
import { hashPassword } from "./utils/auth";

async function genPass() {
	return await hashPassword("123456");
}

const teste = genPass();
const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT} || ${teste}`));
