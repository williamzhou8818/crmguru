import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authAction';

const Dashboard = ({auth:{user},loadUser}) => {

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    },[loadUser])


    return (
        <>
        {user && <h3>Wellcome Back {user.username} </h3> }
        </>
        
    )
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired
  }
const mapStateToProps = state => ({
    auth: state.auth
  })
  
export default connect(mapStateToProps, {loadUser})(Dashboard);