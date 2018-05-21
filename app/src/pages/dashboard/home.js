import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

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
		fetch('http://dragonboatlife.com/wp-json/wp/v2/posts?categories=17', {
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

				<ol className="breadcrumb">
					<li className="breadcrumb-item active">
						<NavLink to={"/dashboard/"}>Home</NavLink>
					</li>
				</ol>
				
				<div className="row">
					<div className="col col-12 col-md-8">
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

					<div className="col col-12 col-md-4">
						<h3>T-Shirts & Tanks</h3>

						<div className="row ">
							<div className="col col-12 col-md-12">
								<p>
									<a href="https://dragonboatlife.threadless.com/designs/id-rather-dragon-boating/womens/racerback-tank?color=white" target="_blank" rel="noopener">
										<img class="size-medium wp-image-230 alignnone" src="http://dragonboatlife.com/wp-content/uploads/2018/05/Id-Rather-be-dragon-boating-t-shirt-300x300.png" alt="" width="300" height="300" />
									</a>
								</p>
							</div>
						</div>
						<div className="row ">
							<div className="col col-12 col-md-12">
								<p>
									<a href="https://dragonboatlife.threadless.com/designs/boat-hair-dont-care/womens/triblend-t-shirt" target="_blank" rel="noopener"><img class="alignnone size-medium wp-image-231" src="http://dragonboatlife.com/wp-content/uploads/2018/05/boat-hair-dont-care-t-shirt-300x300.png" alt="" width="300" height="300"  /></a>
								</p>
							</div>
						</div>
						<div className="row ">
							<div className="col col-12 col-md-12">
								<p>
									<a href="https://dragonboatlife.threadless.com/designs/dragon-boat-life/mens/tank?color=black" target="_blank" rel="noopener">
										<img class="alignnone size-medium wp-image-232" src="http://dragonboatlife.com/wp-content/uploads/2018/05/dragon-boat-life-tank-top-298x300.png" alt="" width="298" height="300" />
									</a>
								</p>
							</div>
						</div>

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
