import MuiAvatar, { type AvatarProps as MuiAvatarProps } from '@mui/material/Avatar'

export type AvatarSize = 'small' | 'medium' | 'large'

export type AvatarProps = MuiAvatarProps & {
  size?: AvatarSize
}

const sizeMap: Record<AvatarSize, number> = {
  small: 28,
  medium: 40,
  large: 56,
}

export function Avatar({ size = 'medium', sx, ...props }: AvatarProps) {
  const dimension = sizeMap[size]

  return (
    <MuiAvatar
      {...props}
      sx={{
        width: dimension,
        height: dimension,
        ...sx,
      }}
    />
  )
}
