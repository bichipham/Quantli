import MuiCheckbox, {
  type CheckboxProps as MuiCheckboxProps,
} from '@mui/material/Checkbox'

export type CheckboxProps = MuiCheckboxProps

export function Checkbox(props: CheckboxProps) {
  return <MuiCheckbox {...props} />
}
