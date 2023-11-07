import { useMemo } from "react";
import { Box, Button, buttonBaseClasses, css, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import {
  useHeadline,
  useModalActions,
  useSelectedCountries,
  useSelectedDate,
  useToggle,
} from "#store";
import { SmartPhoneLayout } from "./SmartPhoneLayoutHeader";
import { Chip } from "#components/atoms/Chip";
import { DateTime } from "luxon";
import { changeLabelToKorean } from "#utils";

type HeaderProps = {
  //
};

export const Header = styled(({ ...others }: HeaderProps) => {
  /** Property */
  const headline = useHeadline();
  const selectedDate = useSelectedDate();

  const selectedCountries = useSelectedCountries();

  const toggle = useToggle();
  const { setToggle } = useModalActions();

  const countries = useMemo(() => {
    return Object.values(selectedCountries).filter(
      (item) => item.status === true,
    );
  }, [selectedCountries]);

  /** Function */
  const handleOpenModal = () => {
    setToggle(!toggle);
  };

  const [first, ...rest] = countries;
  const result = [
    changeLabelToKorean(first?.label),
    ...(rest.length ? ` 외 ${rest.length}개` : ""),
  ].join("");

  /** Render */
  return (
    <>
      <SmartPhoneLayout />
      <Box {...others}>
        <Button onClick={handleOpenModal}>
          <Chip
            name="headline"
            icon={
              <SearchIcon
                style={{ color: headline.length > 0 ? "#82B0F4" : "" }}
              />
            }
            label={headline.length === 0 ? "전체 헤드라인" : headline}
            mode={"menu"}
            status={headline.length > 0}
            sx={{
              height: "34px",
              minWidth: "120px",
              color: headline.length > 0 ? "#82B0F4" : "",
            }}
          />
        </Button>
        <Button onClick={handleOpenModal}>
          <Chip
            name="date"
            icon={
              <EventAvailableIcon
                style={{ color: selectedDate.length > 0 ? "#82B0F4" : "" }}
              />
            }
            label={
              selectedDate.length === 0
                ? "전체 날짜"
                : DateTime.fromISO(selectedDate).toFormat("yyyy.MM.dd")
            }
            mode={"menu"}
            status={selectedDate.length > 0}
            sx={{
              height: "34px",
              minWidth: "120px",
              color: selectedDate.length > 0 ? "#82B0F4" : "",
            }}
          />
        </Button>
        <Button onClick={handleOpenModal}>
          <Chip
            name="countries"
            label={countries.length === 0 ? "전체 국가" : result}
            mode={"menu"}
            status={countries.length > 0}
            sx={{
              height: "34px",
              minWidth: "50px",
              color: countries.length > 0 ? "#82B0F4" : "",
            }}
          />
        </Button>
      </Box>
    </>
  );
})(({ theme }) => {
  return css`
    display: flex;
    align-items: center;

    padding-left: 20px;
    gap: 4px;
    max-height: 60px;
    min-height: 60px;

    background-color: #fff;

    .${buttonBaseClasses.root} {
      padding: 0;
    }
  `;
});
