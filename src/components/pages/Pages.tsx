import React from "react";
import { Box, css, styled } from "@mui/material";
import { Route, Routes, useLocation } from "react-router-dom";

import { Header } from "#components/organisms/Header/Header";
import { Footer } from "#components/organisms";
import { useScrappedArticles } from "#store";
import { MainPage } from "./MainPage";
import { ScrapPage } from "./ScrapPage";

type PagesProps = {
  //
};

export const Pages = styled(({ ...others }: PagesProps) => {
  /** Property */
  const scrappedArticles = useScrappedArticles();

  const { pathname } = useLocation();

  const rootStyles: React.CSSProperties = {
    position: "relative",
    overflowY: "hidden",

    maxWidth: "560px",
    height: "100dvh",

    background: "#F0F1F4",
  };

  /** Render */
  return (
    <Box {...others} sx={rootStyles}>
      {pathname.includes("scrap") && scrappedArticles.length === 0 ? null : (
        <Header />
      )}
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
      <Routes>
        <Route path="/scrap" element={<ScrapPage />} />
      </Routes>
      <Footer />
    </Box>
  );
})(({ theme }) => {
  return css``;
});
