import MuiCheckbox, {
  type CheckboxProps as MuiCheckboxProps,
} from "@mui/material/Checkbox"
import CheckIcon from "@mui/icons-material/Check"

export type CheckboxProps = MuiCheckboxProps

export function Checkbox(props: CheckboxProps) {
  return (
    <MuiCheckbox
      {...props}
      disableRipple
      icon={
        <span
          className="checkbox-icon"
          style={{
            width: 22,
            height: 22,
            border: "1.5px solid #9ca3af",
            borderRadius: 4,
            display: "inline-block",
            background: "#fff",
          }}
        />
      }
      checkedIcon={
        <span
          className="checkbox-checked"
          style={{
            width: 22,
            height: 22,
            backgroundColor: "#2948d4",
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CheckIcon
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: 900,
            }}
          />
        </span>
      }
      sx={{
        padding: 0,

        "&.Mui-disabled": {
          opacity: 1,
        },

        /* unchecked disabled */
        "&.Mui-disabled .checkbox-icon": {
          borderColor: "#6b7280",
          backgroundColor: "#e5e7eb",
        },

        /* checked disabled */
        "&.Mui-disabled .checkbox-checked": {
          backgroundColor: "#6b7280",
        },

        "&.Mui-disabled .checkbox-checked svg": {
          color: "#f3f4f6",
        },
      }}
    />
  )
}