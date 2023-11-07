import ArticleIcon from "@mui/icons-material/Article";
import { Box, Button, css, styled, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type NothingScrapPageProps = {
  //
};

export const NothingScrapPage = styled(
  ({ ...others }: NothingScrapPageProps) => {
    /** Property */
    const navigate = useNavigate();

    /** Function */
    const handleMoveToScrapPage = () => {
      navigate("/");
    };

    /** Render */
    return (
      <Box {...others}>
        <Box className="title">
          <ArticleIcon sx={{ color: "#6D6D6D", fontSize: "40px" }} />
          <Typography>저장된 스크랩이 없습니다.</Typography>
        </Box>
        <Button
          variant="contained"
          onClick={handleMoveToScrapPage}
          sx={{ width: "295px", height: "60px", borderRadius: "16px" }}
        >
          스크랩 하러 가기
        </Button>
      </Box>
    );
  },
)(({ theme }) => {
  return css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 100dvh;
    background: #f0f1f4;

    ::-webkit-scrollbar {
      display: none;
    }

    .title {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      margin-bottom: 20px;
    }
  `;
});
