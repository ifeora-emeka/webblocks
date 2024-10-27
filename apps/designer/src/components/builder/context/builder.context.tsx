import React, { createContext, useContext, useState } from 'react';
import { PageMetadata, PagesData } from '@/types/pages.type';
import { ProjectData } from '@/types/projects.types';
import { BuilderBreakpoints } from '@repo/designer/types/designer.types';

export interface BuilderState {
  project: ProjectData | null;
  metadata: PageMetadata | null;
  pages: PagesData[];
}

const initialState: BuilderState = {
  project: null,
  metadata: null,
  pages: [],
};

const BuilderContext = createContext<{
  state: BuilderState;
  updateBuilderState: (newState: Partial<BuilderState>) => void;
  getViewportWidth: (breakpoint: BuilderBreakpoints) => string;
} | null>(null);

export const BuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<BuilderState>(initialState);

  const updateBuilderState = (newState: Partial<BuilderState>) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  const getViewportWidth = (breakpoint: BuilderBreakpoints): string => {
    switch (breakpoint) {
      case 'base':
        return '400px'
      case 'md':
        return '700px'
      case 'lg':
        return '100%'
      default:
        return '100%'
    }
  }

  return (
    <BuilderContext.Provider value={{ state, updateBuilderState, getViewportWidth }}>
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilderContext must be used within a BuilderProvider');
  }
  return context;
};
