import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Box, Typography, css, styled } from "@mui/material";

import { FilterDialog } from "#components/molecules";
import { ArticleCard } from "#components/organisms";
import { IArticle, IArticleData } from "#types";
import { getArticles } from "#api";
import { useInView } from "react-intersection-observer";
import { Button } from "#components/atoms";
import {
  useAllNews,
  useFilteredArticles,
  useNewsActions,
  useToggle,
} from "#store";

type MainPageProps = {
  //
};

export const MainPage = styled(({ ...others }: MainPageProps) => {
  /** Property */

  const { ref, inView } = useInView();

  const allNews = useAllNews();
  const { setAllNews } = useNewsActions();

  const toggle = useToggle();
  const filteredArticles = useFilteredArticles();

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage ? allPages.length + 1 : undefined;
      return nextPage;
    },
    enabled: true,
  });

  /** Function */
  useEffect(() => {
    if (data) {
      const page = +(data?.pageParams.at(-1) ?? 1) - 1;

      if (Array.isArray(data?.pages[page])) {
        data?.pages[page].forEach((page: IArticle) => {
          const {
            web_url,
            headline: { main },
            pub_date,
            abstract,
            byline: { original },
            source,
          } = page;

          const organizedData = {
            web_url: web_url ?? "",
            headline: main ?? "",
            pub_date: pub_date,
            abstract: abstract,
            reporter: original ?? "",
            source: source,
            isScrapped: false,
          };

          setAllNews(organizedData);
        });
      }
    }
  }, [data]);

  useEffect(() => {
    if (!data) {
      refetch();
    }

    if (inView && hasNextPage && filteredArticles.length === 0) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, filteredArticles]);

  /** Render */
  if (isLoading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ mb: 2 }}>로딩 중입니다...</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ mb: 2 }}>Error: {error.message}</Typography>
        <Button
          loading={isLoading}
          variant={"contained"}
          onClick={() => refetch()}
        >
          재시도
        </Button>
      </Box>
    );
  }
  return (
    <Box {...others}>
      {toggle && <FilterDialog />}
      <Box className={"article-inner-box"} ref={ref}>
        {allNews.length > 0 ? (
          <Box sx={{ height: "100vh", width: "100%" }}>
            {allNews?.map((article: IArticleData) => (
              <ArticleCard
                innerRef={hasNextPage ? ref : null}
                key={article.web_url}
                article={article}
              />
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            불러올 수 없습니다. 잠시 후 다시 시도해주세요.
          </Box>
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

    .article-inner-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      height: 100vh;
      margin-bottom: 200px;
      overflow: scroll;

      ::-webkit-scrollbar {
        display: none;
      }
    }
  `;
});
