import React, { Component } from "react";
import Newselement from "./Newselement";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'


export default class News extends Component {
  static defaultProps={
    country:"in",
    pageSize:8,
    category:"general",
  }

  static propTypes={
          country:PropTypes.string,
          pageSize:PropTypes.number,
          category:PropTypes.string,
    }
  
  constructor(){
  super();
  console.log("Hello, I am Element Of News Element");
  this.state = {
    arti :[],
    loading:false,
    page:1  
    
  }
}

async updateNews(){
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=412adbc2e46d47c89c7ae421cb5ca261&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading: true});
    let data= await fetch(url);
    let parsedData = await data.json()
    this.setState({arti: parsedData.articles,
     totalResults:parsedData.totalResults,
     loading : false})
       
  }

  async componentDidMount() {
    this.updateNews();
  }
  

 
   handleNextClick= async() =>{
    console.log('Next Clicked');
    this.setState({page:this.state.page + 1})
    this.updateNews(); 
  //    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

     
   
  //  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=412adbc2e46d47c89c7ae421cb5ca261&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
  //  this.setState({loading: true});
  //  let data= await fetch(url);
  //  let parsedData = await data.json()
  //  this.setState({
  //    page : this.state.page + 1,
  //    arti : parsedData.articles,
  //   loading : false})}
   

   
  }
  
   handlePrevClick= async() =>{
    console.log('Previous Clicked');
    this.setState({page:this.state.page- 1})
    this.updateNews();
  }


  
  render() {
    return (
      <div className="container my-3">
        <div className="container text-center" style={{margin:"30px 0px"}}>

        <h1> Latest Headlines of NewsKey.......</h1>
        </div>
        <div className="container text-center">
        {this.state.loading &&<Spinner/>}
         </div>
        <div className="row">
        {!this.state.loading && this.state.arti.map((element)=>{
          return <div className="col-md-4"  key={element.url}>
          <Newselement title={element.title.slice(0,45)} description={element.description ? element.description.slice(0,88) :"" } imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
        </div>

        })}
        
        </div>
        <div className="btn d-flex justify-content-between">
        <button disabled={this.state.page<=1}type="button" class="btn btn-dark" onClick={this.handlePrevClick}>&#8592;Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" class="btn btn-dark "onClick={this.handleNextClick}>Next&#8594;</button>
        </div>
      </div>
    );
  }
}
