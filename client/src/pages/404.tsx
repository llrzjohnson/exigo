import { Heading, Text } from '@chakra-ui/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteComponentProps } from '@reach/router';
import React from 'react';
import { Helmet } from 'react-helmet-async';

import Container from '../components/Container';
import Layout from '../components/Layout';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NotFoundPageProps extends RouteComponentProps {}

// eslint-disable-next-line no-empty-pattern
export default function NotFoundPage({}: NotFoundPageProps) {
  return (
    <Layout>
      <Helmet>
        <title>Page not found</title>
      </Helmet>

      <Container>
        <Heading as="h1" fontWeight={600} mb={2}>
          Page not found
        </Heading>
        <Text>The requested page is unavailable.</Text>
      </Container>
    </Layout>
  );
}
