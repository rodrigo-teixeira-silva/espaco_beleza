import { useContext } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes"; 

import { useAuth } from "@hooks/UseAuth";

import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { Box } from "@gluestack-ui/themed";
import { Loading } from "@components/Loading";

export function Routes() {
  const theme = DefaultTheme;
  theme.colors.background = gluestackUIConfig.tokens.colors.gray700;
  const { user, isLoadingUserStorageData } = useAuth();

  //console.log('Usuário lofado =>',user);

 if(isLoadingUserStorageData){
return<Loading/> 
}
  return (
    <Box flex={1} bg="$gray700">
      <NavigationContainer>
      {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
}
