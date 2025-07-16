import { PropsWithChildren } from "react";

export type DefaultScreenProps = PropsWithChildren<ScreenProps>;
interface ScreenProps {
  back?: boolean;
}
