import {
  Box,
  Dialog,
  DialogContent,
  paperClasses,
  css,
  styled,
  Button,
} from "@mui/material";

import { Chip } from "#components/atoms/Chip";
import { Label } from "#components/atoms/Label";
import { TextField } from "#components/atoms/TextField";
import {
  useHeadline,
  useModalActions,
  useNewsActions,
  useSelectedCountries,
  useSelectedDate,
  useToggle,
} from "#store";
import { useState } from "react";
import { getFilteredArticles } from "#api";
import { changeLabelToEnglish, changeLabelToKorean } from "#utils";

export interface FilterDialogProps {
  onClose?: () => void;
}

export const FilterDialog = styled(
  ({ onClose, ...others }: FilterDialogProps) => {
    /** Property */
    const headline = useHeadline();
    const selectedDate = useSelectedDate();
    const selectedCountries = useSelectedCountries();
    const toggle = useToggle();

    const { setToggle, setHeadline, setSelectedDate, setSelectedCountries } =
      useModalActions();

    const { setFilteredAllNews } = useNewsActions();

    const [formHeadline, setFormHeadline] = useState(headline ?? "");
    const [formDate, setFormDate] = useState(selectedDate ?? "");
    const [formCountries, setFormCountries] =
      useState<{ label: string; status: boolean }[]>(selectedCountries);

    /** Function */
    const handleCallFilterArticles = async (countriesLabel: string[]) => {
      try {
        return await getFilteredArticles({
          pageParam: 1,
          date: formDate,
          countries: countriesLabel,
        });
      } catch (err) {
        console.error(err);
      }
    };

    const handleUpdateFilterArticle = (countriesLabel: string[]) => {
      handleCallFilterArticles(countriesLabel)
        .then((articles) => {
          if (articles && articles.length > 0 && formHeadline) {
            const data = articles.filter((article) => {
              return article.headline.main.toLowerCase().includes(formHeadline);
            });

            if (Array.isArray(data)) {
              data.forEach((item) => {
                const {
                  web_url,
                  headline: { main },
                  pub_date,
                  abstract,
                  byline: { original },
                  source,
                } = item;

                const organizedData = {
                  web_url: web_url ?? "",
                  headline: main ?? "",
                  pub_date: pub_date,
                  abstract: abstract,
                  reporter: original ?? "",
                  source: source,
                  isScrapped: false,
                };

                setFilteredAllNews(organizedData);
              });
            }
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setToggle(!toggle);
        });
    };

    const handleFieldsSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      setHeadline(formHeadline);
      if (formDate.length > 0 || formDate !== "Invalid DateTime") {
        setSelectedDate(formDate);
      }
      setSelectedCountries(formCountries);

      const countriesLabel = formCountries.reduce(
        (acc, item) => (item.status ? [...acc, item.label] : acc),
        [] as string[],
      );

      handleUpdateFilterArticle(countriesLabel);
    };

    const handleInputChange = (inputValue: Record<string, string>) => {
      if (inputValue.name === "headline") {
        setFormHeadline(inputValue.value);
      } else if (inputValue.name === "date") {
        setFormDate(inputValue.value);
      } else {
        const updateData = formCountries.map((item) => {
          if (item.label === changeLabelToEnglish(inputValue.label)) {
            return { ...item, status: !item.status };
          }
          return item;
        });

        setFormCountries(updateData);
      }
    };

    /** Render */
    return (
      <Dialog
        {...others}
        open={true}
        onClose={() => setToggle(!toggle)}
        fullWidth={true}
      >
        <DialogContent>
          <Box component={"form"} onSubmit={handleFieldsSubmit}>
            <Box className="field-box">
              <TextField
                name="headline"
                label="헤드라인"
                placeholder="검색하실 헤드라인을 입력해주세요."
                mode={"standard"}
                value={formHeadline}
                onChange={handleInputChange}
                autoFocus
              />
            </Box>
            <Box className="field-box">
              <TextField
                name="date"
                label="날짜"
                placeholder="날짜를 입력해주세요."
                mode={"date"}
                value={formDate}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <Label>국가</Label>
              {formCountries.map((country, index) => (
                <Chip
                  key={index}
                  name={"countries"}
                  label={changeLabelToKorean(country.label)}
                  mode={"dialog"}
                  status={country.status}
                  onClick={handleInputChange}
                  sx={{ px: "2px", py: 2, mr: 1, mb: 1 }}
                />
              ))}
            </Box>

            <Button
              className={"button"}
              fullWidth
              variant={"contained"}
              type="submit"
            >
              필터 적용하기
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    );
  },
)(({ theme }) => {
  return css`
    position: absolute;
    top: 0;
    left: 0;

    border: 1px dashed green;
    max-width: 560px;
    min-width: 375px;

    .${paperClasses.root} {
      border-radius: 16px;
      min-width: 335px;
      // border: 1px dashed purple;
    }

    .field-box {
      margin-bottom: 40px;
    }

    .button {
      margin-top: 20px;
      background-color: #3478f6;
    }
  `;
});
