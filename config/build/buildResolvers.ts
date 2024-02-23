import type webpack from 'webpack';

export const buildResolvers = (): webpack.ResolveOptions => ({
    extensions: ['.ts', '.tsx', '.js'],
});
