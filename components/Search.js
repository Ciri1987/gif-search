Search = React.createClass({

    getInitialState() {
        return {
            searchingText: '',
        };
    },

    handleChange: function (event) {
        var searchingText = event.target.value;
        this.setState({
            searchingText: searchingText
        });

        if (searchingText.length > 2) {
            this.props.onSearch(searchingText);
        }
    },

    handleKeyUp: function (event) {
        if (event.keyCode === 13) {
            this.props.onSearch(this.state.searchingText);
        }
    },

    render: function () {
        var styles = {
            fontSize: '1.5em',
            width: '100%',
            maxWidth: '350px',
            textAlign: 'center',

        };

        return <input
            type="text"
            onChange={
                this.handleChange
            }
            onKeyUp={
                this.handleKeyUp
            }
            placeholder="Search..."
            style={
                styles
            }
            value={
                this.state.searchTerm
            } />
    }
});