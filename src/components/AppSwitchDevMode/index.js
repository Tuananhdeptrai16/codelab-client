import { CodeSandboxOutlined } from '@ant-design/icons'
import React from 'react'
import './index.style.scss'
import { useContextAction} from '../../ProviderContext/AppContextProvider'
const AppSwitchDevMode = () => {
  const {setDevMode} = useContextAction()
  return (
    <div class="container-dev">
      <label class="switch" >
        <input type="checkbox" onChange={(e)=>{setDevMode(e.target.checked)}} />
        <span class="slider">
          <span class="title">Dev</span>
          <span class="ball">
            <span class="icon">
                <CodeSandboxOutlined style={{fontSize : 20}}/>
            </span>
          </span>
        </span>
      </label>
    </div>
  )
}

export default AppSwitchDevMode