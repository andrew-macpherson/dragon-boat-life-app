import React from 'react';
import {connect} from 'react-redux';

class Home extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			posts: []
		}
	}

	componentDidMount(){
		var that = this;
		//Get recent blog posts. 
		// Register User
		fetch('http://dragonboatlife.com/wp-json/wp/v2/posts', {
			method: 'get'
		}).then(function(response) {
	        if (!response.ok) {
	            throw response;
	        }
	        return response;
	    }).then(function(response){
			//Success.
			response.json().then(json => {
		    	 // After Fetch 
		        //callback(true,false,json);
		        console.log(json);
		        that.setState({
		        	posts:json
		        });
		    });

		}).catch(function(error) {
	        error.json().then(json => {
		        //callback(false,json.error.message);
		    });
	    });

	}

	render(){
		return (
			<div className="container">
				
				<div className="row">
					<div className="col col-8">
						<h3>Recent News</h3>

						{(this.state.posts.length === 0) ?
						<p>Loading...</p>
						:
						""}

						{this.state.posts.map(function(post,index){
							return (
								<div className="row">
									<div className="col col-12">
										<div className="card">
											<div className="card-header" dangerouslySetInnerHTML={{__html: post.title.rendered}}></div>
											<div className="card-body">
												<div dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}></div>

												<a href={post.link} target="_blank">Read More</a>
											</div>
										</div>
									</div>
								</div>
							);
						},this)}
					</div>

					<div className="col col-4">
						<h3>Products</h3>
					</div>
				</div>

			</div>
		);
	}
}



function mapStateToProps(state,ownProps){
	return {
		currentUser: state.currentUser
	}
}


const mapDispatchToProps = dispatch => {
	return {

	}
}


export default connect(mapStateToProps,mapDispatchToProps)(Home);
