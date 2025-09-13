import React from "react";
import Lottie from "lottie-react";
import loading from "./loading.json";
import { cn } from "@/src/lib/shadcn/utils";

const Loader = ({
  classes,
}: {
  classes?: {
    containerClassNames?: string;
    mediaClassNames?: string;
  };
}) => {
  return (
    <div
      className={cn(
        `flex items-center justify-center`,
        classes?.containerClassNames
      )}
    >
      <Lottie animationData={loading} className={classes?.mediaClassNames} />
    </div>
  );
};

export default Loader;
