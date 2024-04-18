import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div>
        <p>
          Copyright ⓒ {year}
          {" Rabia Avci "}
          <a rel="noopener" href="https://github.com/RbAvci/Module-Servers" target="_blank">
            Github Repo
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
