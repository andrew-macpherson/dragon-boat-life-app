import React from 'react';
import {connect} from 'react-redux';
import {NavLink,Link} from 'react-router-dom';

//Import Actions
import {changeInput} from 'actions/common.js';
import {getTeamMembers,getTeam} from 'actions/team-member.js';
import {getUserTeam} from 'actions/team.js';
import {getEventRaces,deleteEventRace,updateRaceObject} from 'actions/race.js';
import {post,patch,updateRace} from 'actions/race.js';
import {getTeamEvent} from 'actions/event.js';

class EventRoster extends React.Component{

	constructor(props){
		super(props);

		this.toggleRace = this.toggleRace.bind(this);
		this.allReadyInBoat = this.allReadyInBoat.bind(this);
		this.calculateWeight = this.calculateWeight.bind(this);


	    this.state = {
	      activeTab: false,
	      leftWeight: 0,
	      rightWeight: 0,
	      frontWeight:0,
	      backWeight:0,
	      paceWeight: 0,
	      engineWeight: 0,
	      rocketWeight: 0
	    };
	}

	componentDidMount(){
		var teamId = this.props.match.params.id;
		var eventId = this.props.match.params.eventId;

		this.props.getUserTeam(this.props.currentUser.id,teamId);
		this.props.getTeamMembers(teamId);
		this.props.getEventRaces(teamId,eventId);
		this.props.getTeamEvent(teamId,eventId);

		this.calculateWeight(0);
	}

	addEventRace(event){
		event.preventDefault();

		var eventId = this.props.match.params.eventId; 
		var teamId = this.props.match.params.id; 

		var raceData = {
			teamId: teamId,
			eventId: eventId,
			lineup: {
				drummer: [{}],
				left: [{},{},{},{},{},{},{},{},{},{}],
				right: [{},{},{},{},{},{},{},{},{},{}],
				steer: [{}]
			}
		}

		this.props.post(eventId,teamId,raceData);
	}


	toggleRace(tab){
		if (this.state.activeTab !== tab) {
	      this.setState({
	        activeTab: tab
	      });
	    }

	    this.calculateWeight(tab);
	}

	removeRaceLineup(item,index){

		var teamId = this.props.match.params.id; 
		var eventId = this.props.match.params.eventId;

		this.props.deleteEventRace(eventId,item.id,teamId);

		this.calculateWeight(index);
	}

	handleOnPaddlerChange(side,row,raceIndex,paddlerIndex){

		if(paddlerIndex !== ''){
			var paddler = this.props.teamMembers.teamMembers[paddlerIndex];
		}else{
			var paddler = {};
		}

		var race = this.props.races.races[raceIndex];
		var currentLineup = race.lineup;

		if(currentLineup === null){
			currentLineup = {
				drummer: [{}],
				left: [
					{},{},{},{},{},{},{},{},{},{}
				],
				right: [
					{},{},{},{},{},{},{},{},{},{}
				],
				steer: [{}]
			}
		}

		currentLineup[side][row] = paddler;
		


		var race = this.props.races.races[raceIndex];
		var raceId = race.id;
		race.lineup = currentLineup;

		this.props.updateRaceLineup(raceId,race,raceIndex);

		this.calculateWeight(raceIndex);

	}

