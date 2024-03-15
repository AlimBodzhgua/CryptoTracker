import webpack from 'webpack';
import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { BuildPaths } from '../build/types/config';
import { buildCssLoader } from '../build/loaders/buildCssLoader';

export default ({ config }: {config: webpack.Configuration}) => {
    const paths: BuildPaths = {
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
    };

    if (config.resolve) {
        config.resolve.plugins = [
            ...(config.resolve.plugins || []),
            new TsconfigPathsPlugin({
                extensions: config.resolve.extensions,
            }),
        ];

        config.resolve.extensions!.push('.ts', '.tsx');
        config.resolve.modules!.push(paths.src);
    }

    if (config.module) {
        // file loader
        config.module.rules = config.module.rules?.map((rule: any) => {
            if (/svg/.test(rule.test as string)) {
                return { ...rule, exclude: /\.svg$/i };
            }
            return rule;
        });

        config.module.rules!.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        config.module.rules!.push(buildCssLoader(true));
    }

    return config;
};
