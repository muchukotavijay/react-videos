/*params: {
    q: term,
    part: "snippet",
    type: 'video',
    maxResults: 5,
    key: KEY
}*/
import React from 'react';

// API
import youtube from '../apis/youtube';
import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

const KEY = 'AIzaSyDv8mPYLZyiawh-QdRNyvMiGgsYiwu0Rt8';

class App extends React.Component {

    state = { 
        videos: [], 
        selectedVideo: null 
    };

    componentDidMount() {
        this.onTermSubmit('iPhones');
    }

    onVideoSelect = (video) => {
        this.setState({selectedVideo: video});
    }

    onTermSubmit = async (term) => {
        const response = await youtube.get('/search', {
                params: {
                    part: 'snippet',
                    maxResults: 5,
                    key: KEY,
                    q:term
                }
            }
        );

        const videos = response.data.items;

        this.setState({ videos, selectedVideo: videos[0] })
    };

    render() {
        return (
            <div className="ui container">
                <SearchBar onFormSubmit={this.onTermSubmit}/>
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo} />
                        </div>
                        <div className="five wide column">
                            <VideoList videos={this.state.videos} onVideoSelect={this.onVideoSelect}/>
                        </div>
                        
                    </div>
                </div>
            </div>
            
        )
    }
}

export default App;