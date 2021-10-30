import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { BASE_SERVER } from "../constants/urls";

const EditTable = ({ showModal, handleClose, number, numbers, setNumbers }) => {
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .put(`${BASE_SERVER}/api/numbers/${number._id}`, {
        number: e.target.number.value,
        paymentMethod: e.target.paymentMethod.value,
        limit: e.target.limit.value,
      })
      .then((res) => {
        const nums = [...numbers];
        const itemIndex = numbers.findIndex((num) => num._id === number._id);
        nums[itemIndex] = res.data;
        setNumbers(nums);
      });
    handleClose();
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Phone No</Form.Label>
              <Form.Control
                name="number"
                type="text"
                defaultValue={number.number}
                placeholder="Enter Phone No"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Payment Method</Form.Label>
              <Form.Control
                name="paymentMethod"
                type="text"
                defaultValue={number.paymentMethod}
                placeholder="Enter Payment Method"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Limit</Form.Label>
              <Form.Control
                name="limit"
                type="text"
                defaultValue={number.limit}
                placeholder="Enter Limit"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditTable;
