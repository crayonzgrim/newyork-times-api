import { Typography, TypographyProps, css, styled } from "@mui/material";

type EllipsisTextProps = {
  line: number;
  children: string | React.ReactNode;
} & TypographyProps;

export const EllipsisText = styled((props: EllipsisTextProps) => {
  const { children, ...others } = props;
  return <Typography {...others}>{children}</Typography>;
})(({ theme, line }) => {
  return css`
    white-space: ${line === 1 ? "nowrap" : "wrap"};
    text-overflow: ellipsis;
    overflow: hidden;

    display: ${line > 1 ? "-webkit-box" : ""};
    -webkit-line-clamp: ${line > 1 ? line : ""};
    -webkit-box-orient: vertical;
  `;
});
