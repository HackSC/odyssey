import Head from "next/head";

interface MetaTagTypes {
  title?: string;
  description?: string;
}

const MetaTags = ({ title, description }: MetaTagTypes) => (
  <>
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        name="description"
        content={
          description ||
          "USC's largest hackathon. The future is in your hands at HackSC 2021."
        }
      ></meta>

      <meta property="og:url" content="https://hacksc.com" />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={
          description ||
          "USC's largest hackathon. The future is in your hands at HackSC 2021."
        }
      />

      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=UA-127488741-1"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-127488741-1');
        `,
        }}
      />

      <link rel="icon" type="image/png" href="/static/favicon.png" />
    </Head>
  </>
);

export default MetaTags;
