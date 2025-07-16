import type { ComponentType, JSX } from 'react';

export interface RouteTemplate {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}
