import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/config";


export const buildDevServer = (options: BuildOptions):DevServerConfiguration => {
	return {
		port: options.port,
		hot: true,
		open: true,
	}
}