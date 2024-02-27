import type webpack from 'webpack';
import { BuildOptions } from './types/config';

export const buildResolvers = (options: BuildOptions): webpack.ResolveOptions => ({
    extensions: ['.ts', '.tsx', '.js'],
    preferAbsolute: true,
    modules: [options.paths.src, 'node_modules'],
});
