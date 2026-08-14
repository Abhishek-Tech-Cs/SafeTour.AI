import React,{ useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../auth/services/auth.service'
import Button from '../../../components/ui/Button'

const DashboardPage = () => {
  const navigate = useNavigate()

  const [logoutLoading,setLogoutLoading] = useState(false);
  const {clearUser} = useAuth()

  async function handleLogout(){
    setLogoutLoading(true)
    try{
      await logout()
    }catch(error){
      console.log(error)
    }finally{
      clearUser()
      setLogoutLoading(false)
      navigate('/login', {replace:true})
    }
  }
  return (
    <div>
      <h1>Dashboard page</h1>
      <Button type='button' disabled={logoutLoading} onClick={handleLogout}> 
        {logoutLoading?'logging out..':'logout'}
      </Button>
    </div>
  )
}

export default DashboardPage