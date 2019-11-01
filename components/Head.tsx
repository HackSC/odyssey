import { default as NextHead } from "next/head";

type HeadProps = {
  title: string;
};

const Head = ({ title }: HeadProps) => {
  return (
    <NextHead>
      <title>{title}</title>
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width"
        key="viewport"
      />

      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=UA-127488741-2"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-127488741-2');
      `
        }}
      />

      <link rel="icon" type="image/png" href="/favicon.png" />
    </NextHead>
  );
};

export default Head;
