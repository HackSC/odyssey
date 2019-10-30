const Theme = {
  colors: {
    magenta: "#FF2B9D",
    red: "#FF414D",
    peach: "#FF8379",
    yellow: "#FEDA22",
    blue: "#86DCEA",
    black: "#1C1C1C",
    gray50: "#757575",
    gray25: "#B2B2B2",
    white: "#FFFFFF"
  },
  fontSizes: {
    large: "48px",
    title: "32px",
    header: "20px",
    subheader: "18px",
    regular: "16px"
  },
  fontFamily: "AktivGrotesk, sans-serif",
  media: {
    desktop: style => `
      @media screen and (max-width: 960px) {
        ${style}
      }
    `,
    tablet: style => `
      @media screen and (max-width: 768px) {
        ${style}
      }
    `,
    mobile: style => `
      @media screen and (max-width: 425px) {
        ${style}
      }
    `
  }
};

export default Theme;
