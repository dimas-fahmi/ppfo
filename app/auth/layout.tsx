import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: { children: Readonly<React.ReactNode> }) => {
  return (
    <div className="fixed flex items-center justify-center md:grid md:grid-cols-2 inset-0">
      {/* Form */}
      <div className="flex items-center justify-center">{children}</div>

      {/* Illustration */}
      <div className="hidden md:flex justify-center items-center p-16">
        <Image
          width={768}
          height={768}
          src={
            "https://zvgpixcwdvbogm3e.public.blob.vercel-storage.com/ppfo/arts/NO%20MORE.png"
          }
          alt="No More Art - A woman with tape on her mouth and shackle on her hand"
          className="w-[500px] object-cover rounded-2xl shadow-2xl border"
          priority
        />
      </div>
    </div>
  );
};

export default AuthLayout;
