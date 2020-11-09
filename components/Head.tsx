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

      {/* Facebook pixel (come get my data zuck) */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '2475646642710223');
  fbq('track', 'PageView');`
        }}
      />

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
