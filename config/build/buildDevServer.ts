import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { type BuildOptions } from './types/config';

export const buildDevServer = (options: BuildOptions): DevServerConfiguration => ({
    port: options.port,
    hot: true,
    historyApiFallback: true,
    open: true,
});
