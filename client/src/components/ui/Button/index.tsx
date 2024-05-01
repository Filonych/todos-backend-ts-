// Button/index.tsx
import React, { ButtonHTMLAttributes } from 'react';
import * as SC from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <SC.Button {...rest}>{children}</SC.Button>
);
