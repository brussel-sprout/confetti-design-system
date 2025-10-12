import React from 'react'
import ReactDOM from 'react-dom/client'

import { Demo } from './components/Demo'

import './styles/base.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Demo />
	</React.StrictMode>
)
