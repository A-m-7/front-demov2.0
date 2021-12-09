import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { APILINK } from "src/EndPoint";
import { create_axios_instance } from "../../actions/axiosActions"
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CRow, CCol, CForm } from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { CModal, CModalTitle, CModalHeader, CModalBody, CModalFooter, CFormInput } from "@coreui/react";
const axiosApiInstance = create_axios_instance()


const ViewDepartments = () => {
  const [department_list, setdepartment_list] = useState([])
  const [title, settitle] = useState("")
  const [visible, setvisible] = useState(false)
  const [update, setupdate] = useState("")
  let history = useHistory()
  const getDeps = async () => {
    await axiosApiInstance.get(APILINK + "/Department/").then((res) => {
      if (res.data) {
        console.log(res.data)
        setdepartment_list(res.data)
      }
    }).catch((err) => {
      console.log(err)
      if (err.response) {
        console.log(err);
      }
    });
  }

  const addDeps = async () => {
    let requestData = {
      "title": title
    }
    await axiosApiInstance.post(APILINK + "/Department/" + update, requestData).then((res) => {
      if (res.data) {
        settitle("")
        setupdate("")
        getDeps()
        setvisible(false)
      }
    }).catch((err) => {
      console.log(err)
      if (err.response) {
        console.log(err);
      }
    });

  }

  const updateDeps = async () => {
    let requestData = {
      "title": title
    }
    await axiosApiInstance.put(APILINK + "/Department/" + update, requestData).then((res) => {
      if (res.data) {
        settitle("")
        getDeps()
        setvisible(false)
      }
    }).catch((err) => {
      console.log(err)
      if (err.response) {
        console.log(err);
      }
    });

  }


  const openModal = (initialvalue = "", id = "") => {
    console.log(initialvalue, id)
    settitle(initialvalue)
    setupdate(id)
    setvisible(true)
  }
  const submit = () => {
    if (update)
      updateDeps()
    else
      addDeps()

  }

  useEffect(() => {
    getDeps()
  }, [])

  const departments = department_list.map((val, index) => {
    return (<CTableRow >
      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
      <CTableDataCell className="text-capitalize">{val.title}</CTableDataCell>
      <CTableDataCell> <CButton onClick={() => openModal(val.title, val.id)}><FontAwesomeIcon icon={faEdit} /></CButton>  </CTableDataCell>
    </CTableRow>)

  })
  return (
    <>
      <CRow className="justify-content-end">
        <CCol sm="auto">
          <CButton onClick={() => openModal()}>Add Department +</CButton>
        </CCol>
      </CRow>


      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody >
          {departments}
        </CTableBody>
      </CTable>


      <CModal visible={visible} onClose={() => setvisible(false)}>
        <CModalHeader>
          <CModalTitle>Department</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={() => submit()}>
            <CFormInput value={title} className="mb-4" type="text" placeholder="Department Name" onChange={(e) => settitle(e.target.value)} />
            <CButton type="submit" color="primary">{update ? 'Update Department' : 'Create Department'}</CButton>
          </CForm>

        </CModalBody>

      </CModal>
    </>
  )
}

export default ViewDepartments
