const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    // Disable webpack's parallelism cap so the process doesn't spawn N
    // worker processes (each holding its own heap) when N CPUs are
    // available. On memory-constrained Docker Desktop VMs the per-worker
    // heap × parallelism easily exceeds the cgroup limit and the kernel
    // OOM-kills the build. Setting this to 1 trades wall-clock time for
    // headroom; locally on a fat host you can override by setting
    // CRACO_PARALLELISM=4 (etc) before invoking the build.
    configure: (webpackConfig) => {
      const parallel = parseInt(process.env.CRACO_PARALLELISM || '1', 10);

      if (webpackConfig.optimization && Array.isArray(webpackConfig.optimization.minimizer)) {
        webpackConfig.optimization.minimizer.forEach((minimizer) => {
          if (minimizer && minimizer.options && 'parallel' in minimizer.options) {
            minimizer.options.parallel = parallel;
          }
        });
      }

      // Cap general worker pool parallelism (used by terser, thread-loader)
      webpackConfig.parallelism = parallel;

      return webpackConfig;
    },
  },
};
