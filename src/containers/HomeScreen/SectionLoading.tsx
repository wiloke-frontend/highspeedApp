import React from 'react';
import Magazine from 'components/Magazine/Magazine';
import { Container } from 'shared';

const SectionLoading = () => {
  return (
    <Container flex tachyons="ph3">
      <Magazine isLoading firstType="standard1" type="grid1" />
    </Container>
  );
};

export default SectionLoading;
