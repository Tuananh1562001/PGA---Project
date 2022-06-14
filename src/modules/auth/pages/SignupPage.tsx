import { replace } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import logo from '../../../logo-420-x-108.png';
import { IGenderParams, ILocationParams, ISignUpParams, IStateParams } from '../../../models/auth';
import { AppState } from '../../../redux/reducer';
import { Routes } from '../../../Routes';
import { getErrorMessageResponse } from '../../../utils';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { fetchThunk } from '../../common/redux/thunk';
import SignUpForm from '../components/SignUpForm/SignUpForm';
function SignupPage() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [locations, setLocations] = useState<ILocationParams[]>([]);
  const [idLocations, setIdLocation] = useState<string>('')
  const [states, setStates] = useState<IStateParams[]>([])

  const genders: IGenderParams[]= [
    {label: 'Nam', value: 'Male'},
    {label: 'Nữ', value: 'Female'}
  ]


  const getLocation = useCallback(async() => {
    setLoading(true);
    const json = await dispatch(fetchThunk(API_PATHS.getLocation, 'get'))
    if(json?.code === RESPONSE_STATUS_SUCCESS){
      setLocations(json.data)
      // console.log(json.data)
      return
    }
    setLoading(false)
  },[locations])

  useEffect(() => {
    getLocation()
  },[getLocation])

  const getStates = useCallback(async(idLocations) => {
    setLoading(true)
    const json = await dispatch(fetchThunk(`${API_PATHS.getLocation}?pid=${idLocations}`, 'get'))
    if(json?.code === RESPONSE_STATUS_SUCCESS){
      setStates(json.data)
      // console.log(json.data)
    }
    setLoading(false)
  },[states])

  const handleChangeLocation = useCallback((idLocations: string) => {
    setIdLocation(idLocations)
  }, [])

  useEffect(() => {
    if (idLocations) {
      getStates(idLocations)
    }
  }, [idLocations])


  const onSignUp = useCallback(
    async (values: ISignUpParams) => {
      setErrorMessage('');
      setLoading(true);

      const json = await dispatch(
        fetchThunk(API_PATHS.signUp, 'post', values)
      )

      setLoading(false);

      if(json?.code === RESPONSE_STATUS_SUCCESS) {
        console.log(json.data)
        alert("Chúc mừng bạn đăng ký thành công")
        // dispatch((replace(ROUTES.login)))
        return;
      }

      setErrorMessage(getErrorMessageResponse(json))
    }, [dispatch]
  )
  return (
    <div
      className="container"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <img src={logo} alt="" style={{ maxWidth: '250px', margin: '32px' }} />

      <SignUpForm loading={loading} errorMessage={errorMessage} locations={locations} genders={genders} states={states} onSignUp={onSignUp} handleChangeLocation={handleChangeLocation} />
    </div>
  );
}

export default SignupPage;
