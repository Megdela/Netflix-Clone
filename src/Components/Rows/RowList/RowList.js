import React from "react";
import Row from "../Row/Row";
import requests from "../../../utils/requests";

const RowList = () => {
  return (
    <>
      <Row 
      className="first_title"
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow={true}
      />
      <Row
        title="TRENDING"
        fetchUrl={requests.fetchTrending} 
        isLargeRow={true}
      />
      <Row
        title="ACTION"
        fetchUrl={requests.fetchActionMovies}
        isLargeRow={true}
      />
      <Row
        title="DOCUMENTARIES"
        fetchUrl={requests.fetchDocumentaries}
        isLargeRow={true}
      />
      <Row
        title="TV SHOW"
        fetchUrl={requests.fetchPopularTVShows} 
        isLargeRow={true}
      />
      <Row
        title="HORROR"
        fetchUrl={requests.fetchHorrorMovies}
        isLargeRow={true}
      />
      <Row
        title="COMEDY MOVIES"
        fetchUrl={requests.fetchComedyMovies}
        isLargeRow={true}
      />
      <Row
        title="TOP RATED"
        fetchUrl={requests.fetchTopRatedMovies}
        isLargeRow={true}
      />
      <Row
        title="ROMANCE"
        fetchUrl={requests.fetchRomanceMovies}
        isLargeRow={true}
      />
    </>
  );
};

export default RowList;
