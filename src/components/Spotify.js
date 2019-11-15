import React, { Component } from "react";

const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com'

const Artists = ({ artist }) => {
    const { images, name, followers, genres } = artist;

    return (
        <div>
            <h3>{name}</h3>
            <p>{followers.total} followers</p>
            <p>{genres.join(',')}</p>
            <img src={images[0].url} alt='artist-profile' />
        </div>
    );
}

export default Artists