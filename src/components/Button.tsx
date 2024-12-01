import { ComponentProps } from "react"
import {Button as GluestackButton, Text} from "@gluestack-ui/themed"


type Props = ComponentProps<typeof GluestackButton> & {
  title: string
  isLoading?: boolean
}

export function Button ({title, isLoading = false, ...rest}: Props) {
  return(
    <GluestackButton
    w="$full"
    h="$14"
    bg="$violet400"
    borderWidth={"$0"}
    borderColor="$violet700"
    rounded="$sm"
    $active-bg="$violet500"
    {...rest}
    >
      <Text style={{color: "#FFF"}}>
        {title}
      </Text>
    </GluestackButton>
  )
}