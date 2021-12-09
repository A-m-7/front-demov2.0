import { APILINK } from "src/EndPoint";
import { create_axios_instance } from "../../actions/axiosActions"
// import { LogOut } from "src/actions/auCTableHeaderCellAction";
import React, { useState, useEffect } from "react";
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CRow, CCol, CForm } from "@coreui/react";
import { CModal, CModalTitle, CModalHeader, CModalBody, CFormInput, CFormSelect, CFormTextarea } from "@coreui/react";

const axiosApiInstance = create_axios_instance()

const Orders = () => {
  const [orders_list, setorders] = useState([])
  const [visible, setvisible] = useState(false)
  const [title, setTitle] = useState("");
  const [order_details, setOrderDetails] = useState("");
  const [order_budget, setOrderBudget] = useState("");
  const [order_type, setOrderType] = useState("");
  const [all_pipelines, setPipelines] = useState([]);
  const [pipeline, setPipeline] = useState("");
  const [end_date, setEnddate] = useState("");
  const [end_time, setEndtime] = useState("");
  const getOrders = async () => {
    await axiosApiInstance.get(APILINK + "/OrderProcess/").then((res) => {
      if (res.data) {
        setorders(res.data)
      }
    }).catch((err) => {
      console.log(err)
      if (err.response) {
        console.log(err);
      }
    });
  }

  const make_verdict = async (id, verdict) => {
    await axiosApiInstance.put(APILINK + "/OrderProcess/" + id, { "verdict": verdict }).then((res) => {
      if (res.data) {
        window.location.reload();
      }
    }).catch((err) => {
      console.log(err)
      if (err.response) {
        console.log(err);
      }
    });
  }
  const get_pipelines = async () => {
    axiosApiInstance.get(APILINK + "/Pipeline/").then((res) => {
      if (res.data) {
        let data = res.data
        let options = []
        data.forEach(element => {
          options.push({ value: element["id"], label: element["name"] })

        });
        console.log(options)
        setPipelines(options)
        return res.data
      }
    }).catch((err) => {
      console.log(err)
      if (err.response) {
        console.log(err);
      }
    });
  }

  const addOrder = async () => {
    let requestData = {
      "pipeline": pipeline,
      "title": title,
      "details": order_details,
      "budget": order_budget,
      "type": order_type,
      "end_date": end_date,
      "end_time": end_time
    }
    await axiosApiInstance.post(APILINK + "/Order/", requestData).then((res) => {
      if (res.data) {
        setvisible(false)
      }
    }).catch((err) => {
      console.log(err)
      if (err.response) {
        console.log(err);
      }
    });
  }

  useEffect(() => {
    getOrders()
    get_pipelines()
  }, [])

  const orders = orders_list.map((val, index) => {
    const order = val["order"];
    const node = val["pipeline_node"];
    return (<tr>
      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
      <CTableDataCell>{order["title"]}</CTableDataCell>
      <CTableDataCell>{order["type"]}</CTableDataCell>

      <CTableDataCell>
        {node["dept"] !== null ? node["dept"]["title"] : "Offering Phase"}</CTableDataCell>
      <CTableDataCell>
        {node["generates_document"] !== null ?
          (<a href={node["generates_document"]["file"]}>{node["generates_document"]["title"]}</a>) : "-"}
      </CTableDataCell>

      <CTableDataCell>
        <CTableHeaderCell className="btn btn-outline-danger" onClick={() => make_verdict(val["id"], "rejected")}>Reject</CTableHeaderCell>
        <CTableHeaderCell className="btn btn-outline-success" onClick={() => make_verdict(val["id"], "accepted")}> Approve</CTableHeaderCell>

      </CTableDataCell>

    </tr>)
  })
  return (
    <>
      <CRow className="justify-content-end">
        <CCol sm="auto">
          <CButton onClick={() => setvisible(true)}>Add Order +</CButton>
        </CCol>
      </CRow>

      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Order Title</CTableHeaderCell>
            <CTableHeaderCell scope="col">Order Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Department Deciding</CTableHeaderCell>
            <CTableHeaderCell scope="col">Documents To Generate</CTableHeaderCell>
            <CTableHeaderCell scope="col">Final Decision</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody >
          {orders}
        </CTableBody>
      </CTable>

      <CModal visible={visible} onClose={() => setvisible(false)}>
        <CModalHeader>
          <CModalTitle>Order</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={() => addOrder()}>

            <CFormInput
              name="title"
              type="text"
              className="mb-4"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Order Title"
              required />


            <CFormTextarea
              name="order_details"
              rows="3"
              className="mb-4"
              value={order_details}
              onChange={e => setOrderDetails(e.target.value)}
              placeholder="Order Details"
              required />

            <CFormInput
              name="order_budget"
              type="text"
              className="mb-4"
              value={order_budget}
              onChange={e => setOrderBudget(e.target.value)}
              placeholder="Order Budget"
              required />



            <CFormInput
              name="order_type"
              type="text"
              className="mb-4"
              value={order_type}
              onChange={e => setOrderType(e.target.value)}
              placeholder="Order Type (supply,product,etc..)"
              required />


            <CFormInput
              name="endDate"
              type="date"
              className="mb-4"
              value={end_date}
              onChange={e => setEnddate(e.target.value)}
              placeholder="End Date"
              required />




            <CFormInput
              name="endTime"
              type="time"
              className="mb-4"
              value={end_time}
              onChange={e => setEndtime(e.target.value)}
              placeholder="End Time"
              required />

            <CFormSelect
              placeholder="Choose Order Pipline"
              options={["Choose Order Pipline", ...all_pipelines]}
              onChange={(e) => setPipeline(e.target.value)}
              className="mb-4"
              value={pipeline}
            />
            <CButton type="submit" color="primary">Create Order</CButton>
          </CForm>
          {/* <CForm onSubmit={() => addDocs()}>
            <CFormInput value={title} className="mb-4" type="text" placeholder="Document Name" onChange={(e) => settitle(e.target.value)} />
            <CFormInput className="mb-4" type="file" onChange={(e) => setfile(e.target.files[0])} />
            <CButton type="submit" color="primary">Create Document</CButton>
          </CForm> */}

        </CModalBody>

      </CModal>
    </>
  )
}

export default Orders
