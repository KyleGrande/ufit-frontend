import React, { PropsWithChildren } from "react";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";

type Props = {
  top: string;
  bottom: string;
  children: any;
  style?: any;
};

const LinearGradient = (props: PropsWithChildren<Props>) => {
  const { top, bottom, style } = props;

  return (
    <>
      <ExpoLinearGradient colors={[top, bottom]} style={style}>
        {props.children}
      </ExpoLinearGradient>
    </>
  );
};

export default LinearGradient;
