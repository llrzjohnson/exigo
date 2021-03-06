module.exports = {
  siteMetadata: {
    title: 'Exigo',
    description: '', // TODO
    languageCode: 'en',
    countryCode: 'US',
  },

  proxy: {
    prefix: '/.netlify/functions',
    url: 'http://localhost:4000',
  },

  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        /* eslint-disable @typescript-eslint/camelcase */
        name: 'Exigo',
        short_name: 'Exigo',
        start_url: '/',
        background_color: '#fff', // TODO
        theme_color: '#fff', // TODO
        display: 'minimal-ui',
        icon: 'src/assets/favicon.png', // TODO
        /* eslint-enable */
      },
    },
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: {
        prefixes: ['/app/*'],
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    '@rhysforyou/gatsby-plugin-react-helmet-async',
    'gatsby-plugin-typescript',
    'gatsby-plugin-emotion',
    'gatsby-plugin-chakra-ui',
  ],
};
