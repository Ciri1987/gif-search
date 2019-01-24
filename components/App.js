App = React.createClass({
    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    handleSearch: function (searchingText) {  // 1.
        this.setState({
            loading: true  // 2.
        });
        this.getGif(searchingText, function (gif) {  // 3.
            this.setState({  // 4
                loading: false,  // a
                gif: gif,  // b
                searchingText: searchingText  // c
            });
        }.bind(this));
    },

    getGif: function (searchingText, callback) {  // 1.
        var GIPHY_API_URL = 'https://api.giphy.com';
        var GIPHY_PUB_KEY = 'drCtCl7WA9A6EiHUW0bSR1abwFFQ0lHn';
        var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
        // 2.
        var xhr = new XMLHttpRequest();  // 3.
        xhr.open('GET', url);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText).data; // 4.
                var gif = {  // 5.
                    url: data.fixed_width_downsampled_url,
                    sourceUrl: data.url
                };
                callback(gif);  // 6.
            }
        };
        xhr.send();
    },

    render: function () {

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
            <div className={'app'}>
                <h1>Gif searcher</h1>
                <p>Find gif on <a href="http://giphy.com"> giphy</a>. Press enter to get more!</p>
                <Search onSearch={this.handleSearch} />
                <Gif
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
            </div>
        );
    }
});