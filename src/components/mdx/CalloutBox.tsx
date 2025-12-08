import React from 'react';

interface CalloutBoxProps {
  title?: string;
  children: React.ReactNode;
}

export default function CalloutBox({ title, children }: CalloutBoxProps) {
  return (
    // On utilise les classes CSS globales .callout-box que tu as définies
    <div className="callout-box">
      {title && <h3>{title}</h3>}
      <div>{children}</div>
    </div>
  );
}