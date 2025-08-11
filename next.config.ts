import createNextIntlPlugin from "next-intl/plugin";
import {NextConfig} from "next";


/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    output: 'standalone',
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true
    },
    typescript: {
        ignoreBuildErrors: true
    }

};


const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);