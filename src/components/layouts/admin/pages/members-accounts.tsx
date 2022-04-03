import { Route, Routes, useParams } from "react-router-dom";
import { MembersAccountsAddContainer } from "../components/members-accounts-add-container";
import { MembersAccountsListContainer } from "../components/members-accounts-list-container";
import { MembersAccountsEditContainer } from "../components/members-accounts-edit-container"

export const MembersAccounts: React.FC<any> = (props) => {
  const params = useParams();
  return (
    <div>
      <h1>Members Accounts</h1>
      <Routes>
        <Route path="" element={<MembersAccountsListContainer data={{id:params.id ?? ''}} />} />
        <Route path="/add" element={<MembersAccountsAddContainer data={{id:params.id ?? ''}} />} />
        <Route path="/:accountId" element={<MembersAccountsEditContainer data={{memberId:params.id ?? ''}} />} />
      </Routes>
      
    </div>
  )
}