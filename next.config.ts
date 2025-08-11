import createNextIntlPlugin from "next-intl/plugin";

import {FlatCompat} from '@eslint/eslintrc'
import {NextConfig} from "next";

const compat = new FlatCompat({
    // import.meta.dirname is available after Node.js v20.11.0
    baseDirectory: import.meta.dirname,

})

const nextConfig: NextConfig = {
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true
    },
    typescript: {
        ignoreBuildErrors: true
    }

};
const eslintConfig = [
    ...compat.config({
        extends: ['next', 'prettier'],
    }),
]

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);