import React from "react";
import { Container } from "semantic-ui-react";
import propTypes from "prop-types";

const Profile = props => (
  <Container>
    Hello this is a container of content
  </Container>
);

Profile.propTypes = {
  name: propTypes.string.isRequired,
  description: propTypes.string.isRequired
};

export default Profile;
