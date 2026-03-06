import MuiCheckbox, {
  type CheckboxProps as MuiCheckboxProps,
} from '@mui/material/Checkbox'
import CheckIcon from '@mui/icons-material/Check'

export type CheckboxProps = MuiCheckboxProps

export function Checkbox(props: CheckboxProps) {
  return (
   <MuiCheckbox
      {...props}
      icon={
        <span
          style={{
            width: 22,
            height: 22,
            border: "1px solid gray",
            borderRadius: 4,
            display: "inline-block",
          }}
        />
      }
      checkedIcon={
        <span
          style={{
            width: 22,
            height: 22,
            backgroundColor: "#2948d4",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CheckIcon
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
            }}
          />
        </span>
      }
      sx={{
        padding: 0,
        "&.Mui-disabled": {
          opacity: 1,
        },
        "&.Mui-disabled .MuiSvgIcon-root": {
          color: "#9ca3af",
        },
        "&.Mui-disabled span": {
          borderColor: "#d1d5db",
          backgroundColor: "#e5e7eb",
        },
        "&.Mui-disabled span svg": {
          color: "#9ca3af",
        },
      }}
    />
  )
}