	calculateWeight(raceIndex){
		console.log('calc weight',raceIndex);
		var leftWeight = 0;
		var rightWeight = 0;

		var frontWeight = 0;
		var backWeight = 0;

		var paceWeight = 0;
		var engineWeight = 0;
		var rocketWeight = 0;


		if(this.props.races.races[raceIndex] !== undefined){
			var membersLeft = this.props.races.races[raceIndex].lineup.left;
			var membersRight = this.props.races.races[raceIndex].lineup.right;
			var membersDrummer = this.props.races.races[raceIndex].lineup.drummer;
			var membersSteer = this.props.races.races[raceIndex].lineup.steer;

			//Check if paddler is in members left and right
			if(membersLeft !== undefined){

				//Left Weight
				for(var i=0; i < membersLeft.length; i++){
					if(membersLeft[i] != null && membersLeft[i].user !== undefined){
						leftWeight = Number(leftWeight) + Number(membersLeft[i].user.weight);
					}
				}


				// Front Half Weight
				for(var i=0; i < 5; i++){
					if(membersLeft[i] != null && membersLeft[i].user !== undefined){
						frontWeight = Number(frontWeight) + Number(membersLeft[i].user.weight);
					}
				}

				// Back Half Weight
				for(var i=0; i < 10; i++){
					if(i >=5){
						if(membersLeft[i] != null && membersLeft[i].user !== undefined){
							backWeight = Number(backWeight) + Number(membersLeft[i].user.weight);
						}
					}
				}


				// Pace Weight
				for(var i=0; i < 3; i++){
					if(membersLeft[i] != null && membersLeft[i].user !== undefined){
						paceWeight = Number(paceWeight) + Number(membersLeft[i].user.weight);
					}
				}

				// Engine Weight
				for(var i=0; i < 10; i++){
					if(i < 7 && i > 2){
						if(membersLeft[i] != null && membersLeft[i].user !== undefined){
							engineWeight = Number(engineWeight) + Number(membersLeft[i].user.weight);
						}
					}
				}

				// Rocket Weight
				for(var i=0; i < 10; i++){
					if(i >=7){
						if(membersLeft[i] != null && membersLeft[i].user !== undefined){
							rocketWeight = Number(rocketWeight) + Number(membersLeft[i].user.weight);
						}
					}
				}

			}
			if(membersRight !== undefined){
				//Right Weight
				for(var i=0; i < membersRight.length; i++){
					if(membersRight[i] != null && membersRight[i].user !== undefined){
						rightWeight = Number(rightWeight) + Number(membersRight[i].user.weight);
					}
				}

				// Front Half Weight
				for(var i=0; i < 5; i++){
					if(membersRight[i] != null && membersRight[i].user !== undefined){
						frontWeight = Number(frontWeight) + Number(membersRight[i].user.weight);
					}
				}

				// Back Weight
				for(var i=0; i < 10; i++){
					if(i >=5){
						if(membersRight[i] != null && membersRight[i].user !== undefined){
							backWeight = Number(backWeight) + Number(membersRight[i].user.weight);
						}
					}
				}

				// Pace Weight Right
				for(var i=0; i < 5; i++){
					if(membersRight[i] != null && membersRight[i].user !== undefined){
						paceWeight = Number(paceWeight) + Number(membersRight[i].user.weight);
					}
				}

				// Engine Weight Right
				for(var i=0; i < 10; i++){
					if(i < 7 && i > 2){
						if(membersRight[i] != null && membersRight[i].user !== undefined){
							engineWeight = Number(engineWeight) + Number(membersRight[i].user.weight);
						}
					}
				}

				// Rocket Weight Right
				for(var i=0; i < 10; i++){
					if(i >=7){
						if(membersRight[i] != null && membersRight[i].user !== undefined){
							backWeight = Number(backWeight) + Number(membersRight[i].user.weight);
						}
					}
				}
			}

			if(membersDrummer !== undefined){
				if(membersDrummer[0] != null && membersDrummer[0].user !== undefined){
					frontWeight = Number(frontWeight) + Number(membersDrummer[0].user.weight);
				}
			}

			if(membersSteer !== undefined){
				if(membersSteer[0] != null && membersSteer[0].user !== undefined){
					backWeight = Number(backWeight) + Number(membersSteer[0].user.weight);
				}
			}



			this.setState({
				leftWeight: leftWeight,
				rightWeight:rightWeight,
				frontWeight:frontWeight,
				backWeight:backWeight,
				paceWeight:paceWeight,
				engineWeight:engineWeight,
				rocketWeight:rocketWeight
			})
		}
	}


