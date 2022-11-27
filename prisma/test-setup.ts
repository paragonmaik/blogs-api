import { exec } from "node:child_process";
import util from "node:util";

const execSync = util.promisify(exec);
const prismaBinary = "npx prisma db push --force-reset && npx prisma db seed";

export async function seedDB() {
	await execSync(`${prismaBinary}`);
}
