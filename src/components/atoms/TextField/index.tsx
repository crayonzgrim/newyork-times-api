import {
  Box,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
  css,
  styled,
} from "@mui/material";
import { CalendarInput } from "components/molecules";
import React from "react";

import { Label, LabelProps } from "../Label";
import { DateTime } from "luxon";

type Mode = "standard" | "date";

export type TextFieldProps = {
  name?: string;
  label?: string;
  placeholder?: string;
  mode?: Mode;
  value: string;
  onChange: (value: Record<string, string>) => void;
} & Omit<MuiTextFieldProps, "label" | "placeholder" | "onChange"> &
  Pick<LabelProps, "loading">;

export const TextField = styled(
  React.forwardRef<any, TextFieldProps>((props: TextFieldProps, ref) => {
    /** Property */
    const {
      name = "",
      label,
      mode = "standard",
      loading = false,
      placeholder = "",
      className,
      value = "",
      onChange,
      ...others
    } = props;

    /** Render */
    return (
      <Box className={className}>
        <Label loading={loading}>{label}</Label>
        {mode === "standard" ? (
          <MuiTextField
            {...others}
            name={name}
            inputRef={ref}
            size={"small"}
            variant={"outlined"}
            placeholder={placeholder}
            value={value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const { name, value } = event.target;
              onChange({ name, value });
            }}
          />
        ) : (
          <CalendarInput
            name={name}
            placeholder={placeholder}
            value={!!value ? value : DateTime.now().setZone("Asia/Seoul")}
            onChange={onChange}
            sx={{ width: "100%" }}
          />
        )}
      </Box>
    );
  }),
)(({ theme }) => {
  return css`
    width: 100%;

    display: flex;
    flex-direction: column;
  `;
});
