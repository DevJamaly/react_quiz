import type React from 'react';

interface MainElementProps {
  children: React.ReactNode;
}

function MainElement({ children }: MainElementProps) {
  return <main className="main">{children}</main>;
}

export default MainElement;