	allReadyInBoat(index,paddler,paddlerIndex){
		var inBoatAlready = false;
		if(
			this.props.races.races !== undefined 
			&& this.props.races.races[index] !== undefined
			&& this.props.races.races[index].lineup !== null
		){
			var membersLeft = this.props.races.races[index].lineup.left;
			var membersRight = this.props.races.races[index].lineup.right;
			var membersDrummer = this.props.races.races[index].lineup.drummer;
			var membersSteer = this.props.races.races[index].lineup.steer;

			//Check if paddler is in members left and right
			if(membersLeft !== undefined){
				for(var i=0; i < membersLeft.length; i++){
					if(
						membersLeft[i] != null && 
						membersLeft[i].id === paddler.id){
						inBoatAlready = true;
					}
				}
			}

			if(membersRight !== undefined){
				for(var i=0; i < membersRight.length; i++){
					if(
						membersRight[i] != null && 
						membersRight[i].id === paddler.id){
						inBoatAlready = true;
					}
				}
			}
			if(membersDrummer !== undefined){
				for(var i=0; i < membersDrummer.length; i++){
					if(
						membersDrummer[i] != null && 
						membersDrummer[i].id === paddler.id){
						inBoatAlready = true;
					}
				}
			}

			if(membersSteer !== undefined){
				for(var i=0; i < membersSteer.length; i++){
					if(
						membersSteer[i] != null && 
						membersSteer[i].id === paddler.id){
						inBoatAlready = true;
					}
				}
			}

			return inBoatAlready;
		}
	}

