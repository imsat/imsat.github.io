var GistBox = React.createClass({
    getInitialState: function() {
        return {
            gists: []
        };
    },
	addGist: function(username) {
		var url = `https://api.github.com/users/${username}/gists`;

		$.get(url, function(result) {
			console.log(result);
			let id = Date.now();
			let username = result[0].owner.login;
			let url = result[0].owner.html_url;

			let gists = this.state.gists.concat({id, username, url})
			this.setState({gists})
		}.bind(this));

	},
    render: function() {
        var newGist = function(gist) {
            return <Gist username={gist.username} url={gist.url  } key={gist.id} />
        };

        return (
            <div>
                <h1>GistBox</h1> 

				<GistAddForm onAdd={this.addGist} />

                { this.state.gists.map(newGist) }
            </div>
        );
    }
});

React.render(<GistBox />, document.querySelector("#app"));
