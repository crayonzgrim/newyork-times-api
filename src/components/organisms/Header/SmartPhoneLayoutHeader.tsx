import { Box, css, styled, Typography } from "@mui/material";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import WifiIcon from "@mui/icons-material/Wifi";
import Battery5BarIcon from "@mui/icons-material/Battery5Bar";
import { DateTime } from "luxon";

type SmartPhoneLayoutProps = {
  //
};

export const SmartPhoneLayout = styled(
  ({ ...others }: SmartPhoneLayoutProps) => {
    return (
      <Box {...others}>
        <Typography sx={{ fontWeight: "bold", fontSize: "15px" }}>
          {DateTime.now().toFormat("H:mm")}
        </Typography>
        <Box className="info">
          <SignalCellularAltIcon fontSize={"small"} />
          <WifiIcon fontSize={"small"} />
          <Battery5BarIcon
            fontSize={"small"}
            sx={{ transform: "rotate(90deg)" }}
          />
        </Box>
      </Box>
    );
  },
)(({ theme }) => {
  return css`
    height: 44px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: #fff;

    padding: 0px 20px;

    border-top-left-radius: 30px;
    border-top-right-radius: 30px;

    .info {
      width: 67px;
      height: 11.5px;

      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `;
});
