import { Box, css, styled } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { dateFormat } from "utils";
import { EllipsisText } from "#components/atoms";
import { IArticleData } from "#types";
import { useNewsActions } from "#store";

type ArticleCardProps = {
  article: IArticleData;
  innerRef?: React.Ref<HTMLParagraphElement>;
} & React.HTMLAttributes<HTMLParagraphElement>;

export const ArticleCard = styled((props: ArticleCardProps) => {
  const {
    article: {
      web_url,
      headline,
      pub_date,
      abstract,
      reporter,
      source,
      isScrapped,
    },
    innerRef,
    ...others
  } = props;

  const { setScrapToggle, setScrapArticles } = useNewsActions();

  const handleScrapArticle = (url: string) => {
    setScrapToggle(url);

    setScrapArticles({
      web_url,
      headline,
      pub_date,
      abstract,
      reporter,
      source,
      isScrapped,
    });
  };

  return (
    <Box {...others} ref={innerRef}>
      <Box className="title">
        <EllipsisText line={2} sx={{ fontWeight: "bold" }}>
          {headline}
        </EllipsisText>
        <Box>
          {isScrapped ? (
            <StarIcon
              onClick={() => handleScrapArticle(web_url)}
              sx={{ color: "#FFB800" }}
            />
          ) : (
            <StarBorderIcon onClick={() => handleScrapArticle(web_url)} />
          )}
        </Box>
      </Box>
      <Box className="source">
        <EllipsisText line={1} variant={"caption"} sx={{ maxWidth: "200px" }}>
          {source + " " + reporter}
        </EllipsisText>
        <EllipsisText
          line={1}
          variant={"caption"}
          sx={{ color: "#6D6D6D", maxWidth: "87" }}
        >
          {dateFormat(pub_date)}
        </EllipsisText>
      </Box>
    </Box>
  );
})(({ theme }) => {
  return css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 8px;
    height: 104px;

    width: 100%;

    .title {
      display: flex;
      justify-content: space-between;
      width: 100%;
      max-width: 560px;
      padding: 10px 20px;
    }

    .source {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 560px;
      padding: 0px 20px 10px 20px;
    }
  `;
});