	render(){

		return (
			<div className="container">
				<ol className="breadcrumb">
					<li className="breadcrumb-item">
						<NavLink to={"/dashboard/"}>Home</NavLink>
					</li>
					<li className="breadcrumb-item">
						<NavLink to={"/dashboard/teams/"}>Teams</NavLink>
					</li>
					<li className="breadcrumb-item">
						<NavLink to={"/dashboard/team/"+this.props.team.id+"/view"}>{this.props.team.name}</NavLink>
					</li>
					<li className="breadcrumb-item">
						<NavLink to={"/dashboard/team/"+this.props.team.id+"/events"}>Events</NavLink>
					</li>
					<li className="breadcrumb-item active">Roster</li>
				</ol>

				<h1>{this.props.event.eventName}</h1>

				<div className="row">
					<div className="col col-12">
						<button className="btn btn-primary" onClick={(event) => this.addEventRace(event)}>Add Race Lineup</button>
					</div>
				</div>

				<div className="row">
					<div className="col col-12">
						<ul className="nav nav-tabs">
							{this.props.races.races.map(function(item,index){
								let raceNum = index + 1;
								return (
									<li key={index} className="nav-item">
										<a className={(this.state.activeTab === index) ? "active nav-link" : "nav-link"} href="#"
											onClick={() => { this.toggleRace(index); }}
										>Lineup {raceNum}</a>
									</li>
								)
							},this)}
						</ul>	
					</div>
				</div>			

				<div className="tab-content">
					{this.props.races.races.map(function(item,index){
						let raceNum = index + 1;
						return (
							<div className={(this.state.activeTab === index) ? "tab-pane fade show active" : "tab-pane fade"}>
								<div className="row">
									<div className="col col-12 col-md-4 mobileMarginBotton">
										<h4>Remaining Team Members</h4>

										<ul className="list-group">
											{this.props.teamMembers.teamMembers.map(function(paddler,paddlerIndex){
												var inBoatAlready = this.allReadyInBoat(index,paddler,paddlerIndex);

												if(!inBoatAlready){
													return (
														<li key={paddlerIndex} className="list-group-item">
															{paddler.gender === 'Male' ? <span className="fa fa-mars"></span> : <span className="fa fa-venus"></span> }
															<span> {paddler.user.firstName} {paddler.user.lastName} - {paddler.user.weight}lbs</span>

															<span className="pull-right">
																{paddler.preferredSection == 'Pace' || paddler.preferredSection == 'Any' || paddler.preferredSection == null ? <span className="fa fa-clock-o"></span> : ""}
																{paddler.preferredSection == 'Engine' || paddler.preferredSection == 'Any' || paddler.preferredSection == null ? <span className="fa fa-automobile"></span> : ""}
																{paddler.preferredSection == 'Rockets' || paddler.preferredSection == 'Any' || paddler.preferredSection == null ? <span className="fa fa-rocket"></span> : ""}

																{paddler.preferredPaddleSide == 'Left' || paddler.preferredPaddleSide == 'No Preference' ? <span className="fa fa-arrow-left"></span> : ""}
																{paddler.preferredPaddleSide == 'Right' || paddler.preferredPaddleSide == 'No Preference' ? <span className="fa fa-arrow-right"></span> : ""}
															</span>

														</li>
													);
												}else{
													return false;
												}
											},this)}
										</ul>

									</div>
									<div className="col col-12 col-md-8">
										<div>
											<div className="row">
												<div className="col col-12">
													<h4>Race {raceNum} here
														<button className="btn btn-danger pull-right" onClick={(event) => this.removeRaceLineup(item,index)}>Remove Lineup</button>
													</h4>
												</div>
											</div>

											<div className="row">
												<div className="col col-12">

													<table className="table table-sm table-bordered text-center">
														<tr>
															<td colSpan="3" className={(this.state.frontWeight != this.state.backWeight)?"table-warning":"table-success"}>Front Half: {this.state.frontWeight}</td>
														</tr>
														<tr>
															<td className={(this.state.leftWeight != this.state.rightWeight)?"table-warning":"table-success"}>Left: {this.state.leftWeight}</td>
															<td>
																<table className="table table-sm">
																	<tr>
																		<td>Pace: {this.state.paceWeight}</td>
																	</tr>
																	<tr>
																		<td>Engine: {this.state.engineWeight}</td>
																	</tr>
																	<tr>
																		<td>Rockets: {this.state.rocketWeight}</td>
																	</tr>
																</table>
															</td>
															<td className={(this.state.rightWeight != this.state.leftWeight)?"table-warning":"table-success"}>Right: {this.state.rightWeight}</td>
														</tr>
														<tr>
															<td colSpan="3" className={(this.state.backWeight != this.state.frontWeight)?"table-warning":"table-success"}>Back Half: {this.state.backWeight}</td>
														</tr>
													</table>
													
												</div>
											</div>	

											<div className="row">
												<div className="col col-6 offset-3">
													<ul className="list-group">
														<li className="list-group-item">
															<select className="form-control" onChange={(event) => this.handleOnPaddlerChange('drummer',0,index,event.target.value)}>
																<option value="">Select Drummer</option>
																{this.props.teamMembers.teamMembers.map(function(item,paddlerIndex){

																	var inBoatAlready = this.allReadyInBoat(index,item,paddlerIndex);

																	var selectedIndex = null;
																	if(
																		this.props.races.races !== undefined 
																		&& this.props.races.races[index] !== undefined
																		&& this.props.races.races[index].lineup !== null
																	){
																		var currentDrummer = this.props.races.races[index].lineup.drummer[0];

																		if(currentDrummer !== null && currentDrummer !== undefined){
																			if(item.id === currentDrummer.id){
																				selectedIndex = paddlerIndex;
																			}
																		}
																	}
																	if(!inBoatAlready || selectedIndex === paddlerIndex){
																		return (
																			<option selected={(selectedIndex === paddlerIndex)} value={paddlerIndex}>{item.user.firstName} {item.user.lastName}</option>
																		);

																	}else{
																		return false;
																	}
																},this)}
															</select>
														</li>
													</ul>
												</div>
											</div>

											<div className="row">
												<div className="col col-6 pr-0">
													<ul className="list-group">
														{Array.apply(0, Array(10)).map(function (x, i) {
															return (
																<li className="list-group-item">
																	<select className="form-control" onChange={(event) => this.handleOnPaddlerChange('left',i,index,event.target.value)}>
																		<option value="">Select Paddler</option>
																		{this.props.teamMembers.teamMembers.map(function(item,paddlerIndex){
																			var inBoatAlready = this.allReadyInBoat(index,item,paddlerIndex);
																			var selectedIndex = null;
																			
																			if(
																				this.props.races.races !== undefined 
																				&& this.props.races.races[index] !== undefined
																				&& this.props.races.races[index].lineup !== null
																			){
																				var members = this.props.races.races[index].lineup.left;
																				if(members !== undefined){
																					var row = members[i];

																					if(row !== null && row !== undefined){
																						if(item.id === row.id){
																							selectedIndex = paddlerIndex;
																						}
																					}
																				}
																			}
																			if(!inBoatAlready || selectedIndex === paddlerIndex){
																				return (
																					<option selected={(selectedIndex === paddlerIndex)} value={paddlerIndex}>{item.user.firstName} {item.user.lastName}</option>
																				);
																			}else{
																				return false;
																			}
																		},this)}
																	</select>
																</li>
															)
														},this)}
													</ul>
												</div>

												<div className="col col-6 pl-0">
													<ul className="list-group">
														{Array.apply(0, Array(10)).map(function (x, i) {
															return (
																<li className="list-group-item">
																	<select className="form-control" onChange={(event) => this.handleOnPaddlerChange('right',i,index,event.target.value)}>
																		<option value="">Select Paddler</option>
																		{this.props.teamMembers.teamMembers.map(function(item,paddlerIndex){
																			var inBoatAlready = this.allReadyInBoat(index,item,paddlerIndex);

																			var selectedIndex = null;
																			
																			if(
																				this.props.races.races !== undefined 
																				&& this.props.races.races[index] !== undefined
																				&& this.props.races.races[index].lineup !== null
																			){
																				var members = this.props.races.races[index].lineup.right;
																				if(members !== undefined){
																					var row = members[i];

																					if(row !== null && row !== undefined){
																						if(item.id === row.id){
																							selectedIndex = paddlerIndex;
																						}
																					}
																				}
																			}
																			if(!inBoatAlready || selectedIndex === paddlerIndex){
																				return (
																					<option selected={(selectedIndex === paddlerIndex)} value={paddlerIndex}>{item.user.firstName} {item.user.lastName}</option>
																				);
																			}else{
																				return false;
																			}
																		},this)}
																	</select>
																</li>
															)
														},this)}
													</ul>
												</div>
											</div>

											<div className="row">
												<div className="col col-6 offset-3">
													<ul className="list-group">
														<li className="list-group-item">
															<select className="form-control" onChange={(event) => this.handleOnPaddlerChange('steer',0,index,event.target.value)}>
																<option>Select Steer</option>
																{this.props.teamMembers.teamMembers.map(function(item,paddlerIndex){
																	var inBoatAlready = this.allReadyInBoat(index,item,paddlerIndex);

																	var selectedIndex = null;
																	if(
																		this.props.races.races !== undefined 
																		&& this.props.races.races[index] !== undefined
																		&& this.props.races.races[index].lineup !== null
																	){
																		var currentSteer = this.props.races.races[index].lineup.steer[0];

																		if(currentSteer !== null && currentSteer !== undefined){
																			if(item.id === currentSteer.id){
																				selectedIndex = paddlerIndex;
																			}
																		}
																	}
																	if(!inBoatAlready || selectedIndex === paddlerIndex){
																		return (
																			<option selected={(selectedIndex === paddlerIndex)} value={paddlerIndex}>{item.user.firstName} {item.user.lastName}</option>
																		);
																	}else{
																		return false;
																	}
																},this)}
															</select>
														</li>
													</ul>
												</div>
											</div>

										</div>

									</div>
								</div>
							</div>
						)
					},this)}
					
				</div>

			</div>
		);
	}
}



function mapStateToProps(state,ownProps){
	return {
		teamMembers: state.teamMembers,
		currentUser: state.currentUser,
		team: state.team,
		races: state.races,
		event: state.event
	}
}


const mapDispatchToProps = dispatch => {
	return {
		getTeamMembers: (teamId) => dispatch(getTeamMembers(teamId)),
		getUserTeam: (userId,teamId) => dispatch(getUserTeam(userId,teamId)),
		getEventRaces: (teamId,eventId) => dispatch(getEventRaces(teamId,eventId)),
		getTeamEvent: (teamId,eventId) => dispatch(getTeamEvent(teamId,eventId)),
		post:(eventId,teamId,raceData) => dispatch(post(eventId,teamId,raceData)),
		deleteEventRace:(eventId,raceId,teamId) => dispatch(deleteEventRace(eventId,raceId,teamId)),

		updateRaceLineup:(raceId,raceData,raceIndex) => {
			dispatch(updateRaceObject(raceIndex,raceData));
			dispatch(patch(raceId,raceData));
		}
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(EventRoster);
