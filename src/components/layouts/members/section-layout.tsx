import { Outlet } from 'react-router-dom'

export const SectionLayout: React.FC<any> = (props) => {
  return(
    <div>
      <h1>Members</h1>
      <Outlet/>
    </div>
  )
}