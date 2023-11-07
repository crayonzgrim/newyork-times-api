import {
  Box,
  CircularProgress,
  Button as MuiButton,
  buttonClasses as MuiButtonClasses,
  ButtonProps as MuiButtonProps,
  css,
  styled,
} from "@mui/material";
import React, { useMemo } from "react";

export type ButtonProps = {
  loading?: boolean | undefined;
} & MuiButtonProps;

export const Button = styled(
  React.forwardRef<any, ButtonProps>((props, ref) => {
    /** Property */
    const { loading = false, children, disabled, startIcon, ...others } = props;

    const StartIcon = useMemo(() => {
      if (loading) {
        return (
          <Box className={"loading-box"}>
            <CircularProgress size={14} color={"inherit"} />
          </Box>
        );
      }

      return startIcon ?? null;
    }, [loading, startIcon]);

    /** Render */
    return (
      <MuiButton
        {...others}
        ref={ref}
        startIcon={StartIcon}
        disabled={!!disabled || (!!StartIcon && loading)}
      >
        {children}
      </MuiButton>
    );
  }),
)(({ theme }) => {
  return css`
    &.${MuiButtonClasses.root} {
      text-transform: none;

      > .${MuiButtonClasses.startIcon} {
        > .loading-box {
          width: 20px;
          height: 20px;

          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  `;
});
