// import original module declarations
import "styled-components";

// import your custom theme
import { Theme } from "./styles";

// extend the module declarations using custom theme type
type ThemeType = typeof Theme;

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
