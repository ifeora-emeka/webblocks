import {
  BuilderBreakpoints,
  ResponsiveChakraProps,
} from "@repo/designer/types/designer.types";

export const getResponsiveProps = (
  props: ResponsiveChakraProps,
  activeBreakpoint: BuilderBreakpoints,
) => {
  const responsiveProps: Record<string, any> = {};
  for (const key in props) {
    //@ts-ignore
    if (props[key] && props[key][activeBreakpoint] !== undefined) {
      //@ts-ignore
      responsiveProps[key] = props[key][activeBreakpoint];
    }
  }
  return responsiveProps;
};
