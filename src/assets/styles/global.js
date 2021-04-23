import { css } from "styled-components";

const global = css`
  :root {
    --offwhite: #f8f8ec;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    display: block;
    object-fit: cover;
    width: 100%;
  }

  img.swirl {
    width: 50%;
    margin: 20px auto;
  }
`;

export default global;
