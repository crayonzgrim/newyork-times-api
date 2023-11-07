import ArticleIcon from "@mui/icons-material/Article";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useLocation } from "react-router-dom";
import { Box, css, styled, Typography } from "@mui/material";

type FooterProps = {
  //
};

export const Footer = styled(({ ...others }: FooterProps) => {
  /** Property */
  const { pathname } = useLocation();

  /** Render */

  return (
    <Box {...others}>
      <Link to={"/"} className="link">
        <HomeIcon
          sx={{
            color: pathname === "/" ? "#FFF" : "#6D6D6D",
            fontSize: "24px",
          }}
        />
        <Typography
          sx={{
            color: pathname === "/" ? "#FFF" : "#6D6D6D",
            fontSize: "10px",
            mt: "9px",
          }}
        >
          홈
        </Typography>
      </Link>
      <Link to={"/scrap"} className="link">
        <ArticleIcon
          sx={{
            color: pathname.includes("scrap") ? "#FFF" : "#6D6D6D",
            fontSize: "24px",
          }}
        />
        <Typography
          sx={{
            color: pathname.includes("scrap") ? "#FFF" : "#6D6D6D",
            fontSize: "10px",
            mt: "9px",
          }}
        >
          스크랩
        </Typography>
      </Link>
    </Box>
  );
})(({ theme }) => {
  return css`
    position: sticky;
    bottom: 0;
    left: 0;
    z-index: 999999;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 20px 80px;
    background-color: #000;
    border-radius: 30px;

    .link {
      display: flex;
      flex-direction: column;
      align-items: center;

      text-decoration: none;
    }
  `;
});
