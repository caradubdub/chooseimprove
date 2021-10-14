import styled from "styled-components";
import React from "react";
//add

function Links(props) {
  let link = null;
  let links = null;
  if (props.notes && typeof props.notes == "string") {
    let re = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/gi;
    // let links = props.description.test(re)
    //   ? prompt.fields.Description.replace(/\\/gi, "")
    //   : null;
    //links = links ? links.match(re) : null;
    if (props.notes.match(re) !== null) {
      link = props.notes.replace(/\\/gi, "");
      link = link.match(re);
      // let allLinks = [];
      // if (links && link) {
      //   allLinks = links.concat(link);
      // } else if (!links && link) {
      //   allLinks = link;
      // } else if (!link && links) {
      //   allLinks = links;
      // }
    }
  }
  if (props.description && typeof props.description == "string") {
    let re = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/gi;
    // let links = props.description.test(re)
    //   ? prompt.fields.Description.replace(/\\/gi, "")
    //   : null;
    //links = links ? links.match(re) : null;
    if (props.description.match(re) !== null) {
      links = props.description.replace(/\\/gi, "");
      links = links.match(re);
    }
  }
  let allLinks = [];
  if (links && link) {
    allLinks = links.concat(link);
  } else if (!links && link) {
    allLinks = link;
  } else if (!link && links) {
    allLinks = links;
  }
  const linkblock = allLinks.length ? (
    allLinks.map((link) => {
      return (
        <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
          <a href={link} target="_blank" rel="noopener" primary>
            Link
          </a>
        </div>
      );
    })
  ) : (
    <p></p>
  );
  return linkblock;
}

export default Links;
