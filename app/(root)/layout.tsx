import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main>
      <div>sidebar</div>
      {children}
    </main>
  );
};

export default layout;
