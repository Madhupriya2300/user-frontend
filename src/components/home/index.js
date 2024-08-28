import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import DataTable from "../../common/dataTable";
import { useSelector, useDispatch } from "react-redux";
import Searchbar from "../../common/searchbar";
import authActions from "../../redux/auth/actions";

const tableKeys = [
  {
    name: "SI.NO",
    accessor: "id"
  },
  {
    name: "First Name",
    accessor: "firstname"
  },
  {
    name: "Last Name",
    accessor: "lastname"
  },
  {
    name: "Email ID",
    accessor: "emailid"
  },
  {
    name: "Mobilenumber",
    accessor: "mobileno"
  },
  {
    name: "Role",
    accessor: "role"
  },
  {
    name: "Created Date",
    accessor: "createddate"
  },
];


export default function Index() {

  const dispatch = useDispatch();

  const { users, filterValues } = useSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch({ type: authActions.GET_USERS });
    //eslint-disable-next-line
  }, []);

  const handleSearch = (e) => {
    dispatch({ type: authActions.SET_FILTER_VALUES, payload: { ...filterValues, searchText: e.target.value || "" } });
    dispatch({ type: authActions.HANDLE_USER_FILTER });
  }

  const handleRoleChange = (e) => {
    dispatch({ type: authActions.SET_FILTER_VALUES, payload: { ...filterValues, role: e.target.value } });
    dispatch({ type: authActions.HANDLE_USER_FILTER });
  };

  return (
    <Container fluid>
      <div className="section_background_color" style={{ margin: '1rem auto' }}>
        <Row className="table_head_main_div" style={{ marginBottom: '1rem' }}>
          <Col md={5} sm={12} style={{ lineHeight: '16px' }}>
            <div className="table_heading_cls">Users</div>
          </Col>
          <Col md={3} sm={12} style={{ height: "90%" }}>
            <select defaultValue={"All"} className="form-select" onChange={handleRoleChange}>
              <option value={"All"}>All</option>
              <option value={"User"}>User</option>
              <option value={"Admin"}>Admin</option>
              <option value={"Guest"}>Guest</option>
            </select>
          </Col>
          <Col md={4} sm={12} className="table_searchbar_col">
            <Searchbar placeholder={'Search Users'} handleSearch={handleSearch} />
          </Col>
        </Row>
        <DataTable
          keys={tableKeys}
          values={users?.filtered}
          page={'userList'}
        />
      </div>
    </Container>
  );
}
