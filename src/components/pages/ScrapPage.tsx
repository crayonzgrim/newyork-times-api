import { Box, css, styled } from "@mui/material";
import { FilterDialog } from "components/molecules";
import { ArticleCard, NothingScrapPage } from "components/organisms";

import { useScrappedArticles, useToggle } from "store";
import { IArticleData } from "types";

type ScrapPageProps = {
  //
};

export const ScrapPage = styled(({ ...others }: ScrapPageProps) => {
  /** Property */
  const scrappedArticles = useScrappedArticles();
  const toggle = useToggle();

  /** Render */
  return (
    <Box {...others}>
      {toggle && <FilterDialog />}

      <Box className={"inner-box"}>
        {scrappedArticles.length === 0 ? (
          <NothingScrapPage />
        ) : (
          scrappedArticles?.map((article: IArticleData) => (
            <ArticleCard key={article.web_url} article={article} />
          ))
        )}
      </Box>
    </Box>
  );
})(({ theme }) => {
  return css`
    height: 100vh;
    background-color: #f0f1f4;
    padding: 20px 20px 0px 20px;
    overflow: scroll;

    ::-webkit-scrollbar {
      display: none;
    }

    .inner-box {
      height: 100vh;
      margin-bottom: 200px;
      overflow: scroll;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      ::-webkit-scrollbar {
        display: none;
      }
    }
  `;
});
