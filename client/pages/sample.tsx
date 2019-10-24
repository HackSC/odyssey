import React from "react";

import Layout from "../components/Layout";
import { ContentBlockWide } from "../styles";

const Sample = () => {
  return (
    <Layout>
      <ContentBlockWide>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et justo
          eleifend, hendrerit quam eget, condimentum dui. Aliquam vel quam ut
          dolor dignissim volutpat luctus in lorem. Vestibulum ante ipsum primis
          in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus
          pharetra eleifend posuere. Vivamus lorem lacus, tincidunt non
          elementum sed, facilisis ut turpis. Quisque vel nibh vitae quam
          sagittis molestie. Donec ut velit placerat, commodo sem sed, aliquam
          neque. Fusce a fermentum ipsum, nec dictum nisl. Sed vulputate euismod
          accumsan. Fusce id rhoncus augue. Quisque quis iaculis tortor.
        </p>

        <form>
          <input type="text" />
          <button>Submit</button>
        </form>
      </ContentBlockWide>
    </Layout>
  );
};

export default Sample;
