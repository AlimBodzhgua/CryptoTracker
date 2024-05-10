import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import CopyPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { type BuildOptions } from './types/config';

export const buildPlugins = (options: BuildOptions): webpack.WebpackPluginInstance[] => {
    const { paths, isDev, project } = options;
    const isProd = !isDev;

    const plugins = [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[name].[contenthash].css',
        }),
        new Dotenv(),
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __PROJECT__: JSON.stringify(project),
        }),
        new ForkTsCheckerWebpackPlugin(),
    ];

    if (isDev) {
        plugins.push(new ReactRefreshPlugin());
        // plugins.push(new BundleAnalyzerPlugin({openAnalyzer: true}));
    }

    if (isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[name].[contenthash].css',
        }));
        plugins.push(new CopyPlugin({
            patterns: [
                { from: paths.locales, to: paths.buildLocales },
            ],
        }));
    }

    return plugins;
};
