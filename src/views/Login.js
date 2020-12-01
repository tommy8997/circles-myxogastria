import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Link as MuiLink,
  Paper,
  Typography,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Button from '~/components/Button';
import ButtonBack from '~/components/ButtonBack';
import CenteredHeading from '~/components/CenteredHeading';
import ExternalLink from '~/components/ExternalLink';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import Input from '~/components/Input';
import View from '~/components/View';
import notify, { NotificationsTypes } from '~/store/notifications/actions';
import translate from '~/services/locale';
import { ONBOARDING_PATH } from '~/routes';
import {
  RESTORE_ACCOUNT_UNKNOWN_SAFE,
  RESTORE_ACCOUNT_INVALID_SEED_PHRASE,
} from '~/utils/errors';
import { SUPPORT_URL } from '~/utils/constants';
import { hideSpinnerOverlay, showSpinnerOverlay } from '~/store/app/actions';
import { restoreAccount } from '~/store/onboarding/actions';

const Login = () => {
  const dispatch = useDispatch();

  const [seedPhrase, setSeedPhrase] = useState('');

  const handleChange = (event) => {
    setSeedPhrase(event.target.value);
  };

  const handleSubmitSeedPhrase = async () => {
    dispatch(showSpinnerOverlay());

    try {
      await dispatch(restoreAccount(seedPhrase.trim()));

      dispatch(
        notify({
          text: translate('Login.successWelcome'),
          type: NotificationsTypes.SUCCESS,
        }),
      );
    } catch (error) {
      console.log(error);
      let translationId = 'Login.errorRestoreFailedUnknown';
      if (error.message === RESTORE_ACCOUNT_INVALID_SEED_PHRASE) {
        translationId = 'Login.errorRestoreFailedInvalidSeedphrase';
      } else if (error.message === RESTORE_ACCOUNT_UNKNOWN_SAFE) {
        translationId = 'Login.errorRestoreFailedUnknownSafe';
      }

      dispatch(
        notify({
          text: translate(translationId),
          type: NotificationsTypes.ERROR,
          lifetime: 10000,
        }),
      );
    }

    dispatch(hideSpinnerOverlay());
  };

  const isValid = seedPhrase.trim().split(' ').length === 24;

  return (
    <Fragment>
      <Header>
        <ButtonBack />
        <CenteredHeading>{translate('Login.headingLogin')}</CenteredHeading>
      </Header>
      <View>
        <Container maxWidth="sm">
          <Typography align="center">
            {translate('Login.bodyEnterYourSeedPhrase')}
          </Typography>
          <Box mb={7} mt={4}>
            <Paper p={2}>
              <Input
                fullWidth
                id="seedPhrase"
                isError={seedPhrase.length > 0 && !isValid}
                multiline
                rows={4}
                style={{ padding: '1rem' }}
                value={seedPhrase}
                onChange={handleChange}
              />
            </Paper>
          </Box>
          <Typography align="center">
            {translate('Login.bodyLostYourSeedPhrase')}{' '}
            <MuiLink component={Link} to={ONBOARDING_PATH}>
              {translate('Login.buttonCreateNewWallet')}
            </MuiLink>
          </Typography>
          <Typography align="center">
            {translate('Login.bodyNeedHelp')}{' '}
            <ExternalLink href={SUPPORT_URL}>
              {translate('Login.linkSupport')}
            </ExternalLink>
          </Typography>
        </Container>
      </View>
      <Footer>
        <Button
          disabled={!isValid}
          fullWidth
          isPrimary
          onClick={handleSubmitSeedPhrase}
        >
          {translate('Login.buttonSubmit')}
        </Button>
      </Footer>
    </Fragment>
  );
};

export default Login;
