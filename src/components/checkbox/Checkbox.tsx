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
            borderRadius: 4,
            display: "inline-block",
          }}
        />
      }
      checkedIcon={
        <span
          className="checkbox-checked"
          style={{
            width: 22,
            height: 22,
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

        ".checkbox-icon": {
          border: "1.5px solid #9ca3af",
          backgroundColor: "#fff",
        },

        ".checkbox-checked": {
          backgroundColor: "#2948d4",
        },

        "&.Mui-disabled": {
          opacity: 1,
        },
        "&.Mui-disabled .MuiSvgIcon-root": {
          color: "#6b7280",
        },

        /* unchecked disabled */
        "&.Mui-disabled .checkbox-icon": {
          borderColor: "#cbd5f0",
          backgroundColor: "#f1f5f9",
          borderWidth: 1,
        },

        /* checked disabled */
        "&.Mui-disabled .checkbox-checked": {
          backgroundColor: "#cbd5f0",
          borderColor: "#cbd5f0",
        },

        "&.Mui-disabled .checkbox-checked svg": {
          color: "#ffffff",
        },
      }}
    />
  )
}