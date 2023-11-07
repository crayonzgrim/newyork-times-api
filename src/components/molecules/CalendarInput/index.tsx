import { InputBaseProps, css, styled } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { DateTime } from "luxon";

export type CalendarInputProps = {
  name: string;
  placeholder: string;
  value: string | DateTime;
  onChange: (value: Record<string, string>) => void;
} & Pick<InputBaseProps, "placeholder" | "value" | "name">;

export const CalendarInput = styled(
  ({
    name = "",
    placeholder,
    value,
    onChange,
    ...others
  }: CalendarInputProps) => {
    /** Render */
    return (
      <LocalizationProvider dateAdapter={AdapterLuxon} {...others}>
        <DatePicker
          className="picker"
          label={placeholder ?? ""}
          slotProps={{
            textField: { size: "small" },
            openPickerButton: { size: "small" },
          }}
          value={DateTime.fromISO(value.toString())}
          slots={{
            openPickerIcon: EventAvailableIcon,
          }}
          format={"yyyy.MM.dd"}
          onChange={(value: DateTime | null) => {
            onChange({ name, value: value ? value?.toString() : "" });
          }}
        />
      </LocalizationProvider>
    );
  },
)(({ theme }) => {
  return css``;
});
