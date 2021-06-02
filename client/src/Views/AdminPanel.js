import React from 'react';
import Sidebar from '../components/molecules/AdminSidebar/AdminSidebar';
import Cabinets from 'components/organism/Cabinets/Cabinets';
import styled from 'styled-components';
import ProtectedRoute from 'ProtectedRoute/ProtectedRoute';
import Services from 'components/organism/Services/Services';
import EmployeesList from '../components/organism/EmployeesList/EmployeesList';
import SMS from 'components/organism/SMS/SMS';

const AdminPanel = () => {
  return (
    <Wrapper>
      <Sidebar />
      <ProtectedRoute exact path="/admin-panel/cabinets" component={Cabinets} isAuth={'admin'} />
      <ProtectedRoute exact path="/admin-panel/specialists" component={EmployeesList} isAuth={'admin'} />
      <ProtectedRoute exact path="/admin-panel/services" component={Services} isAuth={'admin'} />
      <ProtectedRoute exact path="/admin-panel/SMS" component={SMS} isAuth={'admin'} />
    </Wrapper>
  );
};

export default AdminPanel;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
