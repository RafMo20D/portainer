import { PropsWithChildren } from 'react';

import { FormSectionTitle } from '../FormSectionTitle';

interface Props {
  title: string;
}

export function FormSection({ children, title }: PropsWithChildren<Props>) {
  return (
    <>
      <FormSectionTitle>{title}</FormSectionTitle>

      {children}
    </>
  );
}
