import React, { Component } from "react";

export default class Newselement extends Component {
  render() {
      let {title,description,imageUrl,newsUrl,author,date,source} = this.props

    return (
      <div className="my-3">
        <div className="card" >
        <span class="position-absolute top-0 start- translate-middle badge rounded-pill bg-danger" style={{left:"90%",zIndex:1}}>{source}<span class="visually-hidden">unread messages</span></span>
          <img src={!imageUrl ? "https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/x_pan_top.jpg":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body" >
            <h5 className="card-title" >{title}....</h5>
            <p className="card-text">
             {description}.... </p>
             <p class="card-text"><small class="text-muted">By {!author ? "Unknown": author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
