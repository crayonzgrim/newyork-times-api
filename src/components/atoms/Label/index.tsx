import {
  Box,
  CircularProgress,
  Typography,
  css,
  iconButtonClasses,
  styled,
  svgIconClasses,
  typographyClasses,
} from "@mui/material";
import React from "react";

export type LabelProps = {
  loading?: boolean;
  icon?: React.ReactNode;
};

export const Label = styled(
  React.forwardRef<any, React.PropsWithChildren<LabelProps>>((props, ref) => {
    /** Property */
    const { loading, children, icon, ...others } = props;

    /** Render */
    return (
      <Box {...others}>
        <Typography component={"label"} variant={"caption"}>
          {children}
        </Typography>
        {loading && <CircularProgress size={10} color={"primary"} />}
        {icon ?? null}
      </Box>
    );
  }),
)(({ theme }) => {
  return css`
    width: 100%;

    display: flex;
    align-items: center;
    column-gap: 4px;

    margin-bottom: 8px;

    > .${typographyClasses.root} {
      line-height: 24px;
      color: #000000;
      font-weight: 600;
      font-size: 16px;
    }

    > .${iconButtonClasses.root} {
      margin-left: auto;
      padding: 0;
      > .${svgIconClasses.root} {
        width: 14px;
        height: 14px;
      }
    }
  `;
});
