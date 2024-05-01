import * as SC from './styles';
import React, { ReactNode } from 'react';

interface ErrorProps {
  children: ReactNode;
}

export const Error = ({ children }: ErrorProps) => <SC.Error>{children}</SC.Error>;
