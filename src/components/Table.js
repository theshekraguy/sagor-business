import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { BASE_SERVER } from "../constants/urls";
import EditTable from "./EditTable";

const TableComp = () => {
  const [numbers, setNumbers] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [showAdd, setshowAdd] = useState(false);
  const [showModal, setshowModal] = useState(false);

  useEffect(() => {
    axios.get(`${BASE_SERVER}/api/numbers?limit=50&page=1`).then((res) => {
      setNumbers(res.data.docs);
    });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_SERVER}/api/numbers`, {
        number: e.target.number.value,
        paymentMethod: e.target.paymentMethod.value,
        limit: e.target.limit.value,
      })
      .then((res) => {
        setNumbers([...numbers, res.data]);
      });

    setshowAdd(false);
    e.target.number.value = "";
    e.target.paymentMethod.value = "";
    e.target.limit.value = "";
  };

  const disableNum = (id) => {
    const number = numbers.find((num) => num._id === id);
    axios
      .put(`${BASE_SERVER}/api/toggle/${id}`, {
        active: !number.active,
      })
      .then((res) => {
        const nums = [...numbers];
        const itemIndex = numbers.findIndex((num) => num._id === id);
        nums[itemIndex].active = res.data.active;
        setNumbers(nums);
      });
  };

  const handleClose = () => {
    setshowModal(false);
  };

  const handleShow = (num) => {
    setSelectedNumber(num);
    setshowModal(true);
  };

  return (
    <>
      <Container>
        <h3
          className="mt-2"
          style={{ background: "#27ae60", color: "white", padding: 10 }}
        >
          Welcome <span style={{ color: "blue" }}>Sagar</span> to your Dashboard
        </h3>
        <Button onClick={() => setshowAdd((prev) => !prev)}>Add Phone</Button>
        {showModal && (
          <EditTable
            showModal={showModal}
            handleClose={handleClose}
            number={selectedNumber}
            numbers={numbers}
            setNumbers={setNumbers}
          />
        )}
        {showAdd && (
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Phone No</Form.Label>
              <Form.Control
                name="number"
                type="text"
                placeholder="Enter Phone No"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Payment Method</Form.Label>
              <Form.Control
                name="paymentMethod"
                type="text"
                placeholder="Enter Payment Method"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Limit</Form.Label>
              <Form.Control
                name="limit"
                type="text"
                placeholder="Enter Limit"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Phone No</th>
              <th>Payment Method</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {numbers.length > 0 &&
              numbers.map((num, i) => (
                <tr
                  key={num._id}
                  style={{ background: !num.active ? "#e74c3c" : "" }}
                >
                  <td>{i + 1}</td>
                  <td>{num.number}</td>
                  <td>{num.paymentMethod}</td>
                  <td>{num.limit}</td>
                  {/* <td style={{}} onClick={() => deleteNum(num.id)}>Change</td> */}
                  <td>
                    <Button className="me-1" onClick={() => handleShow(num)}>
                      Edit
                    </Button>
                    <Button onClick={() => disableNum(num._id)}>
                      {num.active ? "Disable" : "Enable"}
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default TableComp;
