import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import ProfileImage from '~/components/ProfileImage';
import UsernameDisplay from '~/components/UsernameDisplay';
import styles from '~/styles/variables';

const MiniProfile = props => {
  return (
    <MiniProfileStyle>
      <ProfileImage address={props.address} />

      <UsernameDisplayStyle>
        <UsernameDisplay address={props.address} />
      </UsernameDisplayStyle>
    </MiniProfileStyle>
  );
};

MiniProfile.propTypes = {
  address: PropTypes.string.isRequired,
};

const MiniProfileStyle = styled.div`
  display: inline-flex;

  padding: 1rem;

  border-radius: 5px;

  background-color: ${styles.monochrome.white};

  box-shadow: 1px 1px 4px ${styles.monochrome.grayDark};

  align-items: center;
`;

const UsernameDisplayStyle = styled.span`
  padding-left: 1rem;
`;

export default MiniProfile;