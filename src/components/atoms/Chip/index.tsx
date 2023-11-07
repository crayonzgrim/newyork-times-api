import {
  styled,
  css,
  Chip as MuiChip,
  ChipProps as MuiChipProps,
} from "@mui/material";

type ChipProps = {
  name: string;
  label: string;
  mode?: "menu" | "dialog";
  status?: boolean;
  onClick?: (value: Record<string, string>) => void;
} & Omit<MuiChipProps, "onClick" | "name">;

export const Chip = styled((props: ChipProps) => {
  /** Property */
  const {
    name = "",
    label,
    mode = "dialog",
    status,
    onClick,
    ...others
  } = props;

  /** Render */
  return (
    <MuiChip
      {...others}
      size={"small"}
      label={label}
      variant={"outlined"}
      onClick={() => onClick?.({ name, label })}
    />
  );
})(({ theme, mode, status }) => {
  return css`
    background-color: ${status && mode === "dialog" ? "#82B0F4" : "#fff"};
    color: ${status && mode === "dialog" ? "#fff" : "#6D6D6D"};
    border: ${status && mode === "menu" ? "1px solid #82B0F4" : ""};
    text-transform: none;
  `;
});
